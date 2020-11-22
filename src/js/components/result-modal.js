import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import {gameCounter} from './game-rules';
import refs from '../refs';
import GameTableResult from '../api/game-score-services'

const gameTableScore = new GameTableResult();

function modalOnFinishGameHandler () {
  renderFromLS()
  const finishGame = basicLightbox.create(`
    <div class="modal__wrapper">
    <input type="text" placeholder="Enter your name..." class="modal__input">
    <button class="modal__btn" type="submit">Save</button>
    <p class="modal__title">You score:
    <span class="modal__score-display">${gameCounter}</span> 
    </p>
  </div>`)
  finishGame.show()
  const modalRefs = modalListener();
  const playerScore = refs.gameCounter.textContent;
  modalRefs.modalRecordFormBtn.addEventListener('click',()=>{
  gameTableScore.setNewRecord(modalRefs.modalRecordFormInput.value,playerScore);
  refs.resultTable.insertAdjacentHTML('beforeend', `
  <div class="col-12 score-line">
  <p class="score-name">${modalRefs.modalRecordFormInput.value}</p>
  <span class="score-span">:</span>
  <p>${playerScore}</p>
  </div>
  `)
  modalRefs.modal.classList.remove('basicLightbox--visible');
  loadResult()
  
});
};

function modalListener () {
  return {
    modal: document.querySelector('.basicLightbox'),
    modalRecordFormInput:document.querySelector('.modal__input'),
    modalRecordFormBtn:document.querySelector('.modal__btn'),
  }
}


function loadResult () {
 localStorage.setItem('game-result',JSON.stringify(gameTableScore.recordString));
 console.log('zz',gameTableScore.newSore);
}

function renderFromLS () {
  const saveScore = localStorage.getItem('game-result');
  refs.resultTable.innerHTML = '';
   if (saveScore) {
      gameTableScore.newSore = JSON.parse(localStorage.getItem('game-result'))
      gameTableScore.newSore.map(scoreItem => {
      const scoreLine = Object.values(scoreItem);
      refs.resultTable.insertAdjacentHTML('beforeend', `
      <div class="col-12 score-line">
      <p class="score-name">${scoreLine[0]}</p>
      <span class="score-span">:</span>
      <p class="score">${scoreLine[1]}</p>
      </div>
      `)
    ;})
   }
}

export  { modalOnFinishGameHandler, renderFromLS};