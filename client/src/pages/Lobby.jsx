import React from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Container from '../components/layout/Container';

const Lobby = ({ isHost, lobbyData, onStartGame, onBack }) => {
    const { pin, players, quizTitle } = lobbyData;

    return (
        <div className="min-h-screen bg-purple-600 flex flex-col">
            {/* Lobby Header */}
            <div className="bg-purple-700 p-4 md:p-6 flex flex-col md:flex-row justify-between items-center shadow-lg gap-4">
                <div className="text-center md:text-left w-full md:w-auto">
                    <h2 className="text-white text-xs font-bold uppercase tracking-widest opacity-80">
                        {isHost ? 'Hosting' : 'Joined'}
                    </h2>
                    <h1 className="text-white text-xl md:text-2xl font-black truncate max-w-xs md:max-w-md mx-auto md:mx-0">
                        {quizTitle || 'Quick Game'}
                    </h1>
                </div>
                <div className="bg-white px-8 py-2 rounded-xl shadow-inner w-full md:w-auto max-w-[200px] mx-auto md:mx-0">
                    <p className="text-gray-500 text-[10px] font-bold uppercase text-center tracking-tighter">Game PIN</p>
                    <p className="text-purple-600 text-3xl font-black text-center leading-none">{pin}</p>
                </div>
            </div>

            <Container className="flex-grow flex flex-col pt-8 md:pt-12 px-4">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <div className="bg-purple-800 px-6 py-2 rounded-full text-white font-bold flex items-center gap-3">
                        <span className="text-xl">👤</span>
                        <span className="text-lg">{players.length} Players</span>
                    </div>

                    {isHost && (
                        <Button
                            variant="success"
                            className="w-full sm:w-auto px-12 py-4 text-xl shadow-[0_4px_0_0_rgba(20,83,45,1)] active:shadow-none active:translate-y-1 active:scale-95 transition-all"
                            onClick={onStartGame}
                            disabled={players.length === 0}
                        >
                            Start Game
                        </Button>
                    )}
                </div>

                {/* Player List Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 flex-grow content-start">
                    {players.map((player, index) => (
                        <div
                            key={index}
                            className="bg-white/10 hover:bg-white/20 transition-colors p-4 rounded-xl text-center border-2 border-white/20 shadow-sm"
                        >
                            <span className="text-white font-black text-lg md:text-xl truncate block">
                                {player}
                            </span>
                        </div>
                    ))}

                    {players.length === 0 && (
                        <div className="col-span-full py-20 text-center">
                            <div className="text-6xl mb-6 animate-bounce">📱</div>
                            <h2 className="text-white text-xl md:text-2xl font-bold opacity-80 px-4">
                                Waiting for players to join...
                            </h2>
                        </div>
                    )}
                </div>

                {!isHost && (
                    <div className="mt-auto py-8 text-center">
                        <p className="text-purple-200 font-medium italic animate-pulse">
                            You're in! See your name on the screen?
                        </p>
                    </div>
                )}

                <button
                    onClick={onBack}
                    className="mt-8 mb-8 text-white/50 font-bold hover:text-white transition-colors self-start active:text-white"
                >
                    ← Leave Lobby
                </button>
            </Container>
        </div>
    );
};

export default Lobby;
