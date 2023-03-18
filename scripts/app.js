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

// Variables for nav links and modal buttons

const body = $("body")
const menuButton = $(".btn-menu")
const navModal = $(".nav")
const aboutModal = $(".about")
const legendModal = $(".legend")
const creditsModal = $(".credits")
const aboutLink = $(".nav-about")
const legendLink = $(".nav-legend")
const creditsLink = $(".nav-credits")
const btnBackNav = $(".btn-back-nav")
const btnBackAbout = $(".btn-back-about")
const btnBackLegend = $(".btn-back-legend")
const btnBackCredits = $(".btn-back-credits")



// Main menu button
menuButton.click(function () {
    menuButton.addClass("disappear");
    navModal.removeClass("hide")
    body[0].style.overflow = "hidden"
})

// Nav menu back button 
btnBackNav.click(function () {
    navModal.addClass("hide")
    menuButton.removeClass("disappear")
    body[0].style.overflow = ""

})

// 'About' Modal
aboutLink.click(function () {
    navModal.addClass("hide");
    aboutModal.removeClass("hide")

    // Sparkle Effect for example images
    // appears when 'about' link on nav is clicked

    const exampleBg = $(".ex-bg")

    exampleBg.sparkle({
        color: "rainbow",
        count: 20,
        speed: 3,
        minSize: 4,
        overlap: -3,
    });

    exampleBg.trigger("start.sparkle")
    exampleBg.off("mouseover.sparkle")
    exampleBg.off("mouseout.sparkle")

    const exampleImg = $(".ex-img")

    exampleImg.sparkle({
        color: "#FFFFFF",
        count: 5,
        speed: 2,
        minSize: 5,
        direction: "up",
    });

    exampleImg.trigger("start.sparkle")
    exampleImg.off("mouseover.sparkle")
    exampleImg.off("mouseout.sparkle")

    let timer;
    $(window).on("resize", function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            exampleBg.trigger("resize.sparkle");
            exampleImg.trigger("resize.sparkle");
        }, 100);
    });

})

// 'About modal back button
// removes canvas' element created by sparkle effect
btnBackAbout.click(function () {
    aboutModal.addClass("hide");
    navModal.removeClass("hide")

    $(".ex-bg > .sparkle-canvas").remove()
    $(".ex-shiny > .sparkle-canvas").remove()


})

// 'Legend' Modal
legendLink.click(function () {
    navModal.addClass("hide");
    legendModal.removeClass("hide")
})

// 'Legend' modal back button 
btnBackLegend.click(function () {
    legendModal.addClass("hide");
    navModal.removeClass("hide")
})

// 'Credits' Modal
creditsLink.click(function () {
    navModal.addClass("hide");
    creditsModal.removeClass("hide")
})

// 'Credits' Modal back button
btnBackCredits.click(function () {
    creditsModal.addClass("hide");
    navModal.removeClass("hide")
})


// Loop to populate type icons in 'Legend' modal
const pkmnTypes = ["normal", "fire", "fighting", "water", "flying", "grass", "poison", "electric", "ground", "psychic", "rock", "ice", "bug", "dragon", "ghost", "dark", "steel", "fairy"]

const symbolCtnr = $(".types")

pkmnTypes.forEach(type => {

    symbolCtnr.append(`
    <div class="modal-legend-text-box-symbols-type">
        <div class="modal-legend-text-box-symbols-type-icon">
        <img src="./assets/pkmn-icons/pkmn-type-icons/${type}.svg" alt="A ${type}-type icon."
            class="modal-legend-text-box-symbols-type-icon__img bg-${type}">
    </div>
    <p class="modal-legend-text-box-symbols-type-text">${type}</p>
</div>
    `);

})



const app = {};

// First API Call to retrieve Random Pokemon
app.getPkmn = function () {
    const natDexRndm = chance.natural({ min: 1, max: 151 });
    $.ajax({

        url: `https://pokeapi.co/api/v2/pokemon/${natDexRndm}`,
        // url: `https://pokeapi.co/api/v2/pokemon/ditto`,
        dataType: "json",

        success: function (response) {
            app.addCardData(response)
        }
    });
}

app.addCardData = (response) => {

    // Add Pokemon Name
    const pkmnName = response.name
    $(".pkmn-card-name").text(pkmnName)

    // Add Pokemon Type Icons and BG
    const pkmnTypeList = response.types
    const pkmnTypeMain = response.types[0].type.name

    // Loop to catch multiple pokemon types and display them
    $(".pkmn-card-type").remove();

    for (let i = 0; i < pkmnTypeList.length; i++) {

        const pkmnType = pkmnTypeList[i].type.name

        $(".pkmn-card-icon-box").append(`
        <div class="pkmn-card-type">
        <div class="pkmn-card-type-ctnr">
        <img src="./assets/pkmn-icons/pkmn-type-icons/${pkmnType}.svg" alt="Pokemon type icon for ${pkmnType}"
        class="pkmn-card-type-icon bg-${pkmnType}">
        </div>
        </div>
        `);
    }

    //Changes gradient backround for pokemon based on primary type

    const cardBg = $(".pkmn-card > div:first");

    cardBg.removeClass()


    // Check for rarity (holo background)
    const holoCheck = chance.natural({ min: 1, max: 100 })

    // Adds sparkle background if between 1 - 24
    if (holoCheck <= 24 && holoCheck >= 1) {
        $(".sparkle-canvas").remove()
        cardBg.addClass(`pkmn-card-top bg-holo`)
        $(".holo").addClass("shimmer")

        cardBg.sparkle({
            color: "rainbow",
            count: 89,
            speed: 3,
            minSize: 8,
        });

        cardBg.trigger("start.sparkle")
        cardBg.off("mouseover.sparkle")
        cardBg.off("mouseout.sparkle")

        let timer;
        $(window).on("resize", function () {
            clearTimeout(timer);
            timer = setTimeout(function () {
                cardBg.trigger("resize.sparkle");
            }, 100);
        });

        // Adds regular backround otherwise
    } else {
        $(".sparkle-canvas").remove()
        cardBg.addClass(`pkmn-card-top bg-${pkmnTypeMain}-gradient`);
        $(".holo").removeClass("shimmer")

    }

    // Check for rarity (shiny pokemon)

    const shinyCheck = chance.natural({ min: 1, max: 100 })
    const pkmnSprite = $(".pkmn-card-image__img")
    const pkmnSpriteCtnr = $(".pkmn-card-image")

    // Adds white sparkles on Pokemon image if between 1 - 23
    if (shinyCheck <= 23 && shinyCheck >= 1) {
        const shinyImage = response.sprites.other["official-artwork"].front_shiny

        pkmnSprite.attr("src", shinyImage);
        pkmnSprite.attr("alt", `A shiny ${pkmnName} appeared!`)

        pkmnSpriteCtnr.sparkle({
            color: "#FFFFFF",
            count: 8,
            speed: 4,
            minSize: 15,
            direction: "up",
        });

        pkmnSpriteCtnr.trigger("start.sparkle")
        pkmnSpriteCtnr.off("mouseout.sparkle")
        cardBg.trigger("stop.sparkle")
        cardBg.off("mouseover.sparkle")
        cardBg.off("mouseout.sparkle")

        let timer;
        $(window).on("resize", function () {
            clearTimeout(timer);
            timer = setTimeout(function () {
                pkmnSpriteCtnr.trigger("resize.sparkle");
            }, 200);
        });

        if (holoCheck <= 24 && holoCheck >= 1) {
            cardBg.trigger("start.sparkle")
            cardBg.off("mouseover.sparkle")
            cardBg.off("mouseout.sparkle")
        } else {
            cardBg.trigger("stop.sparkle")
            cardBg.off("mouseover.sparkle")
        }

    } else {
        const pkmnImage = response.sprites.other["official-artwork"].front_default

        pkmnSprite.attr("src", pkmnImage);
        pkmnSprite.attr("alt", `A wild ${pkmnName} appeared!`)
        pkmnSpriteCtnr.trigger("stop.sparkle")
        pkmnSpriteCtnr.off("mouseover.sparkle")

        if (holoCheck <= 24 && holoCheck >= 1) {
            cardBg.trigger("start.sparkle")
            cardBg.off("mouseover.sparkle")
            cardBg.off("mouseout.sparkle")
        } else {
            cardBg.trigger("stop.sparkle")
            cardBg.off("mouseover.sparkle")
        }
    }

    // Update Stats
    // Calculations round base values to nearest 10 

    const statsHP = Math.round((response.stats[0].base_stat / 10) * 1.5) * 10
    const statsAttack = Math.round(((response.stats[1].base_stat + response.stats[3].base_stat) / 2) / 10) * 10
    const statsDefense = Math.round(((response.stats[2].base_stat + response.stats[4].base_stat) / 2) / 10) * 10
    const statsSpeed = Math.round((response.stats[5].base_stat / 10)) * 10

    $(".stats-box-value-hp").text(statsHP)
    $(".stats-box-value-attack").text(statsAttack)
    $(".stats-box-value-defense").text(statsDefense)
    $(".stats-box-value-speed").text(statsSpeed)

    // Update Moves

    const moveList = response.moves

    // Check for pokemon with only one move first
    if (moveList.length === 1) {

        const onlyMove = moveList[0].move.name

        $.ajax({
            url: `https://pokeapi.co/api/v2/move/${onlyMove}`,
            dataType: "json",
            success: function (response) {

                const onlyMoveName = response.name
                const onlyMoveType = response.type.name
                const onlyMoveClass = response.damage_class.name
                const onlyMovePower = response.power
                const onlyMoveDesc = response.flavor_text_entries

                // Updating the first move slot
                $(".move-info__name-primary").text(`${onlyMoveName}`)
                $(".move-info__type-primary").text(`Type: ${onlyMoveType}`)

                // Retreiving the correct description from the array
                for (let i = 0; i < onlyMoveDesc.length; i++) {
                    if (onlyMoveDesc[i].language.name === "en" && onlyMoveDesc[i].version_group.name === "black-white") {
                        $(".move-info__desc-primary").text(`${onlyMoveDesc[i].flavor_text}`)
                    }
                }

                // Updating first move side panel
                $(".move-side-class-icon__img-primary").attr("src", `./assets/pkmn-icons/pkmn-vitals-icons/${onlyMoveClass}.png`);

                if (onlyMovePower === null) {
                    $(".move-side-power-value-primary").text("---")
                } else {
                    $(".move-side-power-value-primary").text(`${Math.round(onlyMovePower / 10) * 10}`)
                }

                // Leave second move as blank
                $(".move-info__name-secondary").text("---")
                $(".move-info__type-secondary").text("Type: ---")
                $(".move-info__desc-secondary").text("---")
                $(".move-side-class-icon__img-secondary").attr("src", "./assets/pkmn-icons/pkmn-vitals-icons/question.png")
                $(".move-side-power-value-secondary").text("---")

            }
        });

    } else {

        // Chance creates array with 2 random numbers between range
        // Numbers used as index values for move list
        const chosenMovesIndex = chance.unique(chance.natural, 2, { min: 0, max: (moveList.length) - 1 })
        const move1 = moveList[chosenMovesIndex[0]].move.name
        const move2 = moveList[chosenMovesIndex[1]].move.name

        // Second API call to moves endpoint to retrive
        // move specific data (1st move)

        $.ajax({

            url: `https://pokeapi.co/api/v2/move/${move1}`,
            dataType: "json",
            success: function (response) {

                const moveType1 = response.type.name
                const moveName1 = response.name
                const moveClass1 = response.damage_class.name
                const movePower1 = response.power
                const moveDesc1 = response.flavor_text_entries

                // Updating the first move slot
                $(".move-info__name-primary").text(`${moveName1}`)
                $(".move-info__type-primary").text(`Type: ${moveType1}`)


                // Retreiving the correct description from the array
                // Loops through all move descriptions from different
                // game versions
                for (let i = 0; i < moveDesc1.length; i++) {
                    if (moveDesc1[i].language.name === "en" && moveDesc1[i].version_group.name === "black-white") {
                        $(".move-info__desc-primary").text(`${moveDesc1[i].flavor_text}`)
                    }
                }

                // Updating Class Icon
                $(".move-side-class-icon__img-primary").attr("src", `./assets/pkmn-icons/pkmn-vitals-icons/${moveClass1}.png`);

                // Updating Power
                if (movePower1 === null) {
                    $(".move-side-power-value-primary").text("---")
                } else {
                    $(".move-side-power-value-primary").text(`${Math.round(movePower1 / 10) * 10}`)
                }

            }
        });

        // Third API call to moves endpoint to retrive
        // move specific data (2nd move)
        $.ajax({

            url: `https://pokeapi.co/api/v2/move/${move2}`,
            dataType: "json",
            success: function (response) {

                const moveType2 = response.type.name
                const moveName2 = response.name
                const moveClass2 = response.damage_class.name
                const movePower2 = response.power
                const moveDesc2 = response.flavor_text_entries

                // Updating the second move slot
                $(".move-info__name-secondary").text(`${moveName2}`)
                $(".move-info__type-secondary").text(`Type: ${moveType2}`)


                // Retreiving the correct description from the array
                // Loops through all move descriptions from different
                // game versions
                for (let i = 0; i < moveDesc2.length; i++) {
                    if (moveDesc2[i].language.name === "en" && moveDesc2[i].version_group.name === "black-white") {
                        $(".move-info__desc-secondary").text(`${moveDesc2[i].flavor_text}`)
                    }
                }

                // Updating Class Icon
                $(".move-side-class-icon__img-secondary").attr("src", `./assets/pkmn-icons/pkmn-vitals-icons/${moveClass2}.png`);

                // Updating Power
                if (movePower2 === null) {
                    $(".move-side-power-value-secondary").text("---")
                } else {
                    $(".move-side-power-value-secondary").text(`${Math.round(movePower2 / 10) * 10}`)
                }

            }
        });

    }

}



app.init = () => {
    $(".btn-new-card").click(function () {
        app.getPkmn();
    });
};

$(function () {
    app.init()
})

