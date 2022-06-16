import {useEffect} from 'react';
import {useTimegrid} from './hooks/useTimegrid';

function App() {
  const {Canvas, draw} = useTimegrid();

  useEffect(() => {
    draw.bgGrid();
    draw.greyShroud();

    const today = '06/16/2022';

    const offset = 3;

    draw.timeblock({
      col: offset,
      color: '#98ffd9',
      startTime: new Date('06/15/2022 0:00:00'),
      endTime: new Date(today + ' 1:00:00'),
    });

    draw.timeblock({
      col: offset,
      color: '#98b4ff',
      startTime: new Date(today + ' 8:00:00'),
      endTime: new Date(today + ' 12:00:00'),
    });

    draw.timeblock({
      col: offset + 1,
      color: '#ff9c98',
      startTime: new Date(today + ' 9:00:00'),
      endTime: new Date(today + ' 13:20:00'),
    });

    draw.timeblock({
      col: offset,
      color: '#98b4ff',
      startTime: new Date(today + ' 14:00:00'),
      endTime: null,
    });
  }, []);

  return <Canvas />;
}

export default App;
