/**
 * Interface for the flashcards
 * id: unique
 * difficulty: 1 - easiest, 3 - hardest
 */

export interface Flashcard{

    id: number;
    hungarianPhrase: string;
    englishPhrase: string;
    category: string;
    difficulty: number;

}