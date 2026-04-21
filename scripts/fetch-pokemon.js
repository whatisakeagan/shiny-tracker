//Fetches base species from PokeAPI and writes pokemon.json.
//Run with: node scripts/fetch-pokemon.js.
//Takes ~2-5 minutes because PokeAPI requires one request per Pokemon.

import {writeFile} from "node:fs/promises";

const TOTAL_POKEMON = 1025;
const OUTPUT_PATH = "pokemon.json";

async function fetchPokemon(id) {
    const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch Pokemon ${id}: ${response.status}`);
    }
    const data = await response.json ();

    return{
        key: data.name,
        dex: data.id,
        name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
        sprite: data.sprites.other.home.front_default,
        shinySprite: data.sprites.other.home.front_shiny,
    };
}

async function main() {
    console.log(`Fetching ${TOTAL_POKEMON} Pokemon from PokeAPI...`);
    const results = [];

    for (let id = 1; id <= TOTAL_POKEMON; id++) {
        try {
            const p = await fetchPokemon(id);
            results.push(p);
            if (id % 50 === 0) {
                console.log(` ... fetched ${id}/${TOTAL_POKEMON}`);
            }
        } catch (err) {
            console.error(`Error on id ${id}:`, err.message);
            // temporary debug:
            console.error(err);
          }
    }

    await writeFile(OUTPUT_PATH, JSON.stringify(results, null, 2));
    console.log(`Done. Wrote ${results.length} Pokemon to ${OUTPUT_PATH}.`);
}

main();