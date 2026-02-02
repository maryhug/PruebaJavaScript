import {sideBar_profile,attachNavbarListeners} from "../components/NavBar.js"
import sessionManager from "../state/sessionManager";
import {formatDate} from "../utils/helpers.js"

export function renderProfile() {

    const profile = document.getElementById("app");
    const session = sessionManager.getSession();

    profile.innerHTML = `
   
    <div class="dashboard">
    ${sideBar_profile()}
      <main class="main">
        <header class="profile-header">
          <h1>My Profile</h1>
        </header>

        <section class="profile-layout">
          <article class="profile-card">
            <div class="profile-card__cover"></div>
            <div class="profile-card__body">
              <div class="profile-card__avatar"></div>
              <h2>${session.fullName}</h2>
              <span class="profile-card__badge">${session.role}</span>
              <div class="profile-card__email">
                <span class="email-icon">✉</span>
                ${session.email}
              </div>
              <div class="profile-card__divider"></div>
              <div class="profile-card__stat">
                <div class="profile-card__stat-value">${session.assignee}</div>
                <div class="profile-card__stat-label">Tasks</div>
              </div>
            </div>
          </article>

          <article class="info-card">
            <div class="info-card__header">
              <h3>Personal Information</h3>
              <button class="button-secondary button-secondary--icon" type="button">
                ✎ Edit Profile
              </button>
            </div>
            <div class="info-grid">
              <div>
                <div class="info-label">Full Name</div>
                <div class="info-value"> ${session.fullName}</div>
              </div>
              <div>
                <div class="info-label">Employee ID</div>
                <div class="info-value"> ${session.userId}</div>
              </div>
              <div>
                <div class="info-label">Phone</div>
                <div class="info-value">+1 (555) 123-4567</div>
              </div>
              <div>
                <div class="info-label">Department</div>
                <div class="info-value">
                  <span class="pill pill--amber">Computer Science</span>
                </div>
              </div>
              <div>
                <div class="info-label">Role Level</div>
                <div class="info-value">Senior Administrator</div>
              </div>
              <div>
                <div class="info-label">Join Date</div>
                <div class="info-value">${session.loginTime}</div>
              </div>
            </div>
          </article>
        </section>
      </main>
    </div>
    `
}