Array.prototype.unique = function () {
  let array = [];
  for(var index = 0; index < this.length; index++) {
    if(!array.includes(this[index])) {
      array.push(this[index]);
    }
  }
  return array;
}

var app = document.getElementById('app');
var words = [
  "moist",
  "scrumptious",
  "panties",
  "louisiana",
  "lovers"
  // "lip-smacking"
];
var currentWord = '';
var currentWordSplit = currentWord.split('');
var currentWordMap = {};
var currentWordWrongLetters = [];
var currentWordGuessedLetters = [];
var letterTemplate = document.getElementById('letter-template');

const letterToCode = value => {
  if (!(typeof value === 'string') && !(value instanceof String)) {
    console.error('letterToCode:', 'parameter "value" must be a String');
    return;
  } else {
    return value.charCodeAt(0);
  }
};
const codeToLetter = value => {
  if (!(typeof value === 'number') && !(value instanceof Number)) {
    console.error('letterToCode:', 'parameter "value" must be a Number');
    return;
  } else {
    return String.fromCharCode(value);
  }
};
const successfulGuess = keyCode => {
  let index = currentWordSplit.indexOf(codeToLetter(keyCode));

  currentWordGuessedLetters.push(currentWordSplit[index]);
  console.log('correct: ', currentWordGuessedLetters);
  return;
};
const failedGuess = keyCode => {
  let index = currentWordSplit.indexOf(codeToLetter(keyCode));

  currentWordWrongLetters.push(codeToLetter(keyCode));
  console.log('wrong:', currentWordWrongLetters);
  return;
};

const checkForLetter = keyCode => {
  let exists = currentWordSplit.includes(codeToLetter(keyCode));

  if (exists) {
    successfulGuess(keyCode);
  } else {
    failedGuess(keyCode);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  currentWord = words[Math.floor(Math.random() * words.length)];
  currentWordSplit = currentWord.split('');
  const fragment = document.importNode(letterTemplate.content, true);
  const letter = fragment.querySelector('.letter');
  let container = document.createElement("div");
  container.className = 'letters';

  currentWordSplit.unique().forEach(letter => {
    currentWordMap[letter] = Math.random().toString(36).substring(5);
  });

  currentWordSplit.forEach(item => {

    // letter.innerHTML = ;
    letter.className = currentWordMap[item];

    container.innerHTML += letter.outerHTML;
  });

  app.appendChild(container);
});

document.onkeypress = event => {
  event = event || window.event;
  let keyCode = event.keyCode;

  checkForLetter(keyCode);
};
