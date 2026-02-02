
export function renderCreateTask() {

    const create = document.getElementById('app');

    create.innerHTML = `
   
    <header class="topbar topbar--wide">
      <div class="topbar__brand">
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

      <div class="topbar__right">
        <button class="icon-pill" aria-label="Notifications">🔔</button>
        <div class="user user--compact">
          <div>
            <div class="user__name">Alex Morgan</div>
            <div class="user__role">Admin</div>
          </div>
          <div class="user__avatar user__avatar--photo"></div>
          <span class="user__chevron">▾</span>
        </div>
        <a class="icon-pill" href="/login" aria-label="Logout">⤴</a>
      </div>
    </header>

    <main class="page-shell">
      <div class="breadcrumb">
        <a class="breadcrumb__link" href="/dashboard">← Back to Tasks</a>
        <span class="breadcrumb__divider">/</span>
        <span>Create New</span>
      </div>

      <h1 class="page-title">Create New Task</h1>

      <section class="form-card">
        <form class="form-grid" action="/taks">
          <label class="field">
            <span>Task Title <span class="required">*</span></span>
            <input type="text" placeholder="e.g., Complete Quarter 3 Report" />
          </label>

          <label class="field">
            <span>Category</span>
            <select>
              <option selected disabled>Select category...</option>
              <option>Mathematics</option>
              <option>Physics</option>
              <option>History</option>
              <option>Computer Science</option>
            </select>
          </label>

          <label class="field">
            <span>Priority</span>
            <select>
              <option>Low</option>
              <option selected>Medium</option>
              <option>High</option>
            </select>
          </label>

          <label class="field">
            <span>Status</span>
            <select>
              <option selected>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </label>

          <label class="field">
            <span>Due Date</span>
            <input type="text" placeholder="mm/dd/yyyy" />
          </label>

          <label class="field field--full">
            <span>Description</span>
            <textarea rows="5" placeholder="Add details about this task..."></textarea>
          </label>

          <div class="form-actions">
            <a class="button-secondary" href="/dashboard">Cancel</a>
            <button class="primary primary--small" type="submit">
              Save Task
            </button>
          </div>
        </form>
      </section>
    </main>
  </body>

    `

}

