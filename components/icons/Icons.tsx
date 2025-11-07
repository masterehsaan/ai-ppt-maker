
import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const LogoIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM5 5v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h6v2H7v-2z" />
    </svg>
);

export const GenerateIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M13.5 2.001a2.5 2.5 0 0 0-4.935 1.056A4.5 4.5 0 0 0 4.5 11H8v-.5a2.5 2.5 0 1 1 5 0v.5h3.5a3.5 3.5 0 0 0 .5-6.963 2.5 2.5 0 0 0-4-1.036zM17 14.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM12 21a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zM7 14.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
    </svg>
);

export const RedesignIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
        <path d="M12 10.586L8.707 7.293 7.293 8.707 10.586 12l-3.293 3.293 1.414 1.414L12 13.414l3.293 3.293 1.414-1.414L13.414 12l3.293-3.293-1.414-1.414L12 10.586z" />
    </svg>
);

export const ExportIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18 6.5h-5V2.414L7.414 8 13 13.586V9.5h5V18H6V9H4v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7.5a1 1 0 0 0-1-1z" />
    </svg>
);

export const ImageIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM5 19V5h14v14H5zm4-6.59 2.29 2.3 3.71-4.71L19 17H5l4-5.59z" />
    </svg>
);

export const StartOverIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.707 2.293A.996.996 0 0 0 12 2H6a.996.996 0 0 0-.707.293L2.586 5H2v2h1.586l1.707 1.707A8.003 8.003 0 0 0 12 20a8 8 0 0 0 7.747-5.93b.27-1.144-1.042-1.85-1.93-1.326A5.998 5.998 0 0 1 6.136 9H9V7H3.414L.707 9.707A.996.996 0 0 0 0 10v4a.996.996 0 0 0 .293.707l3 3A.996.996 0 0 0 4 18h2.135A9.998 9.998 0 0 0 22 12c0-5.523-4.477-10-10-10-1.01 0-1.97.153-2.865.438L7.414 4H10v-.586L12.707 2.293z" />
    </svg>
);
