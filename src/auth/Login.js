import router from "../router/Router";
import {showNotification} from "../utils/helpers.js"
import authService from "../services/authService.js";

export function renderLogin() {
    const app = document.getElementById('app');

    app.innerHTML = `
        <div class="auth-container">
            <div class="auth-card">
                
                <h1 class="auth-title">Welcome Back</h1>
                <p class="auth-subtitle">Enter your credentials to access the platform</p>
                
                <form id="loginForm" class="auth-form">
                    <div class="form-group">
                        <label for="email">Email or username</label>
                        <div class="input-wrapper">
                            <input 
                                type="email" 
                                id="email" 
                                name="email"
                                placeholder="student@university.edu"
                                required
                            >
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="password">Password</label>
                        <div class="input-wrapper">
                            <input 
                                type="password" 
                                id="password" 
                                name="password"
                                placeholder="Enter your password"
                                required
                            >
                            <span class="input-icon">
                                <i class="fa-solid fa-eye eye-icon"></i>
                            </span>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn btn-primary btn-block">
                        Sign In
                    </button>
                </form>
                
                <p class="auth-footer">
                    Don't have an account? 
                    <a href="#" id="signupLink" class="auth-link">Sign up</a>
                </p>
                
            </div>
        </div>
    `;

    // Event listeners
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('signupLink').addEventListener('click', (e) => {
        e.preventDefault();
        router.navigate('/register');
    });
}

async function handleLogin(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    const btn = e.target.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Signing in...';

    try {
        const result = await authService.login(email, password);

        if (result.success) {
            showNotification('Login successful! Welcome back.', 'success');

            setTimeout(() => {
                if (result.user.role === 'admin') {
                    router.navigate('/admin');
                } else {
                    router.navigate('/events');
                }
            }, 500);
        } else {
            showNotification(result.message || 'Login failed', 'error');
            btn.disabled = false;
            btn.textContent = 'Sign In';
        }
    } catch (error) {
        showNotification('An error occurred. Please try again.', 'error');
        btn.disabled = false;
        btn.textContent = 'Sign In';
    }
}