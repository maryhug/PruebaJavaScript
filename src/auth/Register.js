import router from "../router/Router.js";


export function renderRegister() {
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
          <h1>Create account</h1>
          <p class="card__subtitle">
            Join the academic performance platform today
          </p>

          <form class="form" action="#">
            <label class="field">
              <span>Full Name</span>
              <input
                type="text"
                name="full-name"
                placeholder="John Doe"
                autocomplete="name"
              />
            </label>

            <label class="field">
              <span>Email address</span>
              <input
                type="email"
                name="email"
                placeholder="student@university.edu"
                autocomplete="email"
              />
            </label>

            <label class="field">
              <span>Password</span>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                autocomplete="new-password"
              />
            </label>

            <label class="field">
              <span>Confirm Password</span>
              <input
                type="password"
                name="confirm-password"
                placeholder="Confirm password"
                autocomplete="new-password"
              />
            </label>

            <button class="primary" type="submit">Register</button>

            <p class="form__footer">
              Already have an account?
              <a class="link" href="/login">Sign in</a>
            </p>
          </form>
        </article>
      </section>
    </main>
    
    `;

    // Event listeners
    document.getElementById('loginLink').addEventListener('click', (e) => {
        e.preventDefault();
        router.navigate('/login');
    });


}
