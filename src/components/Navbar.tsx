import Link from "next/link";
import { Box, Flex, Text, Badge } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={50}
      bg="white"
      borderBottomWidth="1px"
      borderColor="gray.200"
      px={4}
    >
      <Flex maxW="1200px" mx="auto" h="60px" align="center" justify="space-between">
        <Link href="/" style={{ textDecoration: "none" }}>
          <Flex align="center" gap={2}>
            <Box
              w="28px"
              h="28px"
              borderRadius="full"
              bg="red.600"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box w="10px" h="10px" borderRadius="full" bg="white" borderWidth="2px" borderColor="gray.800" />
            </Box>
            <Text fontSize="lg" fontWeight="bold" color="red.600">
              PokéExplorer
            </Text>
          </Flex>
        </Link>

        <Badge colorPalette="gray" variant="subtle" borderRadius="md" px={2.5} py={0.5} fontSize="xs">
          PokeAPI
        </Badge>
      </Flex>
    </Box>
  );
}

