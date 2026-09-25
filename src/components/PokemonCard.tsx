import Image from "next/image";
import Link from "next/link";
import { Box, Text, Badge } from "@chakra-ui/react";
import { PokemonListItem } from "@/types/pokemon";

export default function PokemonCard({ pokemon }: { pokemon: PokemonListItem }) {
  const formattedId = `#${String(pokemon.id).padStart(3, "0")}`;

  return (
    <Link href={`/pokemon/${pokemon.id}`} style={{ textDecoration: "none" }}>
      <Box
        p={4}
        bg="white"
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="lg"
        display="flex"
        flexDirection="column"
        alignItems="center"
        _hover={{ borderColor: "red.400", shadow: "sm" }}
      >
        <Badge alignSelf="flex-start" variant="subtle" colorPalette="gray" borderRadius="md" px={2} py={0.5} fontSize="xs">
          {formattedId}
        </Badge>

        <Box position="relative" w="120px" h="120px" my={2}>
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            fill
            sizes="120px"
            style={{ objectFit: "contain" }}
          />
        </Box>

        <Text fontSize="md" fontWeight="bold" textTransform="capitalize" color="gray.800" mt={1}>
          {pokemon.name}
        </Text>
      </Box>
    </Link>
  );
}
