import router from "../router/Router";
import taskService from "../services/taskService";
import { showNotification, formatDateForInput } from "../utils/helpers.js";


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
        <a class="breadcrumb__link" href="/dashboard" data-route="/dashboard">← Back to Tasks</a>
        <span class="breadcrumb__divider">/</span>
        <span>Create New</span>
      </div>

      <h1 class="page-title">Create New Task</h1>

      <section class="form-card">
        <form id="createTaskForm" class="form-grid" action="#">
          <label class="field">
            <span>Task Title <span class="required">*</span></span>
            <input id="taskTitle" name="title" type="text" placeholder="e.g., Complete Quarter 3 Report" required />
          </label>

          <label class="field">
            <span>Category</span>
            <select id="taskCategory" name="category">
              <option value="" selected disabled>Select category...</option>
              <option>Mathematics</option>
              <option>Physics</option>
              <option>History</option>
              <option>Computer Science</option>
            </select>
          </label>

          <label class="field">
            <span>Priority</span>
            <select id="taskPriority" name="priority">
              <option value="low">Low</option>
              <option value="medium" selected>Medium</option>
              <option value="high">High</option>
            </select>
          </label>

          <label class="field">
            <span>Status</span>
            <select id="taskStatus" name="status">
              <option value="pending" selected>Pending</option>
              <option value="progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </label>

          <label class="field">
            <span>Due Date</span>
            <input id="taskDueDate" name="dueDate" type="date" />
          </label>

          <label class="field field--full">
            <span>Description</span>
            <textarea id="taskDescription" name="description" rows="5" placeholder="Add details about this task..."></textarea>
          </label>

          <div class="form-actions">
            <a class="button-secondary" href="/dashboard" data-route="/dashboard">Cancel</a>
            <button id="saveTaskBtn" class="primary primary--small" type="submit">
              Save Task
            </button>
          </div>
        </form>
      </section>
    </main>
  </body>

    `
    // Attach listeners
    attachCreateTaskListeners();
}

function attachCreateTaskListeners() {
    // Navigation for cancel/back link
    document.querySelectorAll('[data-route]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            router.navigate(e.target.dataset.route);
        });
    });

    const form = document.getElementById('createTaskForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('saveTaskBtn');
        btn.disabled = true;
        btn.textContent = 'Saving...';

        const name = document.getElementById('taskTitle').value.trim();
        const category = document.getElementById('taskCategory').value || '';
        const priority = document.getElementById('taskPriority').value.toLowerCase();
        const status = document.getElementById('taskStatus').value;
        const dueDateInput = document.getElementById('taskDueDate').value;
        const description = document.getElementById('taskDescription').value.trim();

        if (!name) {
            showNotification('Title is required', 'error');
            btn.disabled = false;
            btn.textContent = 'Save Task';
            return;
        }

        const taskData = {
            name,
            category,
            priority,
            status,
            dueDate: dueDateInput || new Date().toISOString().split('T')[0],
            description
        };

        try {
            await taskService.createTask(taskData); // -> src/services/taskService.js
            showNotification('Task created successfully', 'success');
            // esperar un poco para que se refresquen datos si es necesario
            setTimeout(() => router.navigate('/dashboard'), 500);
        } catch (err) {
            console.error('Create task failed:', err);
            showNotification('Failed to create task', 'error');
            btn.disabled = false;
            btn.textContent = 'Save Task';
        }
    });
}

const initCreateTask = async () => {
    guardRoute({ role: "user" });
    bindLogout();
    const session = getSession();
    const form = document.querySelector(".form-grid");
    if (!form || !session) return;

    const params = new URLSearchParams(window.location.search);
    const taskId = params.get("id");
    const titleEl = document.querySelector(".page-title");
    let existingTask = null;

    if (taskId) {
        try {
            const task = await apiFetch(`/tasks/${taskId}`);
            if (task.userId !== session.id) {
                window.location.href = "my-tasks.html";
                return;
            }
            existingTask = task;
            if (titleEl) titleEl.textContent = "Edit Task";
            const titleInput = form.querySelector('input[name="task-title"]');
            const dueInput = form.querySelector('input[name="due-date"]');
            if (titleInput) titleInput.value = task.title || "";
            if (dueInput) dueInput.value = task.dueDate || "";
            const selects = form.querySelectorAll("select");
            if (selects[0]) selects[0].value = task.category || "Mathematics";
            if (selects[1]) selects[1].value = task.priority || "Medium";
            if (selects[2])
                selects[2].value = STATUS_LABELS[task.status] ? STATUS_LABELS[task.status] : "Pending";
            const textarea = form.querySelector("textarea");
            if (textarea) textarea.value = task.description || "";
        } catch (error) {
            alert("No se pudo cargar la tarea.");
        }
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const data = parseForm(form);
        const payload = {
            title: data["task-title"] || "",
            category: data.category || "General",
            priority: data.priority || "Medium",
            status: normalizeStatus(data.status || "pending"),
            dueDate: data["due-date"] || data.dueDate || "",
            description: data.description || "",
            userId: session.id,
            createdAt: existingTask?.createdAt || new Date().toISOString(),
        };
        if (!payload.title.trim()) {
            alert("El título es obligatorio.");
            return;
        }
        try {
            if (taskId) {
                await updateTask(taskId, payload);
            } else {
                await createTask(payload);
            }
            window.location.href = "my-tasks.html";
        } catch (error) {
            alert("No se pudo guardar la tarea.");
        }
    });
};