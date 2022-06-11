import {useEntries} from '../../stores/useEntries';
import {OngoingActivityElement} from './OngoingElement';
import {Ul} from '../Styles';

export const OngoingActivities = () => {
  const {ongoingActivities} = useEntries();
  return (
    <Ul>
      {ongoingActivities.map((entry, key) => (
        <OngoingActivityElement entry={entry} key={key} />
      ))}
    </Ul>
  );
};
