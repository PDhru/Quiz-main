import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:5000/api/quizzes/${id}`);
        setQuiz(response.data);
        setAnswers(new Array(response.data.questions.length).fill(''));
      } catch (error) {
        console.error('Error fetching quiz:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleAnswerChange = (e) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (!answers[currentQuestionIndex]) {
      alert('Please select an answer before proceeding!');
      return;
    }
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate('/score', { state: { id, answers } });
    }
  };

  if (isLoading || !quiz) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="w-16 h-16 relative">
          <div className="w-full h-full border-4 border-violet-500/30 rounded-full animate-spin border-t-violet-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] py-10 px-4 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-3xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20"
        >
          {/* Progress bar */}
          <div className="w-full h-2 bg-gray-800">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
              className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
            />
          </div>

          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">{quiz.title}</h2>
              <span className="px-4 py-2 bg-white/5 text-white rounded-full font-semibold border border-white/10">
                {currentQuestionIndex + 1}/{quiz.questions.length}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="mb-8"
              >
                <h3 className="text-2xl font-semibold text-white mb-6">
                  {quiz.questions[currentQuestionIndex].questionText}
                </h3>

                <div className="space-y-4">
                  {quiz.questions[currentQuestionIndex].choices.map((choice, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`border rounded-xl p-4 cursor-pointer transition-all duration-300
                        ${answers[currentQuestionIndex] === choice
                          ? 'border-violet-500 bg-violet-500/20'
                          : 'border-white/10 hover:border-violet-500/50 hover:bg-white/5'}`}
                    >
                      <label className="flex items-center cursor-pointer w-full">
                        <input
                          type="radio"
                          name={`question-${currentQuestionIndex}`}
                          value={choice}
                          checked={answers[currentQuestionIndex] === choice}
                          onChange={handleAnswerChange}
                          className="form-radio h-5 w-5 text-violet-500 border-white/30"
                        />
                        <span className="ml-3 text-lg text-white">{choice}</span>
                      </label>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNextQuestion}
              className="w-full py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl text-lg font-semibold hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {currentQuestionIndex < quiz.questions.length - 1 ? (
                <>
                  Next Question
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              ) : (
                'Submit Quiz'
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizPage;
