import { Book } from "@prisma/client";
import type { IReadingList } from "../types";
import { create } from "zustand";

interface State {
  readingLists: IReadingList[];
}

interface Action {
  setReadingLists: (readingLists: IReadingList[]) => void;
  addReadingList: (readingList: IReadingList) => void;
  deleteReadingList: (readingListId: string) => void;
  addBook: (readingListId: string, newBook: Book) => void;
}

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
}));
