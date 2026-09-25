"use client";

import { Box, Input, Button } from "@chakra-ui/react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <Box maxW="480px" mx="auto" position="relative" w="full">
      <Box
        position="absolute"
        left="14px"
        top="50%"
        transform="translateY(-50%)"
        pointerEvents="none"
        color="gray.400"
      >
        <svg
          aria-hidden="true"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </Box>

      <Input
        aria-label="Search Pokémon"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search Pokémon by name or number..."
        pl="42px"
        pr="36px"
        py={5}
        borderRadius="lg"
        bg="white"
        borderColor="gray.300"
        _focus={{ borderColor: "red.500" }}
      />

      {value && (
        <Button
          onClick={() => onChange("")}
          position="absolute"
          right="8px"
          top="50%"
          transform="translateY(-50%)"
          variant="ghost"
          size="xs"
          borderRadius="md"
          color="gray.400"
          _hover={{ color: "gray.600" }}
          aria-label="Clear search"
        >
          ✕
        </Button>
      )}
    </Box>
  );
}
