import {useEffect, useState} from 'react';
import {InputContainer, Hr} from './index';
import {
  AdditionalData,
  isActivity,
  isTimedActivity,
  Sentiment,
} from '../../../stores/entryTypes';
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
  const {
    addActivity,
    addTimedActivity,
    selectedEntry,
    patchCollection,
    repeatEntry,
    isOngoingActivity,
  } = useEntries();

  const initialActivity: PartialActivity = {
    name: '',
    additionalData: {
      color: '#e0f0ff',
      notes: '',
    },
  };

  if (
    selectedEntry &&
    (isActivity(selectedEntry) || isTimedActivity(selectedEntry))
  ) {
    initialActivity.name = selectedEntry.name;
    if (selectedEntry.additionalData) {
      initialActivity.additionalData = selectedEntry.additionalData;
    }
  }
  const [activity, setActivity] = useState<PartialActivity>(initialActivity);

  const [showMore, setShowMore] = useState(false);

  const isEdited = JSON.stringify(activity) !== JSON.stringify(initialActivity);

  const handleAddNewActivity = () => {
    if (!activity.name) return;

    if (timed) addTimedActivity(activity);
    else addActivity(activity);
    handleClose();
  };

  const handleRepeat = () => {
    if (selectedEntry) {
      repeatEntry(selectedEntry);
      handleClose();
    }
  };

  const handleSave = () => {
    if (selectedEntry) {
      patchCollection({
        collectionId: selectedEntry.collectionId,
        entry: activity,
      });
      handleClose();
    }
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

  useEffect(() => {
    setActivity(initialActivity);
  }, [selectedEntry]);

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
              <option value="">---</option>
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
        {timed ? 'Start' : 'Create'} New Activity
      </button>
      {selectedEntry && (
        <>
          {isEdited && <button onClick={handleSave}>Save</button>}
          {((isTimedActivity(selectedEntry) &&
            !isOngoingActivity(selectedEntry.collectionId)) ||
            isActivity(selectedEntry)) && (
            <button onClick={handleRepeat}>Repeat</button>
          )}
        </>
      )}
    </InputContainer>
  );
};
