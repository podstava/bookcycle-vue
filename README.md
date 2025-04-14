# BookCycle - Book Exchange Platform

BookCycle is a revolutionary platform for exchanging books between people. We bring back the culture of reading, make books accessible, and give them a second life. Free. Convenient. Local.

## Features

- 📚 **Shared Book Exchange**: Add your books and find new ones — everything is simple, transparent, and free. BookCycle connects readers in your city.
- 📦 **Multiple Transfer Options**: Mail delivery, in-person meetings, or partner pickup points — choose what's most convenient for you.
- 💬 **Reviews and Trust**: Each user has a profile showing exchange history and ratings. Trust is the main currency of BookCycle.
- 🧭 **Local Search**: Find books in your neighborhood or city to avoid waiting weeks for delivery. Fast and convenient.
- 🎟 **Subscriptions and Bonuses**: Access to exclusive books, partner libraries, and events through subscription or active community participation.
- 📱 **Modern Interface**: Responsive, lightweight, and fast design. Use it on mobile, tablet, or computer — without limitations.

## Tech Stack

- Nuxt 3
- TypeScript
- TailwindCSS
- Vue 3

## Setup

1. Clone the repository
2. Install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

3. Copy the environment variables file and configure it:

```bash
cp .env.example .env
```

4. Edit the `.env` file and add your Web3Forms API key (get it from [https://web3forms.com/](https://web3forms.com/))

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

## Project Structure

- `assets/` - Static assets like CSS and images
- `components/` - Vue components organized by feature
  - `books/` - Components related to books functionality
  - `landing/` - Components for the landing page
  - `modals/` - Modal components like login and registration
- `composables/` - Reusable Vue composables
- `layouts/` - Page layouts
- `pages/` - Application pages and routes
- `public/` - Public static files
- `server/` - Server-side code
- `stores/` - Pinia stores for state management

## API Integration

The application is configured to connect to a backend API. The base URL is set in the `.env` file and can be customized as needed. The `useApi` composable provides a convenient way to make API requests with proper typing and automatic token handling.

## Authentication System

The application includes a complete user authentication system with:

### Features
- JWT-based authentication with access and refresh tokens
- Secure token storage in localStorage
- Automatic token refresh when expired
- Protected routes with middleware
- User registration with validation
- User login with error handling
- User profile management
- Logout functionality

### Components
- `LoginModal.vue` - Modal for user login
- `RegisterModal.vue` - Modal for user registration
- `BooksNavbar.vue` - Navigation with login/logout buttons

### Store
- `user.ts` - Pinia store for user state management
- Token storage and refresh logic
- User data management

### Middleware & Plugins
- `auth.ts` middleware - Protects routes that require authentication
- `auth.ts` plugin - Handles token persistence in localStorage

### API Integration
- Automatic token inclusion in API requests
- Token refresh on 401 Unauthorized responses
- Proper error handling for authentication failures

## TypeScript Support

The project uses TypeScript for improved type safety and developer experience. Key interfaces are defined for API responses and state management.
