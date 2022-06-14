import {useEffect, useState} from 'react';
import {InputContainer, ButtonWrapper} from './index';
import {
  OtherData,
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
    color: string;
    otherData: OtherData;
  }
  const {
    addActivity,
    addTimedActivity,
    selectedEntry,
    patchCollection,
    patchEntry,
    repeatEntry,
    isOngoingActivity,
    hasCollectionMembers,
  } = useEntries();

  const initialActivity: PartialActivity = {
    name: '',
    color: '#cdd3fe',
    otherData: {
      notes: '',
      sentiment: Sentiment.Unset,
    },
  };

  if (
    selectedEntry &&
    (isActivity(selectedEntry) || isTimedActivity(selectedEntry))
  ) {
    initialActivity.name = selectedEntry.name;
    initialActivity.color = selectedEntry.color;
    if (selectedEntry.otherData) {
      initialActivity.otherData = selectedEntry.otherData;
    }
  }
  const [activity, setActivity] = useState<PartialActivity>(initialActivity);

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
      if (isMainEdited)
        patchCollection({
          collectionId: selectedEntry.collectionId,
          entry: {...activity, otherData: undefined},
        });
      else if (isAnyEdited)
        patchEntry({
          id: selectedEntry.id,
          entry: activity,
        });
    }
  };

  const setOtherData = (props: any) => {
    setActivity((prev) => ({
      ...prev,
      otherData: {
        ...prev.otherData,
        ...props,
      },
    }));
  };

  useEffect(() => {
    setActivity(initialActivity);
  }, [selectedEntry]);

  const isMainEdited =
    activity.name !== initialActivity.name ||
    activity.color !== initialActivity.color;

  const isAnyEdited =
    JSON.stringify(activity) !== JSON.stringify(initialActivity);

  const isRepeatable =
    selectedEntry && !isMainEdited
      ? (!isMainEdited &&
          isTimedActivity(selectedEntry) &&
          !isOngoingActivity(selectedEntry.collectionId)) ||
        isActivity(selectedEntry)
      : false;

  return (
    <InputContainer>
      <h1>{timed && 'Timed'} Activity</h1>
      <br />
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

      <label>
        Color:
        <input
          type="color"
          value={activity.color}
          onChange={(e) =>
            setActivity((prev) => ({...prev, color: e.target.value}))
          }
        />
      </label>
      <label>
        Notes:
        <textarea
          rows={3}
          value={activity?.otherData?.notes}
          onChange={(e) => setOtherData({notes: e.target.value})}
        ></textarea>
      </label>
      <label>
        Sentiment:
        <select
          value={activity?.otherData.sentiment}
          onChange={(e) =>
            setOtherData({sentiment: e.target.value as Sentiment})
          }
        >
          <option value={Sentiment.Unset}></option>
          {(Object.keys(Sentiment) as Array<keyof typeof Sentiment>).map(
            (value, key) =>
              key !== 0 && (
                <option key={key} value={Sentiment[value]}>
                  {value} : {Sentiment[value]}
                </option>
              )
          )}
        </select>
      </label>
      <ButtonWrapper>
        <button onClick={handleAddNewActivity} disabled={!isMainEdited}>
          {timed ? 'Start' : 'Create'} New Activity
        </button>
        {selectedEntry && isAnyEdited && (
          <button onClick={handleSave}>
            Save{' '}
            {isMainEdited &&
              hasCollectionMembers(selectedEntry.collectionId) &&
              'All'}
          </button>
        )}
        {isRepeatable && <button onClick={handleRepeat}>Repeat</button>}
      </ButtonWrapper>
    </InputContainer>
  );
};
