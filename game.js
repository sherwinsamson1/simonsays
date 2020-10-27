const ButtonColors = ['red', 'blue', 'green', 'yellow'];
const BlueAudio = new Audio('./sounds/blue.mp3');
const GreenAudio = new Audio('./sounds/green.mp3');
const RedAudio = new Audio('./sounds/red.mp3');
const YellowAudio = new Audio('./sounds/yellow.mp3');
const WrongAudio = new Audio('./sounds/wrong.mp3');

var level = 0;
var gamePattern = [];
var userClickedPattern = [];



function playSound(color){
  switch (color) {
    case 'blue':
      BlueAudio.play();
      break;
    case 'green':
      GreenAudio.play();
      break;
    case 'red':
      RedAudio.play();
      break;
    case 'yellow':
      YellowAudio.play();
      break;
    case 'wrong':
      WrongAudio.play();
      break;
    default:
      break;
  }
}

function animatePress(color){
  $('#'+color).addClass('pressed');
  setTimeout(function(){
    $('#'+color).removeClass('pressed');
  }, 100);
}





function gameOver(){
  $('body').addClass('game-over');
  playSound('wrong');

  setTimeout(function(){
    $('body').removeClass('game-over');
  }, 200);

  $('h1').text('Game Over :( Press any key to restart');
}

function checkAnswer(currentIndex){
  if (gamePattern[currentIndex] === userClickedPattern[currentIndex]){

    if (currentIndex === gamePattern.length-1){
      setTimeout(function(){
        nextLevel();
        userClickedPattern = [];
      }, 900);
    }

  }
  else{
    gameOver();
  }
}





function playGamePattern(index = 0){
  var color = gamePattern[index];

  if (index < gamePattern.length){
    setTimeout(function(){
      $('#' + color).fadeOut();
      playSound(color);
      $('#' + color).fadeIn(); 
      index += 1
      playGamePattern(index);
    }, 900);
  }
}

function nextLevel(){
  level += 1;
  $('h1').text('Level: ' + level);

  var randomNum = Math.floor(Math.random()*4);
  var randomChosenColor = ButtonColors[randomNum];
  gamePattern.push(randomChosenColor);
  
  playGamePattern();
};

function handleClick(color){
  playSound(color);
  animatePress(color);
}

function start(){
  nextLevel();
}





// Game starts with key press.
$(document).on('keydown', function(){
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  start();
})

// Handles button clicks and checks answer.
$('.btn').click(function(event){
  var userChosenColor = event.target.id;
  handleClick(userChosenColor);
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});
