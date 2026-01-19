import React, { useEffect, useRef } from 'react';

export default function BrushCursor() {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -100, y: -100 });
    const cursorRef = useRef({ x: -100, y: -100 });
    const pointsRef = useRef([]);
    const rafRef = useRef();

    const isMobileDevice = typeof navigator !== 'undefined' &&
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobileDevice) return null;

    const isActiveRef = useRef(false);
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
            const newX = e.clientX;
            const newY = e.clientY;
            const dist = Math.hypot(newX - mouseRef.current.x, newY - mouseRef.current.y);
            if (dist < 5) return;

            mouseRef.current = { x: newX, y: newY };
            isActiveRef.current = true;
        };

        const handleTouchEnd = () => {
            isActiveRef.current = false;
            pointsRef.current = [];
            forceClear();
        };

        const handleClick = () => {
            isActiveRef.current = false;
            pointsRef.current = [];
            forceClear();
        };

        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mousedown', handleClick);
        window.addEventListener('touchstart', handleTouchEnd, { passive: true });
        window.addEventListener('touchend', handleTouchEnd);

        const animate = () => {
            const prevX = cursorRef.current.x;
            const prevY = cursorRef.current.y;

            const lerpFactor = 0.25;
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
                        age: 0
                    });
                }

                if (steps === 0) {
                    pointsRef.current.push({
                        x: cursorRef.current.x,
                        y: cursorRef.current.y,
                        age: 0
                    });
                }
            }

            pointsRef.current = pointsRef.current
                .map(p => ({ ...p, age: p.age + 0.05 }))
                .filter(p => p.age < 1);

            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = 'white';
            ctx.beginPath();

            const baseSize = width < 768 ? 30 : 80;

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
            window.removeEventListener('mousedown', handleClick);
            window.removeEventListener('touchstart', handleTouchEnd);
            window.removeEventListener('touchend', handleTouchEnd);
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
