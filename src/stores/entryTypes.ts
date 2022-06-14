export interface OtherData {
  [key: string]: any;
  notes?: string;
  sentiment?: Sentiment;
}

export enum Sentiment {
  Unset = '---',
  Positive = 'Positive',
  Negative = 'Negative',
  Neutral = 'Neutral',
  Mixed = 'Mixed',
  Unknown = 'Unknown',
}

export enum Feeling {
  Unset = '---',
  Great = '😀',
  Good = '🙂',
  Meh = '😐',
  Poor = '🙁',
  Bad = '😞',
}

// entry types

interface GeneralActivity {
  id: string;
  collectionId: string;
  name: string;
  color: string;
  otherData?: OtherData;
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

  overall: Feeling;
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
