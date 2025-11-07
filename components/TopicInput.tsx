
import React, { useState } from 'react';
import { Template } from '../types';
import { GenerateIcon } from './icons/Icons';

interface TopicInputProps {
    onGenerate: (topic: string) => void;
    template: Template;
}

const TopicInput: React.FC<TopicInputProps> = ({ onGenerate, template }) => {
    const [topic, setTopic] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (topic.trim()) {
            onGenerate(topic);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fade-in">
             <div className="w-full max-w-2xl text-center">
                <div className="mb-8 p-4 border-2 border-gray-700 rounded-lg">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">Selected Template</h2>
                    <p className={`text-2xl font-bold ${template.fonts.title} ${template.colors.primary}`}>{template.name}</p>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4 text-white">What is your presentation about?</h1>
                <p className="text-lg text-gray-400 mb-8">Enter a topic, and our AI will craft a stunning 8-page presentation for you.</p>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-center animate-slide-in-up">
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g., The Future of Renewable Energy"
                        className="w-full px-6 py-4 bg-gray-800 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 text-lg"
                        autoFocus
                    />
                    <button
                        type="submit"
                        disabled={!topic.trim()}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-cyan-500 text-gray-900 font-bold rounded-lg hover:bg-cyan-400 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                    >
                        <GenerateIcon className="h-6 w-6"/>
                        <span>Generate</span>
                    </button>
                </form>
             </div>
        </div>
    );
};

export default TopicInput;
