import styled from 'styled-components';
import {Header} from './components/Header/Header';
import {useTimegrid} from './hooks/useTimegrid';

const AppContainer = styled.div``;

function App() {
  const {Canvas} = useTimegrid();

  return (
    <AppContainer>
      <Header />
      <Canvas />
    </AppContainer>
  );
}

export default App;
