import React, { useEffect, useRef } from 'react';

export default function BrushCursor() {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -100, y: -100 });
    const cursorRef = useRef({ x: -100, y: -100 });
    const pointsRef = useRef([]);
    const rafRef = useRef();

    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
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

        const handleMove = (e) => {
            if (Date.now() < ghostBlockTimeRef.current) return;

            mouseRef.current = { x: e.clientX, y: e.clientY };

            inputTypeRef.current = 'mouse';
            isActiveRef.current = true;
        };

        const handleTouchStart = (e) => {
            if (e.touches.length > 0) {
                const x = e.touches[0].clientX;
                const y = e.touches[0].clientY;

                mouseRef.current = { x, y };

                cursorRef.current = { x, y };

                pointsRef.current = [];

                inputTypeRef.current = 'touch';
                isActiveRef.current = true;

                ghostBlockTimeRef.current = Date.now() + 500;
            }
        };

        const handleTouchMove = (e) => {
            if (e.touches.length > 0) {
                mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
                isActiveRef.current = true;
            }
        };

        const forceClear = () => {
            if (ctxRef.current && canvasRef.current) {
                ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }
        };

        const handleTouchEnd = () => {
            isActiveRef.current = false;
            pointsRef.current = [];
            forceClear();
            ghostBlockTimeRef.current = Date.now() + 500;
        };

        window.addEventListener('mousemove', handleMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd);
        window.addEventListener('touchcancel', handleTouchEnd);

        window.addEventListener('pointerup', handleTouchEnd);
        window.addEventListener('pointercancel', handleTouchEnd);
        window.addEventListener('gestureend', handleTouchEnd);
        window.addEventListener('gesturechange', handleTouchEnd);

        const animate = () => {
            const prevX = cursorRef.current.x;
            const prevY = cursorRef.current.y;

            const lerpFactor = inputTypeRef.current === 'touch' ? 0.5 : 0.15;

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

            pointsRef.current = pointsRef.current
                .map(p => ({ ...p, age: p.age + 0.05 }))
                .filter(p => p.age < 1);

            ctx.clearRect(0, 0, width, height);

            ctx.fillStyle = 'white';
            ctx.beginPath();

            const isMobile = width < 768;
            const baseSize = isMobile ? 30 : 80;

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
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden mix-blend-difference">
            <svg className="hidden">
                <defs>
                    <filter id="liquid-goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
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
