import {useEffect, useState} from 'react';
import {ButtonWrapper, InputContainer} from './index';
import {useEntries} from '../../../stores/useEntries';
import {Feeling, isEmotion} from '../../../stores/entryTypes';

export const EmotionForm = ({handleClose}: {handleClose: () => void}) => {
  const {addEmotion, selectedEntry, patchCollection, repeatEntry} =
    useEntries();

  interface PartialEmotion {
    overall: Feeling;
    description?: string;
  }
  const initialEmotion: PartialEmotion = {
    overall: Feeling.Unset,
    description: '',
  };

  if (selectedEntry && isEmotion(selectedEntry)) {
    initialEmotion.overall = selectedEntry.overall;
    initialEmotion.description = selectedEntry.description;
  }

  const [emotion, setEmotion] = useState<PartialEmotion>(initialEmotion);

  const handleAddNewEmotion = () => {
    if (!emotion.overall) return;
    addEmotion({...emotion});
    handleClose();
  };

  const handleRepeat = () => {
    if (!selectedEntry) return;
    repeatEntry({collectionId: selectedEntry.collectionId});
    handleClose();
  };

  const handleSave = () => {
    if (selectedEntry) {
      patchCollection({
        collectionId: selectedEntry.collectionId,
        entry: emotion,
      });
      handleClose();
    }
  };

  const handleOverallChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setEmotion((prev) => ({...prev, overall: e.target.value as Feeling}));
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setEmotion((prev) => ({...prev, description: e.target.value}));

  useEffect(() => {
    setEmotion(initialEmotion);
  }, [selectedEntry]);

  const isAnyEdited =
    JSON.stringify(emotion) !== JSON.stringify(initialEmotion);

  const nonNullValues =
    (emotion.description && emotion.description.length > 0) ||
    emotion.overall !== Feeling.Unset;

  return (
    <InputContainer>
      <label>
        Overall:
        <select value={emotion.overall} onChange={handleOverallChange}>
          <option value={Feeling.Unset}>---</option>
          {(Object.keys(Feeling) as Array<keyof typeof Feeling>).map(
            (value, key) =>
              key !== 0 && (
                <option key={key} value={Feeling[value]}>
                  {Feeling[value]} : {value}
                </option>
              )
          )}
        </select>
      </label>
      <label>
        Description:
        <textarea
          rows={3}
          value={emotion.description}
          onChange={handleDescriptionChange}
        ></textarea>
      </label>
      <ButtonWrapper>
        {isAnyEdited && (
          <button onClick={handleAddNewEmotion} disabled={!nonNullValues}>
            Add New
          </button>
        )}
        {selectedEntry && (
          <>
            {isAnyEdited && (
              <button onClick={handleSave} disabled={!nonNullValues}>
                Save
              </button>
            )}
            {!isAnyEdited && <button onClick={handleRepeat}>Repeat</button>}
          </>
        )}
      </ButtonWrapper>
    </InputContainer>
  );
};
