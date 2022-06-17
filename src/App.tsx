import styled from 'styled-components';
import {AddButtons} from './components/AddButtons/AddButtons';
import {Header} from './components/Header/Header';
import {useTimegrid} from './hooks/useTimegrid';

const AppContainer = styled.div``;

function App() {
  const {Canvas} = useTimegrid();

  return (
    <AppContainer>
      <Header />
      <AddButtons />
      <Canvas />
    </AppContainer>
  );
}

export default App;
