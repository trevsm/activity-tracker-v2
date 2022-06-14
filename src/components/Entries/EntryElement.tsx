import {
  Activity,
  Emotion,
  Entry,
  isActivity,
  isEmotion,
  isTimedActivity,
  AllPartialEntry,
  TimedActivity,
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
  width: fit-content;
  cursor: pointer;
`;

const H1 = styled.h1`
  margin-bottom: 10px;
`;

interface BaseEntryProps extends AppProps {
  entry: AllPartialEntry;
}

const BaseEntry = ({children, style, entry}: BaseEntryProps) => {
  const {timestamp, startTime, stopTime, color} = entry;

  const {selectEntry} = useEntries();

  const time = timestamp ? new Date(timestamp) : null;
  const start = startTime ? new Date(startTime) : null;
  const stop = stopTime ? new Date(stopTime) : null;

  const duration = start && stop ? getTimeBetween(start, stop) : null;

  const handleSelect = () => {
    if (entry.id) selectEntry(entry.id);
  };

  return (
    <BgLi color={color} style={style} onClick={handleSelect}>
      {children}
      {start && !stop && <div>in-progress...</div>}
    </BgLi>
  );
};

const ActivityEntry = ({entry}: {entry: Activity}) => {
  return (
    <div>
      <BaseEntry entry={entry}>
        <H1>
          {entry.name} {entry.otherData?.notes ? '💬' : null}
        </H1>
      </BaseEntry>
    </div>
  );
};

const TimedActivityEntry = ({entry}: {entry: TimedActivity}) => {
  return (
    <div>
      <BaseEntry entry={entry}>
        <H1>
          {entry.name} {entry.otherData?.notes ? '💬' : null}{' '}
          {entry.otherData?.sentiment}
        </H1>
      </BaseEntry>
    </div>
  );
};

const EmotionEntry = ({entry}: {entry: Emotion}) => {
  return (
    <div>
      <BaseEntry entry={entry}>
        {entry.overall} {entry.description ? '💬' : null}{' '}
      </BaseEntry>
    </div>
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
