
import './css/normalize.css'
import './styles.css';
import refs from './js/refs';
import lightning from './images/f-35.png';
import boss from './images/big-boss.png';
import mig from './images/mig-29.png';
import civilPlane from './images/civil-plane.png';
import explosion from './images/explosion.png';
import { renderFromLS } from './js/components/result-modal'
import { newGameHandler, pauseGameHandler } from './js/components/game-rules'
import modalRulesBtnHandler from './js/components/rules-modal'


renderFromLS();

refs.rulesBtn.addEventListener('click', modalRulesBtnHandler)
refs.newGameBtn.addEventListener('click',newGameHandler)
refs.startResumeBtn.addEventListener('click',pauseGameHandler)




















// function showResult () {

// }