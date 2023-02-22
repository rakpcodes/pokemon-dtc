/*
- Make successful API call for pokemon list
- Create function to select random pokemon index from list
- Make 2nd call to pokemon endpoint using name as string param
- Gather the following data:
    - name
    - sprites.other.official-artwork.front_default
    - stats
        - HP = stats[0].base_stat * 1.5 rounded to nearest 10 
        - Attack = stats[1].base_stat + stats[3].base_stat / rounded to nearest 10
        - Defense = stats[2].base_stat + stats[4].base_stat / rounded to nearest 10
        - Speed = stats[5].base_stat rounded to nearest 10
    - types
        - Main = types[0].type.name
        - Second = types[1].type.name
    -moves
        - moves[rndm] * 4 (conditionals to see if there are less than 4 available)
        - chance.js for picking 4 random unique indexes

- Create function to update html on page

*/



const app = {};
const natDexRndm = Math.floor(Math.random() * 252);


// First API Call to retrieve Random Pokemon
app.getPkmn = function () {

    $.ajax({

        url: "https://pokeapi.co/api/v2/pokemon",
        data: {
            limit: "251",
        },
        dataType: "json",

        success: function (response) {
            console.log(response.results[natDexRndm].name)
            app.getPkmnInfo(response.results[natDexRndm].name)
        }
    });
}

// Second API Call to retrieve Pokmon Information
app.getPkmnInfo = function (pkmnName) {

    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${pkmnName}`,
        dataType: "json",

        success: function (response) {
            console.log(response)
        }
    });
}


app.init = () => {
    app.getPkmn();
};

$(function () {
    app.init()
})

