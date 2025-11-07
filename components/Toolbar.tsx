
import React, { useRef, useState } from 'react';
import { RedesignIcon, ExportIcon, ImageIcon, StartOverIcon } from './icons/Icons';

interface ToolbarProps {
    onRedesign: () => void;
    onExport: () => void;
    onBackgroundUpload: (file: File, applyTo: 'one' | 'all') => void;
    onStartOver: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onRedesign, onExport, onBackgroundUpload, onStartOver }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [applyToAll, setApplyToAll] = useState(false);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onBackgroundUpload(file, applyToAll ? 'all' : 'one');
        }
        // Reset file input to allow uploading the same file again
        event.target.value = '';
    };

    return (
        <div className="w-full bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 mb-4 md:mb-6">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-4">
                <button
                    onClick={onRedesign}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gray-700 rounded-md hover:bg-cyan-500 hover:text-gray-900 transition-all duration-200"
                >
                    <RedesignIcon className="w-5 h-5" />
                    <span>Redesign Slide</span>
                </button>
                <div className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gray-700 rounded-md">
                    <ImageIcon className="w-5 h-5" />
                    <button onClick={handleUploadClick} className="hover:text-cyan-400 transition-colors">
                        Set Background
                    </button>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                    <div className="flex items-center ml-2 border-l border-gray-600 pl-2">
                        <input
                            id="apply-to-all"
                            type="checkbox"
                            checked={applyToAll}
                            onChange={(e) => setApplyToAll(e.target.checked)}
                            className="w-4 h-4 text-cyan-600 bg-gray-900 border-gray-500 rounded focus:ring-cyan-500"
                        />
                        <label htmlFor="apply-to-all" className="ml-2 text-xs text-gray-300">Apply to all</label>
                    </div>
                </div>
                <button
                    onClick={onExport}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-500 transition-all duration-200"
                >
                    <ExportIcon className="w-5 h-5" />
                    <span>Export PDF</span>
                </button>
                 <button
                    onClick={onStartOver}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-500 transition-all duration-200 md:ml-auto"
                >
                    <StartOverIcon className="w-5 h-5" />
                    <span>Start Over</span>
                </button>
            </div>
        </div>
    );
};

export default Toolbar;
