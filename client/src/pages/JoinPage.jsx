import React, { useState } from 'react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import Container from '../components/layout/Container';

const JoinPage = ({ onJoin, onBack }) => {
    const [pin, setPin] = useState('');
    const [nickname, setNickname] = useState('');
    const [step, setStep] = useState(1); // 1: PIN, 2: Nickname

    const handlePinSubmit = (e) => {
        e.preventDefault();
        if (pin.length >= 4) {
            setStep(2);
        }
    };

    const handleJoinSubmit = (e) => {
        e.preventDefault();
        if (nickname.trim()) {
            onJoin({ pin, nickname });
        }
    };

    return (
        <div className="min-h-screen bg-sky-500 flex flex-col justify-center px-4 py-8">
            <Container className="text-center">
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter drop-shadow-md">
                        JOIN GAME
                    </h1>
                </div>

                <Card className="w-full max-w-sm mx-auto p-6 md:p-8 border-b-4 border-gray-300">
                    {step === 1 ? (
                        <form onSubmit={handlePinSubmit} className="space-y-4">
                            <Input
                                placeholder="Game PIN"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                className="text-2xl py-4 text-center"
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                required
                            />
                            <Button
                                variant="primary"
                                type="submit"
                                fullWidth
                                className="py-4 text-xl bg-purple-600 active:scale-95 transition-transform"
                                disabled={pin.length < 4}
                            >
                                Enter
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleJoinSubmit} className="space-y-4">
                            <Input
                                placeholder="Nickname"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                className="text-2xl py-4 text-center"
                                required
                            />
                            <Button
                                variant="success"
                                type="submit"
                                fullWidth
                                className="py-4 text-xl active:scale-95 transition-transform"
                                disabled={!nickname.trim()}
                            >
                                OK, go!
                            </Button>
                        </form>
                    )}
                </Card>

                <button
                    onClick={onBack}
                    className="mt-8 text-white font-bold hover:underline opacity-80 active:opacity-100 active:scale-95 transition-transform"
                >
                    Back to Home
                </button>
            </Container>
        </div>
    );
};

export default JoinPage;
