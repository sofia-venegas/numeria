const gameArea = document.getElementById('game-area');

document.getElementById('btn-suma').addEventListener('click', () => {
  startGame('suma');
});

document.getElementById('btn-resta').addEventListener('click', () => {
  startGame('resta');
});

function startGame(operation) {
  gameArea.innerHTML = '';
  
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  let correctAnswer;

  if (operation === 'suma') {
    correctAnswer = num1 + num2;
    gameArea.innerHTML = `
      <p>¿Cuánto es ${num1} + ${num2}?</p>
      ${createOptions(correctAnswer)}
    `;
  } else if (operation === 'resta') {
    // Para evitar negativos:
    const max = Math.max(num1, num2);
    const min = Math.min(num1, num2);
    correctAnswer = max - min;
    gameArea.innerHTML = `
      <p>¿Cuánto es ${max} - ${min}?</p>
      ${createOptions(correctAnswer)}
    `;
  }

  addListeners(correctAnswer);
}

function createOptions(correctAnswer) {
  // Creamos 3 opciones, una correcta y dos al azar
  let options = new Set();
  options.add(correctAnswer);

  while (options.size < 3) {
    let fake = Math.floor(Math.random() * 20) + 1;
    if (fake !== correctAnswer) options.add(fake);
  }

  // Desordenamos las opciones
  let optionsArr = [...options];
  optionsArr.sort(() => Math.random() - 0.5);

  return optionsArr.map(opt => `<button class="option">${opt}</button>`).join('');
}

function addListeners(correctAnswer) {
  const buttons = document.querySelectorAll('.option');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      if (parseInt(button.textContent) === correctAnswer) {
        gameArea.innerHTML += `<p style="color:green;">¡Muy bien! 🎉</p>`;
      } else {
        gameArea.innerHTML += `<p style="color:red;">Ups, intenta de nuevo 😅</p>`;
      }
    });
  });
}
