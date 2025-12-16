import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoHubot } from "react-icons/go";
import { motion } from "framer-motion";

const Intro = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const words = [
    "Legal Advice",
    "Court Procedures",
    "Case Laws",
    "Rights Protection",
    "Law Guidance",
  ];

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;

    const typingInterval = setTimeout(() => {
      if (!isDeleting && charIndex < words[currentIndex].length) {
        setText(words[currentIndex].slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (!isDeleting && charIndex === words[currentIndex].length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && charIndex > 0) {
        setText(words[currentIndex].slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        setIsDeleting(false);
        setCurrentIndex((currentIndex + 1) % words.length);
        setCharIndex(0);
      }
    }, typingSpeed);

    return () => clearTimeout(typingInterval);
  }, [charIndex, currentIndex, isDeleting, text]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-violet-600 to-blue-900 relative"
    >
      {/* Top Right Buttons */}
      <div className="absolute top-4 right-6 flex space-x-4">
        <motion.button
          onClick={() => navigate("/login")}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="px-4 py-2 bg-white text-blue-900 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition"
        >
          Log In
        </motion.button>
        <motion.button
          onClick={() => navigate("/signup")}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="px-4 py-2 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition"
        >
          Sign Up
        </motion.button>
      </div>

      {/* Center Content */}
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
        className="flex items-center justify-center bg-white rounded-full p-4 mb-6 shadow-lg"
      >
        <GoHubot className="text-6xl text-blue-900" />
      </motion.div>
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="font-extrabold text-5xl text-white mb-8"
      >
        Judicial Chat Bot
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-2xl text-gray-300 italic mb-6 min-h-[36px]"
      >
        {text}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="text-lg text-gray-200 max-w-lg text-center"
      >
        Your personal AI-powered legal assistant, offering expert guidance on
        various judicial matters. Whether you need help understanding legal
        processes, seeking court procedures, or protecting your rights, our
        chatbot provides real-time assistance. Empower yourself with instant
        responses and stay informed about the law effortlessly!
      </motion.p>
    </motion.div>
  );
};

export default Intro;
