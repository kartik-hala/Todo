import * as admin from 'firebase-admin';
import serviceAccount from '@/firebase-admin-key.json'; // Adjust the path as per your project structure

// Check if the app has already been initialized to avoid reinitialization
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: serviceAccount.project_id,
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key.replace(/\\n/g, '\n'), // Ensure private key is properly formatted
    }),
  });
}

export const adminAuth = admin.auth();
