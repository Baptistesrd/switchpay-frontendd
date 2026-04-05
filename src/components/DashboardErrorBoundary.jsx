import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";

export default class DashboardErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("Dashboard render error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          p={6}
          bg="rgba(255,255,255,0.03)"
          border="1px solid"
          borderColor="rgba(255,100,100,0.35)"
          borderRadius="2xl"
          textAlign="center"
        >
          <Heading size="sm" color="red.300" mb={2}>
            Dashboard render error
          </Heading>
          <Text fontSize="sm" color="gray.400" mb={4}>
            {this.state.error?.message || "An unexpected error occurred."}
          </Text>
          <Button
            size="sm"
            variant="outline"
            colorScheme="red"
            borderRadius="full"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Retry
          </Button>
        </Box>
      );
    }
    return this.props.children;
  }
}
