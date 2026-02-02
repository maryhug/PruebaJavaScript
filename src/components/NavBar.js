import sessionManager from "../state/sessionManager.js";  // ← IMPORTA AQUÍ
import router from "../router/Router.js";  // Para navegación
import { showNotification } from "../utils/helpers.js";  // Para logout

export function sideBar_dash() {
    const session = sessionManager.getSession();  // ← LOCAL A ESTA FUNCIÓN
    if (!session) return '<div>No session</div>';

    return `
     <aside class="sidebar">
        <div class="sidebar__brand">
            <div class="brand__logo" aria-hidden="true">
                <svg viewBox="0 0 48 48" role="img" aria-label="Logo">
                    <rect x="4" y="4" width="40" height="40" rx="10" />
                    <path d="M20 14c4 2 6 6 6 10s-2 8-6 10M28 14c4 2 6 6 6 10s-2 8-6 10" fill="none" stroke-width="3" stroke-linecap="round" />
                    <circle cx="24" cy="24" r="3.5" />
                </svg>
            </div>
            <div class="brand__name">CRUDZASO</div>
        </div>

        <nav class="nav">
            <a class="nav__item nav__item--active" href="/dashboard" data-route="/dashboard">
                <span class="nav__icon">▦</span> Dashboard
            </a>
            <a class="nav__item" href="/tasks" data-route="/tasks">
                <span class="nav__icon">☑</span> My Tasks
            </a>
            <a class="nav__item" href="/profile" data-route="/profile">
                <span class="nav__icon">👤</span> Profile
            </a>
            ${session.role === 'admin' ? `
                <a class="nav__item" href="/admin" data-route="/admin">
                    <span class="nav__icon">⚙️</span> Admin
                </a>
            ` : ''}
        </nav>

        <div class="sidebar__footer">
            <button id="logoutBtn" class="logout-btn">Logout</button>
        </div>
    </aside>
    `;
}

export function sideBar_profile() {
    const session = sessionManager.getSession();  // ← LOCAL A ESTA FUNCIÓN
    if (!session) return '<div>No session</div>';

    return `
         <aside class="sidebar">
        <div class="sidebar__brand">
          <div class="brand__logo" aria-hidden="true">
            <svg viewBox="0 0 48 48" role="img" aria-label="Logo">
              <rect x="4" y="4" width="40" height="40" rx="10" />
              <path d="M20 14c4 2 6 6 6 10s-2 8-6 10M28 14c4 2 6 6 6 10s-2 8-6 10" fill="none" stroke-width="3" stroke-linecap="round" />
              <circle cx="24" cy="24" r="3.5" />
            </svg>
          </div>
          <div class="brand__name">CRUDZASO</div>
        </div>

        <nav class="nav">
          <a class="nav__item" href="/dashboard" data-route="/dashboard">
            <span class="nav__icon">▦</span> Dashboard
          </a>
          <a class="nav__item" href="/tasks" data-route="/tasks">
            <span class="nav__icon">☑</span> My Tasks
          </a>
          <a class="nav__item nav__item--active" href="/profile" data-route="/profile">
            <span class="nav__icon">👤</span> Profile
          </a>
          ${session.role === 'admin' ? `
            <a class="nav__item" href="/admin" data-route="/admin">
              <span class="nav__icon">⚙️</span> Admin
            </a>
          ` : ''}
        </nav>

        <div class="sidebar__footer">
          <div class="user-info">
            <div class="mini-user__avatar"></div>
            <div>
              <span>${session.fullName}</span>
              <small>${session.role}</small>
            </div>
          </div>
          <button id="logoutBtn" class="logout-btn">Logout</button>
        </div>
      </aside>
    `;
}

export function attachNavbarListeners() {
    // Navigation links con data-route
    document.querySelectorAll('[data-route]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            router.navigate(e.target.dataset.route);
        });
    });

    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('¿Estás seguro de cerrar sesión?')) {
                sessionManager.destroySession();
                showNotification('Sesión cerrada exitosamente', 'success');
                router.navigate('/login');
            }
        });
    }
}
