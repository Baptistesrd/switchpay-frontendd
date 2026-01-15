import { useState } from "react";
import {
  VStack,
  Input,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const submit = async () => {
    if (!email) {
      toast({
        title: "Email required",
        status: "error",
        duration: 2500,
      });
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/waitlist`,
        { email, company }
      );

      toast({
        title: "You’re on the list 🚀",
        description: "We’ll reach out soon.",
        status: "success",
        duration: 3000,
      });

      setEmail("");
      setCompany("");
    } catch {
      toast({
        title: "Something went wrong",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack spacing={4}>
      <Input
        placeholder="Work email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        size="lg"
      />

      <Input
        placeholder="Company (optional)"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        size="lg"
      />

      <Button
        size="lg"
        w="100%"
        onClick={submit}
        isLoading={loading}
      >
        Join waitlist
      </Button>

      <Text fontSize="sm" color="gray.400">
        No spam. No marketing fluff.
      </Text>
    </VStack>
  );
}
