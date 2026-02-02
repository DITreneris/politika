import { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Trophy, RefreshCw, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Progress } from '../utils/progress';
import modulesData from '../data/modules.json';
import CircularProgress from './CircularProgress';

interface QuizPageProps {
  onBack: () => void;
  progress: Progress;
  onQuizComplete: (score: number) => void;
}

export default function QuizPage({
  onBack,
  progress,
  onQuizComplete,
}: QuizPageProps) {
  // progress is available for showing completed modules count or quiz history
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const questions = modulesData.quiz.questions;

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct) {
        correct++;
      }
    });
    const finalScore = Math.round((correct / questions.length) * 100);
    setScore(finalScore);
    setShowResults(true);
    onQuizComplete(finalScore);

    if (finalScore >= 70) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  if (showResults) {
    const correctCount = questions.filter((q) => selectedAnswers[q.id] === q.correct).length;
    const passed = score >= 70;
    
    return (
      <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
        <div className="card p-8 md:p-12 text-center">
          {/* Result icon */}
          <div className="mb-6">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${
              passed 
                ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-lg shadow-emerald-500/30' 
                : 'bg-gradient-to-r from-orange-400 to-orange-500 shadow-lg shadow-orange-500/30'
            } animate-bounce-in`}>
              {passed ? (
                <Trophy className="w-12 h-12 text-white" />
              ) : (
                <XCircle className="w-12 h-12 text-white" />
              )}
            </div>
          </div>
          
          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {passed ? 'Puikiai! 🎉' : 'Bandykite dar kartą'}
          </h2>
          
          {/* Score */}
          <div className="my-8">
            <CircularProgress
              progress={score}
              size={120}
              strokeWidth={12}
            />
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Teisingai atsakyta: <span className="font-bold text-gray-900 dark:text-white">{correctCount}</span> iš {questions.length}
          </p>

          {/* Answers review */}
          <div className="space-y-4 mb-8 text-left">
            {questions.map((q) => {
              const isCorrect = selectedAnswers[q.id] === q.correct;
              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-xl border-2 ${
                    isCorrect 
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-700' 
                      : 'bg-rose-50 dark:bg-rose-900/20 border-rose-300 dark:border-rose-700'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                    )}
                    <p className="font-semibold text-gray-900 dark:text-white">{q.question}</p>
                  </div>
                  <div className="space-y-2 ml-8">
                    {q.options.map((option, idx) => (
                      <div
                        key={idx}
                        className={`text-sm p-3 rounded-lg ${
                          idx === q.correct
                            ? 'bg-emerald-200 dark:bg-emerald-800 font-semibold text-emerald-900 dark:text-emerald-100'
                            : idx === selectedAnswers[q.id] && idx !== q.correct
                            ? 'bg-rose-200 dark:bg-rose-800 text-rose-900 dark:text-rose-100'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {option}
                        {idx === q.correct && <span className="ml-2">✓</span>}
                        {idx === selectedAnswers[q.id] && idx !== q.correct && <span className="ml-2">✗</span>}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRestart}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Pradėti iš naujo
            </button>
            <button
              onClick={onBack}
              className="btn-primary flex items-center justify-center gap-2"
            >
              Grįžti į pradžią
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const hasAnswer = selectedAnswers[currentQ.id] !== undefined;
  const quizProgress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Atgal</span>
          </button>
          {progress.completedModules.length > 0 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Baigta modulių: {progress.completedModules.length}/3
            </span>
          )}
        </div>
        <div className="flex items-center gap-4 ml-auto">
          <CircularProgress
            progress={quizProgress}
            size={50}
            strokeWidth={5}
            showPercentage={false}
          />
          <div className="text-right">
            <p className="text-xs text-gray-500 dark:text-gray-400">Klausimas</p>
            <p className="text-lg font-bold text-brand-600 dark:text-brand-400">
              {currentQuestion + 1}/{questions.length}
            </p>
          </div>
        </div>
      </div>

      {/* Question card */}
      <div className="card p-6 md:p-8">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-brand-500 to-accent-500 h-2.5 rounded-full transition-all duration-500 ease-out relative"
              style={{ width: `${quizProgress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>
        
        {/* Question */}
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          {currentQ.question}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedAnswers[currentQ.id] === idx;
            return (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(currentQ.id, idx)}
                className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                  isSelected
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 shadow-lg scale-[1.02]'
                    : 'border-gray-200 dark:border-gray-700 hover:border-brand-300 dark:hover:border-brand-700 hover:bg-brand-50/50 dark:hover:bg-brand-900/10 bg-white dark:bg-gray-800'
                } focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2`}
                aria-label={`Pasirinkti atsakymą: ${option}`}
                aria-pressed={isSelected}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-brand-500 bg-brand-500'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-3 h-3 rounded-full bg-white animate-scale-in" />
                    )}
                  </div>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Ankstesnis klausimas"
          >
            Atgal
          </button>
          
          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={!hasAnswer}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              aria-label="Baigti apklausą"
            >
              Baigti apklausą
              <CheckCircle className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              disabled={!hasAnswer}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              aria-label="Kitas klausimas"
            >
              Kitas
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
