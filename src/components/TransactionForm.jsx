import React, { useEffect, useState } from "react";
import {
  VStack, HStack, FormControl, FormLabel, Input, Select, IconButton,
  InputGroup, InputRightElement, useToast, Tooltip, Text, Box
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, CopyIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import axios from "axios";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

const CURRENCIES = ["EUR","USD","GBP","JPY","CHF","CAD","AUD","CNY","INR","BRL","ZAR","SGD","MXN","TRY"];
const DEVICES = ["web","mobile"];

const CURRENCY_SYMBOLS = {
  EUR: "€", USD: "$", GBP: "£", JPY: "¥", CHF: "₣",
  CAD: "$", AUD: "$", CNY: "¥", INR: "₹", BRL: "R$",
  ZAR: "R", SGD: "$", MXN: "$", TRY: "₺"
};

export default function TransactionForm({ onNewTransaction }) {
  const [formData, setFormData] = useState({ montant: "", devise: "", pays: "", device: "" });
  const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey") || "");
  const [showApi, setShowApi] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => { localStorage.setItem("apiKey", apiKey); }, [apiKey]);

  const handleChange = (e) => setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!apiKey) return "API Key is required.";
    if (!formData.montant || Number(formData.montant.replace(/,/g, "")) <= 0) return "Amount must be > 0.";
    if (!formData.devise) return "Currency is required.";
    if (!formData.pays || formData.pays.length !== 2) return "Country must be 2-letter code (e.g. FR).";
    if (!formData.device) return "Device is required.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      toast({ title: "Form error", description: err, status: "warning", duration: 2500, isClosable: true });
      return;
    }
    const payload = {
      montant: parseFloat(formData.montant.replace(/,/g, "")),
      devise: formData.devise,
      pays: formData.pays.toUpperCase(),
      device: formData.device,
    };
    const idempotencyKey =
      (window.crypto && window.crypto.randomUUID)
        ? window.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/transaction`, payload, {
        headers: { "x-api-key": apiKey, "Idempotency-Key": idempotencyKey },
      });
      toast({ title: "Transaction sent", status: "success", duration: 2000, isClosable: true });
      onNewTransaction?.();
      setFormData({ montant: "", devise: "", pays: "", device: "" });
    } catch (err) {
      console.error("❌ API Error:", err);
      toast({
        title: "Error",
        description: err.response?.data?.detail || "Transaction failed.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const copyApi = () => {
    navigator.clipboard.writeText(apiKey || "");
    toast({ title: "API Key copied", status: "info", duration: 1200, isClosable: true });
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={8} align="stretch">
        {/* API Key - glassmorphism */}
        <Box
          p={4}
          borderRadius="lg"
          backdropFilter="blur(10px)"
          bg="whiteAlpha.100"
          border="1px solid rgba(255,255,255,0.2)"
          shadow="md"
        >
          <FormLabel fontSize="sm" fontWeight="semibold" opacity={0.8}>
            API Key
          </FormLabel>
          <InputGroup>
            <Input
              name="apiKey"
              type={showApi ? "text" : "password"}
              placeholder="Paste your API Key here"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              borderRadius="lg"
            />
            <InputRightElement>
              <HStack spacing={1}>
                <Tooltip label={showApi ? "Hide" : "Show"} hasArrow>
                  <IconButton
                    aria-label="toggle api"
                    size="sm"
                    variant="ghost"
                    icon={showApi ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={() => setShowApi((s) => !s)}
                  />
                </Tooltip>
                <Tooltip label="Copy Key" hasArrow>
                  <IconButton aria-label="copy api" size="sm" variant="ghost" icon={<CopyIcon />} onClick={copyApi} />
                </Tooltip>
              </HStack>
            </InputRightElement>
          </InputGroup>
        </Box>

        {/* Amount & Currency */}
        <HStack spacing={6} align="start">
          <FormControl isRequired>
            <FormLabel fontSize="sm" fontWeight="semibold" opacity={0.8}>Amount</FormLabel>
            <InputGroup>
              <Input
                name="montant"
                type="text"
                placeholder="0.00"
                value={formData.montant}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^\d.]/g, "");
                  const parts = raw.split(".");
                  const formatted =
                    parts.length > 1
                      ? new Intl.NumberFormat("en-US").format(parts[0]) + "." + parts[1].slice(0,2)
                      : new Intl.NumberFormat("en-US").format(parts[0]);
                  setFormData((f) => ({ ...f, montant: formatted }));
                }}
                borderRadius="lg"
              />
              {formData.devise && (
                <InputRightElement width="3rem">
                  <Text fontWeight="semibold">
                    {CURRENCY_SYMBOLS[formData.devise] || ""}
                  </Text>
                </InputRightElement>
              )}
            </InputGroup>
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize="sm" fontWeight="semibold" opacity={0.8}>Currency</FormLabel>
            <Select
              name="devise"
              placeholder="Select"
              value={formData.devise}
              onChange={handleChange}
              borderRadius="full"
              bg="blackAlpha.50"
              _hover={{ bg: "blackAlpha.100" }}
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </Select>
          </FormControl>
        </HStack>

        {/* Country & Device */}
        <HStack spacing={6} align="start">
          <FormControl isRequired>
            <FormLabel fontSize="sm" fontWeight="semibold" opacity={0.8}>Country</FormLabel>
            <Input
              name="pays"
              placeholder="FR"
              maxLength={2}
              value={formData.pays}
              onChange={handleChange}
              textTransform="uppercase"
              borderRadius="lg"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize="sm" fontWeight="semibold" opacity={0.8}>Device</FormLabel>
            <Select
              name="device"
              placeholder="Select"
              value={formData.device}
              onChange={handleChange}
              borderRadius="full"
              bg="blackAlpha.50"
              _hover={{ bg: "blackAlpha.100" }}
            >
              {DEVICES.map((d) => (
                <option key={d} value={d}>{capitalize(d)}</option>
              ))}
            </Select>
          </FormControl>
        </HStack>

        {/* Submit CTA */}
        <HStack justify="space-between">
          <Text fontSize="xs" opacity={0.6}>
            <b>Idempotency-Key</b> auto-generated per request
          </Text>
          <MagneticButton
            type="submit"
            isLoading={loading}
            rightIcon={<ArrowForwardIcon />}
            borderRadius="full"
            px={10}
            py={6}
            fontWeight="bold"
            bgGradient="linear(to-r, brand.500, brand.300)"
            color="white"
            shadow="lg"
            _hover={{ shadow: "xl", transform: "translateY(-2px)" }}
          >
            Send Transaction
          </MagneticButton>
        </HStack>
      </VStack>
    </form>
  );
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
