import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import QuizPage from "./pages/QuizPage";
import ScoreSummaryPage from "./pages/ScoreSummaryPage";
// import Navbar from './components/Navbar';import StartQuizPageimport StartQuizPage from './pages/StartQuizPage';
import QuizListPage from "./pages/QuizListPage";
import StartQuizPage from "./pages/StartQuizPage";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<StartQuizPage />} />
        <Route path="/quizzes" element={<QuizListPage />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
        <Route path="/score" element={<ScoreSummaryPage />} />
        <Route path="/quiz/:id" element={<StartQuizPage />} />
        <Route path="/quiz/:id/questions" element={<QuizPage />} />
      </Routes>
    </Router>
  );
}

export default App;
