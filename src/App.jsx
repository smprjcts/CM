import { useEffect, useRef } from 'react';
import axios from 'axios'
import { io } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';

// Connect to the socket outside the component
const socket = io('https://couplemusic-backend.onrender.com');

function App() {
  const audioRef = useRef(null);

  useEffect(() => {
    // Listen for commands from the server
    socket.on('sync-play', () => {
      audioRef.current.play();
    });

    socket.on('sync-pause', () => {
      audioRef.current.pause();
    });

    return () => {
      socket.off('sync-play');
      socket.off('sync-pause');
    };
  }, []);

  const handlePlayClick = () => {
    socket.emit('command-play'); // Send "play" to server
  };

  const handlePauseClick = () => {
    socket.emit('command-pause'); // Send "pause" to server
  };

  return (
    <div className="container text-center mt-5 pt-5">
      <h2>Couple Sync Player</h2>
      
      <div className="mb-4">
        <button className='btn btn-lg btn-primary me-2' onClick={handlePlayClick}>Play for Both</button>
        <button className='btn btn-lg btn-danger' onClick={handlePauseClick}>Pause for Both</button>
      </div>

      <div>
        <audio ref={audioRef} className="w-100">
          <source src="https://couplemusic-backend.onrender.com/static-music/song.mp3" type="audio/mpeg" />
        </audio>
      </div>


      <button className="btn btn-primary" onClick={ async () => {
        await axios.get('https://couplemusic-backend.onrender.com/test').then(e => alert(e.data))
      }}>test</button>
    </div>
  );
}

export default App;