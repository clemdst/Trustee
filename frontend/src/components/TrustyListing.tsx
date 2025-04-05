import TrusteeLogo from "@/assets/logo_checkmark-2.png";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Plus, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const TrusteeListing = () => {
  // Example score value (can be dynamic)
  const score = 90;

  // Determine status, color, and dynamic message based on score
  let status = "";
  let colorClass = "";
  let message = "";

  if (score > 75) {
    status = "Legit ✅";
    colorClass = "text-green-600"; // Green color for Trust
    message = "Trustee thinks that this listing is trustworthy.";
  } else if (score >= 40 && score <= 75) {
    status = "Take care ⚠️";
    colorClass = "text-orange-600"; // Orange color for Take care
    message = "Trustee thinks that you should proceed with caution.";
  } else {
    status = "Risky 🚨";
    colorClass = "text-red-600"; // Red color for Risky
    message = "Trustee thinks that this listing could be a scam.";
  }

  return (
    <motion.div
      className="max-w-xl mx-auto p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        className="flex justify-between items-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img src={TrusteeLogo} alt="Trustee" className="w-30" />
        <motion.div whileHover={{ rotate: 90 }}>
          <Settings />
        </motion.div>
      </motion.div>

      {/* Risk Analysis Card */}
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

      {/* Listing Analysis */}
      <motion.div
        className="rounded-2xl px-4 border-0 bg-white"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span>Listing analysis</span>
          <span className="text-red-600">12/100</span>
        </h2>

        {/* Images Section */}
        <div className="flex flex-col gap-2 pt-4">
          {["Original images", "Similar images"].map((label, idx) => (
            <div key={idx}>
              <span className="text-sm">{label}</span>
              <div className="flex space-x-4 mt-2 p-1 overflow-x-scroll overflow-y-hidden">
                {[1, 2, 3, 4].map((_, imgIdx) => (
                  <motion.img
                    key={imgIdx}
                    src="https://images.unsplash.com/photo-1741986947217-d1a0ecc39149?q=80&w=1166&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt={`image-${imgIdx}`}
                    className="w-30 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Alert Section */}
        <motion.div
          className="flex justify-center items-center text-sm text-red-500 mt-4 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <AlertTriangle className="w-4 h-4 mr-1" />
          Found 3 similar images on Google (Source.fr, Vinted, Scamland)
        </motion.div>

        {/* Additional Analysis */}
        <p className="mt-2 text-gray-700">
          Moreover:
          <ul className="list-disc list-inside ml-4 flex flex-col gap-2 mt-2">
            {[
              "Description seems to have been generated by AI (79% sure)",
              "The listing has been created a few minutes ago only",
            ].map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </p>
      </motion.div>

      {/* Conversation Analysis */}
      <motion.div
        className="rounded-2xl px-4 pt-4 bg-white"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold flex items-center gap-2">
          Conversation analysis
          <span className="text-orange-600">45/100</span>
        </h2>
        <p className="mt-4 text-gray-700">
          User seems to be legit, but his background shows potential issues:
          <ul className="list-disc list-inside ml-4 flex flex-col gap-2 mt-2">
            {[
              "No profile picture",
              "Name already taken too many times",
              "Scam alert in 2019",
            ].map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </p>
      </motion.div>

      {/* Questions Section */}
      <motion.div
        className="px-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="font-semibold text-base mb-4 pt-4">What I should ask?</h3>
        <div className="space-y-2">
          {[
            "Could you send me another picture?",
            "How do you want me to pay to you?",
            "Could you tell me more about you?",
          ].map((text, idx) => (
            <Button variant="outline" className="w-full" key={idx}>
              {text}
              <Plus className="w-4 h-4 ml-auto" />
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.p
        className="text-center text-gray-400 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        See more
      </motion.p>
    </motion.div>
  );
};

export default TrusteeListing;
