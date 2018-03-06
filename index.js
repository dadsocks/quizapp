let questionNumber = 0;
let score = 0;

// create each question's html

function generateQuestion() {
  if (questionNumber < STORE.length) {
    return `<section class="question-data col-12">
              <form class="question" role="form">
                <h2>${STORE[questionNumber].question}</h2>    
                <fieldset class="row">
                  <legend>Select an option below:</legend>
                  <input type="radio" value="${STORE[questionNumber].answers[0]}" id="answer-1" name="answer" tabindex="0" role="radio" required>
                  <label class="col-12" for="answer-1">${STORE[questionNumber].answers[0]}</label>
                  <input type="radio" value="${STORE[questionNumber].answers[1]}" id="answer-2" name="answer" role="radio" required>
                  <label class="col-12" for="answer-2">${STORE[questionNumber].answers[1]}</label>
                  <input type="radio" value="${STORE[questionNumber].answers[2]}" id="answer-3" name="answer" role="radio" required>
                  <label class="col-12" for="answer-3">${STORE[questionNumber].answers[2]}</label>
                  <input type="radio" value="${STORE[questionNumber].answers[3]}" id="answer-4" name="answer" role="radio" required>
                  <label class="col-12" for="answer-4">${STORE[questionNumber].answers[3]}</label>
                </fieldset>
                <button type="submit" class="submitButton" role="button">Submit</button>
              </form>
           </section>`;
  } else {
    renderResults();
    hideHeader();
  }
}


// Render Questions to DOM
function renderQuestion(){
  $('.quizBlock').html(generateQuestion());
}

function renderProgressBar() {
  $('.progress').html(progressBar());
}

// change background image
function changeBackgroundStart() {
  let bgNumber = questionNumber;
  $('.background').addClass(`question${bgNumber += 1}`).removeClass('background-start');
}

function changeBackgroundResults() {
  if (score < 7) {
    $('.background').addClass('failed').removeClass('question10');
  } else $('.background').addClass('passed').removeClass('question10');
}

function changeBackgroundQuestion() {
  let bgNumber = questionNumber;
  let nextbg = bgNumber += 1;
  $('.background').removeClass(`question${nextbg}`).addClass(`question${nextbg += 1}`);
}

//un-hide quiz elements
function unhideHeader() {
  $('header').removeClass('hide');
}

function unhideQuestions() {
  $('.quizBlock').removeClass('hide');
}

function hideHeader() {
  $('header').addClass('hide');
}

// start quiz
function startQuiz() {
  $('.start-button').click(function(event) {
    console.log("running");
    $(this).closest('.start-page').remove();
    changeBackgroundStart();
    unhideHeader();
    unhideQuestions();
  });
}

function handleSubmition() {
  $('form').on('submit', function(event) {
    event.preventDefault();
    let userAnswer = $('input:checked').val();
    let correctAnswer = STORE[questionNumber].correct;
    if (!userAnswer) {
      alert("You ever hear about the donkey who couldn't choose between wheat and grain and starved? That's you...pick something!");
    } else if  (userAnswer === correctAnswer) {
      console.log("true ran");
      answerIsCorrect();
      updateScore();
      renderProgressBar();
    }else {
      answerIsIncorrect();
    }
  });
}

function userFeedbackCorrect() {
  return `<form class="question answer-correct">
      <h2>You got this dawg. Don't even trip!</h2>
      <fieldset class="row">
        <legend></legend>
        <img src=${STORE[questionNumber].response} alt=${STORE[questionNumber].alt}>
      </fieldset>
      <button type="submit" class="nextButton">Let's Keep This Party Goin'!</button>
      </form>`;
}

function answerIsCorrect() {
  console.log("answerIsCorrect ran");
  $('.question-data').html(userFeedbackCorrect());
}

function userFeedbackIncorrect() {
  return `<form class="question answer-incorrect" role="form">
      <h2>Nah it was...${STORE[questionNumber].correct}...</h2>
      <fieldset class="row">
        <legend></legend>
        <img src="https://www.dropbox.com/s/axz7h5v6dehqr07/questionIncorrect.png?dl=1" alt="Rick and Morty are dissapointed">
      </fieldset>
      <button type="submit" class="nextButton" role="button">Don't mess this next one up!</button>
      </form>`;
}

function answerIsIncorrect() {
  $('.question-data').html(userFeedbackIncorrect());
}


function progressBar() {
  let onQuestion = questionNumber;
  return `<ul>
             <li>Question: ${onQuestion += 1}/10</li>
             <li>Score: ${score}</li>
           </ul>`;
}

function nextQuestion() {
  $('main').on('click','.nextButton', function(event) {
    event.preventDefault();
      changeBackgroundQuestion();
      updateQuestion();
      renderQuestion();
      handleSubmition();
      renderProgressBar();
  });
}

function renderResults() {
  if (score < 7) {
    $('.quizBlock').html(
      `<section class="question-data col-12">
        <form class="results-passed" role="form">
          <h2>...${score} out of 10...dawg...</h2>
          <fieldset class="row">
              <legend></legend>
              <img src="https://www.dropbox.com/s/iy6ylqsi3ys6232/iconspissed.png?dl=1" alt="Rick and Morty Pleased"> 
              <h3>Wow...you really screwed the pooch on that one...now look at the mess we're in!</h3>
          </fieldset>
          <button type="submit" class="resetButton" role="button">Think you can not kill us this time?</button>
        </form>
      </section>`
      );
      changeBackgroundResults();
  } else {
    $('.quizBlock').html(`<section class="question-data col-12">
        <form class="results-passed" role="form">
          <h2>Woah dawg you got ${score} out of 10 questions right!</h2>
          <fieldset class="row">
              <legend></legend>
              <img src="https://www.dropbox.com/s/jyzxr1azpfjums3/icons.png?dl=1" alt="Rick and Morty Pissed"> 
              <h3>Don't gloat too much...Nobody exists on purpose, nobody belongs anywhere, everybody's gonna die.</h3>
          </fieldset>
          <button type="submit" class="resetButton" role="button">Are you ready for another adventure?</button>
        </form>
      </section>`
      );
      changeBackgroundResults();
  }
}


function updateScore() {
  score++;
}

function updateQuestion() {
  questionNumber++;
}

function reStartQuiz() {
  $('main').on('click','.resetButton', function(event){
    event.preventDefault();
    location.reload();
  });
}

const images = [];
function preload() {
    for (i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}

function playQuiz() {
  startQuiz();
  renderQuestion();
  handleSubmition();
  renderProgressBar();
  nextQuestion();
  reStartQuiz();
  preload(
    "https://www.dropbox.com/s/ycru7oio5dzjdmx/Question1.jpg?dl=1",
    "https://www.dropbox.com/s/kcac0kudzx0ch9v/question2.jpg?dl=1",
    "https://www.dropbox.com/s/c0l1ghza3jka98m/question3.jpg?dl=1",
    "https://www.dropbox.com/s/lbbsao4fn9bs1zf/question4.jpg?dl=1",
    "https://www.dropbox.com/s/kian96cs3hl0cg0/question5.jpg?dl=1",
    "https://www.dropbox.com/s/220c8ciohega19j/question6.png?dl=1",
    "https://www.dropbox.com/s/i6ixkxo6m0ut99a/question7.jpg?dl=1",
    "https://www.dropbox.com/s/5wl6fud7jbi9egl/question8.jpg?dl=1",
    "https://www.dropbox.com/s/rp9pp6mklvouldr/question9.jpg?dl=1",
    "https://www.dropbox.com/s/mxburbn2tcqzcb1/question10.png?dl=1",
    "https://www.dropbox.com/s/ulnk8kmxz46r309/resultsbg.png?dl=1",
    "https://image.tmdb.org/t/p/original/2uXVtyVMsQ4ju9Ts4Fhnj5IXFdr.jpg"
    );
}

$(playQuiz);
