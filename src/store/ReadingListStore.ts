import type { Book } from "@prisma/client";
import type { IReadingList } from "../types";
import { create } from "zustand";

interface State {
  readingLists: IReadingList[];
}

interface ReadingListActions {
  setReadingLists: (readingLists: IReadingList[]) => void;
  addReadingList: (readingList: IReadingList) => void;
  deleteReadingList: (readingListId: string) => void;
}

interface BookActions {
  addBook: (readingListId: string, newBook: Book) => void;
  deleteBook: (readingListId: string, bookId: string) => void;
  markAsFinished: (readingListId: string, bookId: string) => void;
  markAsUnFinished: (readingListId: string, bookId: string) => void;
} 

type Action = ReadingListActions & BookActions

export const useReadingListStore = create<State & Action>((set) => ({
  readingLists: [],
  setReadingLists: (readingLists: IReadingList[]) => set(() => ({ readingLists })),

  addReadingList: (readingList: IReadingList) =>
    set((state) => ({ readingLists: [...state.readingLists, readingList] })),

  deleteReadingList: (readingListId: string) =>
    set((state) => ({ readingLists: state.readingLists.filter((rl) => rl.id !== readingListId) })),

  addBook: (readingListId: string, newBook: Book) =>
    set((state) => ({
      readingLists: state.readingLists.map((rl) =>
        rl.id === readingListId ? { ...rl, books: [...rl.books, newBook] } : rl
      ),
    })),

  deleteBook: (readingListId: string, bookId: string) =>
    set((state) => ({
      readingLists: state.readingLists.map((rl) =>
        rl.id === readingListId ? { ...rl, books: rl.books.filter((b) => b.id !== bookId) } : rl
      ),
    })),

  markAsFinished: (readingListId: string, bookId: string) =>
    set((state) => ({
      readingLists: state.readingLists.map((rl) =>
        rl.id === readingListId
          ? {
              ...rl,
              books: rl.books.map((book) =>
                book.id === bookId ? { ...book, isFinished: true } : book
              ),
            }
          : rl
      ),
    })),

  markAsUnFinished: (readingListId: string, bookId: string) =>
    set((state) => ({
      readingLists: state.readingLists.map((rl) =>
        rl.id === readingListId
          ? {
              ...rl,
              books: rl.books.map((book) =>
                book.id === bookId ? { ...book, isFinished: true } : book
              ),
            }
          : rl
      ),
    })),
}));
