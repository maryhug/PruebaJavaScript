import api from './api.js';  // Tu api service existente
import sessionManager from '../state/sessionManager.js';
import { showNotification } from '../utils/helpers.js';

// Filtrar status
const STATUS_FILTERS = {
    all: () => true,
    pending: task => task.status === 'pending',
    completed: task => task.status === 'completed',
    progress: task => task.status === 'progress'
};

class TaskService {
    constructor() {
        this.tasks = [];
        this.filteredTasks = [];
        this.currentFilter = 'all';
        this.searchTerm = '';
        this.stats = {
            total: 0,
            completed: 0,
            pending: 0,
            progress: 0
        };
    }

    // Cargar y cachear tasks
    async loadTasks() {
        try {
            this.tasks = await api.get('/tasks');
            this.updateFilteredTasks();
            this.calculateStats();
            return this.filteredTasks;
        } catch (error) {
            showNotification('Error loading tasks', 'error');
            console.error('TaskService.loadTasks:', error);
            return [];
        }
    }

    // Filtrar + buscar
    updateFilteredTasks(filter = this.currentFilter, search = this.searchTerm) {
        this.currentFilter = filter;
        this.searchTerm = search;

        this.filteredTasks = this.tasks
            .filter(STATUS_FILTERS[filter] || STATUS_FILTERS.all)
            .filter(task =>
                task.name.toLowerCase().includes(search.toLowerCase()) ||
                task.assignee.toLowerCase().includes(search.toLowerCase())
            );
    }

    // Calcular stats dinámicas
    calculateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.status === 'completed').length;
        const pending = total - completed;
        const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

        this.stats = { total, completed, pending, progress };
        return this.stats;
    }

    // CRUD operations
    async createTask(taskData) {
        try {
            const user = sessionManager.getSession();
            const newTask = {
                ...taskData,
                id: Date.now().toString(),  // Temporal hasta server
                assignee: user.fullName,
                assignedTo: user.id,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            const created = await api.post('/tasks', newTask);
            await this.loadTasks();  // Refresh
            return created;
        } catch (error) {
            showNotification('Failed to create task', 'error');
            throw error;
        }
    }

    async updateTask(id, updates) {
        try {
            updates.updatedAt = new Date().toISOString();
            const updated = await api.put(`/tasks/${id}`, updates);
            await this.loadTasks();
            return updated;
        } catch (error) {
            showNotification('Failed to update task', 'error');
            throw error;
        }
    }

    async deleteTask(id) {
        try {
            await api.delete(`/tasks/${id}`);
            await this.loadTasks();
            showNotification('Task deleted', 'success');
        } catch (error) {
            showNotification('Failed to delete task', 'error');
            throw error;
        }
    }

    // Getters
    getTasks() { return this.filteredTasks; }
    getStats() { return this.stats; }
    getTask(id) { return this.tasks.find(t => t.id === id); }

    // Setters
    setFilter(filter) {
        this.updateFilteredTasks(filter);
        return this.filteredTasks;
    }
    setSearch(search) {
        this.updateFilteredTasks(this.currentFilter, search);
        return this.filteredTasks;
    }
}

// Singleton instance
const taskService = new TaskService();
export default taskService;
