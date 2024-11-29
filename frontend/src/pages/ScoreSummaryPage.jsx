import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ScoreSummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, answers } = location.state;
  const [score, setScore] = useState(null);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const submitQuiz = async () => {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/quizzes/${id}/submit`,
          { answers }
        );
        const totalQuestions = answers.length;
        const userScore = response.data.score;
        setScore(userScore);
        setPercentage((userScore / totalQuestions) * 100);
      } catch (error) {
        console.error('Error submitting quiz:', error);
      }
    };

    submitQuiz();
  }, [id, answers]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="w-11/12 max-w-lg bg-white rounded-lg shadow-lg overflow-hidden p-6 md:p-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          🎉 Quiz Completed! 🎉
        </h1>
        {score !== null ? (
          <div className="text-center">
            <p className="text-xl md:text-2xl font-bold text-gray-700 mb-4">
              Your Score: <span className="text-green-500">{score}</span>
            </p>
            <div className="relative w-full bg-gray-300 rounded-full h-6 mb-4">
              <div
                className="absolute left-0 top-0 h-6 rounded-full bg-gradient-to-r from-green-400 to-green-600"
                style={{
                  width: `${percentage}%`,
                  transition: 'width 1s ease-in-out',
                }}
              ></div>
            </div>
            <p className="text-lg text-gray-700">
              Score Percentage: <span className="font-semibold">{percentage.toFixed(2)}%</span>
            </p>
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => navigate('/')}
                className="py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all shadow-md"
              >
                Back to Quizzes
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-2xl font-bold text-white">Loading your score...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreSummaryPage;
