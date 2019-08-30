// a key map of allowed keys
var allowedKeys = {
  37: "left",
  38: "up",
  39: "right",
  40: "down",
  65: "a",
  66: "b"
};

// the 'official' Konami Code sequence
const konamiCode = [
  "up",
  "up",
  "down",
  "down",
  "left",
  "right",
  "left",
  "right",
  "b",
  "a"
];

// a variable to remember the 'position' the user has reached so far.
let konamiCodePosition = 0;

// add keydown event listener
document.addEventListener("keydown", function(e) {
  // get the value of the key code from the key map
  let key = allowedKeys[e.keyCode];
  // get the value of the required key from the konami code
  let requiredKey = konamiCode[konamiCodePosition];

  // compare the key with the required key
  if (key == requiredKey) {
    // move to the next key in the konami code sequence
    konamiCodePosition++;

    // if the last key is reached, activate cheats
    if (konamiCodePosition == konamiCode.length) {
      activateCheats();
      konamiCodePosition = 0;
    }
  } else {
    konamiCodePosition = 0;
  }
});

let avocadoJokes = [
  "How did the avocado feel after a day at the gym? Hard core.",
  "What did the avocado say to the fork? 'You guac my world.'",
  "Bravocado!"
];

document.getElementById("konami").style.display = "none";
let displayed = false;

function activateCheats() {
  alert(avocadoJokes[Math.floor(Math.random() * avocadoJokes.length)]);

  if (!displayed) {
    document.getElementById("konami").style.display = "block";
    displayed = true;
  } else {
    document.getElementById("konami").style.display = "none";
    displayed = false;
  }
}
