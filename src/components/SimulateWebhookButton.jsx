import React, { useState } from "react";
import axios from "axios";
import { Button, useToast } from "@chakra-ui/react";

function SimulateWebhookButton({ transactionId }) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const simulateWebhook = async () => {
    setLoading(true);
    const status = Math.random() > 0.5 ? "success" : "failed";  // Statut aléatoire

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/webhook/stripe`, {
        tx_id: transactionId,  // Utilise l'ID de la transaction passé en props
        status: status  // Le statut simulé ("success" ou "failed")
      });
      toast({
        title: `Transaction ${status}`,
        description: `Transaction ${transactionId} status updated to ${status}.`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "There was an error simulating the webhook.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      colorScheme="blue"
      onClick={simulateWebhook}
      isLoading={loading}
      loadingText="Updating"
    >
      Simulate Webhook
    </Button>
  );
}

export default SimulateWebhookButton;