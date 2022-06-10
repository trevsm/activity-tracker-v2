import create from 'zustand';
import {persist} from 'zustand/middleware';

export interface AdditionalData {
  [key: string]: any;
  color?: string;
  startTime?: Date;
  endTime?: Date;
  notes?: string;
  sentiment?: Sentiment;
}

export enum Sentiment {
  Positive = 'positive',
  Negative = 'negative',
  Neutral = 'neutral',
  Mixed = 'mixed',
  Unknown = 'unknown',
}

export interface Activity {
  id: string;
  collectionId: string;
  timestamp: Date;

  name: string;
  additionalData?: AdditionalData;
}
export const isActivity = (entry: Entry): entry is Activity =>
  (<Activity>entry).name !== undefined;

export interface Emotion {
  id: string;
  collectionId: string;
  timestamp: Date;

  overall: string;
  description?: string;
}
export const isEmotion = (entry: Entry): entry is Emotion =>
  (<Emotion>entry).overall !== undefined;

export type Entry = Activity | Emotion;

export interface UseEntriesData {
  entries: Entry[];
  selectedEntry: Entry | null;

  addActivity: (props: {name: string; additionalData?: AdditionalData}) => void;
  addEmotion: (props: {overall: string; description?: string}) => void;

  repeatEntry: (props: {collectionId: string}) => void;
  patchEntry: (props: {id: string; entry: Entry}) => void;
  deleteEntry: (props: {id: string}) => void;
}

export const useEntries = create(
  persist<UseEntriesData>((set, get) => ({
    entries: [],
    selectedEntry: null,
    addActivity: ({name, additionalData}) => {
      const id = Math.random().toString();
      const collectionId = Math.random().toString();
      const timestamp = new Date();
      const activity: Activity = {
        id,
        collectionId,
        timestamp,
        name,
        additionalData,
      };
      set((state) => ({
        ...state,
        entries: [...state.entries, activity],
      }));
    },
    addEmotion: ({overall, description}) => {
      const id = Math.random().toString();
      const collectionId = Math.random().toString();
      const timestamp = new Date();

      let emotion: Emotion = {
        id,
        collectionId,
        overall,
        timestamp,
      };

      if (description) {
        emotion = {
          ...emotion,
          description,
        };
      }

      set((state) => ({
        ...state,
        entries: [...state.entries, emotion],
      }));
    },
    repeatEntry: ({collectionId}) => {
      const entry = get().entries.find(
        (entry) => entry.collectionId === collectionId
      );
      if (entry) {
        set((state) => ({
          ...state,
          entries: [...state.entries, entry],
        }));
      }
    },
    patchEntry: ({id, entry}) => {
      set((state) => ({
        ...state,
        entries: state.entries.map((e) => {
          if (e.id === id) {
            return entry;
          }
          return e;
        }),
      }));
    },
    deleteEntry: ({id}) => {
      set((state) => ({
        ...state,
        entries: state.entries.filter((e) => e.id !== id),
      }));
    },
  }))
);
