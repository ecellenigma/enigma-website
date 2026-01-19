import React, { useEffect, useRef } from 'react';

export default function BrushCursor() {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -100, y: -100 });
    const cursorRef = useRef({ x: -100, y: -100 }); // Interpolated position
    const pointsRef = useRef([]);
    const rafRef = useRef();

    // State refs to manage input mode and activity
    const inputTypeRef = useRef('mouse'); // 'mouse' or 'touch'
    const isActiveRef = useRef(true);     // Is the cursor currently "drawing"?
    const ghostBlockTimeRef = useRef(0);  // Timestamp to block ghost mouse events

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
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
            // Block phantom mouse events after touch interactions
            if (Date.now() < ghostBlockTimeRef.current) return;

            mouseRef.current = { x: e.clientX, y: e.clientY };

            // On desktop, mouse implies active cursor (always visible)
            inputTypeRef.current = 'mouse';
            isActiveRef.current = true;
        };

        const handleTouchStart = (e) => {
            if (e.touches.length > 0) {
                const x = e.touches[0].clientX;
                const y = e.touches[0].clientY;

                mouseRef.current = { x, y };

                // INSTANTLY snap interpolated cursor to new touch position
                // This prevents the "streak" or travel line from old position
                cursorRef.current = { x, y };

                inputTypeRef.current = 'touch';
                isActiveRef.current = true;

                // Block mouse events for 500ms to prevent duplicate triggers
                ghostBlockTimeRef.current = Date.now() + 500;
            }
        };

        const handleTouchMove = (e) => {
            if (e.touches.length > 0) {
                mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
                isActiveRef.current = true;
            }
        };

        const handleTouchEnd = () => {
            // When touch ends, stop drawing (so the cursor "disappears" effectively)
            isActiveRef.current = false;
            ghostBlockTimeRef.current = Date.now() + 500;
        };

        const handleScroll = () => {
            // instant clean up on scroll to prevent "dirty glass" effect
            // when user scrolls, the trail should not linger over moving content
            pointsRef.current = [];
        };

        window.addEventListener('mousemove', handleMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd);
        window.addEventListener('touchcancel', handleTouchEnd);
        window.addEventListener('scroll', handleScroll, { passive: true });

        const animate = () => {
            // LERP: Smooth cursor movement
            // Touch needs to be VERY fast to feel responsive (high lerp), mouse allows drift (low lerp)
            const lerpFactor = inputTypeRef.current === 'touch' ? 0.8 : 0.15;

            cursorRef.current.x += (mouseRef.current.x - cursorRef.current.x) * lerpFactor;
            cursorRef.current.y += (mouseRef.current.y - cursorRef.current.y) * lerpFactor;

            // Only spawn points if cursor is ACTIVE
            if (isActiveRef.current) {
                pointsRef.current.push({
                    x: cursorRef.current.x,
                    y: cursorRef.current.y,
                    age: 0,
                    id: Math.random()
                });
            }

            // Update points (age them out)
            pointsRef.current = pointsRef.current
                .map(p => ({ ...p, age: p.age + 0.05 }))
                .filter(p => p.age < 1);

            // Clear
            ctx.clearRect(0, 0, width, height);

            // Draw
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
            {/* SVG Filter Definition (Hidden) */}
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

            {/* Canvas with Filter Applied */}
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ filter: 'url(#liquid-goo)' }}
            />
        </div>
    );
}
