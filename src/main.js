import router from "./router/Router.js";
import sessionManager from "./state/sessionManager";

import { renderRegister } from "./auth/Register";
import { renderLogin } from './auth/Login.js'
import { renderDashboard } from "./views/Dashboard.js"
import { renderProfile } from "./views/Profile";
import {renderTask} from "./views/Task";
import {renderCreateTask} from "./views/CreateTask";


router.register('/login', renderLogin);
router.register('/register', renderRegister);
router.register('/dashboard', renderDashboard);
router.register('/profile', renderProfile);
router.register('/tasks', renderTask);
router.register('/create-task', renderCreateTask);

// Initialize app
function initApp() {
    const session = sessionManager.getSession();
    const currentPath = window.location.pathname;

    // Redirect logic
    if (!session && currentPath !== '/login' && currentPath !== '/register') {
        router.navigate('/login');
    } else if (session && (currentPath === '/login' || currentPath === '/register' || currentPath === '/')) {
        if (session.role === 'admin') {
            router.navigate('/dashboard');
        } else {
            router.navigate('/dashboard');
        }
    } else if (currentPath === '/') {
        router.navigate('/login');
    } else {
        router.navigate(currentPath);
    }
}

// Start app when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);