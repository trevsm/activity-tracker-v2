import {
  Activity,
  Emotion,
  Entry,
  isActivity,
  isEmotion,
  isTimedActivity,
  AllPartialEntry,
  TimedActivity,
  Feeling,
} from '../../stores/entryTypes';
import styled from 'styled-components';
import {AppProps} from '../../types';
import {getTimeBetween} from '../../tools';
import {useEntries} from '../../stores/useEntries';

export const BgLi = styled.li<{color?: string}>`
  background-color: ${(props) => (props.color ? props.color : '#fff')};
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid;
  pointer-events: auto;
  cursor: pointer;
`;

const H1 = styled.h1`
  margin-bottom: 10px;
`;

interface BaseEntryProps extends AppProps {
  entry: AllPartialEntry;
}

const BaseEntry = ({children, style, entry}: BaseEntryProps) => {
  const {timestamp, startTime, stopTime, additionalData} = entry;

  const {selectEntry} = useEntries();

  const time = timestamp ? new Date(timestamp) : null;
  const start = startTime ? new Date(startTime) : null;
  const stop = stopTime ? new Date(stopTime) : null;

  const duration = start && stop ? getTimeBetween(start, stop) : null;

  const handleSelect = () => {
    if (entry.id) selectEntry(entry.id);
  };

  return (
    <BgLi color={additionalData?.color} style={style} onClick={handleSelect}>
      {children}
      {time && <span>timestamp: {time.toTimeString().split(' ')[0]}</span>}
      {(start || stop) && (
        <div>
          {start && <div>start: {start.toTimeString().split(' ')[0]}</div>}
          {!stop && <div>in-progress...</div>}
          {stop && <div>stop: {stop.toTimeString().split(' ')[0]}</div>}
          {duration && (
            <div>
              duration:{' '}
              <span>
                {duration.hours !== 0 && <span>{duration.hours}h</span>}
                {duration.minutes !== 0 && <span>{duration.minutes}m</span>}
                {duration.seconds !== 0 && <span>{duration.seconds}s</span>}
              </span>
            </div>
          )}
        </div>
      )}
    </BgLi>
  );
};

const ActivityEntry = ({entry}: {entry: Activity}) => {
  return (
    <div>
      <BaseEntry entry={entry}>
        <H1>{entry.name}</H1>
      </BaseEntry>
    </div>
  );
};

const TimedActivityEntry = ({entry}: {entry: TimedActivity}) => {
  return (
    <div>
      <BaseEntry entry={entry}>
        <H1>{entry.name}</H1>
      </BaseEntry>
    </div>
  );
};

const EmotionEntry = ({entry}: {entry: Emotion}) => {
  return (
    <BaseEntry entry={entry}>
      <p>Overall: {entry.overall}</p>
      <p>Description: {entry.description}</p>
    </BaseEntry>
  );
};

export const EntryElement = ({entry}: {entry: Entry}) => {
  if (isActivity(entry)) {
    return <ActivityEntry entry={entry} />;
  }
  if (isTimedActivity(entry)) {
    return <TimedActivityEntry entry={entry} />;
  }
  if (isEmotion(entry)) {
    return <EmotionEntry entry={entry} />;
  }
  return <li>Unknown</li>;
};
