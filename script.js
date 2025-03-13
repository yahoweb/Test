let timerInterval;
let seconds = 0;
const timerDisplay = document.getElementById('timer');
const heartbeatLine = document.getElementById('heartbeat-line');
const statusMessage = document.getElementById('status-message');
const currentMusicDisplay = document.getElementById('current-music');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const resultBtn = document.getElementById('result-btn');
const container = document.getElementById('container');
const chartContainer = document.getElementById('chart-container');
const circlesContainer = document.getElementById('circles');
const startPage = document.getElementById('start-page');
const mainPage = document.getElementById('main-page');
const startTestBtn = document.getElementById('start-test-btn');
let audio;

const musicList = [
  { url: 'assets/Music1.mp3', title: 'Shut up My Moms Calling (Sped up)', artist: 'Hotel Ugly', genre: 'Pop', speed: 700 },
  { url: 'assets/Music2.mp3', title: 'Last Night on Earth', artist: 'Green Day', genre: 'Rock', speed: 900 },
  { url: 'assets/Music3.mp3', title: '비처럼 음악처럼', artist: 'Kim HyunShik', genre: 'Ballad', speed: 1100 },
  { url: 'assets/Music4.mp3', title: 'Tempo', artist: 'PENOMECO', genre: 'Hip-hop', speed: 1000 },
  { url: 'assets/Music5.mp3', title: 'Stay with me', artist: 'Miki matubara', genre: 'City Pop', speed: 1300 },
];

// 시작 페이지에서 메인 페이지로 이동
startTestBtn.addEventListener('click', () => {
  startPage.style.display = 'none';
  mainPage.style.display = 'block';
});

// 원 생성 함수
function createCircles() {
  for (let i = 0; i < 20; i++) {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.style.width = `${Math.random() * 100 + 50}px`;
    circle.style.height = circle.style.width;
    circle.style.left = `${Math.random() * 100}%`;
    circle.style.top = `${Math.random() * 100}%`;
    circle.style.animationDuration = `${Math.random() * 5 + 3}s`;
    circlesContainer.appendChild(circle);
  }
}

// 음악 재생 함수
function playMusic() {
  const selectedMusic = musicList[Math.floor(Math.random() * musicList.length)];
  currentMusicDisplay.textContent = `Now Playing: ${selectedMusic.title} - ${selectedMusic.artist} (${selectedMusic.genre})`;
  audio = new Audio(selectedMusic.url);
  audio.play();
}

// 타이머 시작/정지 함수
function toggleTimer() {
  if (startBtn.textContent === 'Start') {
    playMusic();
    startBtn.textContent = 'Stop';
    timerInterval = setInterval(() => {
      seconds++;
      timerDisplay.textContent = formatTime(seconds);
    }, 1000);
  } else {
    audio.pause();
    clearInterval(timerInterval);
    startBtn.textContent = 'Start';
    updateStatusMessage();
  }
}

// 리셋 함수
function resetTimer() {
  if (audio) audio.pause();
  seconds = 0;
  timerDisplay.textContent = "0:00";
  clearInterval(timerInterval);
  startBtn.textContent = 'Start';
  statusMessage.innerHTML = `
    This website helps to identify the difference in lung capacity between smokers and non-smokers.<br>
    If it doesn't work, please refresh the page.
  `;
}

// 시간 포맷 함수
function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// 상태 메시지 업데이트 함수
function updateStatusMessage() {
  let message;
  if (seconds < 10) {
    message = `
      Severely Damaged Lungs<br>
      Your lung capacity is critically low. Please consult a healthcare professional.
    `;
  } else if (seconds < 20) {
    message = `
      Lungs That Need Care<br>
      Your lung capacity is below average. Consider improving your lung health.
    `;
  } else if (seconds < 30) {
    message = `
      Healthy Lungs<br>
      Your lung capacity is within the healthy range. Keep up the good work!
    `;
  } else {
    message = `
      Amazing Lungs<br>
      Your lung capacity is exceptional. You have incredibly healthy lungs!
    `;
  }
  statusMessage.innerHTML = message;
}

// 결과 차트 표시 함수
function showResults() {
  container.style.display = 'none';
  chartContainer.style.display = 'flex';

  const ctx = document.getElementById('resultChart').getContext('2d');
  const averageNonSmoker = 40;
  const averageSmoker = 20;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Your Average', 'Non-Smoker Average', 'Smoker Average'],
      datasets: [{
        label: 'Breath Time (seconds)',
        data: [seconds, averageNonSmoker, averageSmoker],
        backgroundColor: ['#4f46e5', '#22c55e', '#ef4444'],
        borderColor: ['#3730a3', '#16a34a', '#dc2626'],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Breath Time (seconds)'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Category'
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Breath Capacity Comparison'
        }
      }
    }
  });
}

// 처음으로 돌아가기 함수
function goBack() {
  chartContainer.style.display = 'none';
  container.style.display = 'flex';
}

// 페이지 로드 시 초기화
window.onload = () => {
  createCircles();
  startBtn.addEventListener('click', toggleTimer);
  resetBtn.addEventListener('click', resetTimer);
  resultBtn.addEventListener('click', showResults);
};