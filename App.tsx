
import React, { useState, useCallback } from 'react';
import { Template, Slide as SlideType, AppState, TEMPLATES } from './types';
import { generatePresentation, redesignSlideLayout } from './services/geminiService';
import TemplateSelector from './components/TemplateSelector';
import TopicInput from './components/TopicInput';
import Loader from './components/Loader';
import PresentationWorkspace from './components/PresentationWorkspace';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>(AppState.TEMPLATE_SELECTION);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [slides, setSlides] = useState<SlideType[]>([]);
    const [topic, setTopic] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loadingMessage, setLoadingMessage] = useState('Generating your masterpiece...');

    const handleTemplateSelect = (template: Template) => {
        setSelectedTemplate(template);
        setAppState(AppState.TOPIC_INPUT);
    };

    const handleGenerate = async (newTopic: string) => {
        if (!selectedTemplate) {
            setError('Please select a template first.');
            return;
        }
        setTopic(newTopic);
        setAppState(AppState.GENERATING);
        setError(null);
        setLoadingMessage('Generating your masterpiece...');

        try {
            const generatedSlides = await generatePresentation(newTopic);
            setSlides(generatedSlides.map(slide => ({ ...slide, id: crypto.randomUUID() })));
            setAppState(AppState.WORKSPACE);
        } catch (err) {
            console.error(err);
            setError('Failed to generate presentation. Please try again.');
            setAppState(AppState.TOPIC_INPUT);
        }
    };

    const handleRedesign = useCallback(async (slideIndex: number) => {
        if (!slides[slideIndex]) return;

        setLoadingMessage('Redesigning slide...');
        setAppState(AppState.GENERATING);

        try {
            const currentSlide = slides[slideIndex];
            const newLayout = await redesignSlideLayout(currentSlide);
            const updatedSlides = [...slides];
            updatedSlides[slideIndex] = { ...currentSlide, ...newLayout };
            setSlides(updatedSlides);
        } catch (err) {
            console.error(err);
            setError('Failed to redesign slide. Please try again.');
        } finally {
            setAppState(AppState.WORKSPACE);
        }
    }, [slides]);
    
    const handleExportToPdf = async () => {
        setLoadingMessage('Exporting to PDF...');
        setAppState(AppState.GENERATING);
    
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [960, 540]
        });
    
        const slideElements = document.querySelectorAll('.slide-container');
        
        for (let i = 0; i < slideElements.length; i++) {
            const slideElement = slideElements[i] as HTMLElement;
            try {
                const canvas = await html2canvas(slideElement, { scale: 2 });
                const imgData = canvas.toDataURL('image/png');
    
                if (i > 0) {
                    pdf.addPage([960, 540], 'landscape');
                }
                pdf.addImage(imgData, 'PNG', 0, 0, 960, 540);
            } catch (error) {
                console.error('Error capturing slide:', error);
            }
        }
    
        pdf.save(`${topic.replace(/\s+/g, '_')}_presentation.pdf`);
        setAppState(AppState.WORKSPACE);
    };

    const handleBackgroundUpload = (file: File, applyTo: 'one' | 'all', slideIndex: number) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target?.result as string;
            setSlides(currentSlides => {
                return currentSlides.map((slide, index) => {
                    if (applyTo === 'all' || index === slideIndex) {
                        return { ...slide, backgroundImage: imageUrl };
                    }
                    return slide;
                });
            });
        };
        reader.readAsDataURL(file);
    };
    
    const handleStartOver = () => {
        setSlides([]);
        setSelectedTemplate(null);
        setTopic('');
        setError(null);
        setAppState(AppState.TEMPLATE_SELECTION);
    };

    const renderContent = () => {
        switch (appState) {
            case AppState.TEMPLATE_SELECTION:
                return <TemplateSelector onTemplateSelect={handleTemplateSelect} />;
            case AppState.TOPIC_INPUT:
                return <TopicInput onGenerate={handleGenerate} template={selectedTemplate!} />;
            case AppState.GENERATING:
                return <Loader message={loadingMessage} />;
            case AppState.WORKSPACE:
                return <PresentationWorkspace
                    slides={slides}
                    template={selectedTemplate!}
                    onRedesign={handleRedesign}
                    onExport={handleExportToPdf}
                    onBackgroundUpload={handleBackgroundUpload}
                    onStartOver={handleStartOver}
                />;
            default:
                return <div>Something went wrong.</div>;
        }
    };

    return (
        <div className={`min-h-screen bg-gray-900 text-white font-sans transition-colors duration-500`}>
            {error && <div className="bg-red-500 text-white p-4 text-center fixed top-0 left-0 right-0 z-50">{error}</div>}
            {renderContent()}
        </div>
    );
};

export default App;
