import {useEffect} from 'react';
import {useTimegrid} from './hooks/useTimegrid';

function App() {
  const {Canvas, draw} = useTimegrid();

  useEffect(() => {
    draw.bgGrid();
    draw.greyShroud();

    const today = '06/15/2022';

    draw.timeblock({
      col: 1,
      color: '#98ffd9',
      startTime: new Date('06/14/2022 17:00:00'),
      endTime: new Date(today + ' 1:00:00'),
    });

    draw.timeblock({
      col: 1,
      color: '#98b4ff',
      startTime: new Date(today + ' 8:00:00'),
      endTime: new Date(today + ' 12:00:00'),
    });

    draw.timeblock({
      col: 2,
      color: '#ff9c98',
      startTime: new Date(today + ' 9:00:00'),
      endTime: new Date(today + ' 13:20:00'),
    });

    draw.timeblock({
      col: 1,
      color: '#98b4ff',
      startTime: new Date(today + ' 17:00:00'),
      endTime: null,
    });
  }, []);

  return <Canvas />;
}

export default App;
