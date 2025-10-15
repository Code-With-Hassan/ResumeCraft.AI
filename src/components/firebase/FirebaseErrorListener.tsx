// DO NOT EDIT. This file is machine-generated and constantly overwritten.
// Make changes to this file instead.

'use client';

/**
 * @fileOverview A client-side React component that listens for and displays Firestore permission errors.
 *
 * This component is a critical part of the development-time feedback loop for Firestore security rules.
 * It subscribes to the global `errorEmitter` and, when a 'permission-error' event is caught,
 * it intentionally throws the error.
 *
 * In a Next.js development environment, this thrown error is intercepted and displayed in a rich,
 * interactive overlay. This provides immediate, contextual feedback to the developer about why a
` * Firestore request was denied, significantly speeding up the process of writing and debugging
` * security rules.
 *
 * This component should be placed high up in the component tree (e.g., in the root layout) to ensure
 * it's active for the entire application.
 *
 * @see /src/firebase/error-emitter.ts
 * @see /src/firebase/errors.ts
 */

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';

export default function FirebaseErrorListener() {
  useEffect(() => {
    const handleError = (error: Error) => {
      // In a development environment, throwing the error here will trigger
      // the Next.js error overlay, which is exactly what we want for
      // debugging security rules.
      if (process.env.NODE_ENV === 'development') {
        throw error;
      } else {
        // In production, you might want to log this to a monitoring service
        // instead of throwing it.
        console.error('A Firestore permission error occurred:', error);
      }
    };

    errorEmitter.on('permission-error', handleError);

    // No cleanup function is returned because the emitter should be active
    // for the entire lifecycle of the application.
  }, []);

  // This component does not render anything to the DOM.
  return null;
}
