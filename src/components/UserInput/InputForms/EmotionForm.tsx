import {useState} from 'react';
import {ButtonWrapper, InputContainer} from './index';
import {useEntries} from '../../../stores/useEntries';
import {isEmotion} from '../../../stores/entryTypes';

export const EmotionForm = ({handleClose}: {handleClose: () => void}) => {
  const {addEmotion, selectedEntry, patchCollection, repeatEntry} =
    useEntries();

  interface PartialEmotion {
    overall: string;
    description?: string;
  }
  const initialEmotion: PartialEmotion = {
    overall: '',
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
