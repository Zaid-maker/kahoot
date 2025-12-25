import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JoinPage from './pages/JoinPage';
import HostDashboard from './pages/HostDashboard';
import QuizCreator from './pages/QuizCreator';
import Lobby from './pages/Lobby';
import QuestionScreen from './pages/QuestionScreen';
import ResultsScreen from './pages/ResultsScreen';
import Podium from './pages/Podium';

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
    setLobbyData({
      pin: data.pin,
      players: ['You', 'QuizMaster', 'LuckyDuck'], // Mock players
      quizTitle: 'Waiting for Host...'
    });
    navigate('/lobby');
  };

  const handleHostGame = (quiz) => {
    console.log('Hosting quiz:', quiz);
    setUserRole('host');
    setLobbyData({
      pin: Math.floor(100000 + Math.random() * 900000).toString(),
      players: ['QuizMaster', 'LuckyDuck'],
      quizTitle: quiz.title
    });
    navigate('/lobby');
  };

  const handleSaveQuiz = (quizData) => {
    console.log('Saving quiz:', quizData);
    navigate('/host');
  };

  const handleStartGame = () => {
    console.log('Starting game!');
    setCurrentQuestionIndex(0);
    setPlayerAnswer(null);
    navigate('/game');
  };

  const handleAnswer = (index) => {
    console.log(`Player answered with: ${index}`);
    setPlayerAnswer(index);
  };

  const handleTimeUp = () => {
    console.log('Time is up!');
    navigate('/results');
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setPlayerAnswer(null);
      navigate('/game');
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
