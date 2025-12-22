import React from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Container from '../components/layout/Container';
import Navbar from '../components/layout/Navbar';

const HostDashboard = ({ onBack, onCreateQuiz, onPlayQuiz }) => {
    // Mock data for quizzes
    const quizzes = [
        { id: 1, title: 'Science Fun Quiz', questionCount: 10, updatedAt: '2023-12-20' },
        { id: 2, title: 'History of Music', questionCount: 15, updatedAt: '2023-12-18' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <Container className="flex-grow">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">My Quizzes</h1>
                        <p className="text-gray-500">Manage and host your game sessions</p>
                    </div>
                    <Button variant="success" onClick={onCreateQuiz} className="active:scale-95 transition-transform">
                        Create New
                    </Button>
                </div>

                {quizzes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {quizzes.map((quiz) => (
                            <Card key={quiz.id} className="hover:shadow-2xl transition-shadow cursor-pointer group">
                                <div className="aspect-video bg-purple-100 rounded-xl mb-4 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                                    <span className="text-5xl font-black text-purple-600">?</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-1">{quiz.title}</h3>
                                <p className="text-gray-500 text-sm font-medium">
                                    {quiz.questionCount} Questions • Updated {quiz.updatedAt}
                                </p>
                                <div className="mt-4 flex gap-2">
                                    <Button
                                        variant="primary"
                                        fullWidth
                                        className="py-2 text-sm active:scale-95 transition-transform"
                                        onClick={() => onPlayQuiz(quiz)}
                                    >
                                        Play
                                    </Button>
                                    <Button variant="secondary" className="py-2 text-sm px-4 active:scale-95 transition-transform">
                                        Edit
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card className="text-center py-16">
                        <div className="text-6xl mb-4">📝</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">No quizzes yet</h2>
                        <p className="text-gray-500 mb-6">Create your first quiz to get started!</p>
                        <Button variant="primary" onClick={onCreateQuiz}>
                            Build your first quiz
                        </Button>
                    </Card>
                )}

                <button
                    onClick={onBack}
                    className="mt-12 text-gray-500 font-bold hover:underline self-start"
                >
                    ← Back to Home
                </button>
            </Container>
        </div>
    );
};

export default HostDashboard;
