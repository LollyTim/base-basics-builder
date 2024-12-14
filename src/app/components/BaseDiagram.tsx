import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'

const BaseDiagram = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.2,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    const arrowControl = useAnimation();

    useEffect(() => {
        const animateArrows = async () => {
            while (true) {
                await arrowControl.start({ scale: [1, 1.2, 1], transition: { duration: 1 } });
                await arrowControl.start({ transition: { duration: 2 } });
                await new Promise(resolve => setTimeout(resolve, 1000)); // Pause between animations
            }
        };

        animateArrows();
    }, []);

    return (
        <div className="relative w-full h-96 bg-opacity-50 bg-gray-800 rounded-xl shadow-2xl overflow-hidden border-2 border-purple-500">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-25"></div>

            <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center p-4 text-gray-900"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Base Layer */}
                <motion.div
                    className="w-4/5 h-2/5 bg-white rounded-t-xl shadow-lg flex items-center justify-center p-4 mb-2 relative"
                    variants={itemVariants}
                >
                    <p className="text-lg font-semibold text-center text-purple-700">Base (Layer 2)</p>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-blue-300 opacity-25 rounded-t-xl"></div>
                </motion.div>

                {/* Connector with pulsing animation */}
                <motion.div
                    className="w-1 h-16 bg-blue-500"
                    variants={itemVariants}
                    animate={{ scaleY: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
                />

                {/* Ethereum Layer */}
                <motion.div
                    className="w-4/5 h-2/5 bg-white rounded-b-xl shadow-lg flex items-center justify-center p-4 relative"
                    variants={itemVariants}
                >
                    <p className="text-lg font-semibold text-center text-gray-700">Ethereum (Layer 1)</p>
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-600 opacity-25 rounded-b-xl"></div>
                </motion.div>

                {/* Arrows and Descriptions */}
                <motion.div
                    className="absolute top-2.5/4 left-8 w-[90%] mx-auto flex justify-between text-white"
                    variants={itemVariants}
                >
                    <motion.div
                        className="flex items-center"
                        animate={arrowControl}
                    >
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                        <span>Transactions Processed</span>
                    </motion.div>
                    <motion.div
                        className="flex items-center"
                        animate={arrowControl}
                    >
                        <span>Secure on Ethereum</span>
                        <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default BaseDiagram;