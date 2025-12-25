import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import HomePage from './pages/HomePage';
import JoinPage from './pages/JoinPage';
import HostDashboard from './pages/HostDashboard';
import QuizCreator from './pages/QuizCreator';
import Lobby from './pages/Lobby';
import QuestionScreen from './pages/QuestionScreen';
import ResultsScreen from './pages/ResultsScreen';
import Podium from './pages/Podium';

const socket = io('http://localhost:3000');

function App() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null); // 'host' or 'player'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [playerAnswer, setPlayerAnswer] = useState(null);
  const [lobbyData, setLobbyData] = useState({
    pin: '',
    players: [],
    quizTitle: ''
  });

  useEffect(() => {
    socket.on('player-list-update', (players) => {
      setLobbyData(prev => ({ ...prev, players }));
    });

    socket.on('join-success', (data) => {
      setLobbyData(prev => ({ ...prev, quizTitle: data.quizTitle, pin: data.pin, players: data.players }));
      navigate('/lobby');
    });

    socket.on('results-reveal', () => {
      navigate('/results');
    });

    socket.on('next-question-start', (data) => {
      setCurrentQuestionIndex(data.index);
      setPlayerAnswer(null);
      navigate('/game');
    });

    socket.on('answer-received', (data) => {
      // Host side: increment answer count (optional visual feedback)
      console.log('Answer received by server:', data);
    });

    socket.on('join-error', (error) => {
      alert(error);
    });

    return () => {
      socket.off('player-list-update');
      socket.off('join-success');
      socket.off('game-started');
      socket.off('results-reveal');
      socket.off('next-question-start');
      socket.off('answer-received');
      socket.off('join-error');
    };
  }, [navigate]);

  const [questions] = useState([
    {
      text: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink and Text Management", "Home Tool Markup Language"],
      correctAnswer: 0,
      timeLimit: 20
    },
    {
      text: "Which language is primarily used for styling web pages?",
      options: ["Python", "JavaScript", "CSS", "HTML"],
      correctAnswer: 2,
      timeLimit: 15
    }
  ]);

  const handleJoinStart = () => navigate('/join');
  const handleHostStart = () => navigate('/host');
  const handleCreateQuiz = () => navigate('/creator');

  const handleJoinGame = (data) => {
    console.log('Joining game with:', data);
    setUserRole('player');
    setLobbyData(prev => ({ ...prev, pin: data.pin }));
    socket.emit('player-join-room', { pin: data.pin, nickname: data.nickname });
  };

  const handleHostGame = (quiz) => {
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('Hosting quiz:', quiz, 'PIN:', pin);
    setUserRole('host');
    setLobbyData({
      pin: pin,
      players: [],
      quizTitle: quiz.title
    });
    socket.emit('host-create-room', { pin, quizTitle: quiz.title });
    navigate('/lobby');
  };

  const handleSaveQuiz = (quizData) => {
    console.log('Saving quiz:', quizData);
    navigate('/host');
  };

  const handleStartGame = () => {
    console.log('Starting game!');
    socket.emit('start-game', lobbyData.pin);
  };

  const handleAnswer = (index) => {
    console.log(`Player answered with: ${index}`);
    setPlayerAnswer(index);
    socket.emit('submit-answer', { pin: lobbyData.pin, answerIndex: index });
  };

  const handleTimeUp = () => {
    if (userRole === 'host') {
      console.log('Time is up! Showing results...');
      socket.emit('show-results', lobbyData.pin);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      socket.emit('next-question', lobbyData.pin);
    } else {
      console.log('Game finished!');
      navigate('/podium');
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <HomePage
            onJoinClick={handleJoinStart}
            onHostClick={handleHostStart}
          />
        } />
        <Route path="/join" element={
          <JoinPage
            onJoin={handleJoinGame}
            onBack={() => navigate('/')}
          />
        } />
        <Route path="/host" element={
          <HostDashboard
            onBack={() => navigate('/')}
            onCreateQuiz={handleCreateQuiz}
            onPlayQuiz={handleHostGame}
          />
        } />
        <Route path="/creator" element={
          <QuizCreator
            onSave={handleSaveQuiz}
            onCancel={() => navigate('/host')}
          />
        } />
        <Route path="/lobby" element={
          <Lobby
            isHost={userRole === 'host'}
            lobbyData={lobbyData}
            onStartGame={handleStartGame}
            onBack={() => navigate(userRole === 'host' ? '/host' : '/join')}
          />
        } />
        <Route path="/game" element={
          <QuestionScreen
            isHost={userRole === 'host'}
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            onTimeUp={handleTimeUp}
          />
        } />
        <Route path="/results" element={
          <ResultsScreen
            isHost={userRole === 'host'}
            question={questions[currentQuestionIndex]}
            playerAnswer={playerAnswer}
            onNext={handleNextQuestion}
          />
        } />
        <Route path="/podium" element={
          <Podium
            onFinish={() => navigate('/')}
          />
        } />
      </Routes>
    </div>
  );
}

export default App;
