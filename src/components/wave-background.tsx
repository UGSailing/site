// components/wave-background.tsx
export default function WaveBackground() {
    return (
        <div 
            className="absolute -z-10 top-0 left-0 w-screen h-full"
            style={{
                backgroundImage: 'url("/golfjes.svg")',
                backgroundRepeat: 'repeat-y',
                backgroundPosition: 'top',
                backgroundSize: '100% auto',
                minHeight: '100vh',
                pointerEvents: 'none'
            }}
        />
    );
}