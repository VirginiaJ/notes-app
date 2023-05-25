import { create } from "zustand";

export type TCategory = { _id: string; name: string };
export type TNote = { _id: string; name: string; category: string };

type State = {
  notes: TNote[] | null;
  categories: TCategory[] | null;
  addNote: (newNote: TNote) => void;
  removeNote: (id: string) => void;
  setNotes: (newNotes: TNote[]) => void;
  addCategory: (newCategory: TCategory) => void;
  setCategories: (newCategories: TCategory[]) => void;
};

export const useStore = create<State>((set) => ({
  notes: null,
  categories: null,
  addNote: (newNote: TNote) =>
    set((state) => ({
      notes: state.notes ? [...state.notes, newNote] : [newNote],
    })),
  removeNote: (id: string) =>
    set((state) => ({
      notes: state.notes ? state.notes.filter((note) => note._id !== id) : null,
    })),
  setNotes: (newNotes: TNote[]) =>
    set(() => ({
      notes: [...newNotes],
    })),
  addCategory: (newCategory: TCategory) =>
    set((state) => ({
      categories: state.categories
        ? [...state.categories, newCategory]
        : [newCategory],
    })),
  setCategories: (newCategories: TCategory[]) =>
    set(() => ({
      categories: [...newCategories],
    })),
}));
