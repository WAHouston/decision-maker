const addGameButton = document.getElementById('addGame');
const gameInput = document.getElementById('gameInput');
const gameList = document.getElementById('gameList');
const addPlayerButton = document.getElementById('addPlayer');
const playerInput = document.getElementById('playerInput');
const playerList = document.getElementById('playerList');
const pickButton = document.getElementById('pick');
const clearButton = document.getElementById('clear');

loadLists()

function addGame() {
    const game = gameInput.value.trim()
    if (game) {
        createGameElement(game)
        gameInput.value = ''
        saveGames()
    }

}

function addPlayer() {
    const player = playerInput.value.trim()
    if (player) {
        createPlayerElement(player)
        playerInput.value = ''
        savePlayers()
    }
}

addGameButton.addEventListener('click', addGame)
addPlayerButton.addEventListener('click', addPlayer)
pickButton.addEventListener('click', pickResults)
clearButton.addEventListener('click', clearApp)

function createGameElement(game) {
    const listItem = document.createElement('li')
    listItem.textContent = game
    listItem.id = game
    listItem.addEventListener('click', deleteItem)
    gameList.appendChild(listItem)
}

function createPlayerElement(player) {
    const listItem = document.createElement('li')
    listItem.textContent = player
    listItem.id = player
    listItem.addEventListener('click', deleteItem)
    playerList.appendChild(listItem)
}

function saveGames() {
    let games = []
    gameList.querySelectorAll('li').forEach((item) => {
        games.push(item.textContent.trim())
    })
    localStorage.setItem('games', JSON.stringify(games))
}

function savePlayers() {
    let players = []
    playerList.querySelectorAll('li').forEach((item) => {
        players.push(item.textContent.trim())
    })
    localStorage.setItem('players', JSON.stringify(players))
}

function loadData() {
    try{
        let games;
        let players;

        if (localStorage.getItem('games')) {
            games = JSON.parse(localStorage.getItem('games') || [])
        }
        if (localStorage.getItem('players')) {
            players = JSON.parse(localStorage.getItem('players') || [])
        }
        
        return {games, players}
    } catch (err) {
        console.log(err)
    }

}

function loadLists() {
    const data = loadData()
    if (data.games) {
        data.games.forEach(createGameElement)
    }
    if (data.players) {
        data.players.forEach(createPlayerElement)
    }
}

function pickResults() {
    const results = document.getElementById('result')
    while (results.hasChildNodes()) {
        results.removeChild(results.firstChild)
    }
    const data = loadData()
    let game;
    if (data.games && data.games.length > 0) {
        let i = Math.floor(Math.random() * data.games.length)
        game = data.games[i]
        let gameResult = document.createElement('h1')
        gameResult.textContent = game
        result.appendChild(gameResult)
    }
    let player;
    if (data.players && data.players.length > 0) {
        let i = Math.floor(Math.random() * data.players.length)
        player = data.players[i]
        let playerResult = document.createElement('h1')
        playerResult.textContent = player
        result.appendChild(playerResult)
    }
}

function deleteItem(e) {
    e.target.remove()
    saveGames()
    savePlayers()
}

function clearApp() {
    while (gameList.firstChild) {
        gameList.removeChild(gameList.firstChild);
    }
    while (playerList.firstChild) {
        playerList.removeChild(playerList.firstChild);
    }
    saveGames()
    savePlayers()
}