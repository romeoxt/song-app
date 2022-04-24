import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import YouTube from './youtube';
import Form from './form';
import './style.css';
import songData from './data.json';

import load from './load.gif';

var diffDate = Math.floor(((new Date().getTime()) - (new Date("04/24/2022").getTime()))/24/3600/1000);

let todayis = diffDate;
const videoIdA = songData[todayis].vid;

const timeSlot = songData[todayis].time;
const answer = songData[todayis].answer.toUpperCase();
let tries = 3;


function Example() {
  
  let triesSec = 0;
  if (tries == 3){
    triesSec = 500;
  }
  else if (tries == 2) {
    triesSec = 1000;
  }
  else if (tries <= 1) {
    triesSec = 2000;
  }

  const initialValues = {guess:""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formANW, setFormANW] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [guess1, setGuess1] = useState('life');
  const [guess2, setGuess2] = useState('life');
  const [guess3, setGuess3] = useState('life');

  const [show2,setShow2]=useState(true)
  const [show3,setShow3]=useState(true)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({...formValues, [name]:value});
  }

  const handleSubmit =(e) => {
    e.preventDefault();
    setFormANW(validate(formValues));
    setIsSubmit(true);
    setFormValues({guess:''});
  }

  useEffect(() => {
    if(Object.keys(formANW).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formANW])


  const validate = (values) => {
    const sayit = {};
    if(values.guess.toUpperCase() == answer) {
      sayit.guess = "Correct";
      setShow2(false);
      if(tries == 3) {
        setGuess1('win');
      } else if (tries == 2) {
        setGuess2('win');
      } else if (tries == 1) {
        setGuess3('win');
      }
    }
    else{
      sayit.guess = "Wrong";
      tries = tries - 1;
      if(tries == 2) {
        setGuess1('fail');
      } else if (tries == 1) {
        setGuess2('fail');
      } else if (tries == 0) {
        setGuess3('fail');
      }

    }
    if(tries == 0) {
      setShow3(false);
      setShow2(false);
    }
    return sayit;
  }

  const [videoId, setVideoId] = useState(videoIdA);
  const [player, setPlayer] = useState(null);
  const [show,setShow]=useState(true)
  
  const [count, setCount]=useState(0);

  const opts = {height: '0', width: '0'}

  const onReady = (event) => {
    // eslint-disable-next-line
    setPlayer(event.target);
  };

  const onPlayVideo = () => {
    
    player.seekTo(timeSlot);
    player.playVideo();
    setTimeout(onPauseVideo, triesSec);
    setShow(false);
    setTimeout(hideButton, triesSec);
  };

  const onPauseVideo = () => {
    player.pauseVideo();
  };

  const hideButton = () => {
    setShow(true);
  }


  return (
    <div>

    	<div><div className="idtitle">SONGNOS</div>
      <YouTube videoId={videoId} onReady={onReady} opts={opts} />
      </div>
      <div>
      <div className="playbg">
      {
        show?<button type="button" className="playbutton" onClick={onPlayVideo} disabled={!player}></button>:<img src={load} width="150" height="150"/>
      }

      </div>
      <div className="lifeBox">
      {
        show3?<div className="dots"><div className={guess1}></div><div className={guess2}></div><div className={guess3}></div></div>:<div className="dots"><div>Better Luck Next Time!</div></div>
      }
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          {
            show2?<input type="text" className="inputBox" name="guess" placeholder="Song Title" value={ formValues.guess} onChange={handleChange} />:<div className="idtitle">CONGRATULATION</div>
          }
          <br />
          {
            show2?<button className="submitButton">Submit</button>:null
          }
        
        </form>
      </div>
      </div>
    </div>
  );
}

ReactDOM.render(<div className="main"><Example /></div>, document.getElementById('root'));