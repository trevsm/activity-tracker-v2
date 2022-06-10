import {useState} from 'react';
import styled from 'styled-components';
import {AdditionalData, Sentiment, useEntries} from '../stores/useEntries';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 200px;
  padding: 10px;
  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }
`;

const Hr = styled.hr`
  margin: 10px 0;
`;

const ActivityInput = ({handleClose}: {handleClose: () => void}) => {
  interface PartialActivity {
    name: string;
    additionalData: AdditionalData;
  }
  const [activity, setActivity] = useState<PartialActivity>({
    name: '',
    additionalData: {
      color: '#123456',
    },
  });

  const [showMore, setShowMore] = useState(false);

  const {addActivity} = useEntries();

  const handleAddNewActivity = () => {
    addActivity({...activity});
    handleClose();
  };

  const handleToggleShowMore = () => {
    setShowMore(!showMore);
  };

  const setAdditionalData = (props: any) => {
    setActivity((prev) => ({
      ...prev,
      additionalData: {
        ...prev.additionalData,
        ...props,
      },
    }));
  };

  const start = activity.additionalData.startTime;
  const end = activity.additionalData.endTime;

  return (
    <InputContainer>
      <label>
        Name:
        <input
          type="text"
          value={activity.name}
          onChange={(e) =>
            setActivity((prev) => ({...prev, name: e.target.value}))
          }
        />
      </label>
      <p>More details:</p>
      <button onClick={handleToggleShowMore}>
        {showMore ? 'hide' : 'show'}
      </button>
      {showMore && (
        <>
          <Hr />
          <label>
            Color:
            <input
              type="color"
              value={activity.additionalData.color}
              onChange={(e) => setAdditionalData({color: e.target.value})}
            />
          </label>
          <label>
            Start Time:
            <input
              type="datetime-local"
              defaultValue={(start || '').toString()}
              onChange={(e) => setAdditionalData({startTime: e.target.value})}
            />
          </label>
          <label>
            End Time:
            <input
              type="datetime-local"
              defaultValue={(end || '').toString()}
              onChange={(e) => setAdditionalData({endTime: e.target.value})}
            />
          </label>
          <label>
            Notes:
            <textarea
              rows={3}
              value={activity?.additionalData?.notes}
              onChange={(e) => setAdditionalData({notes: e.target.value})}
            ></textarea>
          </label>
          <label>
            Sentiment:
            <select
              value={activity?.additionalData.sentiment}
              onChange={(e) =>
                setAdditionalData({sentiment: e.target.value as Sentiment})
              }
            >
              {Object.keys(Sentiment).map((value, key) => (
                <option key={key} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
        </>
      )}
      {!showMore && <Hr />}
      <button onClick={handleAddNewActivity} type="submit">
        Add New
      </button>
    </InputContainer>
  );
};

const EmotionInput = ({handleClose}: {handleClose: () => void}) => {
  interface PartialEmotion {
    overall: string;
    description?: string;
  }
  const [emotion, setEmotion] = useState<PartialEmotion>({
    overall: '',
    description: '',
  });

  const {addEmotion} = useEntries();

  const handleAddNewEmotion = () => {
    addEmotion({...emotion});
    handleClose();
  };

  const handleOverallChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmotion((prev) => ({...prev, overall: e.target.value}));
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setEmotion((prev) => ({...prev, description: e.target.value}));

  return (
    <InputContainer>
      <label>
        Overall (0-10):
        <input
          type="number"
          value={emotion.overall}
          onChange={handleOverallChange}
          min={0}
          max={10}
        />
      </label>
      <label>
        Description:
        <textarea
          rows={3}
          value={emotion.description}
          onChange={handleDescriptionChange}
        ></textarea>
      </label>
      <button onClick={handleAddNewEmotion}>Add New</button>
    </InputContainer>
  );
};

const ButtonWrapper = styled.div`
  padding: 10px;
`;

export function UserInput() {
  type InputType = 'activity' | 'emotion';
  const [type, setType] = useState<InputType | null>(null);

  const handleClose = () => {
    setType(null);
  };

  return (
    <div>
      {type === 'activity' && <ActivityInput {...{handleClose}} />}
      {type === 'emotion' && <EmotionInput {...{handleClose}} />}
      <ButtonWrapper>
        <button onClick={() => setType('activity')}>add activity</button>
        <button onClick={() => setType('emotion')}>add emotion</button>
      </ButtonWrapper>
    </div>
  );
}
