const url = 'https://projetofinal-ppw.herokuapp.com/api/117544'
let usuarios = [

]
const listaPokemonHTML = document.querySelector("#listaPokemon")
const formPokemonHTML = document.querySelector("#formPokemon")

formPokemonHTML.addEventListener('submit', function (evento) {
    evento.preventDefault()
    let inputNome = document.querySelector("#nome")
    let inputHabilidade = document.querySelector("#habilidade")
    let inputPeso = document.querySelector("#peso")
    let inputTipo = document.querySelector("#tipo")
    let inputImg = document.querySelector("#img")


    let pokemon = {
        nome: inputNome.value,
        habilidade: inputHabilidade.value,
        peso: inputPeso.value,
        tipo: inputTipo.value,
        img: inputImg.value
    }
    if(pokemon.nome != "" && pokemon.habilidade !="" && pokemon.peso !="" && pokemon.tipo !="" && pokemon.img !=""){
        postPokemon(pokemon)
    } else{
        alert("Preencha todos os campos")
    }

    inputNome.value = ""
    inputHabilidade.value = ""
    inputPeso.value = ""
    inputTipo.value = ""
    inputImg.value = ""
})

function postPokemon(pokemon) {
    let requisicao = fetch(url, {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(pokemon)
    })

    requisicao.then(function (resposta) {
        if (resposta.status == 200) {
            getPokemonLista()
        }
    })
}

function getPokemonLista() {
    let requisicao = fetch(url)
    requisicao.then(function (resposta) {
        resposta.json().then(function (vetorPokemons) {
            pokemons = vetorPokemons
            atualizarLista()
        })
    })
}

function imprimirPokemon(pokemon, count) {
    let div = document.createElement("div")
    let div2 = document.createElement("div")
    let div3 = document.createElement("div")
    let div4 = document.createElement("div")
    let botaoDeletar = document.createElement("input")
    let botaoEditar = document.createElement("input")
    let img = document.createElement("img");
    let hab = document.createElement("h2");
    let pes = document.createElement("h2");
    let tip = document.createElement("h2");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    let p3 = document.createElement("p");
    let p4 = document.createElement("p");

    botaoDeletar.type = "button"
    botaoDeletar.value = "Deletar"

    botaoDeletar.onclick = function () {
        if(confirm("Deseja realmente excluir o pokemon " + pokemon.nome + "?")){
        deletePokemon(count)
        }
    }


    botaoEditar.type = "button"
    botaoEditar.value = "Editar"
    botaoEditar.addEventListener('click', function () {
        let form = createPokemonEditor(pokemon, count)
        div.appendChild(form)
    })
    img.src = pokemon.img;
    hab.textContent = "Habilidades"
    pes.textContent = "Peso"
    tip.textContent = "Tipo"
    p1.textContent = pokemon.nome
    p2.textContent = pokemon.habilidade
    p3.textContent = pokemon.peso
    p4.textContent = pokemon.tipo
    div.className = "pokeCreate"
    div.id = "PokeCreateId-" + count
    div.appendChild(p1)
    div.appendChild(img)
    div2.appendChild(hab)
    div2.appendChild(p2)
    div3.appendChild(pes)
    div3.appendChild(p3)
    div4.appendChild(tip)
    div4.appendChild(p4)
    div.appendChild(div2)
    div.appendChild(div3)
    div.appendChild(div4)
    div.appendChild(botaoDeletar)
    div.appendChild(botaoEditar)
    listaPokemonHTML.appendChild(div)
}

function atualizarLista() {
    let count = 0

    listaPokemonHTML.innerHTML = ""

    for (let pokemon of pokemons) {
        imprimirPokemon(pokemon, count)
        count++;
    }
}

getPokemonLista()