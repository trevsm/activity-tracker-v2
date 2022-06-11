import {useState} from 'react';
import {InputContainer} from './index';
import {useEntries} from '../../../stores/useEntries';

export const EmotionForm = ({handleClose}: {handleClose: () => void}) => {
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
    if (!emotion.overall) return;
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
