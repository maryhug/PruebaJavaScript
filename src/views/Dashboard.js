import sessionManager from "../state/sessionManager";
import eventService from "../services/eventService";
import { formatDate, showNotification } from '../utils/helpers.js';
import {sideBar_dash,attachNavbarListeners} from "../components/NavBar.js"
import {renderSidebar} from "../components/Menu.js"

export function renderDashboard() {

    const dashboard = document.getElementById('app');
    const session = sessionManager.getSession();

    dashboard.innerHTML = `
   
        <div class="dashboard">
            ${sideBar_dash()}
            <main class="main">
                ${renderSidebar()}        
                <section class="hero">
                    <div>
                        <h1>Task Manager</h1>
                        <p>Overview of your current academic performance tasks.</p>
                    </div>
                    <a class="primary primary--small" href="/create-task">+ New Task</a>
                </section>
        
                <section class="stats">
                    <article class="stat">
                        <div class="stat__header">
                            <span>Total Tasks</span>
                            <span class="stat__icon stat__icon--blue">▣</span>
                        </div>
                        <div class="stat__value">24</div>
                        <div class="stat__meta stat__meta--up">+12% from last week</div>
                    </article>
                    <article class="stat">
                        <div class="stat__header">
                            <span>Completed</span>
                            <span class="stat__icon stat__icon--green">✓</span>
                        </div>
                        <div class="stat__value">18</div>
                        <div class="stat__meta stat__meta--ok">On track</div>
                    </article>
                    <article class="stat">
                        <div class="stat__header">
                            <span>Pending</span>
                            <span class="stat__icon stat__icon--orange">◔</span>
                        </div>
                        <div class="stat__value">6</div>
                        <div class="stat__meta stat__meta--warn">2 High Priority</div>
                    </article>
                    <article class="stat">
                        <div class="stat__header">
                            <span>Overall Progress</span>
                            <span class="stat__icon stat__icon--purple">◴</span>
                        </div>
                        <div class="stat__value">75%</div>
                        <div class="stat__meta stat__meta--ok">Keep it up</div>
                    </article>
                </section>
        
                <section class="tasks">
                    <div class="tasks__toolbar">
                        <label class="search">
                            <span aria-hidden="true">🔍</span>
                            <input type="text" placeholder="Search tasks..." />
                        </label>
                        <div class="tabs">
                            <button class="tab tab--active" type="button">All Tasks</button>
                            <button class="tab" type="button">Pending</button>
                            <button class="tab" type="button">Completed</button>
                        </div>
                    </div>
        
                    <div class="table">
                        <div class="table__row table__row--head">
                            <div>Task Name</div>
                            <div>Assignee</div>
                            <div>Status</div>
                            <div>Priority</div>
                            <div>Due Date</div>
                            <div>Actions</div>
                        </div>
                        <div class="table__row">
                            <div>Update Documentation</div>
                            <div class="assignee">
                                <span class="avatar">SL</span>
                                Sarah Lin
                            </div>
                            <div><span class="badge badge--info">In Progress</span></div>
                            <div><span class="dot dot--orange"></span> Medium</div>
                            <div>Oct 24, 2023</div>
                            <div class="actions">✎ 🗑</div>
                        </div>
                        <div class="table__row">
                            <div>Fix Login Authentication</div>
                            <div class="assignee">
                                <span class="avatar avatar--photo">RP</span>
                                Raj Patel
                            </div>
                            <div><span class="badge badge--warn">Pending</span></div>
                            <div><span class="dot dot--red"></span> High</div>
                            <div class="text--red">Oct 22, 2023</div>
                            <div class="actions">✎ 🗑</div>
                        </div>
                        <div class="table__row">
                            <div>Quarterly Review</div>
                            <div class="assignee">
                                <span class="avatar avatar--photo">MO</span>
                                Michelle O.
                            </div>
                            <div><span class="badge badge--ok">Completed</span></div>
                            <div><span class="dot dot--green"></span> Low</div>
                            <div>Oct 20, 2023</div>
                            <div class="actions">👁</div>
                        </div>
                        <div class="table__row">
                            <div>Database Optimization</div>
                            <div class="assignee">
                                <span class="avatar avatar--photo">CM</span>
                                Carlos M.
                            </div>
                            <div><span class="badge badge--info">In Progress</span></div>
                            <div><span class="dot dot--red"></span> High</div>
                            <div>Oct 25, 2023</div>
                            <div class="actions">✎ 🗑</div>
                        </div>
                    </div>
                </section>
            </main>
    </div>

    `
    attachNavbarListeners();
  //  await loadDashboardData();
    setupDashboardListeners();
}

async function loadDashboardData() {
    try {
        // Load user's events
        const myEventsResult = await eventService.getUserEvents();
        const allEventsResult = await eventService.getAllEvents();

        if (myEventsResult.success && allEventsResult.success) {
            const myEvents = myEventsResult.data;
            const allEvents = allEventsResult.data;

            // Update stats
            updateStats(myEvents, allEvents);

            // Show upcoming events
            displayUpcomingEvents(myEvents);
        }

    } catch (error) {
        console.error('Error loading dashboard:', error);
        showNotification('Failed to load dashboard data', 'error');
    }
}

function updateStats(myEvents, allEvents) {
    const statsContainer = document.getElementById('dashboardStats');

    const totalRegistered = myEvents.length;
    const totalAvailable = allEvents.filter(e => e.status === 'active').length;
    const upcomingEvents = myEvents.filter(e => new Date(e.date) > new Date()).length;

    statsContainer.innerHTML = `
        <div class="stat-card">
            <div class="stat-icon">📊</div>
            <div class="stat-content">
                <h3 class="stat-value">${totalRegistered}</h3>
                <p class="stat-label">Events Registered</p>
            </div>
        </div>
        
        <div class="stat-card">
            <div class="stat-icon">⏳</div>
            <div class="stat-content">
                <h3 class="stat-value">${upcomingEvents}</h3>
                <p class="stat-label">Upcoming Events</p>
            </div>
        </div>
        
        <div class="stat-card">
            <div class="stat-icon">🎯</div>
            <div class="stat-content">
                <h3 class="stat-value">${totalAvailable}</h3>
                <p class="stat-label">Available Events</p>
            </div>
        </div>
    `;
}

function displayUpcomingEvents(events) {
    const container = document.getElementById('upcomingEvents');

    // Filter upcoming events
    const upcoming = events
        .filter(e => new Date(e.date) > new Date())
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 3);

    if (upcoming.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>You don't have any upcoming events</p>
                <a href="#" class="btn btn-primary" data-route="/events">Browse Events</a>
            </div>
        `;
        return;
    }

    container.innerHTML = upcoming.map(event => `
        <div class="upcoming-event-card">
            <div class="event-date-badge">
                <span class="date-day">${new Date(event.date).getDate()}</span>
                <span class="date-month">${new Date(event.date).toLocaleString('en', { month: 'short' })}</span>
            </div>
            
            <div class="event-info">
                <h4 class="event-name">${event.name}</h4>
                <p class="event-location">📍 ${event.location}</p>
            </div>
            
            <div class="event-action">
                <span class="badge badge-success">Registered</span>
            </div>
        </div>
    `).join('');
}

function setupDashboardListeners() {
    document.querySelectorAll('[data-route]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const route = e.target.closest('[data-route]').dataset.route;
            router.navigate(route);
        });
    });
}