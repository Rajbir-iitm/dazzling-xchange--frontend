import { create } from 'zustand';

interface SalesModalState {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useSalesModalStore = create<SalesModalState>((set) => ({
  open: false,
  openModal: () => set({ open: true }),
  closeModal: () => set({ open: false }),
}));