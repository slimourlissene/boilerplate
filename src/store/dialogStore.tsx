import { create } from "zustand";

interface DialogStore {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useDialogStore = create<DialogStore>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));
