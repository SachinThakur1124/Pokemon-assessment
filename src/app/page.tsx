import { Box, Heading, Text, Container } from "@chakra-ui/react";
import PokemonList from "@/components/PokemonList";
import { getPokemonList } from "@/services/pokeApi";

export default async function HomePage() {
  const pokemonList = await getPokemonList(151);

  return (
    <Box as="main" minH="100vh" py={8} bg="gray.50">
      <Container maxW="1200px" px={4} textAlign="center" mb={6}>
        <Heading as="h1" size="xl" fontWeight="bold" color="gray.800" mb={2}>
          Pokémon Explorer
        </Heading>
        <Text color="gray.600" fontSize="md">
          Explore Generation I Pokémon, their stats, types, and moves.
        </Text>
      </Container>

      <PokemonList initialPokemon={pokemonList} />
    </Box>
  );
}

