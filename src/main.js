import router from "./router/Router.js";
import sessionManager from "./services/sessionManager";

import { renderRegister } from "./auth/Register";
import { renderLogin } from './auth/Login.js'

router.register('/login', renderLogin);
router.register('/register', renderRegister);


// Initialize app
function initApp() {
    const session = sessionManager.getSession();
    const currentPath = window.location.pathname;

    // Redirect logic
    if (!session && currentPath !== '/login' && currentPath !== '/register') {
        router.navigate('/login');
    } else if (session && (currentPath === '/login' || currentPath === '/register' || currentPath === '/')) {
        if (session.role === 'admin') {
            router.navigate('/admin');
        } else {
            router.navigate('/events');
        }
    } else if (currentPath === '/') {
        router.navigate('/login');
    } else {
        router.navigate(currentPath);
    }
}

// Start app when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);