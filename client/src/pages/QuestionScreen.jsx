import React, { useState, useEffect } from 'react';
import Container from '../components/layout/Container';

const QuestionScreen = ({ isHost, question, onAnswer, onTimeUp }) => {
    const [timeLeft, setTimeLeft] = useState(question.timeLimit || 20);
    const [answersCount, setAnswersCount] = useState(0);
    const [hasAnswered, setHasAnswered] = useState(false);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            onTimeUp && onTimeUp();
        }
    }, [timeLeft]);

    const handleAnswerClick = (index) => {
        if (!hasAnswered) {
            setHasAnswered(true);
            onAnswer && onAnswer(index);
        }
    };

    const colors = [
        'bg-red-500 hover:bg-red-600',
        'bg-blue-500 hover:bg-blue-600',
        'bg-amber-400 hover:bg-amber-500',
        'bg-green-500 hover:bg-green-600'
    ];

    const shapes = ['▲', '◆', '●', '■'];

    if (isHost) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col">
                {/* Question Header */}
                <div className="bg-white p-8 shadow-md text-center">
                    <h1 className="text-4xl font-black text-gray-800 leading-tight">
                        {question.text}
                    </h1>
                </div>

                <Container className="flex-grow flex flex-col justify-center items-center py-12">
                    <div className="flex w-full justify-between items-center mb-12">
                        {/* Timer Circle */}
                        <div className="w-32 h-32 rounded-full border-8 border-purple-600 flex items-center justify-center bg-white shadow-xl">
                            <span className="text-4xl font-black text-purple-600">{timeLeft}</span>
                        </div>

                        {/* Mock Media Area */}
                        <div className="flex-grow max-w-2xl mx-12 aspect-video bg-white rounded-2xl shadow-lg flex items-center justify-center">
                            <span className="text-8xl opacity-10 font-black">KAHOOT!</span>
                        </div>

                        {/* Answer Count */}
                        <div className="text-center">
                            <span className="block text-5xl font-black text-purple-600">{answersCount}</span>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Answers</span>
                        </div>
                    </div>

                    {/* Answer Legend (Host View) */}
                    <div className="grid grid-cols-2 w-full gap-4 max-w-4xl">
                        {question.options.map((option, index) => (
                            <div key={index} className={`${colors[index].split(' ')[0]} p-4 rounded-lg flex items-center gap-4 text-white shadow-md`}>
                                <span className="text-2xl font-bold">{shapes[index]}</span>
                                <span className="text-xl font-bold truncate">{option}</span>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        );
    }

    // Player View
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col p-4">
            <div className="flex justify-between items-center mb-6">
                <div className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                    1 of 10
                </div>
                <div className="text-purple-600 text-xl font-black">{timeLeft}s</div>
            </div>

            {!hasAnswered ? (
                <div className="flex-grow grid grid-cols-2 gap-4">
                    {colors.map((color, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswerClick(index)}
                            className={`${color} rounded-2xl shadow-[0_6px_0_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-2 transition-all flex items-center justify-center text-6xl text-white`}
                        >
                            {shapes[index]}
                        </button>
                    ))}
                </div>
            ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-center">
                    <div className="text-8xl mb-6 animate-pulse">⏳</div>
                    <h2 className="text-3xl font-black text-purple-600 mb-2">Check the screen!</h2>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Waiting for other players...</p>
                </div>
            )}
        </div>
    );
};

export default QuestionScreen;
