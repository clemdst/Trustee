import { motion } from "framer-motion";

const Score = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="relative w-64 h-64 rounded-full bg-white shadow-xl flex items-center justify-center">
        {/* Dotted background */}
        <div className="absolute inset-0 rounded-full z-0">
          <svg
            className="w-full h-full"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            {[...Array(200)].map((_, i) => {
              const angle = (i / 200) * 2 * Math.PI;
              const radius = 95 + Math.random() * 3; // slight jitter effect
              const x = 100 + radius * Math.cos(angle);
              const y = 100 + radius * Math.sin(angle);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={1.2}
                  fill="#B0BEC5"
                  opacity={Math.random() * 0.5 + 0.3}
                />
              );
            })}
          </svg>
        </div>

        {/* Score Circle */}
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold text-gray-800"
          >
            88
          </motion.div>
          <p className="text-gray-500 mt-1 text-sm">out of 100</p>
          <div className="mt-2">
            <div className="bg-blue-500 rounded-full p-2">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Score;