
import React, { useState } from 'react';
import { Slide as SlideType, Template } from '../types';
import Slide from './Slide';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';

interface PresentationWorkspaceProps {
    slides: SlideType[];
    template: Template;
    onRedesign: (slideIndex: number) => void;
    onExport: () => void;
    onBackgroundUpload: (file: File, applyTo: 'one' | 'all', slideIndex: number) => void;
    onStartOver: () => void;
}

const PresentationWorkspace: React.FC<PresentationWorkspaceProps> = ({
    slides,
    template,
    onRedesign,
    onExport,
    onBackgroundUpload,
    onStartOver,
}) => {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    return (
        <div className="flex h-screen bg-gray-900 animate-fade-in">
            <Sidebar
                slides={slides}
                template={template}
                activeSlideIndex={activeSlideIndex}
                onSlideSelect={setActiveSlideIndex}
            />
            <main className="flex-1 flex flex-col p-4 md:p-8 overflow-hidden">
                <Toolbar
                    onRedesign={() => onRedesign(activeSlideIndex)}
                    onExport={onExport}
                    onBackgroundUpload={(file, applyTo) => onBackgroundUpload(file, applyTo, activeSlideIndex)}
                    onStartOver={onStartOver}
                />
                <div className="flex-1 flex items-center justify-center min-h-0">
                     <div className="w-full aspect-[16/9] max-w-full max-h-full slide-container-render-area">
                        {slides.length > 0 && (
                            <Slide
                                slide={slides[activeSlideIndex]}
                                template={template}
                                isActive={true}
                            />
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PresentationWorkspace;
