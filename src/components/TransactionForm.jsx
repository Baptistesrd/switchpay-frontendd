import React, { useEffect, useState } from "react";
import {
  VStack, HStack, FormControl, FormLabel, Input, Select, Button, IconButton,
  InputGroup, InputRightElement, useToast, Tooltip, Text
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, CopyIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import axios from "axios";
import MagneticButton from "./MagneticButton";

const CURRENCIES = ["EUR","USD","GBP","JPY","CHF","CAD","AUD","CNY","INR","BRL","ZAR","SGD","MXN","TRY"];
const DEVICES = ["web","mobile"];

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
    if (!formData.montant || Number(formData.montant) <= 0) return "Amount must be > 0.";
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
      montant: parseFloat(formData.montant),
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
      <VStack spacing={5} align="stretch">
        {/* API Key */}
        <FormControl>
          <FormLabel>Your API Key</FormLabel>
          <InputGroup>
            <Input
              name="apiKey"
              type={showApi ? "text" : "password"}
              placeholder="Your API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <InputRightElement>
              <HStack spacing={1}>
                <Tooltip label={showApi ? "Hide" : "Show"}>
                  <IconButton
                    aria-label="toggle api"
                    size="sm"
                    variant="ghost"
                    icon={showApi ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={() => setShowApi((s) => !s)}
                  />
                </Tooltip>
                <Tooltip label="Copy">
                  <IconButton aria-label="copy api" size="sm" variant="ghost" icon={<CopyIcon />} onClick={copyApi} />
                </Tooltip>
              </HStack>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <HStack spacing={4} align="start">
          <FormControl isRequired>
            <FormLabel>Amount</FormLabel>
            <Input
              name="montant"
              type="number"
              step="0.01"
              placeholder="Amount"
              value={formData.montant}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Select currency</FormLabel>
            <Select name="devise" placeholder="Select currency" value={formData.devise} onChange={handleChange}>
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </Select>
          </FormControl>
        </HStack>

        <HStack spacing={4} align="start">
          <FormControl isRequired>
            <FormLabel>Country (ex: FR)</FormLabel>
            <Input
              name="pays"
              placeholder="FR"
              maxLength={2}
              value={formData.pays}
              onChange={handleChange}
              textTransform="uppercase"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Select device</FormLabel>
            <Select name="device" placeholder="Select device" value={formData.device} onChange={handleChange}>
              {DEVICES.map((d) => (
                <option key={d} value={d}>{capitalize(d)}</option>
              ))}
            </Select>
          </FormControl>
        </HStack>

        <HStack justify="space-between">
          <Text fontSize="sm" opacity={0.7}>Idempotency-Key generated per request</Text>
          <MagneticButton type="submit" isLoading={loading} rightIcon={<ArrowForwardIcon />}>
            Send
          </MagneticButton>
        </HStack>
      </VStack>
    </form>
  );
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }



