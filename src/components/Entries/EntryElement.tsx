import {
  Activity,
  Emotion,
  Entry,
  isActivity,
  isEmotion,
  isTimedActivity,
  TimedActivity,
} from '../../stores/entryTypes';
import styled from 'styled-components';
import {AppProps} from '../../types';
import {getTimeBetween} from '../../tools';

export const BgLi = styled.li<{color?: string}>`
  background-color: ${(props) => (props.color ? props.color : '#fff')};
  padding: 10px;
  margin-bottom: 10px;
`;

interface BaseEntryProps extends AppProps {
  timestamp?: Date;
  startTime?: Date;
  stopTime?: Date;
  color?: string;
}

const BaseEntry = ({
  children,
  timestamp,
  startTime,
  stopTime,
  color,
  style,
}: BaseEntryProps) => {
  const time = timestamp ? new Date(timestamp) : null;

  const start = startTime ? new Date(startTime) : null;
  const stop = stopTime ? new Date(stopTime) : null;

  const duration = start && stop ? getTimeBetween(start, stop) : null;

  return (
    <BgLi color={color} style={style}>
      {children}
      {time && <span>timestamp: {time.toTimeString().split(' ')[0]}</span>}
      {(start || stop) && (
        <div>
          {start && <div>start: {start.toTimeString().split(' ')[0]}</div>}
          {!stop && <div>in-progress...</div>}
          {stop && <div>stop: {stop.toTimeString().split(' ')[0]}</div>}
          {duration && (
            <div>
              duration:
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
      <BaseEntry
        timestamp={entry.timestamp}
        color={entry.additionalData?.color}
      >
        <span>activity: {entry.name}</span>
        {entry.additionalData && (
          <ul>
            {Object.keys(entry.additionalData).map((value, key) => {
              if (!entry.additionalData) return null;

              const entryValue = entry.additionalData[value];
              if (!entryValue) return null;

              return (
                <li key={key}>
                  {value} : {entryValue}
                </li>
              );
            })}
          </ul>
        )}
      </BaseEntry>
    </div>
  );
};

const TimedActivityEntry = ({entry}: {entry: TimedActivity}) => {
  return (
    <div>
      <BaseEntry
        startTime={entry.startTime}
        stopTime={entry.stopTime}
        color={entry.additionalData?.color}
      >
        <span>activity: {entry.name}</span>
        {entry.additionalData && (
          <ul>
            {Object.keys(entry.additionalData).map((value, key) => {
              if (!entry.additionalData) return null;

              const entryValue = entry.additionalData[value];
              if (!entryValue) return null;

              return (
                <li key={key}>
                  {value} : {entryValue}
                </li>
              );
            })}
          </ul>
        )}
      </BaseEntry>
    </div>
  );
};

const EmotionEntry = ({entry}: {entry: Emotion}) => {
  return (
    <BaseEntry timestamp={entry.timestamp}>
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
