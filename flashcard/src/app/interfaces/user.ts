/**
 * Interface for users
 * uid: unique id provided by Google
 */

export interface User {
    uid: string;
    email: string;
    displayName: string;
    highScore: number;
    admin: boolean;
}