function deletePokemon(id){
    const delete_url = url + '/' + id
    let requisicao = fetch(delete_url, {
        method: 'DELETE'
    })
    requisicao.then(function(resposta){
        if(resposta.status == 200){
            alert("Pokémon Excluído")
            getPokemonLista()
        }
    })
}