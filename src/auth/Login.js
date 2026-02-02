import router from "../router/Router";

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
                
                <p class="auth-credits">Roadmap Academic Simulator v1.0<br>Performance monitoring active</p>
            </div>
        </div>
    `;

    // Event listeners
    document.getElementById('signupLink').addEventListener('click', (e) => {
        e.preventDefault();
        router.navigate('/register');
    });
}
