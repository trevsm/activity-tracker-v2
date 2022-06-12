import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {isActivity, isEmotion, isTimedActivity} from '../../stores/entryTypes';
import {useEntries} from '../../stores/useEntries';
import {ActivityForm} from './InputForms/ActivityForm';
import {EmotionForm} from './InputForms/EmotionForm';

const ButtonWrapper = styled.div`
  padding: 10px;
`;

export function UserInput() {
  type InputType = 'activity' | 'timedActivity' | 'emotion';
  const [type, setType] = useState<InputType | null>(null);
  const {selectedEntry, selectEntry} = useEntries();

  const handleClose = () => {
    setType(null);
    selectEntry(null);
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

  return (
    <div>
      {(type === 'activity' || type === 'timedActivity') && (
        <ActivityForm {...{handleClose}} timed={type == 'timedActivity'} />
      )}
      {type === 'emotion' && <EmotionForm {...{handleClose}} />}
      <ButtonWrapper>
        <button onClick={() => selectType('activity')}>add activity</button>
        <button onClick={() => selectType('timedActivity')}>
          add timed activity
        </button>
        <button onClick={() => selectType('emotion')}>add emotion</button>
      </ButtonWrapper>
    </div>
  );
}
