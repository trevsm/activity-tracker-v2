import create from 'zustand';

interface UseGlobalData {
  entryEditPopup: boolean;
  setEntryEditPopup: (entryEditPopup: boolean) => void;
}

export const useGlobal = create<UseGlobalData>((set) => ({
  entryEditPopup: false,
  setEntryEditPopup: (entryEditPopup) => set({entryEditPopup}),
}));
