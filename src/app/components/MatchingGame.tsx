"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

type Term = {
    term: string;
    description: string;
};

interface MatchingGameProps {
    onComplete: () => void;
}

const terms: Term[] = [
    { term: 'Layer 2', description: 'Transactions outside main chain' },
    { term: 'Optimistic Rollup', description: 'Assume transactions are valid' },
    { term: 'Scalability', description: 'Many more transactions per second' },
    { term: 'Ethereum Security', description: 'Backed by Ethereum\'s security' }
];

const MatchingGame: React.FC<MatchingGameProps> = ({ onComplete }) => {
    const [matches, setMatches] = useState<Record<string, string>>({});
    const [shuffledTerms, setShuffledTerms] = useState<Term[]>([]);
    const [shuffledDescriptions, setShuffledDescriptions] = useState<string[]>([]);
    const [score, setScore] = useState<number>(0);
    const [backgroundAnimation, setBackgroundAnimation] = useState<boolean>(false);

    useEffect(() => {
        const shuffledTerms = [...terms].sort(() => 0.5 - Math.random());
        const descriptions = shuffledTerms.map(term => term.description).sort(() => 0.5 - Math.random());
        setShuffledTerms(shuffledTerms);
        setShuffledDescriptions(descriptions);
    }, []);

    const handleMatch = (term: string, description: string) => {
        if (matches[term] === undefined || matches[term] !== description) {
            const correctMatch = terms.find(t => t.term === term)?.description;
            if (correctMatch === description) {
                setMatches(prev => ({ ...prev, [term]: description }));
                setScore(prevScore => prevScore + 1);
                setBackgroundAnimation(true);
                setTimeout(() => setBackgroundAnimation(false), 500);
                if (Object.keys(matches).length + 1 === terms.length) {
                    onComplete(); // Only call onComplete when all matches are correct
                }
            } else {
                console.log('Incorrect match');
            }
        }
    };

    const colors = ['bg-gradient-to-r from-red-400 to-pink-400', 'bg-gradient-to-r from-blue-400 to-indigo-400', 'bg-gradient-to-r from-green-400 to-teal-400', 'bg-gradient-to-r from-yellow-400 to-orange-400'];
    const borderColor = ['border-red-500', 'border-blue-500', 'border-green-500', 'border-yellow-500'];

    return (
        <motion.div
            className={`w-full max-w-4xl mx-auto p-6 rounded-lg shadow-2xl bg-opacity-50 bg-indigo-800 relative border-2 border-purple-500 ${backgroundAnimation ? 'animate-pulse' : ''}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h3 className="text-2xl font-bold mb-4 text-center text-white text-shadow-lg">Match the Terms!</h3>
            <p className="mb-4 text-center text-white">Drag terms to their correct descriptions:</p>

            <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex flex-col items-center">
                    <h4 className="mb-2 text-lg font-semibold text-center text-white">Terms</h4>
                    {shuffledTerms.map((t, index) => (
                        <motion.button
                            key={t.term}
                            draggable={true}
                            onDragStart={(e: React.DragEvent<HTMLButtonElement>) => e.dataTransfer.setData('text/plain', t.term)}
                            className={`px-4 py-2 rounded mb-2 w-full text-left text-white ${colors[index % colors.length]} hover:shadow-lg transition-shadow duration-300`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {t.term}
                        </motion.button>
                    ))}
                </div>
                <div className="flex flex-col items-center">
                    <h4 className="mb-2 text-lg font-semibold text-center text-white">Descriptions</h4>
                    {shuffledDescriptions.map((desc, index) => {
                        const matchedTerm = Object.keys(matches).find(key => matches[key] === desc);
                        const termIndex = matchedTerm ? shuffledTerms.findIndex(t => t.term === matchedTerm) : -1;
                        const isCorrect = matchedTerm !== undefined;

                        return (
                            <motion.div
                                key={desc}
                                onDragOver={(e: React.DragEvent<HTMLDivElement>) => e.preventDefault()}
                                onDrop={(e: React.DragEvent<HTMLDivElement>) => {
                                    const term = e.dataTransfer.getData('text');
                                    handleMatch(term, desc);
                                }}
                                className={`px-4 py-2 rounded mb-2 w-full text-left bg-opacity-50 bg-gray-700 hover:bg-opacity-75 hover:bg-gray-600 hover:shadow-lg transition-all duration-300 ${isCorrect ? `${borderColor[termIndex % borderColor.length]} border-4` : ''} relative text-white`}
                                whileHover={{ scale: 1.05 }}
                            >
                                {desc}
                                {isCorrect &&
                                    <span className={`absolute top-0 right-0 px-3 py-3 text-xl text-white bg-opacity-50 ${colors[termIndex % colors.length]} rounded-full`}>
                                        ✅
                                    </span>
                                }
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <div className="mt-4 text-center">
                <p className="text-lg text-white">Score: {score}/{terms.length}</p>
            </div>
        </motion.div>
    )
}

export default MatchingGame