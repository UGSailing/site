import React from 'react';

interface BannerProps {
    color: string;
    message: string;
}

const Banner: React.FC<BannerProps> = ({ color, message }) => {
    const bannerStyle = {
        backgroundColor: color,
        border: `2px solid ${darkenColor(color)}`,
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: 'bold',
        padding: '0 20px',
    };

    return <div style={bannerStyle}>{message}</div>;
};

const darkenColor = (color: string): string => {
    // Simple function to darken the color
    const colorHex = color.startsWith('#') ? color.slice(1) : color;
    const num = parseInt(colorHex, 16);
    const amt = -20; // Amount to darken
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return `#${(0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + (B < 255 ? (B < 1 ? 0 : B) : 255)).toString(16).slice(1)}`;
};

export default Banner;