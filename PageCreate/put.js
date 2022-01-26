function putPokemon(id, pokemon){
    const putUrl = url + '/' + id
    let requisicao = fetch(putUrl, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(pokemon)
    })

    requisicao.then(function(resposta){
        if(resposta.status == 200){
            getPokemonLista()
        }
    })
}


function createPokemonEditor(pokemon, count){

    let div = document.createElement('div')
    let inputNome = document.createElement('input')
    let inputHabilidade = document.createElement('input')
    let inputPeso = document.createElement('input')
    let inputTipo = document.createElement('input')
    let inputImg = document.createElement('input')
    let buttonEdit = document.createElement('input')


    div.appendChild(inputNome)
    div.appendChild(inputHabilidade)
    div.appendChild(inputPeso)   
    div.appendChild(inputTipo)
    div.appendChild(inputImg)
    div.appendChild(buttonEdit)


    inputNome.type = "text"
    inputNome.value = pokemon.nome
    inputHabilidade.type = "text"
    inputHabilidade.value = pokemon.habilidade
    inputPeso.type = "text"
    inputPeso.value = pokemon.peso
    inputTipo.type = "text"
    inputTipo.value = pokemon.tipo
    inputImg.type = "text"
    inputImg.value = pokemon.img
    buttonEdit.type = "button"
    buttonEdit.value = "Salvar"
    


    buttonEdit.addEventListener('click', function(){
        let pokemonEditado = {
            nome: inputNome.value,
            habilidade: inputHabilidade.value,
            peso: inputPeso.value,
            tipo: inputTipo.value,
            img: inputImg.value
        }

        putPokemon(count, pokemonEditado)
    })

    return div
}