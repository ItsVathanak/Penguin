// This interface defines the structure of a Note object in our application.
export interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: number;
    updatedAt: number;
}

// This is a helper type for when we are creating a NEW note.
// "Omit" is a TypeScript utility. It says:
// "Take the Note interface above, but remove 'id', 'createdAt', and 'updatedAt'."
// We do this because when we first type a title, the app hasn't generated the ID or dates yet.
export type NewNote = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;