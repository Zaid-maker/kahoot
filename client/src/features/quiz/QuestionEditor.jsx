import React from 'react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';

const QuestionEditor = ({ question, onChange }) => {
    const handleOptionChange = (index, value) => {
        const newOptions = [...question.options];
        newOptions[index] = value;
        onChange({ ...question, options: newOptions });
    };

    const handleCorrectAnswerChange = (index) => {
        onChange({ ...question, correctAnswer: index });
    };

    const colors = [
        'bg-red-500',
        'bg-blue-500',
        'bg-amber-400',
        'bg-green-500'
    ];

    const shapes = ['▲', '◆', '●', '■'];

    return (
        <div className="space-y-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Question Text */}
            <Card className="shadow-lg border-2 border-purple-100">
                <textarea
                    placeholder="Start typing your question"
                    className="w-full text-3xl font-bold text-center border-none focus:outline-none focus:ring-0 resize-none py-12"
                    value={question.text}
                    onChange={(e) => onChange({ ...question, text: e.target.value })}
                    rows={2}
                />
            </Card>

            {/* Settings (Time Limit, etc) */}
            <div className="flex justify-center">
                <div className="bg-white p-4 rounded-full shadow-md flex items-center gap-4">
                    <label className="text-gray-500 font-bold uppercase text-xs pl-2">Time Limit</label>
                    <select
                        value={question.timeLimit}
                        onChange={(e) => onChange({ ...question, timeLimit: parseInt(e.target.value) })}
                        className="font-bold text-purple-600 focus:outline-none cursor-pointer"
                    >
                        <option value={5}>5 seconds</option>
                        <option value={10}>10 seconds</option>
                        <option value={20}>20 seconds</option>
                        <option value={30}>30 seconds</option>
                    </select>
                </div>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map((option, index) => (
                    <div key={index} className="relative group">
                        <div className={`
              flex items-center rounded-xl p-2 h-24 shadow-md transition-all border-4
              ${colors[index]} 
              ${question.correctAnswer === index ? 'border-white ring-4 ring-green-400' : 'border-transparent'}
            `}>
                            <div className="w-12 h-12 flex items-center justify-center text-white text-2xl">
                                {shapes[index]}
                            </div>
                            <input
                                type="text"
                                placeholder={`Add answer ${index + 1}`}
                                className="flex-grow bg-white/10 text-white placeholder:text-white/60 text-xl font-bold px-4 py-2 border-none focus:outline-none"
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                            />
                            <button
                                onClick={() => handleCorrectAnswerChange(index)}
                                className={`
                  w-8 h-8 rounded-full border-2 border-white flex items-center justify-center transition-all
                  ${question.correctAnswer === index ? 'bg-white text-green-500' : 'hover:bg-white/20 text-transparent'}
                `}
                            >
                                ✓
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionEditor;
