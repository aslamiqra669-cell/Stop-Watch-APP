// ===== Digital Watch (Stopwatch) =====
const hoursEl   = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const millisEl  = document.getElementById("millis");
const statusEl  = document.getElementById("status");
const startBtn  = document.getElementById("startBtn");
const stopBtn   = document.getElementById("stopBtn");
const resetBtn  = document.getElementById("resetBtn");

let timerId = null;      // setInterval ki id
let startTime = 0;       // jab start dabaya
let elapsed = 0;         // ab tak ka total waqt (ms)
let running = false;

const pad = (n, size = 2) => String(n).padStart(size, "0");

function render() {
  const ms = Math.floor((elapsed % 1000) / 10);
  const s  = Math.floor(elapsed / 1000) % 60;
  const m  = Math.floor(elapsed / 60000) % 60;
  const h  = Math.floor(elapsed / 3600000);
  hoursEl.textContent = pad(h);
  minutesEl.textContent = pad(m);
  secondsEl.textContent = pad(s);
  millisEl.textContent = pad(ms);
}

function formatTime() {
  return `${hoursEl.textContent}:${minutesEl.textContent}:${secondsEl.textContent}.${millisEl.textContent}`;
}

function start() {
  if (running) return;
  running = true;
  startTime = Date.now() - elapsed; // jahan ruka tha wahin se chalega
  timerId = setInterval(() => {
    elapsed = Date.now() - startTime;
    render();
  }, 10);
  startBtn.disabled = true;
  stopBtn.disabled = false;
  statusEl.textContent = "Running";
  console.log("▶ Step 1: START dabaya - watch chalna shuru ho gayi");
}

function stop() {
  if (!running) return;
  running = false;
  clearInterval(timerId);
  timerId = null;
  startBtn.disabled = false;
  startBtn.textContent = "Resume";
  stopBtn.disabled = true;
  statusEl.textContent = "Stopped";
  console.log("⏹ Step 2: STOP dabaya - watch ruk gayi. Waqt: " + formatTime());
}

function reset() {
  clearInterval(timerId);
  timerId = null;
  running = false;
  elapsed = 0;
  render();
  startBtn.disabled = false;
  startBtn.textContent = "Start";
  stopBtn.disabled = true;
  statusEl.textContent = "Ready";
  console.log("🔄 Step 3: RESET dabaya - watch 00:00:00.00 par wapas");
}

startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
resetBtn.addEventListener("click", reset);

render();
console.log("✅ Watch tayyar hai. Start dabayein.");