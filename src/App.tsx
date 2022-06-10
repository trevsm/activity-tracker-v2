import styled from 'styled-components';
import {EntryElement} from './components/EntryElement';
import {UserInput} from './components/UserInput';
import {useEntries} from './stores/useEntries';

const Ul = styled.ul`
  padding: 10px;
`;

function App() {
  const {entries} = useEntries();

  const EntryList = () => {
    return (
      <Ul>
        {entries.map((entry, key) => (
          <EntryElement entry={entry} key={key} />
        ))}
      </Ul>
    );
  };

  return (
    <div className="app">
      <EntryList />
      <UserInput />
    </div>
  );
}

export default App;
