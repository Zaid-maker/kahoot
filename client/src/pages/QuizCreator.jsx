import React, { useState } from 'react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Container from '../components/layout/Container';
import QuestionEditor from '../features/quiz/QuestionEditor';

const QuizCreator = ({ onSave, onCancel }) => {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([
        { id: Date.now(), text: '', type: 'multiple-choice', options: ['', '', '', ''], correctAnswer: 0, timeLimit: 20 }
    ]);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    const addQuestion = () => {
        const newQuestion = {
            id: Date.now(),
            text: '',
            type: 'multiple-choice',
            options: ['', '', '', ''],
            correctAnswer: 0,
            timeLimit: 20
        };
        setQuestions([...questions, newQuestion]);
        setActiveQuestionIndex(questions.length);
    };

    const updateQuestion = (updatedQuestion) => {
        const newQuestions = [...questions];
        newQuestions[activeQuestionIndex] = updatedQuestion;
        setQuestions(newQuestions);
    };

    const removeQuestion = (index) => {
        if (questions.length === 1) return;
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
        setActiveQuestionIndex(Math.max(0, index - 1));
    };

    const handleSave = () => {
        if (!title.trim()) {
            alert('Please enter a quiz title');
            return;
        }
        onSave({ title, questions });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header */}
            <div className="bg-white border-b p-4 flex justify-between items-center sticky top-0 z-10">
                <div className="flex items-center gap-4 flex-grow max-w-xl">
                    <Input
                        placeholder="Enter quiz title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-left border-none focus:border-b-2 rounded-none px-0 text-xl"
                    />
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary" onClick={onCancel} className="px-4 py-2">Exit</Button>
                    <Button variant="success" onClick={handleSave} className="px-6 py-2">Save</Button>
                </div>
            </div>

            <div className="flex flex-grow overflow-hidden">
                {/* Sidebar - Question List */}
                <div className="w-64 bg-white border-r flex flex-col overflow-y-auto">
                    <div className="p-4 flex-grow">
                        {questions.map((q, index) => (
                            <div
                                key={q.id}
                                onClick={() => setActiveQuestionIndex(index)}
                                className={`
                  p-3 mb-2 rounded-lg cursor-pointer border-2 transition-all
                  ${activeQuestionIndex === index ? 'border-purple-600 bg-purple-50' : 'border-transparent hover:bg-gray-50'}
                `}
                            >
                                <div className="flex justify-between items-start">
                                    <span className="text-xs font-bold text-gray-400 uppercase">Question {index + 1}</span>
                                    {questions.length > 1 && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); removeQuestion(index); }}
                                            className="text-gray-400 hover:text-red-500"
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                                <p className="text-sm font-medium truncate mt-1">
                                    {q.text || 'Empty question...'}
                                </p>
                                <div className="mt-2 flex gap-1">
                                    <div className="w-full h-1 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 border-t sticky bottom-0 bg-white">
                        <Button variant="primary" fullWidth onClick={addQuestion}>
                            Add Question
                        </Button>
                    </div>
                </div>

                {/* Editor Area */}
                <div className="flex-grow overflow-y-auto bg-gray-100 pb-12">
                    <Container>
                        <QuestionEditor
                            question={questions[activeQuestionIndex]}
                            onChange={updateQuestion}
                        />
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default QuizCreator;
