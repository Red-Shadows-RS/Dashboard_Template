// SETTINGS LOADER | RS PROJECT
// This script loads the settings from localStorage and applies them to the page.

if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark');
}

if (localStorage.getItem('sidebarPosition') === 'right') {
  document.body.classList.add('sidebar-left');
} else {
  document.body.classList.remove('sidebar-left');
}
