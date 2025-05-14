// DASHBOARD | RS PROJECT
// This script handles the sidebar toggle, user management, dark mode, language selection, and sidebar position settings.


const toggleBtn = document.getElementById('toggleSidebar');
const sidebar = document.getElementById('sidebar');
const body = document.body;

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('expanded');
  body.classList.toggle('sidebar-expanded');
});


const users = [
  { id: 1, name: "سمير سمكره", email: "samir@example.com", role: "مشرف", status: "نشط" },
  { id: 2, name: "خالد كشميري", email: "khaled@example.com", role: "محرر", status: "نشط" },
  { id: 3, name: "يعقوب قمر الدين دبيازة", email: "jakob@example.com", role: "عضو", status: "محظور" },
  { id: 4, name: "خضر كرواتيه", email: "khdar@example.com", role: "عضو", status: "نشط" },
  { id: 5, name: "اسماعيل أحمد قنباوي", email: "ismael@example.com", role: "عضو", status: "محظور"},
  { id: 6, name: "عثمان عبدالجليل ششة", email: "othman@example.com", role: "عضو", status: "محظور" },
  { id: 7, name: "محمد سُمبل", email: "mohamed@example.com", role: "عضو", status: "محظور"},
  { id: 8, name: "سومبل عبد الجليل", email: "sombal@example.com", role: "عضو", status: "محظور" }
];

let editIndex = null;

function renderUsers(filter = "") {
  const tableBody = document.getElementById("userBody");
  tableBody.innerHTML = "";

  users
    .filter(u => u.name.includes(filter))
    .forEach((user, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>
          <span class="${user.status === 'نشط' ? 'status-active' : 'status-banned'}">
            ${user.status}
          </span>
        </td>
        <td>
          <button onclick="editUser(${index})">✏️</button>
          <button onclick="deleteUser(${index})">🗑️</button>
        </td>
      `;
      tableBody.appendChild(tr);
    });
}

function deleteUser(index) {
  if (confirm("هل أنت متأكد من حذف هذا المستخدم؟")) {
    users.splice(index, 1);
    renderUsers(document.getElementById("searchInput").value);
  }
}

function editUser(index) {
  editIndex = index;
  const user = users[index];
  document.getElementById("editName").value = user.name;
  document.getElementById("editEmail").value = user.email;
  document.getElementById("editRole").value = user.role;
  document.getElementById("editStatus").value = user.status;
  document.getElementById("editModal").style.display = "flex";
}

document.getElementById("saveEdit")?.addEventListener("click", () => {
  const user = users[editIndex];
  user.name = document.getElementById("editName").value;
  user.email = document.getElementById("editEmail").value;
  user.role = document.getElementById("editRole").value;
  user.status = document.getElementById("editStatus").value;
  document.getElementById("editModal").style.display = "none";
  renderUsers(document.getElementById("searchInput").value);
});

document.getElementById("cancelEdit")?.addEventListener("click", () => {
  document.getElementById("editModal").style.display = "none";
});

document.getElementById("searchInput")?.addEventListener("input", e => {
  renderUsers(e.target.value);
});

if (window.location.pathname.includes("users.html")) {
  renderUsers();
}

const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.checked = localStorage.getItem('darkMode') === 'true'; 

if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark'); 
}

darkModeToggle.addEventListener('change', () => {
  if (darkModeToggle.checked) {
    document.body.classList.add('dark'); 
    localStorage.setItem('darkMode', 'true'); 
  } else {
    document.body.classList.remove('dark'); 
    localStorage.setItem('darkMode', 'false'); 
  }
});

const languageSelect = document.getElementById('languageSelect');
languageSelect.value = localStorage.getItem('language') || 'ar'; 

languageSelect.addEventListener('change', () => {
  const language = languageSelect.value;
  localStorage.setItem('language', language); 
  
});

const sidebarPosition = document.getElementById('sidebarPosition');
sidebarPosition.value = localStorage.getItem('sidebarPosition') || 'left'; 

if (localStorage.getItem('sidebarPosition') === 'right') {
  document.body.classList.add('sidebar-left'); 
} else {
  document.body.classList.remove('sidebar-left'); 
}

sidebarPosition.addEventListener('change', () => {
  const position = sidebarPosition.value;
  localStorage.setItem('sidebarPosition', position); 
  
  if (position === 'right') {
    document.body.classList.add('sidebar-left'); 
  } else {
    document.body.classList.remove('sidebar-left'); 
  }
});


const saveSettingsButton = document.getElementById('saveSettings');
saveSettingsButton.addEventListener('click', () => {
  const lang = localStorage.getItem('language') || 'ar';

  let message = '';
  switch (lang) {
    case 'en':
      message = 'Settings saved successfully';
      break;
    case 'es':
      message = 'Configuración guardada con éxito';
      break;
    case 'fr':
      message = 'Paramètres enregistrés avec succès';
      break;
    default:
      message = 'تم حفظ الإعدادات'; // Arabic as default
  }

  alert(message);
});

