import { useEffect, useState } from 'react';

interface TextScrambleProps {
    text: string;
    className?: string;
    speed?: number;
    scrambleSpeed?: number;
    trigger?: boolean;
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

export const TextScramble = ({
    text,
    className = '',
    speed = 50,
    scrambleSpeed = 20,
    trigger
}: TextScrambleProps) => {
    const [displayText, setDisplayText] = useState(text);
    const [isInternalHovered, setIsInternalHovered] = useState(false);

    const active = trigger !== undefined ? trigger : isInternalHovered;

    useEffect(() => {
        if (!active) {
            setDisplayText(text);
            return;
        }

        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split('')
                    .map((char, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join('')
            );

            if (iteration >= text.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3;
        }, scrambleSpeed);

        return () => clearInterval(interval);
    }, [active, text, scrambleSpeed]);

    return (
        <span
            className={className}
            onMouseEnter={() => setIsInternalHovered(true)}
            onMouseLeave={() => setIsInternalHovered(false)}
        >
            {displayText}
        </span>
    );
};
