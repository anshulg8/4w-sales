import React from "react";
import { Box, Flex, Text, Link, useColorModeValue } from "@chakra-ui/react";

const Footer: React.FC = () => {
  return (
    <Box
      as="footer"
      py={4}
      px={8}
      bg={useColorModeValue("gray.100", "gray.800")}
      color={useColorModeValue("gray.700", "gray.200")}
      textAlign="center"
    >
      <Flex direction="column" align="center" gap={2}>
        <Text fontSize="sm">
          All rights reserved, made with{" "}
          <span style={{ color: "red" }}>❤️</span>
        </Text>
        <Text fontSize="sm">
          <Link href="https://example.com" isExternal color="teal.500">
            Visit our Website
          </Link>
        </Text>
        <Text fontSize="sm">
          <Link href="https://github.com/your-repo" isExternal color="teal.500">
            GitHub
          </Link>
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
