import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import GamePreview from './GamePreview';

interface Question {
  id: string;
  text: string;
  image?: File;
  audio?: File;
  video?: File;
  answers: string[];
  correctAnswer: number;
}

const GameConstructor = () => {
  const { toast } = useToast();
  const [gameType, setGameType] = useState<string>('quiz');
  const [gameName, setGameName] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    id: Date.now().toString(),
    text: '',
    answers: ['', '', '', ''],
    correctAnswer: 0
  });
  const [showPreview, setShowPreview] = useState(false);

  const handleAddQuestion = () => {
    if (!currentQuestion.text.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Введите текст вопроса',
        variant: 'destructive'
      });
      return;
    }

    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({
      id: Date.now().toString(),
      text: '',
      answers: ['', '', '', ''],
      correctAnswer: 0
    });

    toast({
      title: 'Вопрос добавлен!',
      description: `Всего вопросов: ${questions.length + 1}`
    });
  };

  const handleFileUpload = (type: 'image' | 'audio' | 'video', file: File) => {
    setCurrentQuestion({
      ...currentQuestion,
      [type]: file
    });
    toast({
      title: 'Файл загружен',
      description: file.name
    });
  };

  const handleSaveGame = () => {
    if (!gameName.trim() || questions.length === 0) {
      toast({
        title: 'Ошибка',
        description: 'Заполните название и добавьте хотя бы один вопрос',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Игра сохранена!',
      description: `${gameName} с ${questions.length} вопросами`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Конструктор игр</h2>
          <p className="text-muted-foreground">Создайте свою уникальную образовательную игру</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => setShowPreview(true)} 
            size="lg" 
            variant="outline" 
            className="gap-2"
            disabled={questions.length === 0}
          >
            <Icon name="Eye" size={20} />
            Предпросмотр
          </Button>
          <Button onClick={handleSaveGame} size="lg" className="gap-2">
            <Icon name="Save" size={20} />
            Сохранить игру
          </Button>
        </div>
      </div>

      <Card className="p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="gameName">Название игры</Label>
            <Input
              id="gameName"
              placeholder="Например: Математическая викторина"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gameType">Тип игры</Label>
            <Select value={gameType} onValueChange={setGameType}>
              <SelectTrigger id="gameType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quiz">🎯 Викторина</SelectItem>
                <SelectItem value="millionaire">💰 Кто хочет стать миллионером</SelectItem>
                <SelectItem value="word-search">🔤 Найди слово</SelectItem>
                <SelectItem value="pairs">🎴 Найти пару</SelectItem>
                <SelectItem value="timeline">📅 Хронологическая линейка</SelectItem>
                <SelectItem value="puzzle">🧩 Пазл</SelectItem>
                <SelectItem value="coloring">🎨 Раскраска</SelectItem>
                <SelectItem value="test">📝 Тест</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Добавить вопрос</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="questionText">Текст вопроса</Label>
              <Textarea
                id="questionText"
                placeholder="Введите ваш вопрос..."
                value={currentQuestion.text}
                onChange={(e) => setCurrentQuestion({ ...currentQuestion, text: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Изображение</Label>
                <div className="relative">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload('image', e.target.files[0])}
                    className="cursor-pointer"
                  />
                  <Icon name="Image" size={18} className="absolute right-3 top-3 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Аудио</Label>
                <div className="relative">
                  <Input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload('audio', e.target.files[0])}
                    className="cursor-pointer"
                  />
                  <Icon name="Music" size={18} className="absolute right-3 top-3 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Видео</Label>
                <div className="relative">
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload('video', e.target.files[0])}
                    className="cursor-pointer"
                  />
                  <Icon name="Video" size={18} className="absolute right-3 top-3 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Варианты ответов</Label>
              {currentQuestion.answers.map((answer, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    placeholder={`Вариант ${idx + 1}`}
                    value={answer}
                    onChange={(e) => {
                      const newAnswers = [...currentQuestion.answers];
                      newAnswers[idx] = e.target.value;
                      setCurrentQuestion({ ...currentQuestion, answers: newAnswers });
                    }}
                  />
                  <Button
                    variant={currentQuestion.correctAnswer === idx ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setCurrentQuestion({ ...currentQuestion, correctAnswer: idx })}
                  >
                    <Icon name="Check" size={18} />
                  </Button>
                </div>
              ))}
            </div>

            <Button onClick={handleAddQuestion} className="w-full gap-2">
              <Icon name="Plus" size={18} />
              Добавить вопрос
            </Button>
          </div>
        </div>
      </Card>

      {questions.length > 0 && (
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Добавленные вопросы ({questions.length})</h3>
          <div className="space-y-3">
            {questions.map((q, idx) => (
              <div key={q.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{q.text}</p>
                  <div className="flex gap-2 mt-1">
                    {q.image && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">📷 Фото</span>}
                    {q.audio && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">🎵 Аудио</span>}
                    {q.video && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">🎬 Видео</span>}
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Icon name="Trash2" size={18} />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      <GamePreview
        open={showPreview}
        onClose={() => setShowPreview(false)}
        gameName={gameName || 'Моя игра'}
        gameType={gameType}
        questions={questions}
      />
    </div>
  );
};

export default GameConstructor;