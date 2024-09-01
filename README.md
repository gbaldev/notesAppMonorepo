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

### System diagram
![Notes app (1)](https://github.com/user-attachments/assets/56874501-28b0-457e-bc08-4b35816e7bdf)

### Workflow
_For a complete experience, you can build the application on your own or view the videos linked below, which showcase the application on both platforms. Note that while the images provided are from the iOS version, the design is consistent across both platforms._
<img src="https://github.com/user-attachments/assets/fcc711b9-f1c0-4ec3-95e1-48e378311927" alt="Imagen 1" width="250" />
<img src="https://github.com/user-attachments/assets/6b89e1dd-0a9b-4b3b-ae72-4452a8190904" alt="Imagen 2" width="250" />
<img src="https://github.com/user-attachments/assets/4a37e330-386e-44cc-bd14-2175c7791948" alt="Imagen 3" width="250" />
<img src="https://github.com/user-attachments/assets/6e7e02b5-bd93-4371-8f33-3f3695a17e84" alt="Imagen 4" width="250" />
<img src="https://github.com/user-attachments/assets/15efed8a-76b9-4fdf-863b-d8d83cd801ef" alt="Imagen 5" width="250" />
<img src="https://github.com/user-attachments/assets/88f15e12-d4b8-46c1-a333-c7f9768019db" alt="Imagen 6" width="250" />
<img src="https://github.com/user-attachments/assets/9d151d68-3f0c-46fb-990e-cd651005c9e8" alt="Imagen 7" width="250" />
<img src="https://github.com/user-attachments/assets/23049050-4479-4d5e-9024-2d218be70b7e" alt="Imagen 8" width="250" />
<img src="https://github.com/user-attachments/assets/c694ffd8-36c8-4cb0-ab70-37082d007a82" alt="Imagen 9" width="250" />
<img src="https://github.com/user-attachments/assets/589b2c55-eb64-4d6e-9f53-1b2254668542" alt="Imagen 1" width="250" />
<img src="https://github.com/user-attachments/assets/1b2bd1a1-db6d-4d6f-be3b-605dbcfe557c" alt="Imagen 2" width="250" />
<img src="https://github.com/user-attachments/assets/5c002a4c-b705-41c6-9569-b5806ca36675" alt="Imagen 3" width="250" />
<img src="https://github.com/user-attachments/assets/467c6fcf-0c1a-4044-b3b6-cc70b7145a1d" alt="Imagen 4" width="250" />
<img src="https://github.com/user-attachments/assets/e6eefef9-5d8b-43e9-b618-88816aed61dd" alt="Imagen 5" width="250" />
<img src="https://github.com/user-attachments/assets/8b59d36c-e79a-46ca-beb1-8422546b4941" alt="Imagen 6" width="250" />
<img src="https://github.com/user-attachments/assets/95818e53-56ea-41c6-99cd-b6a231fd22d7" alt="Imagen 7" width="250" />
<img src="https://github.com/user-attachments/assets/aa15f669-4253-4756-ade7-45f278e75ca5" alt="Imagen 8" width="250" />
<img src="https://github.com/user-attachments/assets/2c761331-91c3-4448-abf2-1167345af0a8" alt="Imagen 9" width="250" />
<img src="https://github.com/user-attachments/assets/679f1908-1f3e-4940-80e0-c054e448041d" alt="Imagen 10" width="250" />
<img src="https://github.com/user-attachments/assets/e768bd98-a5e4-42ad-9704-2fc2ac93dc12" alt="Imagen 11" width="250" />
