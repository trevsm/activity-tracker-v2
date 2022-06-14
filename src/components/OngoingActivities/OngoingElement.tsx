import styled from 'styled-components';
import {TimedActivity} from '../../stores/entryTypes';
import {useEntries} from '../../stores/useEntries';

const PlayButtons = styled.div``;

const BrLi = styled.li<{color?: string}>`
  border: 1px solid;
  margin-bottom: 10px;
  pointer-events: auto;
  .main {
    border-left: 10px solid ${({color}) => color};
    padding: 5px 10px;
    display: flex;
    button {
      margin-left: 5px;
    }
    span.name {
      display: inline-block;
      margin-right: 10px;
    }
  }
`;

export const OngoingActivityElement = ({entry}: {entry: TimedActivity}) => {
  const {patchEntry, repeatEntry, removeOngoingActivity} = useEntries();

  const handlePause = () => {
    const stopTime = new Date();
    patchEntry({id: entry.id, entry: {stopTime}});
  };

  const handleStart = () => {
    repeatEntry({collectionId: entry.collectionId});
  };

  const handleEnd = () => {
    if (!entry.stopTime) handlePause();
    removeOngoingActivity(entry.id);
  };

  return (
    <BrLi color={entry.color}>
      <div className="main">
        <span className="name">{entry.name}</span>
        <PlayButtons>
          {entry.stopTime ? (
            <button onClick={handleStart}>start</button>
          ) : (
            <button onClick={handlePause}>pause</button>
          )}
          <button onClick={handleEnd}>end</button>
        </PlayButtons>
      </div>
    </BrLi>
  );
};
