/** Выполнение функции с указанной задержкой */
const delay = time => new Promise(resolve => setTimeout(resolve, time));

/** Вариант через стандартную функцию */
function delayStandart(time) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time);
  });
}

/** Пример выполнения функции с задержкой в 1 секунду */
delay(1000).then(() => console.log('Прошла секунда')).catch(console.error);
delayStandart(1000).then(() => console.log('Прошла секунда')).catch(console.error);