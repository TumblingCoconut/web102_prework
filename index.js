/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// CUSTOM: function that adds visual goal progress bar
function addProgressBar(game_card, fraction, total){
    const container = document.createElement('div');
    container.classList.add('progress-container');

    const bar = document.createElement('div');
    bar.classList.add('progress-bar');

    const percentage = (fraction/total) * 100;
    const correctedPercentage = Math.min(Math.max(percentage, 0), 100);
    console.log(correctedPercentage);
    bar.style.width = `${correctedPercentage}%`;

    const barText = document.createElement('span');
    barText.classList.add('progress-text');
    barText.textContent = `$ ${fraction} / ${total}`;

    
    container.appendChild(bar);
    container.appendChild(barText);
    game_card.appendChild(container);


    console.log('test');
}


// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (const key of games){
        // create a new div element, which will become the game card
        let game_card = document.createElement('div');

        // add the class game-card to the list
        game_card.classList.add('game-card');

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        game_card.innerHTML =`
                            <img class=game-img src=${key.img} width=300px >
                            <h3>${key.name}</h3>
                            <p>Description: ${key.description}</p>                
                            <p>Backers: ${key.backers}</p>
                            `;


        // append the game to the games-container
        addProgressBar(game_card, key.pledged, key.goal);

        let games_container = document.getElementById("games-container");
        games_container.appendChild(game_card);
    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const total_contributions = GAMES_JSON.reduce( (total, game) => {
    return total + game.backers;
}, 0).toLocaleString('en-US');

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `<p>${total_contributions}</p>`;


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const total_raised = GAMES_JSON.reduce( (money, game) => {
    return money + game.pledged;
}, 0).toLocaleString('en-US');

// set inner HTML using template literal
raisedCard.innerHTML = `<p>$${total_raised}</p>`;


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const total_games = GAMES_JSON.reduce( (games_number, game) => {
    return games_number + 1
}, 0).toLocaleString('en-US');

gamesCard.innerHTML = `<p>${total_games}</p>`;



/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    // setActive(e.currentTarget);
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const under_goal = GAMES_JSON.filter( (game) => {
        return game.pledged < game.goal;
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(under_goal);

}

// show only games that are fully funded
function filterFundedOnly() {
    // setActive(e.currentTarget);
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const met_goal = GAMES_JSON.filter( (game) => {
        return game.goal <= game.pledged;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(met_goal);
}

// show all games
function showAllGames() {
    // setActive(e.currentTarget);
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// CUSTOMIZE: button animation handler
function setActive(clickedBtn){
    // Button selection
    const buttons = document.querySelectorAll('#button-container button');
    buttons.forEach( button => {button.classList.remove('active')});
    
    if (clickedBtn == 'None'){
        return;
    }
    else{
        clickedBtn.target.classList.add('active');
    }

    // event handler
    switch (clickedBtn.target.id){
        case 'unfunded-btn':
            filterUnfundedOnly();
            break;
        case 'funded-btn':
            filterFundedOnly();
            break;
        case 'all-btn':
            showAllGames();
            break;
    }
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");


// add event listeners with the correct functions to each button
// setActive handles individual results
unfundedBtn.addEventListener("click", (event) => {setActive(event)});
fundedBtn.addEventListener("click", (event) => {setActive(event)});
allBtn.addEventListener("click", (event) => setActive(event));

// trigger all games filter, it should be default filter
allBtn.click();

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfunded_games = GAMES_JSON.reduce( (games_number, game) => {
    return game.pledged < game.goal ? games_number + 1 : games_number;  
}, 0);

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of $${total_raised} has been raised for ${total_games} games. \
Currently, ${unfunded_games} game${unfunded_games > 1 ? 's' : ''} remains unfunded. We need \
your help to fund these amazing games!`;         

// create a new DOM element containing the template string and append it to the description container
const displayStrElement = document.createElement('p');
displayStrElement.textContent = displayStr;
descriptionContainer.appendChild(displayStrElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// sort mutates array in place, so we make a copy
const GAMES_COPY = [...GAMES_JSON];
const sortedGames =  GAMES_COPY.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [first, second, ...rest] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
// Custom element function
function addTopGames(gameContainer, game){
    gameContainer.insertAdjacentHTML('beforeend',  `
                        <div id='top-card'>
                                <img src=${game.img} width=50%>
                                <div id='top-info'>
                                <h3>${game.name}</h3>
                                <p>$${game.pledged.toLocaleString('en-US')}
                                <div>
                        </div>`);
}
addTopGames(firstGameContainer, first);

// do the same for the runner up item
addTopGames(secondGameContainer, second);

// search function
function searchGame(input){
    // reset filter button options
    setActive('None');

    // normalize search and game name, then filter
    const match_search = GAMES_JSON.filter( (game) => {
        const lowercaseSearch = input.toLowerCase();
        const lowercaseGame = game.name.toLowerCase()
        return lowercaseGame.includes(lowercaseSearch);
    });

    // update games container with matches
    deleteChildElements(gamesContainer);
    addGamesToPage(match_search);
}

const inputField = document.getElementById("input-field");
inputField.addEventListener("keyup", (event) => {searchGame(event.target.value)})

// Game nav button
function scrollToGames(){
    document.getElementById("our-games").scrollIntoView({behavior:'smooth'});
}

const scrollGamesBtn = document.getElementById("game-nav-btn");
scrollGamesBtn.addEventListener("click", scrollToGames);

// scroll to top button
function scrollToTop(){
    document.getElementById("company-header").scrollIntoView({behavior:'smooth'});
}


const scrollTop = document.getElementById("up-btn");
scrollTop.addEventListener("click", scrollToTop);