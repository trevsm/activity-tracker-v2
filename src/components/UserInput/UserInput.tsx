import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {isActivity, isEmotion, isTimedActivity} from '../../stores/entryTypes';
import {useEntries} from '../../stores/useEntries';
import {useGlobal} from '../../stores/useGlobal';
import {ActivityForm} from './InputForms/ActivityForm';
import {EmotionForm} from './InputForms/EmotionForm';

const ButtonWrapper = styled.div`
  padding: 10px;
`;

export function UserInput({
  handleLayerClick,
}: {
  handleLayerClick: React.MutableRefObject<() => void>;
}) {
  type InputType = 'activity' | 'timedActivity' | 'emotion';
  const [type, setType] = useState<InputType | null>(null);
  const {selectedEntry, selectEntry} = useEntries();
  const {entryEditPopup, setEntryEditPopup} = useGlobal();

  const handleClose = () => {
    setType(null);
    selectEntry(null);
    setEntryEditPopup(false);
  };

  const handleOpen = (type: InputType) => {
    selectType(type);
    setEntryEditPopup(true);
  };

  const selectType = (type: InputType) => {
    setType(type);
    selectEntry(null);
  };

  useEffect(() => {
    if (selectedEntry) {
      if (isActivity(selectedEntry)) setType('activity');
      if (isTimedActivity(selectedEntry)) setType('timedActivity');
      if (isEmotion(selectedEntry)) setType('emotion');
    }
  }, [selectedEntry]);

  useEffect(() => {
    handleLayerClick.current = () => {
      handleClose();
    };
  }, []);

  return (
    <div>
      {entryEditPopup && (
        <>
          {(type === 'activity' || type === 'timedActivity') && (
            <ActivityForm {...{handleClose}} timed={type == 'timedActivity'} />
          )}
          {type === 'emotion' && <EmotionForm {...{handleClose}} />}
        </>
      )}
      <ButtonWrapper>
        <button onClick={() => handleOpen('activity')}>add activity</button>
        <button onClick={() => handleOpen('timedActivity')}>
          add timed activity
        </button>
        <button onClick={() => handleOpen('emotion')}>add emotion</button>
      </ButtonWrapper>
    </div>
  );
}
