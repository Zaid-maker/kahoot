import React, { useEffect, useState } from 'react';
import Button from '../components/common/Button';
import Container from '../components/layout/Container';

const Podium = ({ winners, onFinish }) => {
    const [reveal, setReveal] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setReveal(true), 500);
        return () => clearTimeout(timer);
    }, []);

    // Mock winners if none provided
    const defaultWinners = [
        { name: 'QuizMaster', score: 2450, rank: 1 },
        { name: 'LuckyDuck', score: 1820, rank: 2 },
        { name: 'You', score: 1250, rank: 3 }
    ];

    const displayWinners = winners || defaultWinners;

    return (
        <div className="min-h-screen bg-purple-700 overflow-hidden flex flex-col relative">
            {/* Confetti Elements (CSS Animated) */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-3 h-3 bg-yellow-400 rounded-sm animate-bounce"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `-10px`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`,
                            opacity: 0.6,
                            transform: `rotate(${Math.random() * 360}deg)`
                        }}
                    />
                ))}
            </div>

            <Container className="flex-grow flex flex-col items-center justify-center relative z-10 pt-12">
                <h1 className="text-5xl md:text-7xl font-black text-white mb-16 tracking-tighter drop-shadow-2xl text-center">
                    GAME OVER
                </h1>

                <div className="flex items-end justify-center gap-2 md:gap-6 mb-16 h-80 md:h-96 w-full max-w-4xl px-4">
                    {/* 2nd Place */}
                    <div 
                        className={`flex flex-col items-center flex-1 transition-all duration-1000 ease-out ${reveal ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                        style={{ transitionDelay: '500ms' }}
                    >
                        <div className="bg-purple-100 w-full rounded-t-3xl shadow-2xl flex flex-col items-center pt-8 md:pt-12 pb-4 h-56 md:h-64 border-x-4 border-t-4 border-white/20">
                            <span className="text-4xl md:text-6xl font-black text-purple-600 mb-2">2</span>
                            <div className="w-12 h-1 md:w-16 md:h-2 bg-purple-200 rounded-full mb-4"></div>
                        </div>
                        <div className="mt-4 text-center">
                            <p className="text-white text-lg md:text-2xl font-black uppercase tracking-tight">{displayWinners[1].name}</p>
                            <p className="text-purple-200 text-sm md:text-lg font-bold">{displayWinners[1].score} pts</p>
                        </div>
                    </div>

                    {/* 1st Place */}
                    <div 
                        className={`flex flex-col items-center flex-1 transition-all duration-1000 ease-out ${reveal ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                        style={{ transitionDelay: '1000ms' }}
                    >
                        <div className="relative w-full">
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-5xl md:text-7xl animate-bounce">👑</div>
                            <div className="bg-white w-full rounded-t-3xl shadow-[0_20px_50px_rgba(255,255,255,0.3)] flex flex-col items-center pt-10 md:pt-16 pb-4 h-72 md:h-80 border-x-4 border-t-4 border-purple-200">
                                <span className="text-6xl md:text-8xl font-black text-purple-700">1</span>
                                <div className="w-16 h-2 md:w-24 md:h-3 bg-purple-100 rounded-full mt-2"></div>
                            </div>
                        </div>
                        <div className="mt-4 text-center">
                            <p className="text-white text-xl md:text-3xl font-black uppercase tracking-tighter drop-shadow-lg">{displayWinners[0].name}</p>
                            <p className="text-yellow-300 text-lg md:text-2xl font-black italic">{displayWinners[0].score} pts</p>
                        </div>
                    </div>

                    {/* 3rd Place */}
                    <div 
                        className={`flex flex-col items-center flex-1 transition-all duration-1000 ease-out ${reveal ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                        style={{ transitionDelay: '0ms' }}
                    >
                        <div className="bg-purple-800/50 w-full rounded-t-3xl shadow-xl flex flex-col items-center pt-8 pb-4 h-40 md:h-48 border-x-4 border-t-4 border-white/10">
                            <span className="text-3xl md:text-5xl font-black text-purple-300">3</span>
                        </div>
                        <div className="mt-4 text-center">
                            <p className="text-white text-base md:text-xl font-black uppercase tracking-tight">{displayWinners[2].name}</p>
                            <p className="text-purple-300 text-xs md:text-base font-bold">{displayWinners[2].score} pts</p>
                        </div>
                    </div>
                </div>

                <div className={`transition-all duration-1000 ${reveal ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: '1500ms' }}>
                    <Button 
                        variant="primary" 
                        size="lg" 
                        className="px-16 py-5 text-2xl shadow-2xl active:scale-95 transition-transform"
                        onClick={onFinish}
                    >
                        Return Home
                    </Button>
                </div>
            </Container>

            {/* Bottom Accent */}
            <div className="h-4 md:h-8 bg-purple-900 mt-auto w-full"></div>
        </div>
    );
};

export default Podium;
