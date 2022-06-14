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
import {useGlobal} from '../../stores/useGlobal';

const StyledBaseEntry = styled.li<{color?: string; selected: boolean}>`
  display: flex;
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

const ButtonWrapper = styled.div`
  button {
    margin-left: 10px;
  }
`;

interface BaseEntryProps extends AppProps {
  entry: AllPartialEntry;
}

const BaseEntry = ({children, style, entry}: BaseEntryProps) => {
  const {timestamp, startTime, stopTime, color} = entry;
  const {setEntryEditPopup} = useGlobal();
  const {selectEntry, selectedEntry, deleteEntry} = useEntries();

  const time = timestamp ? new Date(timestamp) : null;
  const start = startTime ? new Date(startTime) : null;
  const stop = stopTime ? new Date(stopTime) : null;

  const duration = start && stop ? getTimeBetween(start, stop) : null;

  const isSelected = !!selectedEntry && selectedEntry.id == entry.id;

  const handleSelect = () => {
    if (entry.id) selectEntry(entry.id);
  };

  const deleteAble = (start && stop) || (!start && !stop);

  const handleDelete = () => {
    if (!deleteAble) {
      alert('Unable to delete. Pause or End before deleting.');
      return;
    }
    if (window.confirm('Are you sure you want to delete entry?')) {
      if (entry.id) deleteEntry(entry.id);
    }
  };

  const handleEdit = () => {
    setEntryEditPopup(true);
  };

  return (
    <StyledBaseEntry
      color={color}
      selected={isSelected}
      style={style}
      onClick={handleSelect}
    >
      <div>
        {children}
        {start && !stop && <div>in-progress...</div>}
        {duration && (
          <div>
            {duration.hours !== 0 && <span>{duration.hours}h</span>}{' '}
            {duration.minutes !== 0 && <span>{duration.minutes}m</span>}{' '}
            {duration.seconds !== 0 && <span>{duration.seconds}s</span>}
          </div>
        )}
      </div>
      {isSelected && (
        <ButtonWrapper>
          <button onClick={handleEdit}>edit</button>
          <button onClick={handleDelete} disabled={!deleteAble}>
            del
          </button>
        </ButtonWrapper>
      )}
    </StyledBaseEntry>
  );
};

const ActivityEntry = ({entry}: {entry: Activity}) => {
  return (
    <H1>
      {entry.name} {entry.otherData?.notes ? '💬' : null}
    </H1>
  );
};

const TimedActivityEntry = ({entry}: {entry: TimedActivity}) => {
  return (
    <H1>
      {entry.name} {entry.otherData?.notes ? '💬' : null}{' '}
      {entry.otherData?.sentiment}
    </H1>
  );
};

const EmotionEntry = ({entry}: {entry: Emotion}) => {
  return (
    <>
      {entry.overall} {entry.description ? '💬' : null}{' '}
    </>
  );
};

export const EntryElement = ({entry}: {entry: Entry}) => {
  const InnerEntry = () => {
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

  return (
    <BaseEntry entry={entry}>
      <InnerEntry />
    </BaseEntry>
  );
};
