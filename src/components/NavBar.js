export function sideBar_dash() {

        return `
     <aside class="sidebar">
        <div class="sidebar__brand">
            <div class="brand__logo" aria-hidden="true">
                <svg viewBox="0 0 48 48" role="img" aria-label="Logo">
                    <rect x="4" y="4" width="40" height="40" rx="10" />
                    <path
                        d="M20 14c4 2 6 6 6 10s-2 8-6 10M28 14c4 2 6 6 6 10s-2 8-6 10"
                        fill="none"
                        stroke-width="3"
                        stroke-linecap="round"
                    />
                    <circle cx="24" cy="24" r="3.5" />
                </svg>
            </div>
            <div class="brand__name">CRUDZASO</div>
        </div>

        <nav class="nav">
            <a class="nav__item nav__item--active" href="/dashboard">
                <span class="nav__icon">▦</span>
                Dashboard
            </a>
            <a class="nav__item" href="/admintaks">
                <span class="nav__icon">☑</span>
                My Tasks
            </a>
            <a class="nav__item" href="/profile">
                <span class="nav__icon">👤</span>
                Profile
            </a>
        </nav>
    </aside>
    
    `;
}

export function sideBar_profile() {
    return `
         <aside class="sidebar">
        <div class="sidebar__brand">
          <div class="brand__logo" aria-hidden="true">
            <svg viewBox="0 0 48 48" role="img" aria-label="Logo">
              <rect x="4" y="4" width="40" height="40" rx="10" />
              <path
                d="M20 14c4 2 6 6 6 10s-2 8-6 10M28 14c4 2 6 6 6 10s-2 8-6 10"
                fill="none"
                stroke-width="3"
                stroke-linecap="round"
              />
              <circle cx="24" cy="24" r="3.5" />
            </svg>
          </div>
          <div class="brand__name">CRUDZASO</div>
        </div>

        <nav class="nav">
          <a class="nav__item" href="/dashboard">
            <span class="nav__icon">▦</span>
            Dashboard
          </a>
          <a class="nav__item" href="/admintaks">
            <span class="nav__icon">☑</span>
            My Tasks
          </a>
          <a class="nav__item nav__item--active" href="/profile">
            <span class="nav__icon">👤</span>
            Profile
          </a>
        </nav>

        <div class="sidebar__footer">
          <div class="mini-user">
            <div class="mini-user__avatar"></div>
            <div>
              <div class="mini-user__name">Dr. Sarah J.</div>
              <div class="mini-user__role">Admin</div>
            </div>
          </div>
        </div>
      </aside>
    `
}


export function attachNavbarListeners() {
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const route = e.target.dataset.route;
            router.navigate(route);
        });
    });

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            const confirmed = confirm('Are you sure you want to logout?');
            if (confirmed) {
                sessionManager.destroySession();
                showNotification('Logged out successfully', 'success');
                router.navigate('/login');
            }
        });
    }
}