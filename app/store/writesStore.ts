import { create } from "zustand";

interface IWrite {
  id: string;
  title: string;
  content: string;
}

interface WritesState {
  selectedWrite: IWrite | null;
  setSelectedWrite: (write: IWrite) => void;
  clearSelectedWrite: () => void;
  bookMark: IWrite | null;
  setBookMark: (write: IWrite) => void;
  clearBookMark: () => void;
}

// initializes the store with the writes data
export const useWritesStore = create<WritesState>((set) => ({
  selectedWrite: null,
  setSelectedWrite: (write: IWrite) => set(() => ({ selectedWrite: write })),
  clearSelectedWrite: () => set(() => ({ selectedWrite: null })),
  bookMark: null,
  setBookMark: (write: IWrite) => set(() => ({ bookMark: write })),
  clearBookMark: () => set(() => ({ bookMark: null })),
}));