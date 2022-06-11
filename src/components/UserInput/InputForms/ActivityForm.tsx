import {useState} from 'react';
import {InputContainer, Hr} from './index';
import {AdditionalData, Sentiment} from '../../../stores/entryTypes';
import {useEntries} from '../../../stores/useEntries';

export const ActivityForm = ({
  handleClose,
  timed,
}: {
  handleClose: () => void;
  timed: boolean;
}) => {
  interface PartialActivity {
    name: string;
    additionalData: AdditionalData;
  }
  const [activity, setActivity] = useState<PartialActivity>({
    name: '',
    additionalData: {
      color: '#e0f0ff',
    },
  });

  const [showMore, setShowMore] = useState(false);

  const {addActivity, addTimedActivity} = useEntries();

  const handleAddNewActivity = () => {
    if (!activity.name) return;

    if (timed) addTimedActivity(activity);
    else addActivity(activity);
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

  return (
    <InputContainer>
      <h1>{timed && 'Timed'} Activity</h1>
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
        {timed ? 'Start' : 'Add'} Activity
      </button>
    </InputContainer>
  );
};
