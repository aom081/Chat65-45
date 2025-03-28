The provided codebase is a MERN (MongoDB, Express, React, Node.js) stack application for a chat platform. It includes both the backend and frontend implementations. Below is an explanation of the code structure and functionality:

## Backend
The backend is built using Node.js with Express.js for the server, MongoDB for the database, and Socket.IO for real-time communication.

### Key Features
- **Authentication**: User signup, login, logout, and profile updates.
- **Friend Management**: Adding friends, accepting friend requests, and checking friendships.
- **Messaging**: Sending and receiving messages in real-time.
- **Socket.IO**: Real-time updates for online users, friend requests, and messages.

### Folder Structure
- `src/config`: Contains configuration files (e.g., database connection).
- `src/controllers`: Contains logic for handling API requests.
- `src/lib`: Utility files for reusable logic (e.g., JWT, Cloudinary, Socket.IO).
- `src/middleware`: Middleware for authentication and friendship checks.
- `src/models`: MongoDB schemas for User and Message.
- `src/routes`: API routes for authentication, messaging, and friends.

### Important Backend Files
#### 1. Database Connection (`src/config/db.js`)
Handles the connection to MongoDB using Mongoose. It listens for connection events and logs them.

#### 2. Authentication Controller (`src/controllers/auth.controller.js`)
Handles:
- **Signup**: Creates a new user with hashed passwords.
- **Login**: Verifies credentials and generates a JWT token.
- **Logout**: Clears the JWT cookie.
- **Update Profile**: Updates the user's profile picture using Cloudinary.
- **Check Auth**: Verifies the user's authentication status.

#### 3. Friend Controller (`src/controllers/friend.controller.js`)
Handles:
- **Add Friend**: Sends a friend request or accepts it if already sent.
- **Accept Friend Request**: Accepts a pending friend request.

#### 4. Message Controller (`src/controllers/message.controller.js`)
Handles:
- **Get Users for Sidebar**: Fetches all users except the logged-in user.
- **Send Message**: Sends a message with optional image upload.
- **Get Messages**: Fetches chat history between two users.

#### 5. Socket.IO (`src/lib/socket.js`)
Manages real-time communication:
- Tracks online users.
- Emits events for friend requests and new messages.

#### 6. Middleware
- `auth.middleware.js`: Protects routes by verifying JWT tokens.
- `friend.middleware.js`: Ensures users are friends before allowing certain actions.

#### 7. Models
- `user.model.js`: Defines the User schema with fields like email, password, friends, and friendRequests.
- `message.model.js`: Defines the Message schema with fields like senderId, receiverId, text, and image.

#### 8. Routes
- `auth.route.js`: Routes for authentication (signup, login, logout, etc.).
- `friend.route.js`: Routes for friend management.
- `message.route.js`: Routes for messaging.

## Frontend
The frontend is built using React with Vite for fast development. It uses Zustand for state management, Socket.IO Client for real-time updates, and TailwindCSS for styling.

### Key Features
- **Authentication**: Signup, login, and logout.
- **Chat Interface**: Sidebar for user selection, chat container for messages, and real-time updates.
- **Profile Management**: Update profile picture and view account details.
- **Theme Customization**: Allows users to select a theme for the chat interface.

### Folder Structure
- `src/components`: Reusable UI components (e.g., Navbar, Sidebar, ChatContainer).
- `src/constants`: Contains constants like theme options.
- `src/lib`: Utility functions (e.g., formatting message timestamps).
- `src/pages`: Pages for different routes (e.g., Home, Login, Signup).
- `src/services`: API service for making HTTP requests.
- `src/store`: Zustand stores for managing global state (e.g., auth, chat, theme).

### Important Frontend Files
#### 1. `App.jsx`
Defines the main application structure with routes for:
- **Home**: Chat interface.
- **Signup**: User registration.
- **Login**: User login.
- **Settings**: Theme customization.
- **Profile**: User profile management.

#### 2. Components
- `Sidebar.jsx`: Displays a list of users with online/offline status.
- `ChatContainer.jsx`: Displays chat messages and handles sending messages.
- `Navbar.jsx`: Navigation bar with links to settings and profile.
- `MessageInput.jsx`: Input field for sending text and image messages.

#### 3. Pages
- `Home.jsx`: Main chat interface with sidebar and chat container.
- `Login.jsx`: Login form with email and password fields.
- `SignUp.jsx`: Signup form with validation.
- `Profile.jsx`: Displays and updates user profile information.
- `Setting.jsx`: Allows users to select a theme and preview it.

#### 4. State Management
- `useAuthStore.js`: Manages authentication state, user data, and Socket.IO connection.
- `useChatStore.js`: Manages chat state, messages, and friend requests.
- `useThemeStore.js`: Manages the selected theme.

#### 5. Styling
- **TailwindCSS**: Used for responsive and modern UI design.
- **DaisyUI**: Provides pre-designed components and themes.

## Environment Variables
Both the backend and frontend use `.env` files for configuration:

### Backend
Contains MongoDB URI, Cloudinary credentials, JWT secret, etc.

### Frontend
Contains API base URL and Socket.IO URL.

## How It Works
### Authentication:
- Users can sign up or log in.
- JWT tokens are used for authentication and stored in cookies.

### Real-Time Chat:
- Users can send and receive messages in real-time using Socket.IO.
- Messages can include text and images (uploaded to Cloudinary).

### Friend Management:
- Users can send and accept friend requests.
- Only friends can chat with each other.

### Theme Customization:
- Users can select a theme, which is saved in local storage.
