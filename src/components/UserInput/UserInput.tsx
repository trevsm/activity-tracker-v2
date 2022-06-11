import {useState} from 'react';
import styled from 'styled-components';
import {ActivityForm} from './InputForms/ActivityForm';
import {EmotionForm} from './InputForms/EmotionForm';

const ButtonWrapper = styled.div`
  padding: 10px;
`;

export function UserInput() {
  type InputType = 'activity' | 'timedActivity' | 'emotion';
  const [type, setType] = useState<InputType | null>(null);

  const handleClose = () => {
    setType(null);
  };

  return (
    <div>
      {(type === 'activity' || type === 'timedActivity') && (
        <ActivityForm {...{handleClose}} timed={type == 'timedActivity'} />
      )}
      {type === 'emotion' && <EmotionForm {...{handleClose}} />}
      <ButtonWrapper>
        <button onClick={() => setType('activity')}>add activity</button>
        <button onClick={() => setType('timedActivity')}>
          add timed activity
        </button>
        <button onClick={() => setType('emotion')}>add emotion</button>
      </ButtonWrapper>
    </div>
  );
}
