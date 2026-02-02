import {sideBar_dash,attachNavbarListeners} from "../components/NavBar.js"

export function renderTask(){

    const tasks = document.getElementById("app")
    tasks.innerHTML = `
    
  <body class="app-body app-body--soft">
    <div class="dashboard">
      ${sideBar_dash()}
      <main class="main main--soft">
        <header class="topbar topbar--light">
          <div class="topbar__breadcrumb">
            <span class="crumb">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-9.5Z"
                  fill="none"
                  stroke-width="1.6"
                  stroke-linejoin="round"
                />
              </svg>
              Dashboard
            </span>
            <span class="crumb__divider">›</span>
            <span>My Tasks</span>
          </div>
          <div class="topbar__right">
            <button class="icon-pill" aria-label="Notifications">🔔</button>
            <div class="user">
              <div class="user__avatar user__avatar--photo"></div>
              <div>
                <div class="user__name">Alex Morgan</div>
                <div class="user__role">Product Designer</div>
              </div>
              <span class="user__chevron">▾</span>
            </div>
            <a class="icon-pill" href="/login" aria-label="Logout">⤴</a>
          </div>
        </header>

        <section class="hero hero--spaced">
          <div>
            <h1>Task Management</h1>
            <p>View, edit, and organize all academic tasks in one place.</p>
          </div>
          <a class="primary primary--small" href="/createtaks">+ New Task</a>
        </section>

        <section class="stats stats--compact">
          <article class="stat-card">
            <div>
              <div class="stat-card__label">Total Tasks</div>
              <div class="stat-card__value">128</div>
            </div>
            <div class="stat-card__icon stat__icon--blue">▣</div>
          </article>
          <article class="stat-card">
            <div>
              <div class="stat-card__label">In Progress</div>
              <div class="stat-card__value">12</div>
            </div>
            <div class="stat-card__icon stat__icon--orange">✳</div>
          </article>
          <article class="stat-card">
            <div>
              <div class="stat-card__label">Completed</div>
              <div class="stat-card__value">84</div>
            </div>
            <div class="stat-card__icon stat__icon--green">✓</div>
          </article>
          <article class="stat-card">
            <div>
              <div class="stat-card__label">Pending Review</div>
              <div class="stat-card__value">32</div>
            </div>
            <div class="stat-card__icon stat__icon--purple">◴</div>
          </article>
        </section>

        <section class="task-panel">
          <div class="task-panel__toolbar">
            <label class="search search--compact">
              <span aria-hidden="true">🔍</span>
              <input type="text" placeholder="Search by title, ID, or tag..." />
            </label>
          </div>

          <div class="table table--tasks">
            <div class="table__row table__row--head table__row--tasks">
              <div><input class="checkbox" type="checkbox" aria-label="Select all" /></div>
              <div>Task Name</div>
              <div>Category</div>
              <div>Priority</div>
              <div>Status</div>
            </div>
            <div class="table__row table__row--tasks">
              <div><input class="checkbox" type="checkbox" /></div>
              <div>
                <div class="task-name">Advanced Calculus Finals Prep</div>
                <div class="task-meta">ID: #MATH-402 • Due in 2 days</div>
              </div>
              <div><span class="pill">Mathematics</span></div>
              <div><span class="dot dot--red"></span> High</div>
              <div><span class="badge badge--warn">Pending</span></div>
            </div>
            <div class="table__row table__row--tasks">
              <div><input class="checkbox" type="checkbox" /></div>
              <div>
                <div class="task-name">Physics Lab Report: Quantum Mechanics</div>
                <div class="task-meta">ID: #PHYS-301 • Due tomorrow</div>
              </div>
              <div><span class="pill">Physics</span></div>
              <div><span class="dot dot--orange"></span> Medium</div>
              <div><span class="badge badge--info">In Progress</span></div>
            </div>
            <div class="table__row table__row--tasks">
              <div><input class="checkbox" type="checkbox" /></div>
              <div>
                <div class="task-name">History Essay: Industrial Revolution</div>
                <div class="task-meta">ID: #HIST-101 • Submitted</div>
              </div>
              <div><span class="pill">History</span></div>
              <div><span class="dot dot--green"></span> Low</div>
              <div><span class="badge badge--ok">Completed</span></div>
            </div>
            <div class="table__row table__row--tasks">
              <div><input class="checkbox" type="checkbox" /></div>
              <div>
                <div class="task-name">Database Systems Project: Phase 1</div>
                <div class="task-meta">ID: #CS-204 • Group Assignment</div>
              </div>
              <div><span class="pill">Computer Science</span></div>
              <div><span class="dot dot--red"></span> High</div>
              <div><span class="badge badge--info">In Progress</span></div>
            </div>
            <div class="table__row table__row--tasks">
              <div><input class="checkbox" type="checkbox" /></div>
              <div>
                <div class="task-name">English Lit: Modernist Poetry</div>
                <div class="task-meta">ID: #ENG-305 • Reading</div>
              </div>
              <div><span class="pill">Literature</span></div>
              <div><span class="dot dot--orange"></span> Medium</div>
              <div><span class="badge badge--warn">Pending</span></div>
            </div>
          </div>

          <div class="table__footer">Showing 1 to 5 of 128 results</div>
        </section>
      </main>
    </div>

    `;


}