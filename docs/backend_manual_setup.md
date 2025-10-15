
# Manual Backend Setup Guide for ResumeCraft AI

This document provides a comprehensive guide for setting up the Firebase backend services required for the ResumeCraft AI application. This guide can be used by a developer or another AI tool to generate and implement the necessary backend code.

## 1. Backend Features

The backend needs to support the following features:

1.  **User Authentication**:
    *   User signup with Name, Email, and Password.
    *   User login with Email and Password.
    *   User logout.
    *   Persistent user sessions.
2.  **Data Persistence**:
    *   Authenticated users should be able to save their resume data to a persistent database.
    *   Authenticated users should be able to load their saved resume data from the database.

## 2. Technology Stack

*   **Platform**: Firebase
*   **Services**:
    *   **Firebase Authentication**: For handling user accounts and sessions. The **Email/Password** sign-in provider must be enabled.
    *   **Firestore**: A NoSQL database for storing user-specific resume data.

## 3. Implementation Details

### 3.1. Firebase Project Setup

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Create a new Firebase project or use an existing one.
3.  Within the project, go to the **Authentication** section and enable the **Email/Password** sign-in provider.
4.  Go to the **Firestore Database** section and create a new database. Start in **production mode**.
5.  In your Project Settings, register a new **Web app**.
6.  Copy the `firebaseConfig` object. It will look like this:
    ```javascript
    const firebaseConfig = {
      apiKey: "AIza...",
      authDomain: "your-project-id.firebaseapp.com",
      projectId: "your-project-id",
      storageBucket: "your-project-id.appspot.com",
      messagingSenderId: "...",
      appId: "1:..."
    };
    ```

### 3.2. Firestore Data Model

The database should be structured to store resume data for each user.

*   **Collection**: `users`
    *   **Document**: `{userId}` (using the UID from Firebase Authentication)
        *   **Collection**: `resumes`
            *   **Document**: A unique ID for each resume (e.g., `default_resume`)
                *   **Fields**: The document will contain the resume data, matching the `ResumeData` type from `src/lib/types.ts`.
                    *   `personal`: (object)
                    *   `education`: (array of objects)
                    *   `experience`: (array of objects)
                    *   `skills`: (string)

**Example Path**: `/users/USER_UID_FROM_AUTH/resumes/default_resume`

### 3.3. Firestore Security Rules

To secure user data, update your Firestore security rules. Users should only be able to read and write to their own documents.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{documents=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 3.4. Code Generation & Integration Prompt for AI

Below is a detailed prompt that can be provided to an AI code generation tool to implement the Firebase backend in the existing Next.js application.

---

### **Master Prompt for AI Code Generation**

**Objective**: Replace the mock authentication and data handling in the Next.js ResumeCraft AI application with a full Firebase implementation using Firebase Authentication and Firestore.

**Project Files for Context**: You have access to all the project files, including `package.json`, `src/app/layout.tsx`, `src/lib/auth.tsx`, `src/app/builder/page.tsx`, and `src/components/resume/resume-form.tsx`.

**Key Tasks**:

1.  **Firebase Configuration**:
    *   Create a new file `src/lib/firebase.ts`.
    *   In this file, export an initialized Firebase app instance. Use the `firebaseConfig` object obtained from the Firebase console.

2.  **Authentication (`src/lib/auth.tsx`)**:
    *   Rewrite the `AuthProvider` to use real Firebase Authentication.
    *   Import `firebase/auth` functions like `createUserWithEmailAndPassword`, `signInWithEmailAndPassword`, `signOut`, and `onAuthStateChanged`.
    *   Implement the `signup`, `login`, and `logout` functions to call the corresponding Firebase methods.
    *   Use the `onAuthStateChanged` observer to listen for auth state changes and update the `user` state. When a user logs in, fetch their display name. When they sign up, use `updateProfile` to set their display name.
    *   The `User` interface should be updated to only contain `uid`, `email`, `name` (displayName), and `isPremium`.

3.  **Data Persistence (`src/components/resume/resume-form.tsx`)**:
    *   Modify the `handleSaveData` and `handleLoadData` functions to interact with Firestore instead of downloading/uploading JSON files.
    *   **`handleSaveData`**:
        *   This function should now be `saveResumeToFirestore`.
        *   It should check if a user is authenticated.
        *   It should use `setDoc` from `firebase/firestore` to save the `resumeData` state to a document in Firestore. The path should be `users/{user.uid}/resumes/default_resume`.
        *   Show a toast notification on success or failure.
    *   **`handleLoadData`**:
        *   This function should be replaced with a `useEffect` hook that runs when the user is authenticated.
        *   This hook should fetch the resume data from Firestore using `getDoc`. The path is the same as above.
        *   If a resume document exists, use `setResumeData` to populate the form.
        *   If it doesn't exist, the initial blank form is fine.
    *   Update the "Save" and "Load" buttons in the UI to call these new functions. The "Load" button should probably be removed in favor of automatic loading on login. Let's rename the "Save" button to "Save to Cloud" and the "Load" button to "Load from Cloud".

4.  **UI Updates**:
    *   Ensure all login, signup, and logout flows correctly redirect and display appropriate toasts.
    *   The user's name in the header should be populated from the `auth` context.

By following these instructions, you will create a fully functional backend for the ResumeCraft AI application.
---
