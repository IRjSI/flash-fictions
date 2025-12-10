import { create } from "zustand";

interface IWrite {
  title: string;
  content: string;
}

interface WritesState {
  selectedWrite: IWrite | null;
  setSelectedWrite: (write: IWrite) => void;
  clearSelectedWrite: () => void;
}

export const useWritesStore = create<WritesState>((set) => ({
  selectedWrite: null,
  setSelectedWrite: (write) => set({ selectedWrite: write }),
  clearSelectedWrite: () => set({ selectedWrite: null }),
}));
