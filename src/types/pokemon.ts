export interface PokemonListItem {
    id: number;
    name: string;
    image: string;
}

export interface PokemonDetail {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
        front_default: string | null;
        other?: {
            "official-artwork"?: {
                front_default: string | null;
            };
        };
    };
    types: { type: { name: string } }[];
    stats: { base_stat: number; stat: { name: string } }[];
    abilities: { ability: { name: string }; is_hidden?: boolean }[];
    moves: { move: { name: string } }[];
}
