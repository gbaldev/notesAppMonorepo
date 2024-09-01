# NotesApp Monorepo

This monorepo contains a full-featured note-taking application designed as a portfolio project. The solution includes a Node.js server with MongoDB and a React Native app with native modules for Android and iOS. These modules are used to implement persistent storage for the data served by the backend.

## Features

- **Authentication**: The app uses Auth0 for authentication, ensuring that notes are unique to each user in the backend.
- **Token Management**: JWT tokens are used to secure API calls, ensuring that only authenticated users can perform operations.
- **Offline-First Model**: The app is designed to work fully offline. When offline, data is stored locally and marked as unsynced. Once the connection is restored, the data is automatically synced with the backend.
- **Backend**: The backend uses MongoDB with Mongoose for database operations.
- **State Management**: The app uses Zustand for internal state management in React Native.
- **Animations**: Reanimated is used to enhance performance and deliver smooth animations.

## Technologies

- **Backend**:
  - Node.js
  - MongoDB with Mongoose
- **Frontend**:
  - React Native
  - Axios + TanStack Query for data fetching
  - Zustand for state management
  - Reanimated for animations
- **Native Modules**:
  - Realm for persistent data storage on both Android and iOS

## Installation and Setup

### Backend

#### macOS

1. **Install MongoDB**:
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community@5.0

2. **Start MongoDB:**:
    ```bash
    brew services start mongodb-community
    ```

3. **Navigate to the backend directory**:
    ```bash
    cd backend
    ```

4. **Install dependencies**:
    ```bash
    npm install
    ```
    
5. **Start the server**:
  ```bash
  npm run start
  ```

#### Windows

1. **Install MongoDB**:
   - Download and install MongoDB from the official website: [MongoDB Download Center](https://www.mongodb.com/try/download/community)

2. **Start MongoDB**:
   - Use the MongoDB Compass or run `mongod` in your terminal to start the MongoDB server.

3. **Navigate to the backend directory**:
   ```bash
   cd notes-server
   ```

4. **Install dependencies**:
  ```bash
  npm install
  ```

5. **Start the server**:
  ```bash
  npm run start
  ```

### React Native App

1. **Navigate to the app directory**:
   ```bash
   cd notesApp
   ```

2. **Install dependencies**:
  ```bash
  npm install
  ```

3. **iOS Setup**:
  ```bash
  cd ios
  pod install
  cd ..
  ```

4. **Start the React Native bundler**:
  ```bash
  npm start
  ```

5. **Run the app**:
  * For Android:
  ```bash
  npm run android
  ```

  * For iOS:
  ```bash
  npm run ios
  ```

  Alternatively, you can run the app directly from Android Studio or Xcode.

### Additional Notes
This project showcases various aspects of mobile and backend development, focusing on a robust and seamless offline-first experience. It is designed to highlight skills in React Native, native module development, backend services with Node.js and MongoDB, and state management in complex applications.

Feel free to explore the code.
