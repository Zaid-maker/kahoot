import React from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Container from '../components/layout/Container';

const HomePage = ({ onJoinClick, onHostClick }) => {
    return (
        <div className="min-h-screen bg-purple-700 flex flex-col justify-center">
            <Container className="text-center">
                <div className="mb-12">
                    <h1 className="text-6xl font-black text-white mb-4 tracking-tighter drop-shadow-lg">
                        QUIZLY!
                    </h1>
                    <p className="text-purple-100 text-xl font-medium">
                        Learn, play, and create together!
                    </p>
                </div>

                <Card className="max-w-md mx-auto p-8 border-b-4 border-gray-300">
                    <div className="space-y-4">
                        <Button
                            variant="primary"
                            fullWidth
                            className="text-xl py-4 active:scale-95 transition-transform"
                            onClick={onHostClick}
                        >
                            Host a Game
                        </Button>

                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-200"></span>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-gray-400 font-bold">or</span>
                            </div>
                        </div>

                        <Button
                            variant="sky"
                            fullWidth
                            className="text-xl py-4 bg-sky-500 hover:bg-sky-600 active:scale-95 transition-transform"
                            onClick={onJoinClick}
                        >
                            Join a Game
                        </Button>
                    </div>
                </Card>

                <p className="mt-12 text-purple-200 text-sm font-bold uppercase tracking-widest">
                    The best way to learn is to play
                </p>
            </Container>
        </div>
    );
};

export default HomePage;
