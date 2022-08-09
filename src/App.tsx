import {useEffect, useRef} from 'react';
import styled from 'styled-components';
import {EntryList} from './components/Entries/EntryList';
import {OngoingActivities} from './components/OngoingActivities';
import {UserInput} from './components/UserInput/UserInput';
import {useEntries} from './stores/useEntries';

const ClickLayer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const AppContainer = styled.div`
  position: relative;
  pointer-events: none;
`;

function App() {
  const handleLayerClick = useRef<() => void>(() => {});

  const {selectEntry} = useEntries();

  useEffect(() => {
    // re-initialize on refresh
    selectEntry(null);
  }, []);

  return (
    <>
      <ClickLayer onClick={() => handleLayerClick.current()} />
      <AppContainer>
        <div style={{display: 'flex'}}>
          <EntryList />
          <OngoingActivities />
        </div>
        <UserInput handleLayerClick={handleLayerClick} />
      </AppContainer>
    </>
  );
}

export default App;
