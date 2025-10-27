import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Question {
  id: string;
  text: string;
  image?: File;
  audio?: File;
  video?: File;
  answers: string[];
  correctAnswer: number;
}

interface GamePreviewProps {
  open: boolean;
  onClose: () => void;
  gameName: string;
  gameType: string;
  questions: Question[];
}

const GamePreview = ({ open, onClose, gameName, gameType, questions }: GamePreviewProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer !== null && selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  const handleClose = () => {
    handleRestart();
    onClose();
  };

  const getGameTypeEmoji = () => {
    switch(gameType) {
      case 'quiz': return '🎯';
      case 'puzzle': return '🧩';
      case 'coloring': return '🎨';
      case 'test': return '📝';
      default: return '🎮';
    }
  };

  if (questions.length === 0) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Предпросмотр недоступен</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8 space-y-4">
            <div className="text-6xl">⚠️</div>
            <p className="text-muted-foreground">Добавьте хотя бы один вопрос для предпросмотра игры</p>
            <Button onClick={handleClose}>Закрыть</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <span className="text-3xl">{getGameTypeEmoji()}</span>
              {gameName}
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </DialogHeader>

        {!showResult ? (
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Вопрос {currentQuestionIndex + 1} из {questions.length}</span>
                <span>Правильных ответов: {score}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
              <h3 className="text-xl font-semibold mb-4">{currentQuestion.text}</h3>

              {currentQuestion.image && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg flex items-center gap-2">
                  <Icon name="Image" size={18} className="text-blue-600" />
                  <span className="text-sm text-blue-700">📷 Изображение прикреплено</span>
                </div>
              )}

              {currentQuestion.audio && (
                <div className="mb-4 p-3 bg-green-50 rounded-lg flex items-center gap-2">
                  <Icon name="Music" size={18} className="text-green-600" />
                  <span className="text-sm text-green-700">🎵 Аудио прикреплено</span>
                </div>
              )}

              {currentQuestion.video && (
                <div className="mb-4 p-3 bg-purple-50 rounded-lg flex items-center gap-2">
                  <Icon name="Video" size={18} className="text-purple-600" />
                  <span className="text-sm text-purple-700">🎬 Видео прикреплено</span>
                </div>
              )}
            </Card>

            <div className="space-y-3">
              <p className="font-medium text-sm text-muted-foreground">Выберите правильный ответ:</p>
              {currentQuestion.answers.map((answer, idx) => (
                answer.trim() && (
                  <Button
                    key={idx}
                    variant={selectedAnswer === idx ? 'default' : 'outline'}
                    className="w-full justify-start text-left h-auto py-4 px-6"
                    onClick={() => handleAnswerSelect(idx)}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold flex-shrink-0 ${
                        selectedAnswer === idx 
                          ? 'bg-primary-foreground text-primary' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="flex-1">{answer}</span>
                      {selectedAnswer === idx && <Icon name="Check" size={20} />}
                    </div>
                  </Button>
                )
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  if (currentQuestionIndex > 0) {
                    setCurrentQuestionIndex(currentQuestionIndex - 1);
                    setSelectedAnswer(null);
                  }
                }}
                disabled={currentQuestionIndex === 0}
                className="gap-2"
              >
                <Icon name="ChevronLeft" size={18} />
                Назад
              </Button>
              <Button
                onClick={handleNext}
                disabled={selectedAnswer === null}
                className="gap-2"
              >
                {currentQuestionIndex < questions.length - 1 ? 'Далее' : 'Завершить'}
                <Icon name="ChevronRight" size={18} />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 py-8 text-center animate-scale-in">
            <div className="space-y-2">
              <div className="text-6xl mb-4">
                {score === questions.length ? '🎉' : score >= questions.length / 2 ? '👏' : '💪'}
              </div>
              <h3 className="text-3xl font-bold">
                {score === questions.length ? 'Отлично!' : score >= questions.length / 2 ? 'Хорошо!' : 'Попробуйте ещё раз!'}
              </h3>
              <p className="text-xl text-muted-foreground">
                Правильных ответов: <span className="font-bold text-foreground">{score}</span> из {questions.length}
              </p>
            </div>

            <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 max-w-md mx-auto">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Результат:</span>
                  <span className="text-2xl font-bold">{Math.round((score / questions.length) * 100)}%</span>
                </div>
                <Progress value={(score / questions.length) * 100} className="h-3" />
              </div>
            </Card>

            <div className="flex gap-3 justify-center">
              <Button onClick={handleRestart} size="lg" className="gap-2">
                <Icon name="RotateCcw" size={20} />
                Пройти заново
              </Button>
              <Button onClick={handleClose} variant="outline" size="lg" className="gap-2">
                <Icon name="X" size={20} />
                Закрыть
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GamePreview;
