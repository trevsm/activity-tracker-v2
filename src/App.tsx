import {EntryElement} from './components/Entry';
import {useEntries} from './stores/useEntries';

function App() {
  const {entries, addActivity, addEmotion} = useEntries();

  return (
    <div>
      <ul>
        {entries.map((entry, key) => (
          <EntryElement entry={entry} key={key} />
        ))}
      </ul>
      <button onClick={() => addActivity('go on a run')}>activity</button>
      <button onClick={() => addEmotion('happy!')}>emotion</button>
    </div>
  );
}

export default App;
