"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BaseDiagram from './components/BaseDiagram'
import SmartContractsOnBase from './components/SmartContractsOnBase'
import Confetti from 'react-confetti'
import MatchingGame from './components/MatchingGame'

export default function Home() {
  const [currentModule, setCurrentModule] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);
  const [showGame, setShowGame] = useState<boolean>(false);

  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const modules = [
    {
      component: (
        <div className="w-full max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-shadow-lg">Understanding Base - A Layer 2 Solution</h1>

          <section className="mb-8 p-4 md:p-6 rounded-lg shadow-lg bg-opacity-50 bg-indigo-800">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">What is Base?</h2>
            <p>Base is like a special, fast lane built on top of Ethereum. It&#39;s designed to make things quicker and cheaper while keeping everything safe.</p>
          </section>

          <section className="mb-8 p-4 md:p-6 rounded-lg shadow-lg bg-opacity-50 bg-indigo-800">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">How Does Base Work?</h2>
            <p>Transactions happen off the main Ethereum road (Layer 1) on Base&#39;s own path (Layer 2). Base uses Optimistic Rollups:</p>
            <ul className="list-disc pl-5">
              <li>You make a transaction on Base.</li>
              <li>Base bundles up lots of transactions together.</li>
              <li>Only a summary of these bundled transactions is sent back to Ethereum for safety checks.</li>
              <li>If no one complains (optimistically assumes everything is okay), the transactions are confirmed.</li>
            </ul>
          </section>

          <section className="mb-8 p-4 md:p-6 rounded-lg shadow-lg bg-opacity-50 bg-indigo-800">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">Why Use Base?</h2>
            <ul className="list-disc pl-5">
              <li>Speed: Transactions are faster because they&#39;re processed outside the main Ethereum traffic.</li>
              <li>Cost: It&#39;s cheaper to move on Base than on the crowded Ethereum highway.</li>
              <li>Security: Even though you're on a different road, Base still uses Ethereum&#39;s security guards to make sure everything is safe.</li>
            </ul>
          </section>

          <motion.div
            className="mb-8 p-4 md:p-6 rounded-lg shadow-lg bg-opacity-50 bg-indigo-800"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <BaseDiagram />
          </motion.div>

          <button
            onClick={() => setShowGame(!showGame)}
            className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-blue-500 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-full mb-4 transition-all duration-300 shadow-lg"
          >
            {showGame ? 'Hide Game' : 'Show Matching Game'}
          </button>

          {showGame && (
            <AnimatePresence>
              <motion.div
                key="matchingGame"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <MatchingGame onComplete={() => {
                  setCompleted(true);
                  setShowGame(false); // Hide the game on completion to prevent blocking clicks
                }} />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      ),
      title: 'Understanding Base'
    },
    { component: <SmartContractsOnBase onComplete={() => { setCompleted(true); scrollToTop(); }} />, title: 'Smart Contracts on Base' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-900 text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-indigo-900 bg-opacity-75 border-r border-purple-500 md:min-h-screen">
        <nav className="p-4">
          <h1 className="text-xl md:text-2xl font-bold text-center mb-4 text-shadow-lg">Base Learning Modules</h1>
          <ul className="space-y-2">
            {modules.map((module, index) => (
              <li key={index}>
                <button
                  onClick={() => setCurrentModule(index)}
                  className={`w-full text-left px-4 py-2 rounded-lg ${currentModule === index ? 'bg-blue-500' : 'bg-transparent hover:bg-indigo-700'} text-white transition-colors duration-300`}
                >
                  {module.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentModule}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {modules[currentModule].component}
          </motion.div>
        </AnimatePresence>

        {/* Success Modal */}
        {completed &&
          <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="fixed z-50 inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                          Success!
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            You've completed the module. Great job!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button onClick={() => setCompleted(false)} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }

        {/* Confetti */}
        {completed &&
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={200}
            gravity={0.5}
            tweenDuration={1000}
          />
        }
      </main>
    </div>
  )
}