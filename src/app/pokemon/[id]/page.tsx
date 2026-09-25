import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Box, Container, Flex, Heading, SimpleGrid, Text, Badge } from "@chakra-ui/react";
import { getPokemonDetail } from "@/services/pokeApi";

const typeColors = {
  normal: "gray.500",
  fire: "red.500",
  water: "blue.500",
  grass: "green.500",
  electric: "yellow.500",
  ice: "cyan.400",
  fighting: "orange.500",
  poison: "purple.500",
  ground: "orange.700",
  flying: "blue.300",
  psychic: "pink.500",
  bug: "green.600",
  rock: "gray.500",
  ghost: "purple.600",
  dragon: "blue.600",
  steel: "gray.500",
  fairy: "pink.400",
};

const statNames = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const pokemon = await getPokemonDetail(id);

  if (!pokemon) {
    return { title: "Pokémon Not Found | PokéExplorer" };
  }

  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const formattedId = `#${String(pokemon.id).padStart(3, "0")}`;

  return {
    title: `${name} (${formattedId}) | PokéExplorer`,
    description: `Stats, abilities, types, and moves for ${name}.`,
  };
}

export default async function PokemonDetailPage({ params }: PageProps) {
  const { id } = await params;
  const pokemon = await getPokemonDetail(id);

  if (!pokemon) {
    notFound();
  }

  const artwork =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.front_default ||
    "";

  const totalStats = pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0);
  const formattedId = `#${String(pokemon.id).padStart(3, "0")}`;

  return (
    <Box as="main" minH="calc(100vh - 60px)" bg="gray.50" py={6} px={4}>
      <Container maxW="960px" px={0}>
        <Flex direction="column" gap={5}>
          <Flex justify="space-between" align="center">
            <Link href="/" style={{ textDecoration: "none" }}>
              <Flex
                align="center"
                gap={2}
                px={3}
                py={1.5}
                borderRadius="md"
                bg="white"
                borderWidth="1px"
                borderColor="gray.200"
                fontSize="sm"
                fontWeight="medium"
                color="gray.700"
                _hover={{ borderColor: "red.300", color: "red.600" }}
              >
                ← Back to Pokémon
              </Flex>
            </Link>

            <Badge colorPalette="gray" variant="subtle" fontSize="xs" px={2.5} py={1} borderRadius="md">
              {formattedId}
            </Badge>
          </Flex>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
            <Box
              bg="white"
              borderWidth="1px"
              borderColor="gray.200"
              borderRadius="lg"
              p={5}
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
            >
              <Box position="relative" w="160px" h="160px" my={2}>
                {artwork && (
                  <Image
                    src={artwork}
                    alt={pokemon.name}
                    fill
                    sizes="160px"
                    style={{ objectFit: "contain" }}
                    priority
                  />
                )}
              </Box>

              <Text fontSize="xs" color="gray.500" fontWeight="medium">
                {formattedId}
              </Text>

              <Heading as="h1" size="xl" fontWeight="bold" textTransform="capitalize" color="gray.800" mt={1} mb={3}>
                {pokemon.name}
              </Heading>

              <Flex wrap="wrap" gap={2} justify="center" mb={4}>
                {pokemon.types.map((t) => (
                  <Box
                    key={t.type.name}
                    px={3}
                    py={0.5}
                    borderRadius="md"
                    fontSize="xs"
                    fontWeight="semibold"
                    textTransform="uppercase"
                    bg={typeColors[t.type.name as keyof typeof typeColors] || "gray.500"}
                    color="white"
                  >
                    {t.type.name}
                  </Box>
                ))}
              </Flex>

              <SimpleGrid columns={2} gap={2} w="full" p={3} bg="gray.50" borderRadius="md" mb={4}>
                <Box textAlign="center">
                  <Text fontSize="xs" color="gray.500">
                    Height
                  </Text>
                  <Text fontSize="sm" fontWeight="bold" color="gray.800">
                    {(pokemon.height / 10).toFixed(1)} m
                  </Text>
                </Box>
                <Box textAlign="center" borderLeftWidth="1px" borderColor="gray.200">
                  <Text fontSize="xs" color="gray.500">
                    Weight
                  </Text>
                  <Text fontSize="sm" fontWeight="bold" color="gray.800">
                    {(pokemon.weight / 10).toFixed(1)} kg
                  </Text>
                </Box>
              </SimpleGrid>

              <Box w="full" pt={3} borderTopWidth="1px" borderColor="gray.100">
                <Text fontSize="xs" color="gray.500" mb={2}>
                  Abilities
                </Text>
                <Flex wrap="wrap" gap={2} justify="center">
                  {pokemon.abilities.map((a) => (
                    <Flex
                      key={a.ability.name}
                      align="center"
                      gap={1}
                      px={2.5}
                      py={1}
                      borderRadius="md"
                      bg="gray.50"
                      borderWidth="1px"
                      borderColor="gray.200"
                      fontSize="xs"
                      color="gray.700"
                      textTransform="capitalize"
                    >
                      {a.ability.name.replace(/-/g, " ")}
                      {a.is_hidden && (
                        <Badge colorPalette="orange" variant="subtle" fontSize="9px" px={1} borderRadius="sm">
                          Hidden
                        </Badge>
                      )}
                    </Flex>
                  ))}
                </Flex>
              </Box>
            </Box>

            <Box
              bg="white"
              borderWidth="1px"
              borderColor="gray.200"
              borderRadius="lg"
              p={5}
              display="flex"
              flexDirection="column"
              gap={4}
            >
              <Flex justify="space-between" align="center" pb={3} borderBottomWidth="1px" borderColor="gray.100">
                <Heading as="h2" size="sm" fontWeight="bold" color="gray.800">
                  Base Stats
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  Total: <Text as="span" fontWeight="bold" color="red.600">{totalStats}</Text>
                </Text>
              </Flex>

              <Flex direction="column" gap={3} py={1} flex={1} justify="center">
                {pokemon.stats.map((s) => {
                  const label = statNames[s.stat.name as keyof typeof statNames] || s.stat.name;
                  const percentage = Math.min(100, Math.round((s.base_stat / 150) * 100));

                  return (
                    <Flex key={s.stat.name} align="center" gap={3}>
                      <Text w="65px" fontSize="xs" color="gray.600">
                        {label}
                      </Text>
                      <Text w="28px" textAlign="right" fontSize="xs" fontWeight="bold" color="gray.800">
                        {s.base_stat}
                      </Text>
                      <Box flex={1} h="8px" bg="gray.100" borderRadius="md" overflow="hidden">
                        <Box
                          h="full"
                          bg="red.500"
                          borderRadius="md"
                          style={{ width: `${percentage}%` }}
                        />
                      </Box>
                    </Flex>
                  );
                })}
              </Flex>
            </Box>
          </SimpleGrid>

          <Box bg="white" borderWidth="1px" borderColor="gray.200" borderRadius="lg" p={5}>
            <Flex justify="space-between" align="center" pb={3} borderBottomWidth="1px" borderColor="gray.100" mb={4}>
              <Heading as="h2" size="sm" fontWeight="bold" color="gray.800">
                Moves
              </Heading>
              <Badge colorPalette="red" variant="subtle" fontSize="xs" px={2} py={0.5} borderRadius="md">
                {pokemon.moves.length} moves
              </Badge>
            </Flex>

            <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} gap={2}>
              {pokemon.moves.map((m) => {
                const moveName = m.move.name.replace(/-/g, " ");
                return (
                  <Box
                    key={m.move.name}
                    px={2.5}
                    py={1.5}
                    borderRadius="md"
                    bg="gray.50"
                    borderWidth="1px"
                    borderColor="gray.100"
                    fontSize="xs"
                    color="gray.700"
                    textTransform="capitalize"
                    textAlign="center"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    title={moveName}
                  >
                    {moveName}
                  </Box>
                );
              })}
            </SimpleGrid>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

