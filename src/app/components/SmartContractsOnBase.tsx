"use client"
import { motion, useAnimation } from 'framer-motion'
import { useState, useEffect } from 'react'
import SmartContractGame from './SmartContractGame';

const SmartContractsOnBase = ({ onComplete }: { onComplete: () => void }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const containerControls = useAnimation();
    const stepControls = useAnimation();

    const steps = [
        {
            title: 'What is a Smart Contract?',
            content: 'Think of a smart contract like a digital vending machine. Once you put in the right amount of money (or in this case, meet the conditions of the contract), it automatically gives you your snack (or executes the agreed action). On Base, these are programs written in a language called Solidity that run on the blockchain.',
            code: 'pragma solidity ^0.8.0;\ncontract HelloWorld {\n  function sayHello() public pure returns (string memory) {\n    return "Hello, World!";\n  }\n}',
            moreInfo: 'A smart contract on Base does exactly what it\'s programmed to do without needing a middleman. It\'s like setting rules for a game that everyone agrees on before playing.'
        },
        {
            title: 'Writing Your Contract',
            content: 'Writing a smart contract is like writing a recipe. You define what ingredients (data) you need and the steps (functions) to make the dish (execute the contract). Here\'s a simple one that stores a number:',
            code: 'contract SimpleStorage {\n  uint256 number;\n  function set(uint256 _number) public {\n    number = _number;\n  }\n  function get() public view returns (uint256) {\n    return number;\n  }\n}',
            moreInfo: 'The contract above can store a number and let you retrieve it later. It\'s like having a digital safe where you can lock in a number.'
        },
        {
            title: 'Testing Your Contract',
            content: 'Before you "cook" your recipe (deploy your contract), you test it to make sure it works. In smart contracts, we use tools like Hardhat to run tests, checking if our "recipe" does what we expect.',
            code: 'npx hardhat test',
            moreInfo: 'Testing ensures your contract behaves correctly. It\'s like checking if your recipe makes the cake you want before serving it to guests.'
        },
        {
            title: 'Deploying to Base',
            content: 'Deploying means putting your contract on the Base network where it lives and runs. It\'s like opening your restaurant where your "recipes" (contracts) can be used by others. Here\'s how you might deploy using Hardhat:',
            code: 'npx hardhat run scripts/deploy.js --network base',
            moreInfo: 'Once deployed, your contract is on the blockchain, and anyone can use it, just like anyone can order from your restaurant menu. Remember, deployment on Base can be faster and cheaper than on Ethereum.'
        },
        {
            title: 'Interacting with Your Contract',
            content: 'After deployment, you can interact with your contract. This means using it to perform actions like storing or retrieving data, much like ordering from a menu or checking your order. Here\'s how you might interact with your contract:',
            code: 'await contract.set(42);\nlet value = await contract.get();',
            moreInfo: 'Interacting with a smart contract can be simple or complex, depending on what it\'s programmed to do. It\'s like using an app on your phone to order food. On Base, these interactions benefit from lower fees and faster confirmations.'
        }
    ];

    useEffect(() => {
        containerControls.start({ opacity: 1, scale: 1 });
        stepControls.start({ opacity: 1, scale: 1 });
    }, [currentStep, containerControls, stepControls]);

    return (
        <motion.div
            className="w-full max-w-4xl mx-auto p-6 rounded-lg shadow-2xl bg-opacity-50 bg-indigo-900 border border-purple-500"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={containerControls}
            transition={{ duration: 0.5 }}
        >
            <h3 className="text-2xl font-bold mb-4 text-center text-white text-shadow-lg">Smart Contracts on Base</h3>

            <motion.div
                className="w-full p-4 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg mb-4 border border-gray-700"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={stepControls}
                transition={{ duration: 0.5 }}
            >
                <h4 className="text-lg font-semibold mb-2 text-white">{steps[currentStep].title}</h4>
                <p className="text-sm text-gray-300 mb-2">{steps[currentStep].content}</p>
                <pre className="bg-gray-900 p-4 rounded-lg text-xs overflow-x-auto">
                    <code className="text-green-400">{steps[currentStep].code}</code>
                </pre>
                <button
                    onClick={() => setShowMoreInfo(!showMoreInfo)}
                    className="text-sm text-blue-400 hover:text-blue-300 mt-2"
                >
                    {showMoreInfo ? 'Hide Info' : 'More Info'}
                </button>
                {showMoreInfo && <p className="text-sm text-gray-400 mt-2">{steps[currentStep].moreInfo}</p>}
            </motion.div>

            <div className="flex justify-between w-full">
                <button
                    onClick={() => {
                        setCurrentStep(prev => Math.max(prev - 1, 0));
                        stepControls.start({ opacity: 0, scale: 0.9 }).then(() => stepControls.start({ opacity: 1, scale: 1 }));
                    }}
                    disabled={currentStep === 0}
                    className={`px-4 py-2 ${currentStep === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-full transition-colors duration-300`}
                >
                    Previous
                </button>
                <button
                    onClick={() => {
                        setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
                        stepControls.start({ opacity: 0, scale: 0.9 }).then(() => stepControls.start({ opacity: 1, scale: 1 }));
                    }}
                    disabled={currentStep === steps.length - 1}
                    className={`px-4 py-2 ${currentStep === steps.length - 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-full transition-colors duration-300`}
                >
                    Next
                </button>
            </div>

            {currentStep === steps.length - 1 && !gameCompleted &&
                <SmartContractGame onComplete={() => {
                    setGameCompleted(true);
                    onComplete();
                }} />
            }
        </motion.div>
    )
}

export default SmartContractsOnBase;