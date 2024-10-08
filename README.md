# Offline-First Notes Application

This monorepo contains a full-stack application for creating and managing notes with offline-first functionality. It consists of a Node.js backend with MongoDB (in the `notes-server` directory) and a React Native mobile app (in the `notesApp` directory) with native modules for Android and iOS.

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Mobile App Setup](#mobile-app-setup)
- [Architecture](#architecture)
- [Features](#features)
- [System Diagram](#system-diagram)
- [Application Workflow](#application-workflow)

## Project Overview

This application demonstrates a modern approach to building a full-stack, offline-first mobile app. It showcases various technologies and practices, including:

- Backend: Node.js with MongoDB
- Frontend: React Native with native modules
- Authentication: Auth0
- State Management: Zustand
- API Communication: Axios with TanStack Query
- Offline Data Sync: Custom implementation with Realm
- Animations: React Native Reanimated

The app allows users to create, read, update, and delete notes, with all operations available offline and data syncing when a connection is reestablished.

## Technologies Used

### Backend (notes-server)
- Node.js
- MongoDB with Mongoose
- JWT for token handling

### Mobile App (notesApp)
- React Native
- Native Modules (Android & iOS)
- Realm for local data storage
- Auth0 for authentication
- Axios for API requests
- TanStack Query for data fetching and caching
- Zustand for state management
- React Native Reanimated for animations
- Jest + @testing-library/react-native for tests

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB
- Xcode (for iOS development)
- Android Studio (for Android development)
- CocoaPods (for iOS dependencies)

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd notes-server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start MongoDB:
   - On macOS:
     ```
     brew services start mongodb-community
     ```
   - On Windows:
     - Open the Start menu and search for "MongoDB"
     - Run MongoDB Compass or MongoDB Shell
     - Alternatively, you can start MongoDB as a service:
       1. Open Command Prompt as Administrator
       2. Run: `net start MongoDB`

4. Start the server:
   ```
   npm run start
   ```

The server should now be running on `http://localhost:3000` (or your configured port).

### Mobile App Setup

1. Navigate to the mobile app directory:
   ```
   cd notesApp
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Install iOS dependencies (macOS only):
   ```
   cd ios && pod install && cd ..
   ```

4. Start the Metro bundler:
   ```
   npm start
   ```

5. Run the app:
   - For iOS (macOS only):
     ```
     npm run ios
     ```
   - For Android:
     ```
     npm run android
     ```

Alternatively, you can open the project in Xcode (for iOS) or Android Studio (for Android) and run it from there.

6. Run tests
      ```
   npm run test
   ```

## Architecture

The application follows a client-server architecture with offline-first capabilities:

1. **Backend (notes-server)**: A Node.js server with MongoDB handles data storage and API endpoints. It uses Mongoose for database modeling and JWT for secure communication.

2. **Mobile App (notesApp)**: A React Native app with native modules for Android and iOS. It uses Realm for local data storage, enabling offline functionality.

3. **Authentication**: Auth0 is used for user authentication, ensuring secure access to the app and backend.

4. **API Communication**: Axios is used for making HTTP requests, while TanStack Query handles data fetching, caching, and synchronization.

5. **Offline-First**: The app implements an offline-first approach, allowing all operations to be performed without an internet connection. Data is synced with the backend when connectivity is restored.

6. **State Management**: Zustand is used for managing the app's internal state, providing a simple and efficient solution.

7. **Animations**: React Native Reanimated is utilized for high-performance animations, enhancing the user experience.

## Features

- User authentication with Auth0
- Create, read, update, and delete notes
- Offline-first functionality
- Data synchronization when online
- Smooth animations for improved UX
- Cross-platform support (iOS and Android)

## System Diagram

![Notes app (1)](https://github.com/user-attachments/assets/56874501-28b0-457e-bc08-4b35816e7bdf)

## Application Workflow

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

## Video
[Showcase](https://drive.google.com/file/d/1Y18-f79S2rKBlMcpKWhGHIMbpgvxYs47/view?usp=sharing)
