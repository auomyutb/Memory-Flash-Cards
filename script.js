let images = [
  "https://images.unsplash.com/photo-1708342208321-dbe3882bccc4?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  "https://images.unsplash.com/photo-1733690683193-087f7bd60bdc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  "https://images.unsplash.com/photo-1705932461994-6fb2b07f27dd?q=80&w=670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  "https://images.unsplash.com/photo-1590341328520-63256eb32bc3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  "https://images.unsplash.com/photo-1592513002316-e4fa19175023?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  "https://images.unsplash.com/photo-1501432377862-3d0432b87a14?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  "https://images.unsplash.com/photo-1608889175250-c3b0c1667d3a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
]

let firstCard = null
let secondCard = null
let moves = 0
let matches = 0
let seconds = 0
let timer
let canFlip = true

function startGame() {
  let board = document.getElementById("gameBoard")
  board.innerHTML = ""

  let cards = images.concat(images)
  cards.sort(() => Math.random() - 0.5)

  cards.forEach((img) => {
    let card = document.createElement("div")
    card.className = "card"
    card.dataset.image = img

    card.innerHTML = `
            <div class="card-front"></div>
            <div class="card-back"><img src="${img}"></div>
        `

    card.onclick = flipCard
    board.appendChild(card)
  })

  moves = 0
  matches = 0
  seconds = 0
  clearInterval(timer)
  updateStats()
}

function flipCard() {
  if (!canFlip || this.classList.contains("flipped")) return

  if (moves === 0 && !timer) {
    timer = setInterval(() => {
      seconds++
      updateStats()
    }, 1000)
  }

  this.classList.add("flipped")

  if (!firstCard) {
    firstCard = this
  } else {
    secondCard = this
    canFlip = false
    moves++
    checkMatch()
  }
  updateStats()
}

function checkMatch() {
  if (firstCard.dataset.image === secondCard.dataset.image) {
    matches++
    resetCards()
    if (matches === 8) endGame()
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipped")
      secondCard.classList.remove("flipped")
      resetCards()
    }, 1000)
  }
}

function resetCards() {
  firstCard = null
  secondCard = null
  canFlip = true
}

function updateStats() {
  document.getElementById("moves").textContent = moves
  document.getElementById("matches").textContent = matches + "/8"

  let min = Math.floor(seconds / 60)
  sec = seconds % 60
  document.getElementById("time").textContent =
    min + ":" + (sec < 10 ? "0" : "") + sec
}

function endGame() {
  clearInterval(timer)
  document.getElementById("finalMoves").textContent = moves
  document.getElementById("finalTime").textContent =
    document.getElementById("time").textContent
  document.getElementById("winModal").classList.add("show")
}

function newGame() {
  document.getElementById("winModal").classList.remove("show")
  timer = null
  startGame()
}

startGame()
