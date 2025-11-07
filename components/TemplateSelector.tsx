
import React from 'react';
import { Template, TEMPLATES } from '../types';
import { LogoIcon } from './icons/Icons';

interface TemplateSelectorProps {
    onTemplateSelect: (template: Template) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onTemplateSelect }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 animate-fade-in">
             <div className="text-center mb-12 animate-slide-in-up">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <LogoIcon className="h-12 w-12 text-cyan-400"/>
                  <h1 className="text-5xl md:text-6xl font-black font-serif tracking-tighter text-white">MASTER <span className="text-cyan-400">PPT</span> MAKER</h1>
                </div>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">Welcome! Start by choosing a modern design template for your presentation.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-7xl">
                {TEMPLATES.map((template, index) => (
                    <div
                        key={template.id}
                        className="group cursor-pointer animate-slide-in-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                        onClick={() => onTemplateSelect(template)}
                    >
                        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-cyan-500/20 border-2 border-gray-700 group-hover:border-cyan-400">
                             <div className={`w-full h-full ${template.preview.bg}`}>
                                {template.preview.shapes.map((shape, i) => (
                                    <div key={i} className={`absolute ${shape.class}`} style={shape.style}></div>
                                ))}
                            </div>
                        </div>
                        <h3 className="text-center mt-4 text-lg font-semibold text-gray-200 group-hover:text-cyan-400 transition-colors duration-300">{template.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TemplateSelector;
