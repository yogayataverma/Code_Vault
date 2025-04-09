import { useState, useEffect , useRef } from 'react';
import './App.css'
 
function App() {

  var [hrs, setHrs] = useState(59);
  var [min, setMin] = useState(59);
  var [megahrs, setMegaHrs] = useState(0);
  var [running , setRunning] = useState(false);
  var interval  = useRef(null);

  useEffect(() => {

  if(running)
  {
    interval.current = setInterval(() => {
      setMin( prevMin => {
        if(prevMin == 59)
        {
          return 0;
        }
        return prevMin + 1;
      });

      setHrs(prevHrs => {
        if(min == 59)
        {
          return  prevHrs + 1;
        }
        else
        {
          return prevHrs;
        } 
      });

      setMegaHrs(prevMegaHrs =>{
        if(hrs == 59)
          {
            return  prevMegaHrs + 1;
          }
          else
          {
            return prevMegaHrs;
          } 
      })

      }, 1000);
  }

  return () => clearInterval(interval.current);

  }, [running, min]);

  return (
    <div style={{textAlign:"center"}}>
    <h1>{megahrs} : {hrs} : {min}</h1>
    <button onClick={() => setRunning(true)}>Start</button>
    <button onClick={() => setRunning(false)}>Stop</button>
    </div>
  )
}

export default App
