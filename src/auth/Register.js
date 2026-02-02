import router from "../router/Router.js";


export function renderRegister() {
    const app = document.getElementById('app');

    app.innerHTML = `
        <div class="auth-container">
            <div class="auth-card">
                <div class="auth-logo">
                    <div class="logo-icon">📅</div>
                </div>
                
                <h1 class="auth-title">Create Account</h1>
                <p class="auth-subtitle">Join our event platform</p>
                
                <form id="registerForm" class="auth-form">
                    <div class="form-group">
                        <label for="fullName">Full Name</label>
                        <div class="input-wrapper">
                            <span class="input-icon">👤</span>
                            <input 
                                type="text" 
                                id="fullName" 
                                name="fullName"
                                placeholder="Enter your full name"
                                required
                            >
                        </div>
                        <span class="error-message" id="nameError"></span>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <div class="input-wrapper">
                            <span class="input-icon">📧</span>
                            <input 
                                type="email" 
                                id="email" 
                                name="email"
                                placeholder="name@example.com"
                                required
                            >
                        </div>
                        <span class="error-message" id="emailError"></span>
                    </div>
                    
                    <div class="form-group">
                        <label for="password">Password</label>
                        <div class="input-wrapper">
                            <span class="input-icon">🔒</span>
                            <input 
                                type="password" 
                                id="password" 
                                name="password"
                                placeholder="Min. 6 characters"
                                required
                            >
                        </div>
                        <span class="error-message" id="passwordError"></span>
                    </div>
                    
                    <div class="form-group">
                        <label for="role">Select Role</label>
                        <div class="input-wrapper">
                            <span class="input-icon">🔑</span>
                            <select id="role" name="role" required>
                                <option value="guest">Guest</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn btn-primary btn-block">
                        Create Account
                    </button>
                </form>
                
                <p class="auth-footer">
                    Already have an account? 
                    <a href="#" id="loginLink" class="auth-link">Sign in</a>
                </p>
            </div>
        </div>
    `;

    // Event listeners
    document.getElementById('loginLink').addEventListener('click', (e) => {
        e.preventDefault();
        router.navigate('/login');
    });


}
