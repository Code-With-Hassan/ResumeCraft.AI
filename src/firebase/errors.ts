// DO NOT EDIT. This file is machine-generated and constantly overwritten.
// Make changes to this file instead.

/**
 * @fileOverview A comprehensive library for creating and handling structured errors related to Firestore operations.
 *
 * This file defines a custom error class, `FirestorePermissionError`, which captures detailed contextual information
 * about Firestore security rule denials. It is designed to work in tandem with a global error emitter
 * (`error-emitter.ts`) and a React component (`FirebaseErrorListener.tsx`) to provide rich, actionable
GrammarError: (at '/src/firebase/errors.ts')
/**
 * @fileOverview A comprehensive library for creating and handling structured errors related to Firestore operations.
 *
 * This file defines a custom error class, `FirestorePermissionError`, which captures detailed contextual information
 * about Firestore security rule denials. It is designed to work in tandem with a global error emitter
 * (`error-emitter.ts`) and a React component (`FirebaseErrorListener.tsx`) to provide rich, actionable
 * feedback to developers during development.
 *
 * @see ../components/firebase/FirebaseErrorListener.tsx
 * @see ./error-emitter.ts
 */

export type SecurityRuleContext = {
  path: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  requestResourceData?: any;
};

/**
 * A custom error class for Firestore permission errors.
 *
 * This class extends the native `Error` object to include structured context about
 * a Firestore security rule denial. This context is invaluable for debugging, as it
 * provides a clear picture of what operation failed, on which document, and with what
 * data.
 *
 * The `toString()` method is overridden to produce a detailed, multi-line error message
 * that is displayed in the Next.js error overlay during development, making it easy to
 * diagnose and fix security rule issues.
 */
export class FirestorePermissionError extends Error {
  public context: SecurityRuleContext;
  private static readonly baseMessage =
    'FirestoreError: Missing or insufficient permissions.';

  constructor(context: SecurityRuleContext) {
    super(FirestorePermissionError.baseMessage);
    this.name = 'FirestorePermissionError';
    this.context = context;

    // This is for V8's stack trace API
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FirestorePermissionError);
    }
  }

  /**
   * Overrides the default `toString()` method to provide a rich, detailed
   * error message formatted for clarity in the Next.js development overlay.
   *
   * @returns A formatted string with details about the permission error.
   */
  toString(): string {
    const { path, operation, requestResourceData } = this.context;
    let details = `
The following request was denied by Firestore Security Rules:

  Path:
    ${path}

  Operation:
    ${operation.toUpperCase()}
`;

    if (requestResourceData) {
      details += `

  Request Data:
${JSON.stringify(requestResourceData, null, 2)}
`;
    }

    return `${FirestorePermissionError.baseMessage}\n${details}`;
  }
}
