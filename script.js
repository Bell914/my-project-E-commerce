// PART 1 & 3: Theme Toggle & Countdown Clock
document.addEventListener('DOMContentLoaded', () => {
  // Theme Setup
  const themeToggleBtn = document.getElementById('themeToggle');
  let currentTheme = localStorage.getItem('aura_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeUI(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', currentTheme);
      localStorage.setItem('aura_theme', currentTheme);
      updateThemeUI(currentTheme);
    });
  }

  // Flash Sale Countdown Clock
  startCountdown();
});

function updateThemeUI(theme) {
  const textEl = document.querySelector('.theme-text');
  const iconEl = document.querySelector('#themeToggle i');
  if (textEl && iconEl) {
    if (theme === 'dark') {
      textEl.textContent = 'Dark Mode';
      iconEl.className = 'fa-solid fa-moon';
    } else {
      textEl.textContent = 'Light Mode';
      iconEl.className = 'fa-solid fa-sun';
    }
  }
}

// Countdown Clock Function
function startCountdown() {
  let secondsLeft = 31335; // ~8 hours 42 mins 15 secs

  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  setInterval(() => {
    if (secondsLeft <= 0) secondsLeft = 86400;
    secondsLeft--;

    const h = Math.floor(secondsLeft / 3600);
    const m = Math.floor((secondsLeft % 3600) / 60);
    const s = secondsLeft % 60;

    if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(m).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(s).padStart(2, '0');
  }, 1000);
}
