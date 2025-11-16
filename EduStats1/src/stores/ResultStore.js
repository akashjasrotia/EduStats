import { create } from "zustand";

export const useResultStore = create((set) => ({
  results: null,
  setResults: (data) => set({ results: data }),
  clearResults: () => set({ results: null })
}));
