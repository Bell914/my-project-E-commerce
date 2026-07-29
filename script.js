// PART 1: Theme Toggle & Header Initialization
document.addEventListener('DOMContentLoaded', () => {
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
