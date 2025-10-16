# Manual Guide: Setting an Admin User

This guide provides the step-by-step instructions needed to designate a user as an "admin" in your Firebase project. This is done by setting a **custom claim** on the user's authentication token. The application's Firestore Security Rules are configured to check for this claim (`request.auth.token.admin == true`) to grant access to protected resources.

**Follow these steps carefully. This is a sensitive operation that grants significant privileges.**

---

### Step 1: Install Firebase Admin SDK

You will need a local Node.js environment to run a script that sets the custom claim.

1.  **Open your terminal or command prompt.**
2.  **Create a new folder** for your admin script (e.g., `mkdir my-admin-scripts && cd my-admin-scripts`).
3.  **Initialize a Node.js project:**
    ```bash
    npm init -y
    ```
4.  **Install the Firebase Admin SDK:**
    ```bash
    npm install firebase-admin
    ```

---

### Step 2: Get Your Firebase Service Account Key

The Admin SDK needs project credentials to securely communicate with Firebase services.

1.  Navigate to your **Firebase Project Console**.
2.  Click the **gear icon** next to "Project Overview" and select **Project settings**.
3.  Go to the **Service accounts** tab.
4.  Click the **"Generate new private key"** button. A warning will appear; click **"Generate key"** to confirm.
5.  A JSON file will be downloaded to your computer. **This file contains sensitive credentials. Keep it secure and do not share it or commit it to version control.**
6.  **Move this downloaded JSON file** into the `my-admin-scripts` folder you created in Step 1 and rename it to `service-account-key.json` for simplicity.

---

### Step 3: Create the Admin Script

Create a new file named `set-admin.js` inside your `my-admin-scripts` folder and paste the following code into it.

```javascript
// set-admin.js
const admin = require('firebase-admin');

// IMPORTANT: Path to your service account key JSON file
const serviceAccount = require('./service-account-key.json');

// The email of the user you want to make an admin
const userEmail = process.argv[2];

if (!userEmail) {
  console.error('Error: Please provide the user\'s email as an argument.');
  console.log('Usage: node set-admin.js <user-email@example.com>');
  process.exit(1);
}

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function setAdminClaim() {
  try {
    // 1. Look up the user by their email address
    const user = await admin.auth().getUserByEmail(userEmail);

    // 2. Set the custom claim. This will overwrite any existing claims.
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });

    console.log(`Success! User "${userEmail}" (${user.uid}) has been made an admin.`);
    console.log('They may need to log out and log back in for the changes to take effect.');

  } catch (error) {
    console.error('Error setting custom claim:', error.message);
    process.exit(1);
  }
}

setAdminClaim();
```

---

### Step 4: Run the Script

Now, you can run the script from your terminal to make a user an admin.

1.  **Make sure you are in the `my-admin-scripts` directory** in your terminal.
2.  **Execute the script** using Node.js, passing the email of the target user as an argument.

    ```bash
    # Replace user-to-make-admin@example.com with the actual user's email
    node set-admin.js user-to-make-admin@example.com
    ```

3.  If successful, you will see a confirmation message in the console.

The specified user now has the `{ admin: true }` claim. For the new privileges to take effect in the application, the user **must log out and log back in**. This forces a refresh of their ID token, which will now include the new admin claim.