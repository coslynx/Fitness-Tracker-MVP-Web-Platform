<div class="hero-icon" align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>

<h1 align="center">
Fitness Tracker MVP
</h1>
<h4 align="center">A fully functional web application for managing fitness goals and tracking progress.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-Next.js-blue" alt="Framework used for the Fitness Tracker MVP">
  <img src="https://img.shields.io/badge/Frontend-TypeScript,_React-red" alt="Frontend technologies used for the Fitness Tracker MVP">
  <img src="https://img.shields.io/badge/Database-PostgreSQL-blue" alt="Database used for the Fitness Tracker MVP">
  <img src="https://img.shields.io/badge/Authentication-NextAuth.js-black" alt="Authentication system used for the Fitness Tracker MVP">
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/Fitness-Tracker-MVP?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/Fitness-Tracker-MVP?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/Fitness-Tracker-MVP?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
The repository contains a Minimum Viable Product (MVP) called "Fitness Tracker MVP" that provides a comprehensive solution for fitness enthusiasts. Built using a modern tech stack consisting of Next.js, TypeScript, React, PostgreSQL, NextAuth.js, and Tailwind CSS, this MVP allows users to set and track fitness goals, log workouts, and view their progress. 

## 📦 Features
|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| 🔐 | **Secure Authentication**   |  The MVP uses NextAuth.js to securely manage user authentication, supporting login with Google and other providers.  |
| 🎯 | **Goal Setting and Tracking** | Users can define personalized fitness goals (e.g., weight loss, muscle gain, distance running) and track progress visually through dashboards.   |
| 🏋️ | **Workout Logging**  |  A user-friendly interface allows users to log their workouts, including details like type, duration, and intensity.  |
| 📊 | **Progress Visualization** |  The MVP utilizes charts and graphs to provide clear and engaging visualizations of progress towards goals. |
| 👥 | **Community Features (Future)** |  (Planned)  The MVP will incorporate social features like a community feed for sharing achievements and motivating others. |

## 📂 Structure
```text
Fitness-Tracker-MVP
├── .env
├── .env.local
├── commands.json
├── startup.sh
├── src
│   ├── app
│   │   ├── api
│   │   │   ├── auth
│   │   │   │   ├── [...nextauth].ts
│   │   │   ├── goals
│   │   │   │   └── route.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── dashboard
│   │   │   └── page.tsx
│   │   ├── goals
│   │   │   └── page.tsx
│   ├── components
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   ├── Input.tsx
│   │   ├── GoalForm.tsx
│   │   ├── GoalList.tsx
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   └── DashboardStats.tsx
│   ├── pages
│   │   ├── Home.tsx
│   │   ├── Dashboard.tsx
│   │   └── Goals.tsx
│   ├── hooks
│   │   └── useAuth.ts
│   ├── services
│   │   ├── api.ts
│   │   └── auth.ts
│   ├── utils
│   │   ├── helpers.ts
│   │   └── validators.ts
│   └── styles
│       └── global.css
└── package.json
```

## 💻 Installation
### 🔧 Prerequisites
- Node.js v18+
- npm 8+
- PostgreSQL 14+

### 🚀 Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/coslynx/Fitness-Tracker-MVP.git
   cd Fitness-Tracker-MVP
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```
4. Configure environment variables in the `.env` file. The following variables are required:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase URL (e.g., `https://your-project.supabase.co`)
   - `NEXT_PUBLIC_SUPABASE_KEY`: Your Supabase Anon Key
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: Your Google Client ID
   - `NEXT_PUBLIC_GOOGLE_CLIENT_SECRET`: Your Google Client Secret
   - `NEXT_PUBLIC_SENTRY_DSN`: Your Sentry DSN (optional for error tracking)
5. Set up your Supabase database:
   - Create a database using the instructions on the Supabase documentation.
   - Ensure the database has the following tables:
     - `users` (for user authentication)
     - `goals` (for storing user goals)
     - `workouts` (for logging workout data)
   - Add any additional tables as needed for your MVP.
6. Run database migrations:
   ```bash
   npm run migrate
   ```
7. (Optional) Configure Sentry for error tracking:
   - Create a Sentry project.
   - Set the `NEXT_PUBLIC_SENTRY_DSN` environment variable in your `.env` file.

## 🏗️ Usage
### 🏃‍♂️ Running the MVP
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Access the application in your browser at [http://localhost:3000](http://localhost:3000).

## 🌐 Hosting
### 🚀 Deployment Instructions
1. Ensure you have a Supabase project set up.
2. Set up environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase URL.
   - `NEXT_PUBLIC_SUPABASE_KEY`: Your Supabase Anon Key.
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: Your Google Client ID.
   - `NEXT_PUBLIC_GOOGLE_CLIENT_SECRET`: Your Google Client Secret.
   - `NEXT_PUBLIC_SENTRY_DSN`: Your Sentry DSN (optional).
3. Build the application:
   ```bash
   npm run build
   ```
4. Deploy to your preferred platform, such as Vercel or Netlify.  You can use the `next` command to deploy to Vercel:
    ```bash
    vercel
    ```
5. Configure the deployment platform to connect to your Supabase database.
6. (Optional) Configure Sentry for error tracking on your production environment.

## 📜 API Documentation
### 🔍 Endpoints
- **POST /api/auth/register**
  - Description: Register a new user.
  - Body: `{ "name": string, "email": string, "password": string }`
  - Response:  
    - On success: `{ "id": string, "name": string, "email": string, "token": string }`
    - On error: Error message.
- **POST /api/auth/login**
  - Description: Login an existing user.
  - Body: `{ "email": string, "password": string }`
  - Response:
    - On success: `{ "id": string, "name": string, "email": string, "token": string }`
    - On error: Error message.
- **GET /api/goals**
  - Description: Get all goals for the current user.
  - Headers: `Authorization: Bearer YOUR_JWT_TOKEN`
  - Response: An array of `Goal` objects.
- **POST /api/goals**
  - Description: Create a new goal.
  - Headers: `Authorization: Bearer YOUR_JWT_TOKEN`
  - Body: `{ "name": string, "description": string, "target": number }`
  - Response:  
    - On success: The newly created `Goal` object.
    - On error: Error message.
- **PUT /api/goals/:id**
  - Description: Update a goal.
  - Headers: `Authorization: Bearer YOUR_JWT_TOKEN`
  - Body: `{ "name": string, "description": string, "target": number }`
  - Response: 
    - On success: The updated `Goal` object.
    - On error: Error message.
- **DELETE /api/goals/:id**
  - Description: Delete a goal.
  - Headers: `Authorization: Bearer YOUR_JWT_TOKEN`
  - Response: 
    - On success: `204 No Content`.
    - On error: Error message.
- **POST /api/workouts**
  - Description: Log a new workout.
  - Headers: `Authorization: Bearer YOUR_JWT_TOKEN`
  - Body: `{ "type": string, "duration": number, "intensity": string, "notes": string }`
  - Response: 
    - On success: The newly created `Workout` object.
    - On error: Error message.
- **GET /api/workouts**
  - Description: Get all workouts for the current user.
  - Headers: `Authorization: Bearer YOUR_JWT_TOKEN`
  - Response: An array of `Workout` objects.
- **GET /api/users/me**
  - Description: Get information about the current user.
  - Headers: `Authorization: Bearer YOUR_JWT_TOKEN`
  - Response: The current user object.

### 🔒 Authentication
1. Users must register or login to receive a JWT token. 
2. Include the JWT token in the `Authorization` header of all API requests. 

**Example:**

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "yourPassword"}'
```

**Response:**

```json
{
  "id": "user123",
  "name": "John Doe",
  "email": "user@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw0"
}
```

### 📝 Examples
**Create a new goal:**

```bash
curl -X POST http://localhost:3000/api/goals \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"name": "Lose 5kg", "description": "Lose 5kg in 12 weeks", "target": 5}'
```

**Response:**

```json
{
  "id": "goal123",
  "name": "Lose 5kg",
  "description": "Lose 5kg in 12 weeks",
  "target": 5
}
```

**Log a new workout:**

```bash
curl -X POST http://localhost:3000/api/workouts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"type": "Running", "duration": 45, "intensity": "Moderate", "notes": "Ran around the park"}'
```

**Response:**

```json
{
  "id": "workout123",
  "type": "Running",
  "duration": 45,
  "intensity": "Moderate",
  "notes": "Ran around the park"
}
```


## 📜 License & Attribution

### 📄 License
This Minimum Viable Product (MVP) is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) license.

### 🤖 AI-Generated MVP
This MVP was entirely generated using artificial intelligence through [CosLynx.com](https://coslynx.com).

No human was directly involved in the coding process of the repository: Fitness Tracker MVP

### 📞 Contact
For any questions or concerns regarding this AI-generated MVP, please contact CosLynx at:
- Website: [CosLynx.com](https://coslynx.com)
- Twitter: [@CosLynxAI](https://x.com/CosLynxAI)

<p align="center">
  <h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
  <em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Developers-Drix10,_Kais_Radwan-red" alt="">
  <img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="">
  <img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
  <img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4,_v6-black" alt="">
</div>