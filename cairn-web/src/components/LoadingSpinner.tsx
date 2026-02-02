import { motion } from 'framer-motion';

export const LoadingSpinner = () => {
    return (
        <div className="flex h-full w-full min-h-[50vh] items-center justify-center">
            <motion.div
                className="h-10 w-10 rounded-full border-4 border-zinc-700 border-t-blue-500"
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1,
                    ease: "linear",
                    repeat: Infinity
                }}
            />
        </div>
    );
};
