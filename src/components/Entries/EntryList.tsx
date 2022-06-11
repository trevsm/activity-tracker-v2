import {useEntries} from '../../stores/useEntries';
import {Ul} from '../Styles';
import {EntryElement} from './EntryElement';

export const EntryList = () => {
  const {entries} = useEntries();
  return (
    <Ul>
      {entries.map((entry, key) => (
        <EntryElement entry={entry} key={key} />
      ))}
    </Ul>
  );
};
