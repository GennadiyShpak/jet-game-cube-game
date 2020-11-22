import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';


export default function modalRulesBtnHandler () {
    const gameRules = basicLightbox.create(`
    <div class="rules__wrapper">
        <h2 class="rules__title">Правила игры</h2>
            <ul class="rules__list row">
                <li class="rules__item">Игровая сессия длится 1 минуту.</li>
                <li class="rules__item">Задача: сбивать вражеские самолеты с помощь клика мыши.</li>
                <li class="rules__item">Для уничтожения определенного типа самолета нужно определенное количество кликов мыши. Ниже предоставлены более подробные инструкции:</li>
                <li class="rules__item">- для уничтожение миг-29 требуется 1 клик, за сбитие присуждается 1 балл;</li>
                <li class="rules__item">- для уничтожение f-35 lightning требуется 2 клика, за сбитие присуждается 2 балла;</li>
                <li class="rules__item">- для уничтожение самолета босса требуется 3 клика, за сбитие присуждается 3 балла;</li>
                <li class="rules__item">- для уничтожение гражданского самолета требуется 1 клик, за сбитие снимается 5 баллов.</li>
            </ul>
    </div>
    `)
    gameRules.show()
}