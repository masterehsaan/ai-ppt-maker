
export enum AppState {
    TEMPLATE_SELECTION,
    TOPIC_INPUT,
    GENERATING,
    WORKSPACE,
}

export interface Shape {
    type: 'rectangle' | 'circle' | 'line';
    color: string;
    size: string;
    position: string;
    rotation?: string;
    zIndex?: string;
}

export interface Slide {
    id: string;
    title: string;
    bullets: string[];
    layoutDescription: string;
    shapes: Shape[];
    backgroundImage?: string;
}

export interface TemplateColors {
    bg: string;
    primary: string;
    secondary: string;
    accent: string;
}

export interface TemplateFonts {
    title: string;
    body: string;
}

export interface Template {
    id: string;
    name: string;
    colors: TemplateColors;
    fonts: TemplateFonts;
    preview: {
      bg: string;
      shapes: {
        class: string;
        style: React.CSSProperties;
      }[];
    };
}

export const TEMPLATES: Template[] = [
    {
        id: 'midnight-glow',
        name: 'Midnight Glow',
        colors: { bg: 'bg-gray-800', primary: 'text-cyan-300', secondary: 'text-gray-300', accent: 'bg-cyan-400' },
        fonts: { title: 'font-serif', body: 'font-sans' },
        preview: {
            bg: 'bg-gray-800',
            shapes: [
                { class: 'bg-cyan-400/50', style: { width: '50%', height: '50%', top: '5%', left: '5%', borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' } },
                { class: 'bg-purple-500/50', style: { width: '40%', height: '40%', bottom: '10%', right: '15%', borderRadius: '80% 20% 20% 80% / 50% 80% 20% 50%' } }
            ]
        }
    },
    {
        id: 'solar-flare',
        name: 'Solar Flare',
        colors: { bg: 'bg-yellow-50', primary: 'text-orange-600', secondary: 'text-gray-700', accent: 'bg-orange-500' },
        fonts: { title: 'font-sans font-black', body: 'font-sans' },
        preview: {
            bg: 'bg-yellow-50',
            shapes: [
                { class: 'bg-orange-400', style: { width: '100px', height: '100px', top: '10%', left: '10%', clipPath: 'circle(50% at 50% 50%)' } },
                { class: 'bg-red-500', style: { width: '150px', height: '150px', bottom: '-50px', right: '-50px', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' } }
            ]
        }
    },
    {
        id: 'ocean-breeze',
        name: 'Ocean Breeze',
        colors: { bg: 'bg-blue-50', primary: 'text-blue-800', secondary: 'text-gray-600', accent: 'bg-blue-500' },
        fonts: { title: 'font-serif', body: 'font-sans' },
        preview: {
            bg: 'bg-blue-50',
            shapes: [
                { class: 'bg-blue-200', style: { width: '100%', height: '40%', bottom: '0', left: '0', clipPath: 'polygon(0 80%, 100% 20%, 100% 100%, 0% 100%)' } },
                { class: 'bg-teal-200', style: { width: '100%', height: '30%', bottom: '0', left: '0', clipPath: 'polygon(0 40%, 100% 60%, 100% 100%, 0% 100%)' } }
            ]
        }
    },
    {
        id: 'eco-friendly',
        name: 'Eco Friendly',
        colors: { bg: 'bg-green-50', primary: 'text-green-900', secondary: 'text-gray-700', accent: 'bg-green-600' },
        fonts: { title: 'font-sans font-bold', body: 'font-sans' },
        preview: {
            bg: 'bg-green-50',
            shapes: [
                { class: 'bg-green-200', style: { width: '80px', height: '120px', top: '10%', right: '10%', borderRadius: '100% 0% 100% 0% / 100% 100% 0% 0%' } },
                { class: 'bg-lime-300', style: { width: '120px', height: '80px', bottom: '10%', left: '10%', borderRadius: '100% 0% 100% 0% / 100% 100% 0% 0%', transform: 'rotate(90deg)' } }
            ]
        }
    },
    {
        id: 'minimalist-mono',
        name: 'Minimalist Mono',
        colors: { bg: 'bg-white', primary: 'text-black', secondary: 'text-gray-500', accent: 'bg-black' },
        fonts: { title: 'font-sans font-extrabold', body: 'font-sans' },
        preview: {
            bg: 'bg-white',
            shapes: [
                { class: 'bg-gray-200', style: { width: '2px', height: '80%', top: '10%', left: '20%' } },
                { class: 'bg-gray-800', style: { width: '50%', height: '2px', bottom: '25%', right: '15%' } }
            ]
        }
    }
];
