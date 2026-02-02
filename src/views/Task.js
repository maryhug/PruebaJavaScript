import {sideBar_dash,attachNavbarListeners} from "../components/NavBar.js"
import taskService from "../services/taskService.js";
import sessionManager from "../state/sessionManager";

export function renderTask(){
    const session = sessionManager.getSession();

    const app = document.getElementById("app")
    app.innerHTML = `
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
                <div class="user__name">${session.fullName}</div>
                <div class="user__role">${session.role}</div>
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

        <section class="stats stats--compact" id="taskStats">
        </section>

        <section class="task-panel">
          <div class="task-panel__toolbar">
            <label class="search search--compact">
              <span aria-hidden="true">🔍</span>
              <input id="taskSearch" type="text" placeholder="Search by title, assignee, or ID..." />
            </label>
          </div>

          <div class="table table--tasks">
            <div class="table__row table__row--head table__row--tasks">
              <div><input id="selectAll" class="checkbox" type="checkbox" aria-label="Select all" /></div>
              <div>Task Name</div>
              <div>Category</div>
              <div>Priority</div>
              <div>Status</div>
              <div>Actions</div>
            </div>
            <div id="tasksList" class="table__body">
              <!-- tareas dinámicas -->
            </div>
          </div>

          <div id="tableFooter" class="table__footer">Loading...</div>
        </section>
      </main>
    </div>
  `;

    attachNavbarListeners();

    // Render helpers
    function renderStats(stats){
        const statsEl = document.getElementById('taskStats');
        statsEl.innerHTML = `
          <article class="stat-card">
            <div>
              <div class="stat-card__label">Total Tasks</div>
              <div class="stat-card__value">${stats.total}</div>
            </div>
            <div class="stat-card__icon stat__icon--blue">▣</div>
          </article>
          <article class="stat-card">
            <div>
              <div class="stat-card__label">Completed</div>
              <div class="stat-card__value">${stats.completed}</div>
            </div>
            <div class="stat-card__icon stat__icon--green">✓</div>
          </article>
          <article class="stat-card">
            <div>
              <div class="stat-card__label">Pending</div>
              <div class="stat-card__value">${stats.pending}</div>
            </div>
            <div class="stat-card__icon stat__icon--orange">✳</div>
          </article>
          <article class="stat-card">
            <div>
              <div class="stat-card__label">Progress</div>
              <div class="stat-card__value">${stats.progress}%</div>
            </div>
            <div class="stat-card__icon stat__icon--purple">◴</div>
          </article>
        `;
    }

    function renderTasks(tasks){
        const list = document.getElementById('tasksList');
        if(!tasks || tasks.length === 0){
            list.innerHTML = `<div class="table__row">No tasks found</div>`;
            return;
        }

        list.innerHTML = tasks.map(task => `
          <div class="table__row table__row--tasks" data-id="${task.id}">
            <div><input class="checkbox" type="checkbox" data-id="${task.id}" /></div>
            <div>
              <div class="task-name">${task.name}</div>
              <div class="task-meta">ID: #${task.id} • Due: ${task.dueDate || '—'}</div>
            </div>
            <div><span class="pill">${task.category || task.assignee || '—'}</span></div>
            <div><span class="dot ${task.priority === 'high' ? 'dot--red' : task.priority === 'medium' ? 'dot--orange' : 'dot--green'}"></span> ${task.priority || '—'}</div>
            <div><span class="badge ${task.status === 'completed' ? 'badge--ok' : task.status === 'progress' ? 'badge--info' : 'badge--warn'}">${task.status}</span></div>
            <div>
              <button class="btn-mark" data-id="${task.id}">${task.status === 'completed' ? 'Reopen' : 'Mark Completed'}</button>
              <button class="btn-delete" data-id="${task.id}">Delete</button>
            </div>
          </div>
        `).join('');

        // Attach action listeners
        document.querySelectorAll('.btn-mark').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.target.dataset.id;
                const t = taskService.getTask(id);
                const newStatus = t.status === 'completed' ? 'pending' : 'completed';
                await taskService.updateTask(id, {...t, status: newStatus});
                await loadAndRender();
            });
        });

        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.target.dataset.id;
                if(confirm('¿Eliminar tarea?')){
                    await taskService.deleteTask(id);
                    await loadAndRender();
                }
            });
        });
    }

    // Load + render
    async function loadAndRender(){
        const footer = document.getElementById('tableFooter');
        footer.textContent = 'Cargando...';
        try{
            await taskService.loadTasks();
            renderStats(taskService.getStats());
            renderTasks(taskService.getTasks());
            const s = taskService.getStats();
            footer.textContent = `Showing ${s.total > 0 ? taskService.getTasks().length : 0} of ${s.total} results`;
        }catch(err){
            footer.textContent = 'Error cargando tareas';
            console.error(err);
        }
    }

    // Search
    const searchInput = document.getElementById('taskSearch');
    searchInput.addEventListener('input', (e) => {
        const q = e.target.value || '';
        taskService.setSearch(q);
        renderTasks(taskService.getTasks());
    });

    // Initial load
    loadAndRender();

}