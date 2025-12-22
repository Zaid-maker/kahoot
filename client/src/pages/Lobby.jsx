import React from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Container from '../components/layout/Container';

const Lobby = ({ isHost, lobbyData, onStartGame, onBack }) => {
    const { pin, players, quizTitle } = lobbyData;

    return (
        <div className="min-h-screen bg-purple-600 flex flex-col">
            {/* Lobby Header */}
            <div className="bg-purple-700 p-6 flex justify-between items-center shadow-lg">
                <div>
                    <h2 className="text-white text-sm font-bold uppercase tracking-widest opacity-80">
                        {isHost ? 'Hosting' : 'Joined'}
                    </h2>
                    <h1 className="text-white text-2xl font-black truncate max-w-md">
                        {quizTitle || 'Quick Game'}
                    </h1>
                </div>
                <div className="bg-white px-6 py-2 rounded-lg shadow-inner">
                    <p className="text-gray-500 text-xs font-bold uppercase text-center">Game PIN</p>
                    <p className="text-purple-600 text-3xl font-black">{pin}</p>
                </div>
            </div>

            <Container className="flex-grow flex flex-col pt-12">
                <div className="flex justify-between items-center mb-8">
                    <div className="bg-purple-800 px-4 py-2 rounded-full text-white font-bold flex items-center gap-2">
                        <span className="text-xl">👤</span>
                        <span>{players.length} Players</span>
                    </div>

                    {isHost && (
                        <Button
                            variant="success"
                            className="px-12 py-4 text-xl"
                            onClick={onStartGame}
                            disabled={players.length === 0}
                        >
                            Start Game
                        </Button>
                    )}
                </div>

                {/* Player List Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {players.map((player, index) => (
                        <div
                            key={index}
                            className="bg-white/10 hover:bg-white/20 transition-colors p-4 rounded-xl text-center border-2 border-white/20"
                        >
                            <span className="text-white font-black text-xl drop-shadow-sm">
                                {player}
                            </span>
                        </div>
                    ))}

                    {players.length === 0 && (
                        <div className="col-span-full py-20 text-center">
                            <div className="text-6xl mb-6 animate-bounce">📱</div>
                            <h2 className="text-white text-2xl font-bold opacity-80">
                                Waiting for players to join...
                            </h2>
                        </div>
                    )}
                </div>

                {!isHost && (
                    <div className="mt-auto py-12 text-center">
                        <p className="text-purple-200 font-medium italic animate-pulse">
                            You're in! See your name on the screen?
                        </p>
                    </div>
                )}

                <button
                    onClick={onBack}
                    className="mt-8 text-white/50 font-bold hover:text-white transition-colors self-start"
                >
                    ← Leave Lobby
                </button>
            </Container>
        </div>
    );
};

export default Lobby;
