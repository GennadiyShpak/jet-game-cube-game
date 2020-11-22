import StopWatch from '../api/stopWatch-services';
import refs from '../refs';
import jetsDB from '../components/jetsDB'
import {modalOnFinishGameHandler} from './result-modal'

const stopWatch = new StopWatch({
  onTick:updateClockFace
})

const gameTable = document.querySelector('.game-zone');


let gameCounter = 0;
let bossCounter = 2;
let lightningCounter = 1;


function updateClockFace (secs) {
  refs.stopWatchDisplay.textContent = `00:${secs}`;
  stopWatch.time = secs;
  if (refs.stopWatchDisplay.textContent.toString() === '00:00') {
    onPauseHandler()
    refs.startResumeBtn.disabled = true;
    modalOnFinishGameHandler()
  }
}

function newGameHandler () {
  stopWatch.stop();
  refs.startResumeBtn.disabled = false;
  refs.startResumeBtn.textContent = 'Pause';
  refs.stopWatchDisplay.textContent = `01:00`;
  stopWatch.startTime = 60;
  startPositionGenerate(gameTable);
  resumeBattle();
  counterReset();
}

function pauseGameHandler () {
  if (refs.startResumeBtn.textContent === 'Pause') {
    onPauseHandler();
    refs.startResumeBtn.textContent = 'Resume';
  } else {
    resumeBattle()
  }
}

function onPauseHandler() {
  refs.newGameBtn.disabled = false;
  gameTable.removeEventListener('click', counterHandler)
  stopWatch.stop();
}

function resumeBattle () {
  gameTable.addEventListener('click', counterHandler);
  stopWatch.start();
  refs.newGameBtn.disabled = true;
  refs.startResumeBtn.textContent = 'Pause';
}

function startPositionGenerate (el) {
  el.innerHTML='';
  for (let i = 0; i < 10; i+=1) {
    createPlane(el);
  };
}

function randomNumberHandler (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function createPlane(el) {
  const indexEl = randomNumberHandler(0,3);
  el.insertAdjacentHTML(
    'afterbegin',
    ` <div class="jet"><img class=${jetsDB[indexEl].class} src=${jetsDB[indexEl].src} alt=${jetsDB[indexEl].alt}></div>`,
  );
}

function onJetClick (e) {
  refs.gameCounter.textContent = gameCounter;
  if (e.target.nodeName !== 'IMG') {
    return
  } else if (e.target.classList.contains('destroy') || e.target.classList.contains('mig') || e.target.classList.contains('civil')) {
   e.target.src='./images/explosion.png';
    e.target.classList.add('disable')
    setTimeout(() => {
      e.target.parentNode.remove();
      addCoverPlaneHandler(gameTable)
    }, 2000);
  }
}

function counterHandler (e) {
  if (e.target.classList.contains('disable')) {
    return
  }
if (e.target.classList.contains('mig')) {
  e.target.classList.add('destroy');
  gameCounter+=1;
}  else if (e.target.classList.contains('lightning')) {
  lightningCounter-=1
  if (lightningCounter === 0) {
    gameCounter+=2;
    e.target.classList.add('destroy');
    lightningCounter = 2;
  }
} else if (e.target.classList.contains('boss')){
  bossCounter-=1;
  if (bossCounter === 0) {
    e.target.classList.add('destroy');
    gameCounter+=3;
    bossCounter = 3;
}
}else if (e.target.classList.contains('civil')) {
  e.target.classList.add('destroy');
  gameCounter-=5
} 
onJetClick(e)
};

function counterReset () {
  gameCounter = 0;
  bossCounter = 3;
  lightningCounter = 2;
  refs.gameCounter.textContent = '0';
}

function addCoverPlaneHandler (el) {
  const numberCoverPlane = randomNumberHandler(0,3)
  for (let i = 0; i < numberCoverPlane; i+=1) {
    createPlane(el);
  };
}

export { newGameHandler, pauseGameHandler, gameCounter }