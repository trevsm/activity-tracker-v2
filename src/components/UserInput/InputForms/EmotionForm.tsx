import {useState} from 'react';
import {InputContainer} from './index';
import {useEntries} from '../../../stores/useEntries';
import {isEmotion} from '../../../stores/entryTypes';

export const EmotionForm = ({handleClose}: {handleClose: () => void}) => {
  const {addEmotion, selectedEntry, patchCollection} = useEntries();

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

  const handleAddNewEmotion = () => {
    if (!emotion.overall) return;
    addEmotion({...emotion});
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
      <button onClick={handleAddNewEmotion}>Add New</button>
      {selectedEntry && (
        <button onClick={handleSave} type="submit">
          Save
        </button>
      )}
    </InputContainer>
  );
};
