import { PokemonDetail, PokemonListItem } from "@/types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemonList(limit: number = 151): Promise<PokemonListItem[]> {
    try {
        const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=0`, {
            next: { revalidate: 86400 },
        });
        if (!res.ok) throw new Error("Failed to fetch Pokemon list");
        const data = await res.json();
        return data.results.map((item: { name: string; url: string }, index: number) => {
            const segments = item.url.split("/").filter(Boolean);
            const id = Number(segments[segments.length - 1]) || index + 1;
            return {
                id,
                name: item.name,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            };
        });
    } catch (error) {
        console.error("Error fetching Pokemon list:", error);
        return [];
    }
}

export async function getPokemonDetail(id: string | number): Promise<PokemonDetail | null> {
    try {
        const res = await fetch(`${BASE_URL}/pokemon/${id}`, {
            next: { revalidate: 86400 },
        });
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error(`Error fetching pokemon ${id}:`, error);
        return null;
    }
}