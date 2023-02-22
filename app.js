/*
- Make successful API call for pokemon list
- Create function to select random pokemon index from list
- Make 2nd call to pokemon endpoint using name as string param
- Gather and store stats, create functions to calculate rounded values for HP, Attack and Defense



*/

const natDexRndm = Math.floor(Math.random())



$.ajax({
    url: "https://pokeapi.co/api/v2/pokemon",
    data: {
        limit: "649",
    },
    dataType: "json",
    success: function (response) {

        console.log(response)
        const pkmnName = response.results[0].name

        $(".pkmn-card-name").text(pkmnName)

    }
});