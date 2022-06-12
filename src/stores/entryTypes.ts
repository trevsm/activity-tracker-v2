export interface AdditionalData {
  [key: string]: any;
  color?: string;
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

// entry types

interface GeneralActivity {
  id: string;
  collectionId: string;
  name: string;
  additionalData?: AdditionalData;
}

export interface Activity extends GeneralActivity {
  timestamp: Date;
}

export interface TimedActivity extends GeneralActivity {
  startTime: Date;
  stopTime?: Date;
}

export interface Emotion {
  id: string;
  collectionId: string;
  timestamp: Date;

  overall: string;
  description?: string;
}

export type Entry = Activity | TimedActivity | Emotion;

export type AllPartialEntry = Partial<Activity> &
  Partial<TimedActivity> &
  Partial<Emotion>;

// type check methods

export const isActivity = (entry: Entry): entry is Activity =>
  (<Activity>entry).timestamp !== undefined &&
  (<Activity>entry).name !== undefined;

export const isTimedActivity = (entry: Entry): entry is TimedActivity =>
  (<TimedActivity>entry).startTime !== undefined;

export const isEmotion = (entry: Entry): entry is Emotion =>
  (<Emotion>entry).overall !== undefined;
