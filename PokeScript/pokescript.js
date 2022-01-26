
const URL = "https://pokeapi.co/api/v2/pokemon?limit=898&offset=0"
let requisicao = fetch(URL)

requisicao.then(function (resposta) {
    const tratamento = resposta.json()

    tratamento.then(function (dado) {
        x = 1;
        for (let pokemon of dado.results) {

            div = document.createElement("div");
            p = document.createElement("p");
            img = document.createElement("img");
            saveId = document.createElement("input");

            pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            if (pokemonName.includes('-')) {
                auxPokemonName = pokemonName.split('-')
                secondeName = auxPokemonName[1].charAt(0).toUpperCase() + auxPokemonName[1].slice(1);
                pokemonName = auxPokemonName[0] + " " + secondeName
            }
            p.textContent = pokemonName
            img.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + x + ".png"
            saveId.value = x;
            saveId.style.display = 'none';
            saveId.type = 'hidden';
            div.appendChild(p);
            div.appendChild(img);
            div.appendChild(saveId);
            div.className = "pokeInfo"
            div.onclick =  function() {
               showCard(this)
            };
            document.getElementById("pokeInformations").appendChild(div)
            x++;
        }
    })
    document.getElementById("loading").style.display = 'none';
})



function showCard(card,id){
    if(card!=null){
        console.log(id)
    pokeId = card.childNodes[2].value;
    } else{
        pokeId = id
    }

    const newUrl = "https://pokeapi.co/api/v2/pokemon/"+pokeId+"/";
    let requisicao2 = fetch(newUrl);
    requisicao2.then(function(resposta){
        const tratamento2 = resposta.json()
        tratamento2.then(function(dado2){
            document.getElementById("pokeCard").innerHTML = "";
            name2 = dado2.name
            auxTypes = []
            auxAbilities = []
            for(let getType of dado2.types){
                auxTypes.push(getType.type.name)
            }
            for(let getAbilities of dado2.abilities){
                auxAbilities.push(getAbilities.ability.name)
            }
            types = auxTypes.join(" | ");
            weight = dado2.weight
            pokeCard = document.getElementById("pokeCard");
            divSpritePoke = document.createElement("div");
            divAbilityPoke = document.createElement("div");
            divSpritePoke.className = "spritePoke";
            divAbilityPoke.className = "abilityPoke";
            gif = document.createElement("img");
            if (name2.includes('-')) {
                auxiliarName = name2.split('-')
                name2 = auxiliarName[0]  + auxiliarName[1];
                gif.src = "https://play.pokemonshowdown.com/sprites/ani/"+name2+".gif";
            } else {
                gif.src = "https://play.pokemonshowdown.com/sprites/ani/"+name2+".gif";
            }

            gif.id = "pokeGif"
            divSpritePoke.appendChild(gif);
            h1 = document.createElement("h1");
            h2 = document.createElement("h2");
            Hab = document.createElement("h3");
            pes = document.createElement("h3");
            tip = document.createElement("h3");
            buttonShiny = document.createElement("button")
            buttonShiny.id = "toggleShiny"
            buttonShiny.textContent = "Shiny"
            h1.textContent = name2.charAt(0).toUpperCase() + name2.slice(1);
            h1.style = "margin-bottom: 20px"
            Hab.textContent = "Habilidades";
            Hab.style = "margin-bottom: 5px; margin-top: 10px"
            pes.textContent = "Peso";
            pes.style = "margin-bottom: 5px; margin-top: 10px"
            tip.textContent = "Tipos";
            tip.style = "margin-bottom: 5px; margin-top: 10px"
            divAbilityPoke.appendChild(h1);
            divAbilityPoke.appendChild(Hab);
            for (i = 0; i < auxAbilities.length; i++) {
                pAbility = document.createElement("p")
                pAbility.textContent = auxAbilities[i]
                divAbilityPoke.appendChild(pAbility)
            }
            divAbilityPoke.appendChild(pes);
            peso = document.createElement("p");
            peso.textContent = weight;
            divAbilityPoke.appendChild(peso);
            pTypes = document.createElement("p");
            divAbilityPoke.appendChild(tip);
            pTypes.textContent = types;
            divAbilityPoke.appendChild(pTypes);
            divAbilityPoke.appendChild(buttonShiny)
            pokeCard.appendChild(divSpritePoke);
            pokeCard.appendChild(divAbilityPoke);
            document.getElementById("toggleShiny").onclick = function() {
                if(document.getElementById("pokeGif").src.includes("shiny")){
                    gif.src = "https://play.pokemonshowdown.com/sprites/ani/"+name2+".gif";
                    this.textContent = "Shiny"

                }else{
                    gif.src = "https://play.pokemonshowdown.com/sprites/ani-shiny/"+name2+".gif";
                    this.textContent = "Normal"
                }

            }
            window.open("#pokeCard", "_self");
        })
    })
}

