// DO NOT EDIT. This file is machine-generated and constantly overwritten.
// Make changes to this file instead.

/**
 * @fileOverview A simple, centralized event emitter for handling application-wide events.
 *
 * This file provides a basic but effective event emitter implementation. It is used
 * throughout the application to decouple components and services. For example, it allows
 * Firestore data operations to report permission errors without being directly tied to the UI.
 * A central listener (`FirebaseErrorListener.tsx`) can then subscribe to these events and
 * display appropriate feedback to the user.
 *
 * @see ../components/firebase/FirebaseErrorListener.tsx
 * @see ./errors.ts
 */

type EventMap = Record<string, any>;
type EventKey<T extends EventMap> = string & keyof T;

export class EventEmitter<T extends EventMap> {
  private listeners: { [K in EventKey<T>]?: Array<(p: T[K]) => void> } = {};

  /**
   * Subscribes a listener to a specific event.
   *
   * @param key The event to subscribe to.
   * @param listener The callback function to execute when the event is emitted.
   */
  on<K extends EventKey<T>>(key: K, listener: (p: T[K]) => void): void {
    this.listeners[key] = (this.listeners[key] || []).concat(listener);
  }

  /**
   * Emits an event, calling all subscribed listeners with the provided payload.
   *
   * @param key The event to emit.
   * @param payload The data to pass to the listeners.
   */
  emit<K extends EventKey<T>>(key: K, payload: T[K]): void {
    const listeners = this.listeners[key];
    if (listeners) {
      listeners.forEach(listener => listener(payload));
    }
  }
}

// Create and export a singleton instance of the error emitter.
// This ensures that the same emitter is used throughout the application.
export const errorEmitter = new EventEmitter<{
  'permission-error': Error;
}>();
