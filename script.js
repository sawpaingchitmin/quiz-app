const questions = [
    {
        question: "Which HTML tag is used to define the largest heading?",
        answers: [
            { text: "<h6>", correct: false },
            { text: "<h1>", correct: true },
            { text: "<head>", correct: false },
            { text: "<heading>", correct: false },
        ]
    },
    {
        question: "Which HTML attribute is used to provide alternative text for an image?",
        answers: [
            { text: "alt", correct: true },
            { text: "title", correct: false },
            { text: "src", correct: false },
            { text: "description", correct: false },
        ]
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        answers: [
            { text: "font-style", correct: false },
            { text: "text-color", correct: false },
            { text: "color", correct: true },
            { text: "background-color", correct: false },
        ]
    },
    {
        question: "In CSS, which property controls the size of text?",
        answers: [
            { text: "font-size", correct: true },
            { text: "text-style", correct: false },
            { text: "font-weight", correct: false },
            { text: "text-size", correct: false },
        ]
    },
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        answers: [
            { text: "//", correct: true },
            { text: "/*", correct: false },
            { text: "<!--", correct: false },
            { text: "#", correct: false },
        ]
    },
    {
        question: "How do you declare a JavaScript variable?",
        answers: [
            { text: "variable myVar;", correct: false },
            { text: "var myVar;", correct: true },
            { text: "v myVar;", correct: false },
            { text: "let var myVar;", correct: false },
        ]
    },
    {
        question: "Which HTML element is used to link an external CSS file?",
        answers: [
            { text: "<style>", correct: false },
            { text: "<css>", correct: false },
            { text: "<link>", correct: true },
            { text: "<script>", correct: false },
        ]
    },
    {
        question: "Which JavaScript method is used to write content into the HTML document?",
        answers: [
            { text: "document.write()", correct: true },
            { text: "console.log()", correct: false },
            { text: "window.print()", correct: false },
            { text: "document.create()", correct: false },
        ]
    },
    {
        question: "Which CSS property is used to make text bold?",
        answers: [
            { text: "font-weight", correct: true },
            { text: "font-bold", correct: false },
            { text: "text-weight", correct: false },
            { text: "bold", correct: false },
        ]
    },
    {
        question: "Which JavaScript keyword is used to define a constant variable?",
        answers: [
            { text: "var", correct: false },
            { text: "let", correct: false },
            { text: "const", correct: true },
            { text: "constant", correct: false },
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer);
    })
}

function resetState() {
    nextButton.style.display = 'none';
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
} 

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = 'block';
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();