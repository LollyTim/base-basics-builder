"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Term = {
    term: string;
    description: string;
};

interface MatchingGameProps {
    onComplete: () => void;
}

const terms: Term[] = [
    { term: "Layer 2", description: "Transactions outside main chain" },
    { term: "Optimistic Rollup", description: "Assume transactions are valid" },
    { term: "Scalability", description: "Many more transactions per second" },
    { term: "Ethereum Security", description: "Backed by Ethereum's security" },
];

const MatchingGame: React.FC<MatchingGameProps> = ({ onComplete }) => {
    const [matches, setMatches] = useState<Record<string, string>>({});
    const [shuffledTerms, setShuffledTerms] = useState<Term[]>([]);
    const [shuffledDescriptions, setShuffledDescriptions] = useState<string[]>(
        []
    );
    const [score, setScore] = useState<number>(0);
    const [incorrectMatch, setIncorrectMatch] = useState<string | null>(null);

    useEffect(() => {
        const shuffledTerms = [...terms].sort(() => 0.5 - Math.random());
        const descriptions = shuffledTerms
            .map((term) => term.description)
            .sort(() => 0.5 - Math.random());
        setShuffledTerms(shuffledTerms);
        setShuffledDescriptions(descriptions);
    }, []);

    const handleMatch = (term: string, description: string) => {
        const correctMatch = terms.find((t) => t.term === term)?.description;

        if (correctMatch === description) {
            setMatches((prev) => ({ ...prev, [term]: description }));
            setScore((prevScore) => prevScore + 1);
            setIncorrectMatch(null);

            // Check if the game is complete
            if (Object.keys(matches).length + 1 === terms.length) {
                onComplete();
            }
        } else {
            setIncorrectMatch(description);
            setTimeout(() => setIncorrectMatch(null), 1000); // Reset after 1 second
        }
    };

    const colors = [
        "bg-gradient-to-r from-red-400 to-pink-400",
        "bg-gradient-to-r from-blue-400 to-indigo-400",
        "bg-gradient-to-r from-green-400 to-teal-400",
        "bg-gradient-to-r from-yellow-400 to-orange-400",
    ];

    return (
        <motion.div
            className="w-full max-w-4xl mx-auto p-6 rounded-lg shadow-2xl bg-opacity-50 bg-indigo-800 relative border-2 border-purple-500"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h3 className="text-2xl font-bold mb-4 text-center text-white">
                Match the Terms!
            </h3>
            <p className="mb-4 text-center text-white">
                Drag terms to their correct descriptions:
            </p>

            <div className="grid grid-cols-2 gap-4 mt-4">
                {/* Terms */}
                <div className="flex flex-col items-center">
                    <h4 className="mb-2 text-lg font-semibold text-center text-white">
                        Terms
                    </h4>
                    {shuffledTerms.map((t, index) => (
                        <motion.div
                            key={t.term}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <button
                                draggable={true}
                                onDragStart={(e: React.DragEvent<HTMLButtonElement>) =>
                                    e.dataTransfer.setData("text/plain", t.term)
                                }
                                className={`px-4 py-2 rounded mb-2 w-full text-left text-white ${colors[index % colors.length]
                                    } hover:shadow-lg transition-shadow duration-300`}
                            >
                                {t.term}
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Descriptions */}
                <div className="flex flex-col items-center">
                    <h4 className="mb-2 text-lg font-semibold text-center text-white">
                        Descriptions
                    </h4>
                    {shuffledDescriptions.map((desc) => {
                        const matchedTerm = Object.keys(matches).find(
                            (key) => matches[key] === desc
                        );
                        const termIndex = matchedTerm
                            ? shuffledTerms.findIndex((t) => t.term === matchedTerm)
                            : -1;
                        const isCorrect = matchedTerm !== undefined;
                        const isIncorrect = incorrectMatch === desc;

                        return (
                            <motion.div
                                key={desc}
                                onDragOver={(e: React.DragEvent<HTMLDivElement>) =>
                                    e.preventDefault()
                                }
                                onDrop={(e: React.DragEvent<HTMLDivElement>) => {
                                    const term = e.dataTransfer.getData("text/plain");
                                    handleMatch(term, desc);
                                }}
                                className={`px-4 py-2 rounded mb-2 w-full text-center ${isCorrect
                                    ? `${colors[termIndex % colors.length]} text-white`
                                    : isIncorrect
                                        ? "bg-red-500 text-white animate-pulse"
                                        : "bg-gray-800 text-gray-200"
                                    }`}
                            >
                                {desc}
                                {isCorrect && <span className="ml-2">✓</span>}
                            </motion.div>

                        );
                    })}
                </div>
                {score}
            </div>
        </motion.div>
    );
};

export default MatchingGame;
