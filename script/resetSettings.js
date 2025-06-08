// RESET SETTINGS | RS PROJECT
// This script resets the settings to their default values when the reset button is clicked.
// It clears all input fields, toggles dark mode off, resets the language to Arabic, and sets the sidebar position to the right.

document.addEventListener('DOMContentLoaded', () => {
  const resetBtn = document.querySelector('.reset-btn');

  if (!resetBtn) return;

  resetBtn.addEventListener('click', () => {
    const lang = localStorage.getItem('language') || 'ar';

    const confirmMessages = {
      en: 'Are you sure you want to reset settings to default?',
      es: '¿Estás seguro de que deseas restablecer la configuración a los valores predeterminados?',
      fr: 'Êtes-vous sûr de vouloir réinitialiser les paramètres par défaut ?',
      ar: 'هل أنت متأكد أنك تريد إعادة ضبط الإعدادات إلى وضعها الافتراضي؟'
    };

    const successMessages = {
      en: 'Settings have been reset to default.',
      es: 'La configuración se ha restablecido a los valores predeterminados.',
      fr: 'Les paramètres ont été réinitialisés par défaut.',
      ar: 'تمت إعادة ضبط الإعدادات إلى الوضع الافتراضي.'
    };

    if (!confirm(confirmMessages[lang] || confirmMessages['ar'])) return;

    document.querySelectorAll('.settings-form input[type="text"], .settings-form input[type="email"], .settings-form input[type="password"]')
      .forEach(input => input.value = '');

    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
      darkModeToggle.checked = false;
      document.body.classList.remove('dark-mode');
    }

    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) languageSelect.value = 'ar';

    const sidebar = document.getElementById('sidebar');
    const sidebarPosition = document.getElementById('sidebarPosition');
    if (sidebar && sidebarPosition) {
      sidebarPosition.value = 'right';
      sidebar.style.left = '';
      sidebar.style.right = '0';
      document.body.classList.remove('sidebar-left');
    }

    document.querySelectorAll('.settings-section input[type="checkbox"]')
      .forEach(checkbox => checkbox.checked = false);

    localStorage.removeItem('darkMode');
    localStorage.removeItem('language');
    localStorage.removeItem('sidebarPosition');

    alert(successMessages[lang] || successMessages['ar']);

    location.reload();
  });
});
