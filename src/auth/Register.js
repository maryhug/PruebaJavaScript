import router from "../router/Router.js";


export function renderRegister() {
    const app = document.getElementById('app');

    app.innerHTML = `
        <div class="auth-container">
            <div class="auth-card">
            
                <h1 class="auth-title">Create Account</h1>
                <p class="auth-subtitle">Join the academic performance platform today</p>
                
                <form id="registerForm" class="auth-form">
                    <div class="form-group">
                        <label for="fullName">Full Name</label>
                        <div class="input-wrapper">
                            <input 
                                type="text" 
                                id="fullName" 
                                name="fullName"
                                placeholder="John Doe"
                                required
                            >
                        </div>
                        <span class="error-message" id="nameError"></span>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <div class="input-wrapper">
                            <input 
                                type="email" 
                                id="email" 
                                name="email"
                                placeholder="student@university.edu"
                                required
                            >
                        </div>
                        <span class="error-message" id="emailError"></span>
                    </div>
                    
                    <div class="form-group">
                        <label for="password">Password</label>
                        <div class="input-wrapper">
                            <input 
                                type="password" 
                                id="password" 
                                name="password"
                                placeholder="Create a password"
                                required
                            >
                        </div>
                        <span class="error-message" id="passwordError"></span>
                    </div>
                    
                    <div class="form-group">
                        <label for="password">Confirm password</label>
                        <div class="input-wrapper">
                            <input 
                                type="password" 
                                id="confirm-password" 
                                name="password"
                                placeholder="Confirm password"
                                required
                            >
                        </div>
                        <span class="error-message" id="passwordError"></span>
                    </div>
                    
                    <button type="submit" class="btn btn-primary btn-block">
                        Register
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
