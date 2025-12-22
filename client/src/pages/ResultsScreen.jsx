import React from 'react';
import Button from '../components/common/Button';
import Container from '../components/layout/Container';
import Card from '../components/common/Card';

const ResultsScreen = ({ isHost, question, playerAnswer, onNext }) => {
    // Mock data for host chart
    const mockStats = [12, 5, 20, 8]; // Sample answer counts for each option
    const maxStat = Math.max(...mockStats);

    const colors = [
        'bg-red-500',
        'bg-blue-500',
        'bg-amber-400',
        'bg-green-500'
    ];

    const shapes = ['▲', '◆', '●', '■'];

    if (isHost) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <div className="bg-white p-8 shadow-sm text-center">
                    <h1 className="text-3xl font-black text-gray-800">
                        {question.text}
                    </h1>
                </div>

                <Container className="flex-grow flex flex-col justify-center py-12">
                    {/* Answer Bars */}
                    <div className="flex items-end justify-center gap-4 h-64 mb-12">
                        {question.options.map((option, index) => (
                            <div key={index} className="flex flex-col items-center group relative h-full justify-end">
                                <div
                                    className={`${colors[index]} w-24 rounded-t-lg transition-all duration-1000 ease-out flex items-center justify-center text-white font-black text-2xl shadow-lg`}
                                    style={{ height: `${(mockStats[index] / maxStat) * 100}%` }}
                                >
                                    {mockStats[index]}
                                </div>
                                <div className="mt-4 p-2 w-24 text-center">
                                    <div className={`${colors[index]} w-8 h-8 rounded flex items-center justify-center text-white text-sm mx-auto mb-1`}>
                                        {shapes[index]}
                                    </div>
                                    {question.correctAnswer === index && (
                                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-3xl">✅</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <Button variant="primary" className="px-16 py-4 text-xl" onClick={onNext}>
                            Next
                        </Button>
                    </div>
                </Container>

                <div className="bg-white border-t p-6 text-center">
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
                        Question Results
                    </p>
                </div>
            </div>
        );
    }

    // Player View
    const isCorrect = playerAnswer === question.correctAnswer;
    const points = isCorrect ? 850 : 0;

    return (
        <div className={`min-h-screen flex flex-col ${isCorrect ? 'bg-green-500' : 'bg-red-500'} text-white p-8 text-center`}>
            <div className="flex-grow flex flex-col items-center justify-center">
                <h1 className="text-6xl font-black mb-4 tracking-tighter drop-shadow-lg">
                    {isCorrect ? 'CORRECT!' : 'INCORRECT'}
                </h1>
                <div className="text-9xl mb-8">
                    {isCorrect ? '✅' : '❌'}
                </div>

                <div className="bg-black/20 p-8 rounded-3xl backdrop-blur-sm">
                    <p className="text-xl font-bold uppercase opacity-80 mb-2">Points Earned</p>
                    <p className="text-6xl font-black">+{points}</p>
                </div>
            </div>

            <div className="mt-8">
                <p className="text-xl font-bold italic opacity-80 animate-pulse">
                    Waiting for host to move to next question...
                </p>
            </div>
        </div>
    );
};

export default ResultsScreen;
