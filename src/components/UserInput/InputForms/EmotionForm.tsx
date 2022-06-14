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

  const isEdited = JSON.stringify(emotion) !== JSON.stringify(initialEmotion);

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

  return (
    <InputContainer>
      <label>
        Overall:
        <select value={emotion.overall} onChange={handleOverallChange}>
          {(Object.keys(Feeling) as Array<keyof typeof Feeling>).map(
            (value, key) => (
              <option key={key} value={Feeling[value]}>
                {Feeling[value]}
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
        <button onClick={handleAddNewEmotion}>Add New</button>
        {selectedEntry && (
          <>
            {isEdited && <button onClick={handleSave}>Save</button>}
            <button onClick={handleRepeat}>Repeat</button>
          </>
        )}
      </ButtonWrapper>
    </InputContainer>
  );
};
