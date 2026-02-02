import router from "../router/Router";
import {showNotification} from "../utils/helpers.js"
import authService from "../services/authService.js";

export function renderLogin() {
    const app = document.getElementById('app');

    app.innerHTML = `
   <main class="page">
      <section class="login">
        <header class="brand">
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
        </header>

        <article class="card">
          <h1>Welcome back</h1>
          <p class="card__subtitle">
            Enter your credentials to access the platform
          </p>

          <form class="form" action="/dashboard">
            <label class="field">
              <span>Email or username</span>
              <input
                type="text"
                name="email"
                placeholder="student@university.edu"
                autocomplete="username"
              />
            </label>

            <label class="field">
              <span>Password</span>
              <div class="field__control">
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  autocomplete="current-password"
                />
                <button class="icon-button" type="button" aria-label="Show password">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z"
                      fill="none"
                      stroke-width="1.7"
                      stroke-linejoin="round"
                    />
                    <circle cx="12" cy="12" r="3.2" />
                  </svg>
                </button>
              </div>
            </label>

            <div class="form__row">
              <a class="link" href="#">Forgot password?</a>
            </div>

            <button class="primary" type="submit">Sign in</button>

            <p class="form__footer">
              Don't have an account?
              <a class="link" href="/register">Register</a>
            </p>
          </form>
        </article>
      </section>
    </main>
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