import sessionManager from '../state/sessionManager.js';

export function renderSidebar() {
    const session = sessionManager.getSession();

    return `
                <header class="topbar">
                    <div class="topbar__breadcrumb">
                        <span>Dashboard</span>
                    </div>
                    <div class="topbar__right">
                        <button class="icon-pill" aria-label="Notifications">🔔</button>
                        <div class="user">
                            <div class="user__avatar">AM</div>
                            <div>
                                <div class="user__name">${session.fullName}</div>
                                <div class="user__role">Product Designer</div>
                            </div>
                            <span class="user__chevron">▾</span>
                        </div>
                        <a class="icon-pill" href="/" aria-label="Logout">⤴</a>
                    </div>
                </header>
    `;
}







