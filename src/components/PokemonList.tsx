"use client";

import { useState } from "react";
import { Container, SimpleGrid, Box, Flex, Text, Button } from "@chakra-ui/react";
import { PokemonListItem } from "@/types/pokemon";
import PokemonCard from "./PokemonCard";
import SearchBar from "./SearchBar";

interface PokemonListProps {
    initialPokemon: PokemonListItem[];
}

export default function PokemonList({ initialPokemon }: PokemonListProps) {
    const [search, setSearch] = useState("");

    const query = search.trim().toLowerCase().replace(/^#/, "");
    const filteredPokemon = query
        ? initialPokemon.filter(
            (p) =>
                p.name.toLowerCase().includes(query) ||
                String(p.id) === query ||
                String(p.id).padStart(3, "0").includes(query)
        )
        : initialPokemon;

    return (
        <Container maxW="1200px" px={4} pb={8}>
            <Flex direction="column" gap={6}>
                <SearchBar value={search} onChange={setSearch} />

                <Flex justify="space-between" align="center" px={1}>
                    <Text fontSize="sm" color="gray.500">
                        Showing {filteredPokemon.length} Pokémon
                    </Text>
                    {search && (
                        <Button
                            variant="plain"
                            size="xs"
                            color="red.600"
                            onClick={() => setSearch("")}
                        >
                            Reset filter
                        </Button>
                    )}
                </Flex>

                {filteredPokemon.length > 0 ? (
                    <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} gap={4}>
                        {filteredPokemon.map((pokemon) => (
                            <PokemonCard key={pokemon.id} pokemon={pokemon} />
                        ))}
                    </SimpleGrid>
                ) : (
                    <Box
                        textAlign="center"
                        py={12}
                        bg="white"
                        borderRadius="lg"
                        borderWidth="1px"
                        borderColor="gray.200"
                    >
                        <Text fontSize="lg" fontWeight="semibold" color="gray.700">
                            No Pokémon found matching &quot;{search}&quot;
                        </Text>
                        <Text fontSize="sm" color="gray.400" mt={1}>
                            Try another search term!
                        </Text>
                    </Box>
                )}
            </Flex>
        </Container>
    );
}
