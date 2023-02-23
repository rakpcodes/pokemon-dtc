/*
- Create function to select random pokemon based on ID
- Make successful API call for for pokemon data
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
const natDexRndm = chance.natural({ min: 1, max: 251 });

// const natDexRndm = Math.floor((Math.random() * 251) + 1)




// First API Call to retrieve Random Pokemon
app.getPkmn = function () {

    $.ajax({

        url: `https://pokeapi.co/api/v2/pokemon/${natDexRndm}`,
        data: {
            limit: "251",
        },
        dataType: "json",

        success: function (response) {
            console.log(response)
            // app.addName(response)
        }
    });
}





// app.addName = (response) => {
//     const pkmnName = response.name

//     $(".pkmn-card-name").text(pkmnName)

// }



app.init = () => {
    app.getPkmn();
};

$(function () {
    app.init()
})

