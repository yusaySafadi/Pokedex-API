const colours = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
};
const mainTypes = Object.keys(colours)
let index = 6;
const pokemonImage = document.querySelector(".pokedex__pokemon-image")
const pokedexTitle = document.querySelector(".pokedex__title")
const prevBtn = document.querySelector(".js-prevBtn")
const nextBtn = document.querySelector(".js-nextBtn")
const body = document.querySelector("body")

const hamburgerMenu = document.querySelector(".hamburger-menu")
const sidenav = document.querySelector(".sidenav")

hamburgerMenu.addEventListener("click", e => {
    sidenav.classList.toggle("sidenav--active")
    
})

async function getInfo(id) {
    let pkmName;
    let image;
    let color;
    let type;
    result = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    data = await result.json();
    console.log(data)
    pkmName = data.name;
    image = data.sprites.versions["generation-v"]["black-white"].animated.front_default;
    const pokeTypes = data.types.map(el => el.type.name);
    type = mainTypes.filter(type => pokeTypes.indexOf(type) > -1)
    console.log(type)
    pokedexTitle.textContent = `#${data.id.toString().padStart(3, '0')} ${pkmName}`;
    pokemonImage.src = image
    if (type.length == 2) {
        color1 = colours[type[0]]
        color2 = colours[type[1]]
        body.style.backgroundImage = "linear-gradient(to right," + color1 + ", " + color2 + ")";
    } else {
        color = colours[type]
        body.style.backgroundImage = "linear-gradient(to right," + color + ", " + "#FFFFFF" + ")";
    }


    console.log(color)
}
async function sidenavLoad(){
    let content=""
    for( let i  = 1; i<=500; i++){
        let result = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        pokemon = await result.json();
        pokemonIcon = pokemon.sprites.versions["generation-vii"].icons.front_default;
        content+=`<div class="sidenav__list-item" data-id=${pokemon.id}>
                                <img src=${pokemonIcon}>${pokemon.name}</div>`
    }
    
    sidenav.innerHTML=content
}
function init() {
    sidenavLoad()
    getInfo(index)
}
document.onload = init()

nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    index += 1;
    getInfo(index)
})
prevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    index -= 1;
    if (index <= 0) {
        index = 1
    }
    getInfo(index)
})
document.addEventListener('click', e=>{
    
    if(e.target.classList[0]=="sidenav__list-item"){
        index = Number(e.target.dataset.id)
        getInfo(index)
        console.log(index)
    }
})