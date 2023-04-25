import type { Book } from "@prisma/client";
import { create } from "zustand";

interface State {
  books: Book[];
}

interface Action {
  setBooks: (books: Book[]) => void;
  addBook: (book: Book) => void;
  deleteBook: (bookId: string) => void;
}

export const useBookStore = create<State & Action>((set) => ({
  books: [],
  setBooks: (books: Book[]) => set(() => ({ books })),
  addBook: (book: Book) => set((state) => ({ books: [...state.books, book] })),
  deleteBook: (bookId: string) =>
    set((state) => ({ books: state.books.filter((book) => book.id !== bookId) })),
}));
