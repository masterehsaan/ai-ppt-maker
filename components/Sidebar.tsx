import React from 'react';
import { Slide as SlideType, Template } from '../types';
// FIX: Import the 'Slide' component to resolve the 'Cannot find name' error.
import Slide from './Slide';

interface SidebarProps {
    slides: SlideType[];
    template: Template;
    activeSlideIndex: number;
    onSlideSelect: (index: number) => void;
}

const SlideThumbnail: React.FC<{ slide: SlideType, template: Template }> = React.memo(({ slide, template }) => {
    const { title, shapes, backgroundImage } = slide;
    const { colors } = template;

    const thumbStyle: React.CSSProperties = backgroundImage ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    } : {};

    return (
        <div
            className={`w-full h-full relative overflow-hidden ${colors.bg}`}
            style={thumbStyle}
        >
            {shapes.map((shape, index) => (
                <div
                    key={index}
                    className={`absolute ${shape.color}`}
                    style={{
                        width: '100%', height: '100%',
                        transform: `translate(-50%, -50%)`,
                        ...parseTailwindPosition(shape.position),
                        ...parseTailwindSize(shape.size),
                        ...parseTailwindRotation(shape.rotation),
                        borderRadius: shape.type === 'circle' ? '9999px' : '0.1rem',
                    }}
                ></div>
            ))}
            <div className="absolute inset-0 flex items-center justify-center p-2">
                <h3 className={`text-[8px] font-bold text-center leading-tight ${backgroundImage ? 'text-white drop-shadow-md' : colors.primary}`}>{title}</h3>
            </div>
        </div>
    );
});

// Helper functions to parse Tailwind for inline styles in thumbnails (simplified)
const parseTailwindPosition = (position: string) => {
    const style: React.CSSProperties = {};
    if (position.includes('top-')) style.top = `${parseInt(position.split('top-')[1]) * 0.25}rem`;
    if (position.includes('bottom-')) style.bottom = `${parseInt(position.split('bottom-')[1]) * 0.25}rem`;
    if (position.includes('left-')) style.left = `${parseInt(position.split('left-')[1]) * 0.25}rem`;
    if (position.includes('right-')) style.right = `${parseInt(position.split('right-')[1]) * 0.25}rem`;
    return style;
};

const parseTailwindSize = (size: string) => {
    const style: React.CSSProperties = {};
    const parts = size.split(' ');
    if (parts[0].includes('w-')) style.width = `${parseInt(parts[0].split('w-')[1]) * 0.25}rem`;
    if (parts[1].includes('h-')) style.height = `${parseInt(parts[1].split('h-')[1]) * 0.25}rem`;
    return style;
};

const parseTailwindRotation = (rotation?: string) => {
    if (!rotation) return {};
    const deg = rotation.replace('-rotate-', '-').replace('rotate-', '');
    return { transform: `rotate(${deg}deg)` };
};

const Sidebar: React.FC<SidebarProps> = ({ slides, template, activeSlideIndex, onSlideSelect }) => {
    return (
        <aside className="w-48 lg:w-64 bg-gray-800 p-4 space-y-3 overflow-y-auto">
            <h2 className="text-lg font-bold text-white mb-2 text-center">Slides</h2>
            {/* This is a hidden list used for PDF generation */}
            <div className="absolute -left-[9999px] top-0">
                {slides.map((slide, index) => (
                    <div key={`pdf-${slide.id}`} className="slide-container" style={{ width: '960px', height: '540px' }}>
                         <Slide slide={slide} template={template} isActive={true} />
                    </div>
                ))}
            </div>
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    onClick={() => onSlideSelect(index)}
                    className={`cursor-pointer aspect-[16/9] rounded-md overflow-hidden transition-all duration-300 ${activeSlideIndex === index ? 'ring-4 ring-cyan-400' : 'ring-2 ring-gray-600 hover:ring-cyan-300'}`}
                >
                   <SlideThumbnail slide={slide} template={template} />
                </div>
            ))}
        </aside>
    );
};

export default Sidebar;