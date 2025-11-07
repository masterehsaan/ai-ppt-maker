
import React from 'react';
import { Slide as SlideType, Template } from '../types';

interface SlideProps {
    slide: SlideType;
    template: Template;
    isActive: boolean;
}

const Slide: React.FC<SlideProps> = ({ slide, template, isActive }) => {
    const { title, bullets, shapes, backgroundImage } = slide;
    const { colors, fonts } = template;

    const slideStyle: React.CSSProperties = backgroundImage ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    } : {};
    
    // Add a unique key for transitions
    const slideKey = slide.id + JSON.stringify(slide.shapes);

    return (
        <div
            key={slideKey}
            className={`w-full h-full relative p-12 md:p-16 flex flex-col justify-center overflow-hidden shadow-2xl transition-all duration-500 ${colors.bg}`}
            style={slideStyle}
        >
            {/* Decorative Shapes */}
            {shapes.map((shape, index) => (
                <div
                    key={index}
                    className={`absolute ${shape.color} ${shape.size} ${shape.position} ${shape.rotation || ''} ${shape.zIndex || 'z-0'} transition-all duration-500 ease-in-out`}
                    style={{ 
                      borderRadius: shape.type === 'circle' ? '9999px' : '0.5rem',
                      opacity: isActive ? 1 : 0,
                      transform: `scale(${isActive ? 1 : 0.8})`
                    }}
                ></div>
            ))}

             {/* Content Overlay */}
             <div className={`relative z-10 w-full h-full flex flex-col justify-center ${backgroundImage ? 'bg-black/30 backdrop-blur-sm rounded-lg p-8' : ''}`}>
                <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${fonts.title} ${backgroundImage ? 'text-white' : colors.primary} transition-colors duration-500 animate-slide-in-up`}>
                    {title}
                </h2>
                <ul className="space-y-4">
                    {bullets.map((bullet, index) => (
                        <li
                            key={index}
                            className={`flex items-start text-xl md:text-2xl ${fonts.body} ${backgroundImage ? 'text-gray-200' : colors.secondary} transition-colors duration-500 animate-slide-in-up`}
                            style={{ animationDelay: `${100 + index * 100}ms` }}
                        >
                            <span className={`w-3 h-3 ${colors.accent} rounded-full mr-4 mt-2.5 flex-shrink-0`}></span>
                            <span>{bullet}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Slide;
