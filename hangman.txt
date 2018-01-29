Array.prototype.unique = function () {
  let array = [];
  for(var index = 0; index < this.length; index++) {
    if(!array.includes(this[index])) {
      array.push(this[index]);
      console.log ('this index: ',array.indexOf(this[index]), this[index]);
    }
  }
  return array;
}

var app = document.getElementById('app');
var words = ["moist", "scrumptious", "panties", "louisiana", "lovers"
// "lip-smacking"
];
var currentWord = '';
var currentWordSplit = currentWord.split('');
var currentWordMap = {};
var currentWordWrongLetters = [];
var currentWordGuessedLetters = [];
var letterTemplate = document.getElementById('letter-template');

var letterToCode = function letterToCode(value) {
  if (!(typeof value === 'string') && !(value instanceof String)) {
    console.error('letterToCode:', 'parameter "value" must be a String');
    return;
  } else {
    return value.charCodeAt(0);
  }
};
var codeToLetter = function codeToLetter(value) {
  if (!(typeof value === 'number') && !(value instanceof Number)) {
    console.error('letterToCode:', 'parameter "value" must be a Number');
    return;
  } else {
    return String.fromCharCode(value);
  }
};
var successfulGuess = function successfulGuess(keyCode) {
  var index = currentWordSplit.indexOf(codeToLetter(keyCode));

  currentWordGuessedLetters.push(currentWordSplit[index]);
  document.getElementById("right-letter-display").innerHTML = currentWordGuessedLetters;
  console.log('correct: ', currentWordGuessedLetters);
  return;
};
var failedGuess = function failedGuess(keyCode) {
  var index = currentWordSplit.indexOf(codeToLetter(keyCode));

  currentWordWrongLetters.push(codeToLetter(keyCode));
  document.getElementById("wrong-letter-display").innerHTML = currentWordWrongLetters;
  console.log('wrong:', currentWordWrongLetters);
  return;
};

var checkForLetter = function checkForLetter(keyCode) {
  var exists = currentWordSplit.includes(codeToLetter(keyCode));

  if (exists) {
    successfulGuess(keyCode);
  } else {
    failedGuess(keyCode);
  }
};

document.addEventListener('DOMContentLoaded', function () {
  currentWord = words[Math.floor(Math.random() * words.length)];
  currentWordSplit = currentWord.split('');
  var fragment = document.importNode(letterTemplate.content, true);
  var letter = fragment.querySelector('.letter');
  var container = document.createElement("div");
  container.className = 'letters';

  currentWordSplit.unique().forEach(function (letter) {
    currentWordMap[letter] = Math.random().toString(36).substring(5);
    console.log('currentWordMap: ', currentWordMap[letter]);
  });

  currentWordSplit.forEach(function (item) {

    // letter.innerHTML = ;
    letter.className = currentWordMap[item];

    container.innerHTML += letter.outerHTML;
  });

  app.appendChild(container);
});

document.onkeypress = function (event) {
  event = event || window.event;
  var keyCode = event.keyCode;

  checkForLetter(keyCode);
};
