import create from 'zustand';
import {persist} from 'zustand/middleware';
import {
  Entry,
  Activity,
  OtherData,
  Emotion,
  TimedActivity,
  AllPartialEntry,
  isTimedActivity,
  Feeling,
} from './entryTypes';

export interface UseEntriesData {
  entries: Entry[];
  ongoingActivities: TimedActivity[];
  selectedEntry: Entry | null;

  addActivity: (props: {
    name: string;
    color: string;
    otherData?: OtherData;
  }) => void;
  addTimedActivity: (props: {
    name: string;
    color: string;
    otherData?: OtherData;
  }) => void;
  addEmotion: (props: {overall: Feeling; description?: string}) => void;
  removeOngoingActivity: (id: string) => void;
  selectEntry: (id: string | null) => void;

  hasCollectionMembers: (id: string) => boolean;
  isOngoingActivity: (collectionId: string) => boolean;

  repeatEntry: (props: {collectionId: string}) => void;
  patchEntry: (props: {id: string; entry: AllPartialEntry}) => void;
  patchCollection: (props: {
    collectionId: string;
    entry: AllPartialEntry;
  }) => void;
  deleteEntry: (props: {id: string}) => void;
}

export const useEntries = create(
  persist<UseEntriesData>((set, get) => ({
    entries: [],
    ongoingActivities: [],
    selectedEntry: null,
    addActivity: ({name, color, otherData}) => {
      const id = Math.random().toString();
      const collectionId = Math.random().toString();
      const timestamp = new Date();
      const activity: Activity = {
        id,
        collectionId,
        timestamp,
        name,
        color,
        otherData,
      };
      set((state) => ({
        ...state,
        entries: [...state.entries, activity],
      }));
    },
    removeOngoingActivity: (id) => {
      set((state) => ({
        ongoingActivities: state.ongoingActivities.filter(
          (activity) => activity.id !== id
        ),
      }));
    },
    selectEntry: (id) => {
      if (id)
        set((state) => ({
          selectedEntry: state.entries.find((entry) => entry.id === id) || null,
        }));
      else set({selectedEntry: null});
    },
    addTimedActivity: ({name, color, otherData}) => {
      const id = Math.random().toString();
      const collectionId = Math.random().toString();
      const startTime = new Date();
      const timedActivity: TimedActivity = {
        id,
        collectionId,
        startTime,
        name,
        color,
        otherData,
      };

      set((state) => ({
        entries: [...state.entries, timedActivity],
        ongoingActivities: [...state.ongoingActivities, timedActivity],
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

      set(({entries}) => ({
        entries: [...entries, emotion],
      }));
    },
    isOngoingActivity: (collectionId) => {
      return get().ongoingActivities.some(
        (activity) => activity.collectionId === collectionId
      );
    },
    hasCollectionMembers: (collectionId) => {
      return (
        get().entries.filter((entry) => entry.collectionId === collectionId)
          .length > 1
      );
    },
    repeatEntry: ({collectionId}) => {
      const entry = get().entries.find(
        (entry) => entry.collectionId === collectionId
      );
      const id = Math.random().toString();

      if (!entry) return;

      const newEntry: Entry = {...entry};

      const isTimed = isTimedActivity(newEntry);
      if (isTimed) {
        newEntry.startTime = new Date();
        delete newEntry.stopTime;
      }

      set(({entries}) => ({
        entries: [
          ...entries,
          {...newEntry, id, collectionId, otherData: undefined},
        ],
      }));

      if (!isTimed) return;

      // update ongoing activities
      const ongoingActivity = get().ongoingActivities.find(
        (activity) => activity.collectionId === collectionId
      );

      if (ongoingActivity) {
        set(({ongoingActivities}) => ({
          ongoingActivities: ongoingActivities.map((activity) =>
            activity.collectionId === collectionId
              ? {
                  ...activity,
                  id,
                  stopTime: undefined,
                }
              : activity
          ),
        }));
      } else {
        set(({ongoingActivities}) => ({
          ongoingActivities: [
            ...ongoingActivities,
            {...newEntry, id, collectionId},
          ],
        }));
      }
    },
    patchEntry: ({id, entry}) => {
      set((state) => ({
        ...state,
        entries: state.entries.map((e) => {
          if (e.id === id) {
            return {...e, ...entry};
          }
          return e;
        }),
        ongoingActivities: state.ongoingActivities.map((e) => {
          if (e.id === id) {
            return {...e, ...entry};
          }
          return e;
        }),
      }));
    },
    patchCollection: ({collectionId, entry}) => {
      set((state) => ({
        ...state,
        entries: state.entries.map((e) => {
          if (e.collectionId === collectionId) {
            return {...e, ...entry};
          }
          return e;
        }),
        ongoingActivities: state.ongoingActivities.map((e) => {
          if (e.collectionId === collectionId) {
            return {...e, ...entry};
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
