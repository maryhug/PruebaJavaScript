## JavaScript Performance Test - SPA
Single-page application (SPA) for task management.

## Developer Information
Name: [Maryhug Durán]
Clan: [Hamilton]
Email: [maryhug.it@gmail.com]

## Execution Instructions
### Prerequisites
- Node.js installed (v14 or higher)
- npm (comes with Node.js)

## Project Structure
```
PruebaJavaScript/
├── index.html             
├── styles.css                
├── package.json
├── package-lock.json
├── README.md
├── .gitignore
└── src/
      ├── main.js             
      ├── components/            
      │   ├── Menu.js
      │   └── NavBar.js
      ├── views/                
      │   ├── CreateTask.js
      │   ├── Dashboard.js
      │   ├── Profile.js
      │   └── Task.js
      ├── router/                 
      │   └── Router.js
      ├── state/               
      │   ├── db.json
      │   └── sessionManager.js
      ├── services/             
      │   ├── api.js
      │   ├── taskService.js
      │   └── authService.js
      ├── auth/ 
      │   ├── Login.js
      │   └── Register.js
      └── utils/             
          ├── helpers.js
          └── validators.js
      
      
      
````

## Test Users

- Admin
  - Email: admin@admin.com
  - Password: admin123

- User
  - Email: user@test.com
  - Password: user123

## Technologies Used
- Frontend: HTML5, CSS3, JavaScript ES6+ (Vanilla)
- Backend Mock: json-server
- Styles: Custom CSS
- Architecture: SPA with ES6 modules

## Technical Features
- 100% functional SPA without frameworks

- Modularization with ES6 Modules

- Router with route guardian

- Centralized store for global state

- Persistence with localStorage

- Smooth animations and transitions

- Reusable components

- Separation of responsibilities

- Clean code

## Frontend
- https://www.figma.com/design/K3PmKIOlfEsjnbwP54Yc2x/Sin-t%C3%ADtulo?node-id=33-2&p=f

## Remove git
- git config --global --unset user.name
- git config --global --unset user.email

## Add your user
- git config --global user.name ""
- git config --global user.email ""


## Update Node.js to 20 or 22

1. Install nvm (if you don't have it):
   1. curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | Bash
2. source ~/.bashrc

3. Install Node 22
   1. nvm install 22
   2. nvm use 22

4. Check:
   1. node -v

5. Clean and install dependencies again (important)
   1. rm -rf node_modules package-lock.json
   2. npm install
   3. npm run dev