import { buildStyles } from "react-circular-progressbar"

import { motion } from "framer-motion"
import { CircularProgressbar } from "react-circular-progressbar"

interface ScoringGaugeProps {
  score: number;
  colorClass: string;
  message: string;
  status: string;
}

export const ScoringGauge = ({ score,colorClass,message,status }: ScoringGaugeProps) => {
    return (
      <motion.div
        className="rounded-2xl p-6 text-center flex flex-col justify-center items-center gap-3 bg-white"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Dynamic Gauge */}
        <motion.div
          className="relative w-40 h-40 mx-auto"
          whileHover={{ scale: 1.05 }}
        >
          <CircularProgressbar
            value={score}
            text={`${score}`}
            styles={buildStyles({
              textSize: "24px",
              textColor: "#333",
              pathColor:
                score > 75 ? "#10B981" : score >= 40 ? "#F59E0B" : "#EF4444",
              trailColor: "#E5E7EB",
              backgroundColor: "#fff",
            })}
          />
          <span className="text-gray-300 absolute bottom-9 right-11">out of 100</span>
        </motion.div>
      
        {/* Dynamically render status and color */}
        <motion.p
          className={`text-3xl font-semibold mt-4 ${colorClass}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {status}
        </motion.p>

        {/* Dynamic message based on score */}
        <p className="text-gray-600 mb-2">{message}</p>

        {/* Tags Section */}
        <div className="flex flex-wrap justify-center gap-4">
          {["AI-generated description", "Phishing", "Similar images found"].map(
            (tag, idx) => (
              <motion.span
                key={idx}
                className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                whileHover={{ scale: 1.1 }}
              >
                {tag}
              </motion.span>
            )
          )}
        </div>
      </motion.div>
    );
  };

