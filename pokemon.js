
/*async function getPokemonData(url) {
  const response = await fetch('http://example.com/movies.json')
  return await response.json()
}*/

// https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/677.png

class Pokemon {
  constructor(id, name) {
    this.id = id
    this.name = name
  }
}

const Thoremon = new Pokemon(900, 'Thoremon')

const newButton = document.querySelector('#newPokemon')
newButton.addEventListener('click', function() {
  let pokeId = prompt("Please enter a pokemon ID")
  console.log(typeof pokeId)
  if (pokeId > 0 && pokeId <= 807) {
    getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
      .then(result => {
        populateDOM(result)
      })
} else {
    alert('There are no Pokemon with that ID. Choose another one')
}
})


async function getAPIData(url) {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

// now, use the returned async data
const theData = getAPIData('https://pokeapi.co/api/v2/pokemon?limit=30/').then(data => {
  for (const pokemon of data.results) {
    getAPIData(pokemon.url).then(pokedata => {
        populateDOM(pokedata)
    })
  }
})

let mainArea = document.querySelector('main')

function populateDOM(single_pokemon) {
  let pokeScene = document.createElement('div')
  let pokeCard = document.createElement('div')
  let pokeFront = document.createElement('div')
  let pokeBack = document.createElement('div')

  fillCardFront(pokeFront, single_pokemon)
  fillCardBack(pokeBack, single_pokemon)

  pokeScene.setAttribute('class', 'scene')
  pokeCard.setAttribute('class', 'card')
  
  pokeCard.appendChild(pokeFront)
  pokeCard.appendChild(pokeBack)
  pokeScene.appendChild(pokeCard)

  mainArea.appendChild(pokeScene)

  pokeCard.addEventListener('click', function () {
    pokeCard.classList.toggle('is-flipped');
  });
}

//Front of Card
function fillCardFront(pokeFront, data) {
  pokeFront.setAttribute('class', 'card_face card_face--front')
  let name = document.createElement('h1')
  let pic = document.createElement('img')
  let pokeNum = getPokeNumber(data.id)

  name.textContent = `${data.name}`
  pokeFront.appendChild(name)
  pokeFront.appendChild(pic)

  pic.setAttribute('class', 'picDivs')
  pic.src = `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokeNum}.png`
  
}

//Back of Card
function fillCardBack(pokeBack, data) {
  pokeBack.setAttribute('class', 'card__face card__face--back')
  let pokeOrder = document.createElement('p')
  let type = document.createElement('p')
  let weight = document.createElement('p')
  let height = document.createElement('p')

  pokeOrder.textContent = `#${data.id}`
  type.textContent = ` type: ${data.types[0].type.name}`
  weight.textContent = `weight: ${data.weight}`
  height.textContent = `height: ${data.height}`

  pokeBack.appendChild(pokeOrder)
  pokeBack.appendChild(type)
  pokeBack.appendChild(weight)
  pokeBack.appendChild(height)
}

function getPokeNumber(id) {
  if (id < 10) return `00${id}`
  if (id > 9 && id < 100) {
    return `0${id}`
  } else return id
}

