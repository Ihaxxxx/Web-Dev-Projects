let pokemonName;
let abilities;

function addImage(pokemonId) {
    document.querySelector(".imageBox").innerHTML = `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png" alt="" srcset="">`
}


async function pokemonFetcher(pokemonName) {
    let url = "https://pokeapi.co/api/v2/pokemon/"+pokemonName
    let data = await fetch(url)
    let response = await data.json()
    let pokemonId = response.id;
    let abilities = response.abilities.map(abilityInfo => abilityInfo.ability.name);
    // console.log(abilities);
    addImage(pokemonId)
    abilitiesImporter(abilities)

}

function abilitiesImporter(abilities) {  
    console.log(abilities);
    let value = ""
    document.querySelector(".heading").innerHTML = '<h2>Abilities</h2>'
    for (let index = 0; index < abilities.length; index++) {
        const element = abilities[index];
        value += `<li>${element}</li>`
    }
    console.log(value);
    document.getElementById("AbilityList").innerHTML = value
}

function inputValue() {
    document.querySelector(".searchBtn").addEventListener("click", () => {
        pokemonName = document.getElementById("data").value.toLowerCase()
        // console.log(pokemonName);
        pokemonFetcher(pokemonName)
    })
}


inputValue()

// pokemonFetcher()