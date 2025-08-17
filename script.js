// ========== Weather API ========== //
async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "ba1863270c45a7c637febfe345d1c4a4"; // Replace with your API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    document.getElementById("weatherResult").innerText =
      `🌡️ Temp: ${data.main.temp}°C | ${data.weather[0].description}`;
  } catch (error) {
    document.getElementById("weatherResult").innerText = "❌ City not found!";
  }
}

// ========== Quiz ========== //
const quizData = [
  {
    question: "Which CSS property is used to make a site responsive?",
    answers: ["float", "media queries", "z-index", "position"],
    correct: 1
  },
  {
    question: "Which method is used to fetch API data?",
    answers: ["fetch()", "get()", "request()", "query()"],
    correct: 0
  },
  {
    question: "JavaScript is a ___ language.",
    answers: ["Compiled", "Scripting", "Markup", "Style"],
    correct: 1
  }
];

let current = 0;
let score = 0;

function loadQuestion() {
  const q = quizData[current];
  document.getElementById("question").innerText = q.question;
  const answersHTML = q.answers.map((ans, i) => `
    <div>
      <input type="radio" name="answer" value="${i}" id="ans${i}" />
      <label for="ans${i}">${ans}</label>
    </div>`).join('');
  document.getElementById("answers").innerHTML = answersHTML;
}

function nextQuestion() {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) return alert("Please select an answer!");

  if (parseInt(selected.value) === quizData[current].correct) score++;

  current++;
  if (current < quizData.length) {
    loadQuestion();
  } else {
    document.getElementById("question").innerText = "Quiz Completed!";
    document.getElementById("answers").innerHTML = "";
    document.getElementById("score").innerText = `Your Score: ${score}/${quizData.length}`;
  }
}

window.onload = loadQuestion;