const STORAGE_KEY = "shinyState";

const listElement = document.getElementById("pokemon-list");
const searchInput = document.getElementById("search");
const shinyState = JSON.parse(localStorage.getItem("shinyState")) || {};

let allPokemon = [];

async function loadPokemon(){
    const response = await fetch("pokemon.json");
    if (!response.ok) {
        throw new Error(`Failed to load pokemon.json: ${response.status}`);
    }
    return response.json();
}

function render(pokemon) {
    listElement.innerHTML = "";

    for (const p of pokemon) {
        const li = document.createElement("li");

        const img = document.createElement("img");
        img.src = p.shinySprite;
        img.alt = p.name;
        img.width = 64;
        img.height = 64;
        img.loading = "lazy";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = shinyState[p.key] || false;

        checkbox.addEventListener("change", () => {
            shinyState[p.key] = checkbox.checked;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(shinyState));
        });

        li.appendChild(checkbox);
        li.appendChild(img);
        li.append(" " + p.name);
        listElement.appendChild(li);
    }
}

function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();
    const filtered = query
        ? allPokemon.filter((p) => p.name.toLowerCase().includes(query))
        : allPokemon;
    render(filtered);
}

async function main () {
    try {
        allPokemon = await loadPokemon();
        render(allPokemon);
        searchInput.addEventListener("input", handleSearch);
    } catch (err) {
        console.error(err);
        listElement.textContent = "Failed to load Pokemon. Check the console.";
    }
}

main();