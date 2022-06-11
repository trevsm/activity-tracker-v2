import {EntryList} from './components/Entries/EntryList';
import {OngoingActivities} from './components/OngoingActivities';
import {UserInput} from './components/UserInput/UserInput';

function App() {
  return (
    <div className="app">
      <div style={{display: 'flex'}}>
        <EntryList />
        <OngoingActivities />
      </div>
      <UserInput />
    </div>
  );
}

export default App;
