import type { Book } from "@prisma/client";
import type { IReadingList } from "../types";
import { create } from "zustand";

interface State {
  books: Book[];
}

// interface Action {
//   setReadingLists: (readingLists: IReadingList[]) => void;
//   addReadingList: (readingList: IReadingList) => void;
//   deleteReadingList: (readingListId: string) => void;
// }
//
interface Action {
  setBooks: (books: Book[]) => void;
  addBook: (book: Book) => void;
}

export const useBookStore = create<State & Action>((set) => ({
  books: [],
  setBooks: (books: Book[]) => set(() => ({ books })),
  addBook: (book: Book) => set((state) => ({ books: [...state.books, book] })),
}));
