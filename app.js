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


const menuButton = $(".btn-menu")
const navModal = $(".nav")
const aboutModal = $(".about")
const aboutLink = $(".nav-about")
const btnBackNav = $(".btn-back-nav")
const btnBackAbout = $(".btn-back-about")



menuButton.click(function () {
    navModal.removeClass("hide")
    menuButton.addClass("disappear");
})

btnBackNav.click(function () {
    navModal.addClass("hide")
    menuButton.removeClass("disappear")

})

aboutLink.click(function () {
    navModal.addClass("hide");
    aboutModal.removeClass("hide")

    // Sparkle Effect for example images

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

btnBackAbout.click(function () {
    aboutModal.addClass("hide");
    navModal.removeClass("hide")

    $(".ex-bg > .sparkle-canvas").remove()

})




// .hasClass() for when it's time to target modals


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
        <img src="./assets/pkmn-type-icons/${pkmnType}.svg" alt="Pokemon type icon for ${pkmnType}"
        class="pkmn-card-type-icon bg-${pkmnType}">
        </div>
        </div>
        `);
    }

    //Changes gradient backround for pokemon based on primary type

    const cardBg = $(".pkmn-card > div:first");

    cardBg.removeClass()


    // Check for rarity
    const holoCheck = chance.natural({ min: 1, max: 100 })
    console.log("Holo Check:", holoCheck)

    if (holoCheck <= 47 && holoCheck >= 24) {
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

    } else {
        $(".sparkle-canvas").remove()
        cardBg.addClass(`pkmn-card-top bg-${pkmnTypeMain}-gradient`);
        $(".holo").removeClass("shimmer")

    }

    // Change Card Image

    const shinyCheck = chance.natural({ min: 1, max: 100 })
    const pkmnSprite = $(".pkmn-card-image__img")
    const pkmnSpriteCtnr = $(".pkmn-card-image")
    console.log("Shiny Check:", shinyCheck)

    if (shinyCheck <= 70 && shinyCheck >= 48) {
        const shinyImage = response.sprites.other["official-artwork"].front_shiny

        pkmnSprite.attr("src", shinyImage);

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

        if (holoCheck <= 47 && holoCheck >= 24) {
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
        pkmnSpriteCtnr.trigger("stop.sparkle")
        pkmnSpriteCtnr.off("mouseover.sparkle")

        if (holoCheck <= 47 && holoCheck >= 24) {
            cardBg.trigger("start.sparkle")
            cardBg.off("mouseover.sparkle")
            cardBg.off("mouseout.sparkle")
        } else {
            cardBg.trigger("stop.sparkle")
            cardBg.off("mouseover.sparkle")
        }
    }

    // Update Stats
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

                $(".move-side-class-icon__img-primary").attr("src", `./assets/pkmn-vitals-icons/${onlyMoveClass}.png`);

                if (onlyMovePower === null) {
                    $(".move-side-power-value-primary").text("---")
                } else {
                    $(".move-side-power-value-primary").text(`${Math.round(onlyMovePower / 10) * 10}`)
                }

                $(".move-info__name-secondary").text("---")
                $(".move-info__type-secondary").text("Type: ---")
                $(".move-info__desc-secondary").text("---")
                $(".move-side-class-icon__img-secondary").attr("src", "./assets/pkmn-vitals-icons/question.png")
                $(".move-side-power-value-secondary").text("---")

            }
        });

    } else {

        const chosenMovesIndex = chance.unique(chance.natural, 2, { min: 0, max: (moveList.length) - 1 })
        const move1 = moveList[chosenMovesIndex[0]].move.name
        const move2 = moveList[chosenMovesIndex[1]].move.name



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
                for (let i = 0; i < moveDesc1.length; i++) {
                    if (moveDesc1[i].language.name === "en" && moveDesc1[i].version_group.name === "black-white") {
                        $(".move-info__desc-primary").text(`${moveDesc1[i].flavor_text}`)
                    }
                }

                // Updating Class Icon
                $(".move-side-class-icon__img-primary").attr("src", `./assets/pkmn-vitals-icons/${moveClass1}.png`);

                // Updating Power
                if (movePower1 === null) {
                    $(".move-side-power-value-primary").text("---")
                } else {
                    $(".move-side-power-value-primary").text(`${Math.round(movePower1 / 10) * 10}`)
                }

            }
        });

        $.ajax({

            url: `https://pokeapi.co/api/v2/move/${move2}`,
            dataType: "json",
            success: function (response) {

                const moveType2 = response.type.name
                const moveName2 = response.name
                const moveClass2 = response.damage_class.name
                const movePower2 = response.power
                const moveDesc2 = response.flavor_text_entries

                // Updating the first move slot
                $(".move-info__name-secondary").text(`${moveName2}`)
                $(".move-info__type-secondary").text(`Type: ${moveType2}`)


                // Retreiving the correct description from the array
                for (let i = 0; i < moveDesc2.length; i++) {
                    if (moveDesc2[i].language.name === "en" && moveDesc2[i].version_group.name === "black-white") {
                        $(".move-info__desc-secondary").text(`${moveDesc2[i].flavor_text}`)
                    }
                }

                // Updating Class Icon
                $(".move-side-class-icon__img-secondary").attr("src", `./assets/pkmn-vitals-icons/${moveClass2}.png`);

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

