import { useEffect, useState } from 'react';

function DiceRoll({
    value,
    roll,
    disabled,
}: {
    value: number;
    roll: () => void;
    disabled: boolean;
}) {
    const [rolling, setRolling] = useState(false);
    const [displayValue, setDisplayValue] = useState<number | string>('-');

    const handleRoll = () => {
        if (disabled || rolling) return;

        setRolling(true);

        const interval = setInterval(() => {
            setDisplayValue(Math.floor(Math.random() * 24) + 1);
        }, 80);

        setTimeout(() => {
            clearInterval(interval);
            roll();
            setRolling(false);
        }, 500);
    };

    useEffect(() => {
        if (!rolling && value !== 0) {
            setDisplayValue(value);
        }
    }, [value, rolling]);

    return (
        <div className="text-center my-4">
            <button
                onClick={handleRoll}
                disabled={disabled || rolling}
                className={`px-4 py-2 rounded shadow text-white transition duration-200 ${disabled || rolling ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                    }`}
            >
                🎲 Roll Dice
            </button>

            <p className="mt-2 text-3xl font-bold tracking-wider">
                Current Roll:{' '}
                <span
                    className={`inline-block w-10 text-center ${rolling ? 'animate-pulse text-yellow-500' : 'text-green-600'
                        }`}
                >
                    {displayValue}
                </span>
            </p>
        </div>
    );
}

export default DiceRoll;
