import {useEffect} from 'react';
import {useTimegrid} from './hooks/useTimegrid';

function App() {
  const {Canvas, draw} = useTimegrid();

  useEffect(() => {
    draw.bgGrid();
    draw.greyShroud();

    draw.timeblock({
      col: 1,
      color: '#9bff98',
      startTime: new Date('06/14/2022 17:00:00'),
      endTime: new Date('06/15/2022 1:00:00'),
    });

    draw.timeblock({
      col: 1,
      color: '#98b4ff',
      startTime: new Date('06/15/2022 8:00:00'),
      endTime: new Date('06/15/2022 12:00:00'),
    });

    draw.timeblock({
      col: 2,
      color: '#ff9c98',
      startTime: new Date('06/15/2022 9:00:00'),
      endTime: new Date('06/15/2022 13:20:00'),
    });

    draw.timeblock({
      col: 1,
      color: '#98b4ff',
      startTime: new Date('06/15/2022 17:00:00'),
      endTime: null,
    });
  }, []);

  return <Canvas />;
}

export default App;
