import sessionManager from '../state/sessionManager.js';
import taskService from '../services/taskService.js';
import router from "../router/Router.js";
import { sideBar_dash, attachNavbarListeners } from "../components/NavBar.js";

export async function renderDashboard() {
    const dashboard = document.getElementById('app');
    const session = sessionManager.getSession();

    if (!session) {
        router.navigate('/login');
        return;
    }

    try {
        await taskService.loadTasks();
        const stats = taskService.getStats();
        const tasks = taskService.getTasks();

        dashboard.innerHTML = `
            <div class="dashboard">
                ${sideBar_dash()}
                <main class="main">                       
                    <section class="hero">
                        <div>
                            <h1>Task Manager</h1>
                            <p>Welcome back, ${session.fullName}! Overview of your tasks.</p>  <!-- ← Personalizado -->
                        </div>
                        <a class="primary primary--small" href="/create-task" data-route="/create-task">+ New Task</a>
                    </section>

                    <section class="stats">
                        <article class="stat">
                            <div class="stat__header">
                                <span>Total Tasks</span><span class="stat__icon stat__icon--blue">▣</span>
                            </div>
                            <div class="stat__value">${stats.total}</div>
                            <div class="stat__meta stat__meta--up">+12% from last week</div>
                        </article>
                        <article class="stat">
                            <div class="stat__header">
                                <span>Completed</span><span class="stat__icon stat__icon--green">✓</span>
                            </div>
                            <div class="stat__value">${stats.completed}</div>
                            <div class="stat__meta stat__meta--ok">On track</div>
                        </article>
                        <article class="stat">
                            <div class="stat__header">
                                <span>Pending</span><span class="stat__icon stat__icon--orange">◔</span>
                            </div>
                            <div class="stat__value">${stats.pending}</div>
                            <div class="stat__meta stat__meta--warn">${stats.pending} High Priority</div>
                        </article>
                        <article class="stat">
                            <div class="stat__header">
                                <span>Overall Progress</span><span class="stat__icon stat__icon--purple">◴</span>
                            </div>
                            <div class="stat__value">${stats.progress}%</div>
                            <div class="stat__meta stat__meta--ok">Keep it up</div>
                        </article>
                    </section>

                    <section class="tasks">
                        <div class="tasks__toolbar">
                            <label class="search">
                                <span>🔍</span>
                                <input id="taskSearch" type="text" placeholder="Search tasks..." />
                            </label>
                            <div class="tabs">
                                <button class="tab tab--active" data-filter="all">All Tasks</button>
                                <button class="tab" data-filter="pending">Pending</button>
                                <button class="tab" data-filter="completed">Completed</button>
                                <button class="tab" data-filter="progress">In Progress</button>
                            </div>
                        </div>

                        <div class="table">
                            <div class="table__row table__row--head">
                                <div>Task Name</div><div>Assignee</div><div>Status</div><div>Priority</div><div>Due Date</div><div>Actions</div>
                            </div>
                            ${tasks.length ? tasks.map(task => `
                                <div class="table__row">
                                    <div>${task.name}</div>
                                    <div class="assignee">
                                        <span class="avatar">${task.assignee.charAt(0)}</span> ${task.assignee}
                                    </div>
                                    <div><span class="badge badge--${task.status === 'completed' ? 'ok' : task.status === 'pending' ? 'warn' : 'info'}">${task.status}</span></div>
                                    <div><span class="dot dot--${task.priority}"></span> ${task.priority}</div>
                                    <div>${new Date(task.dueDate).toLocaleDateString()}</div>
                                    <div class="actions">
                                        <button data-action="edit" data-id="${task.id}">✎</button>
                                        <button data-action="delete" data-id="${task.id}">🗑</button>
                                    </div>
                                </div>
                            `).join('') : '<div class="table__row"><div>No tasks found</div></div>'}
                        </div>
                    </section>
                </main>
           </div>
        `;

        attachNavbarListeners();  // ← Activa listeners de navegación/logout
        setupDashboardListeners();  // Tus listeners de tasks
    } catch (error) {
        console.error('Dashboard load error:', error);
    }
}

function setupDashboardListeners() {
    const searchInput = document.getElementById('taskSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            taskService.setSearch(e.target.value);
            renderDashboard();
        });
    }

    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            document.querySelector('.tab--active')?.classList.remove('tab--active');
            e.target.classList.add('tab--active');
            taskService.setFilter(e.target.dataset.filter);
            renderDashboard();
        });
    });

    document.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = e.target.dataset.id;
            if (e.target.dataset.action === 'delete' && confirm('Delete task?')) {
                await taskService.deleteTask(id);
                renderDashboard();
            }
        });
    });

    document.querySelector('[data-route="/create-task"]')?.addEventListener('click', (e) => {
        e.preventDefault();
        router.navigate('/create-task');
    });
}
