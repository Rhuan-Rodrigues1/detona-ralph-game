const state = {
  views: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values: {
    gameVelocit: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
  },
  actions: {
    countDownTimerId: setInterval(countDown, 1000),
    timerId: setInterval(moveEnemy, 1000),
  },
};

function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function randomSquare() {
  state.views.squares.forEach((square) => {
    square.classList.remove("enemy");
  });
  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.views.squares[randomNumber];

  randomSquare.classList.add("enemy");

  state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
  let gameVelocit = state.values.gameVelocit;
  state.values.timerId = setInterval(randomSquare, gameVelocit);
}

function countDown() {
  state.values.currentTime--;
  state.views.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    alert("Game over: " + state.values.result + " pontos");
  }
}

function addListenerHitBox() {
  state.views.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.views.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
      }
    });
  });
}

function initialize() {
  addListenerHitBox();
}

initialize();
