"use client"
import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

const SmartContractGame = ({ onComplete }: { onComplete: () => void }) => {
    const [code, setCode] = useState('');
    const [feedback, setFeedback] = useState<string | null>(null);
    const correctCode = 'contract SimpleStorage { uint256 public number; function set(uint256 _number) public { number = _number; } function get() public view returns (uint256) { return number; } }';
    const controls = useAnimation();

    useEffect(() => {
        controls.start({ opacity: 1, scale: 1 });
    }, [controls]);

    const checkCode = () => {
        if (code.trim() === correctCode.trim()) {
            setFeedback('Correct! You\'ve successfully written a simple smart contract for storing and retrieving data.');
            onComplete();
        } else {
            setFeedback('Incorrect. Please try again. Remember, you need to define a contract with a number storage and functions to set and get that number.');
        }
    };

    return (
        <motion.div
            className="w-full p-4 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg mt-4 border border-gray-700"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={controls}
            transition={{ duration: 0.5 }}
        >
            <h3 className="text-lg font-semibold text-white mb-2">Interactive Game: Write the Smart Contract</h3>
            <p className="text-sm text-gray-300 mb-4">Try to write a smart contract that can store a number and allow users to retrieve it. Here&apos;s what you need to do:</p>
            <ul className="text-sm text-gray-400 list-disc ml-5 mb-4">
                <li>Define a contract named <code>SimpleStorage</code>.</li>
                <li>Have a public <code>uint256</code> variable named <code>number</code>.</li>
                <li>Create a <code>set</code> function to update <code>number</code>.</li>
                <li>Create a <code>get</code> function to return <code>number</code>.</li>
            </ul>
            <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-48 p-2 bg-gray-900 text-green-400 border border-gray-700 rounded-lg mb-4"
                placeholder="Write the contract here..."
            />
            <button
                onClick={checkCode}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
            >
                Check Contract
            </button>
            {feedback && <p className={`mt-2 text-sm ${feedback.includes('Correct') ? 'text-green-400' : 'text-red-500'}`}>{feedback}</p>}
            <pre className="bg-gray-900 p-4 rounded-lg text-xs mt-4 overflow-x-auto">
                <code className="text-green-400">{correctCode}</code>
            </pre>
        </motion.div>
    )
}

export default SmartContractGame;