
const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const answerContainer = document.getElementById("answer-container");
const questionText = document.getElementById("question");
const progressBar = document.getElementById("progress-bar");
const currentQuestionSpan = document.getElementById("current-question-span");
const totalQuestion = document.getElementById("total-questions-span");
const score = document.getElementById("score");
const resultScreen = document.getElementById("results-screen");
const restartquiz = document.getElementById("restart-btn");
const totalScore = document.getElementById("total-score");
const scored = document.getElementById("scored");


let currentQuestionIndex = 0;
let scoreCont = 0;




const quiz = [

    { question: " What is the soltution of the equation $$\\scriptsize ln(x^2 - 4x + 5) = 0 $$",
        answer: [
            {text:"$2$", correct: true},
            {text:"$\\{-2;2\\}$", correct: false},
            {text:"$\\{2\\}$", correct: false},
            {text:"$\\{e^2\\}$", correct: false}
        ],
    },

    { question:"Let $\\scriptsize f$ be a funtion with domain $\\scriptsize \\mathbb{R}$ and codomain $\\scriptsize [-1;3]$. What is the codomain of the function $\\scriptsize g$, with domain $\\scriptsize \\mathbb{R}$, defined by $$\\scriptsize g(x) = f(x-2) + 1$$",
        answer: [
            {text:"$[-3;1]$", correct: false},
            {text:"$[-2;2]$", correct: false},
            {text:"$[0;4]$", correct: true},
            {text:"$[1;5]$", correct: false}
        ],
    },
    
    { question: "Consider the real function of a resl variable $\\scriptsize f(x) = e^{2x} + 3e^{-x} -4$. Determine the set of real numbers that satisfy the condition $\\scriptsize f(x) \\le 0$. ",
        answer: [
            {text:"$\\mathbb{R}$", correct: false},
            {text:"$[0; \\infty)$", correct: false},
            {text:"$(- \\infty;0]$", correct: true},
            {text:"$\\emptyset$", correct: false}
        ],
    },
    
    { question: "Consider the real function of a real variable, dependent on a parameter $ \\scriptsize k \\in \\mathbb{R}$. $$\\scriptsize f(x) = \\begin{cases} \\frac{sen(x-4)(x+4)^2}{x^2-4}, & \\text{if } x < 4 \\\\ ln(x-3)+ 2^{x-k}, & \\text{if } x \\ge 4 \\end{cases}$$  $\\scriptsize \\lim_{x\\to 4}f(x) ?$",
        answer: [
            {text:"$2^{4-k}$", correct: false},
            {text:"$0$", correct: false},
            {text:"$\\nexists$", correct: true},
            {text:"$1+ 2^{4-k}$", correct: false}
        ],
    },
    
    { question: "Consider the function $\\scriptsize f$ dada por $$\\scriptsize f(x) = \\begin{cases} x^2-2x-k, & \\text{if } x \\le 3 \\\\  \\frac{1}{x-1}+ \\frac{3}{2}, & \\text{if } x>3 \\end{cases} $$ What is the value of $\\scriptsize k$?",
        answer: [
            {text:"$2$", correct: false},
            {text:"$\\frac{3}{2}$", correct: false},
            {text:"$1$", correct: true},
            {text:"$-1$", correct: false}
        ],
    },

    { question: "An urns contains 4 red balls numbererd from 1 to 4 and 3 blue balls numbererd from 1 to 3. Two balls are drawn at random and without replacement from the urn. Let A be the event the sum of the numbers on the drawn balls is even and B the event the two balls have different colors. What is the value of $\\scriptsize P(A|B)$ ?",
        answer: [
            {text:"$\\frac{1}{2}$", correct: true},
            {text:"$\\frac{2}{7}$", correct: false},
            {text:"$\\frac{1}{6}$", correct: false},
            {text:"$\\frac{3}{7}$", correct: false}
        ],
    }
];

totalQuestion.textContent = quiz.length;



startBtn.addEventListener("click", startQuiz);

function startQuiz(){

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    loadQuiz();

}

    function loadQuiz(){

        questionText.textContent = quiz[currentQuestionIndex].question;

        answerContainer.innerHTML = "";

        for(let j = 0; j < quiz[currentQuestionIndex].answer.length; j++){

            const answerBtn = document.createElement("button");
            answerBtn.disabled = false;
            answerBtn.classList.add("answer-btn");
            answerBtn.textContent = quiz[currentQuestionIndex].answer[j].text;
            answerBtn.dataset.correct = quiz[currentQuestionIndex].answer[j].correct;
            answerContainer.appendChild(answerBtn);
            answerBtn.addEventListener("click", nextQuestion); 
        
      }

      renderMathInElement(quizScreen, {
        delimiters:[{left: '$$', right: '$$', display: true},{left: '$', right: '$', display: false}]
      });
      
    }

    

 function nextQuestion(event){

    const clickedBtn = event.target;
    const allBtn = document.querySelectorAll(".answer-btn");

    allBtn.forEach(element => {
        element.disabled = true;

        if(element.dataset.correct == "true"){

        element.classList.add("correct");

        }

        if(clickedBtn.dataset.correct == "true"){

            clickedBtn.classList.add("correct");

        } else{
            clickedBtn.classList.add("incorrect");
        }
    })


        if(clickedBtn.dataset.correct == "true"){
            scoreCont++;
        }

    currentQuestionIndex++;
    setTimeout(() => {

        currentQuestionSpan.textContent++;
        score.textContent = scoreCont*20;
        scored.textContent = score.textContent;
        progressBar.style.width = currentQuestionIndex*100/quiz.length+"%";
        
        if(currentQuestionIndex < quiz.length){
             loadQuiz();

        } else {
            quizScreen.classList.remove("active");
            resultScreen.classList.add("active");
            

        }
        
       },
       
       1000);

 }


        restartquiz.addEventListener("click", () => {


            currentQuestionIndex = 0;
            currentQuestionSpan.textContent = 1;
            score.textContent = 0;
            scored.textContent = 0;
            scoreCont = 0;
            progressBar.style.width = 0 + "%";


            resultScreen.classList.remove("active");
            startScreen.classList.add("active");

        });

        totalScore.textContent = quiz.length*20;



    