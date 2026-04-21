const pokemon = [
    {id: 1, name: "Bulbasaur"},
    {id: 4, name: "Charmander"},
    {id: 7, name: "Squirtle"},
    {id: 25, name: "Pikachu"},
    {id: 133, name: "Eevee"},
    {id: 143, name: "Snorlax"},
    {id: 150, name: "Mewtwo"},
    {id: 151, name: "Mew"},
    {id: 196, name: "Espeon"},
    {id: 197, name: "Umbreon"},
    {id: 249, name: "Lugia"}, 
    {id: 250, name: "Ho-Oh"},
    {id: 384, name: "Rayquaza"},
    {id: 448, name: "Lucario"}, 
    {id: 493, name: "Arceus"}
];

const listElement = document.getElementById("pokemon-list");

const shinyState = JSON.parse(localStorage.getItem("shinyState")) || {};

for (const p of pokemon) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = shinyState[p.id] || false;

    checkbox.addEventListener("change", () => {
        shinyState[p.id] = checkbox.checked;
        localStorage.setItem("shinyState", JSON.stringify(shinyState));
    });

    li.appendChild(checkbox);
    li.append(" " + p.name);
    listElement.appendChild(li);
}