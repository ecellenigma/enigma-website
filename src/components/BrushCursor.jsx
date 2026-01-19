import React, { useEffect, useRef } from 'react';

export default function BrushCursor() {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -100, y: -100 });
    const cursorRef = useRef({ x: -100, y: -100 });
    const pointsRef = useRef([]);
    const rafRef = useRef();

    const isIOS = (() => {
        if (typeof navigator === 'undefined') return false;
        const ua = navigator.userAgent || '';
        return /iPhone|iPad|iPod/i.test(ua);
    })();

    if (isIOS) return null;

    const inputTypeRef = useRef('mouse');
    const isActiveRef = useRef(true);
    const ghostBlockTimeRef = useRef(0);
    const ctxRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        ctxRef.current = ctx;
        let width = window.innerWidth;
        let height = window.innerHeight;

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        const forceClear = () => {
            if (ctxRef.current && canvasRef.current) {
                ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }
        };

        const handleMove = (e) => {
            if (Date.now() < ghostBlockTimeRef.current) return;
            mouseRef.current = { x: e.clientX, y: e.clientY };
            inputTypeRef.current = 'mouse';
            isActiveRef.current = true;
        };

        // Touch is disabled - just clear and ignore
        const handleTouchStart = () => {
            isActiveRef.current = false;
            pointsRef.current = [];
            forceClear();
        };

        const handleTouchMove = () => {
            // Disabled for touch
        };

        const handleTouchEnd = () => {
            isActiveRef.current = false;
            pointsRef.current = [];
            forceClear();
        };

        window.addEventListener('mousemove', handleMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd);
        window.addEventListener('touchcancel', handleTouchEnd);
        window.addEventListener('pointerup', handleTouchEnd);
        window.addEventListener('pointercancel', handleTouchEnd);

        const animate = () => {
            const prevX = cursorRef.current.x;
            const prevY = cursorRef.current.y;

            // iOS: 0.6 for smooth liquid feel
            // Android: 0.5
            // Desktop mouse: 0.15 silky drift
            let lerpFactor;
            if (isIOS.current) {
                lerpFactor = 0.6; // Smooth liquid for iOS
            } else if (inputTypeRef.current === 'touch') {
                lerpFactor = 0.5; // Liquid feel for Android
            } else {
                lerpFactor = 0.25; // Faster responsive for mouse
            }

            cursorRef.current.x += (mouseRef.current.x - cursorRef.current.x) * lerpFactor;
            cursorRef.current.y += (mouseRef.current.y - cursorRef.current.y) * lerpFactor;

            if (isActiveRef.current) {
                const dist = Math.hypot(cursorRef.current.x - prevX, cursorRef.current.y - prevY);
                const steps = Math.ceil(dist / 5);

                for (let i = 0; i < steps; i++) {
                    const t = (i + 1) / steps;
                    pointsRef.current.push({
                        x: prevX + (cursorRef.current.x - prevX) * t,
                        y: prevY + (cursorRef.current.y - prevY) * t,
                        age: 0,
                        id: Math.random()
                    });
                }

                if (steps === 0) {
                    pointsRef.current.push({
                        x: cursorRef.current.x,
                        y: cursorRef.current.y,
                        age: 0,
                        id: Math.random()
                    });
                }
            }

            // iOS: Faster aging (0.08) for quicker trail fade = less residue
            // Others: Standard aging (0.05)
            const agingRate = isIOS.current ? 0.08 : 0.05;

            pointsRef.current = pointsRef.current
                .map(p => ({ ...p, age: p.age + agingRate }))
                .filter(p => p.age < 1);

            ctx.clearRect(0, 0, width, height);

            ctx.fillStyle = 'white';
            ctx.beginPath();

            const isMobile = width < 768;
            // iOS: Slightly smaller cursor for better performance
            const baseSize = isIOS.current ? 25 : (isMobile ? 30 : 80);

            pointsRef.current.forEach(point => {
                const size = baseSize * (1 - point.age);
                if (size > 0) {
                    ctx.moveTo(point.x, point.y);
                    ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
                }
            });

            ctx.fill();

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('touchcancel', handleTouchEnd);
            window.removeEventListener('pointerup', handleTouchEnd);
            window.removeEventListener('pointercancel', handleTouchEnd);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden mix-blend-difference">
            <svg className="hidden">
                <defs>
                    <filter id="liquid-goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation={isIOS.current ? 6 : 10} result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                            result="goo"
                        />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ filter: 'url(#liquid-goo)' }}
            />
        </div>
    );
}
