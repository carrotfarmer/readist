import type { IReadingList } from "../types";
import { create } from "zustand";

interface State {
  readingLists: IReadingList[];
}

interface Action {
  setReadingLists: (readingLists: IReadingList[]) => void;
  addReadingList: (readingList: IReadingList) => void;
  deleteReadingList: (readingListId: string) => void;
}

export const useReadingListStore = create<State & Action>((set) => ({
  readingLists: [],
  setReadingLists: (readingLists: IReadingList[]) => set(() => ({ readingLists })),
  addReadingList: (readingList: IReadingList) =>
    set((state) => ({ readingLists: [...state.readingLists, readingList] })),
  deleteReadingList: (readingListId: string) =>
    set((state) => ({ readingLists: state.readingLists.filter((rl) => rl.id !== readingListId) })),
}));
