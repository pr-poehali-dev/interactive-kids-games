import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import ShareDialog from './ShareDialog';

const GameCatalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<{id: number, title: string} | null>(null);

  const games = [
    {
      id: 1,
      title: 'Математическая викторина',
      type: 'Викторина',
      emoji: '🎯',
      questions: 15,
      difficulty: 'Легкий',
      category: 'Математика',
      description: 'Веселая викторина с задачами на сложение и вычитание для начальной школы'
    },
    {
      id: 2,
      title: 'История России',
      type: 'Миллионер',
      emoji: '💰',
      questions: 15,
      difficulty: 'Сложный',
      category: 'История',
      description: 'Пройди путь к миллиону, отвечая на вопросы по истории России'
    },
    {
      id: 3,
      title: 'Найди животных',
      type: 'Найди слово',
      emoji: '🔤',
      questions: 12,
      difficulty: 'Легкий',
      category: 'Природа',
      description: 'Ищи названия животных в сетке букв и развивай внимательность'
    },
    {
      id: 4,
      title: 'Столицы и страны',
      type: 'Найти пару',
      emoji: '🎴',
      questions: 20,
      difficulty: 'Средний',
      category: 'География',
      description: 'Сопоставь столицы с их странами в этой увлекательной игре'
    },
    {
      id: 5,
      title: 'События XX века',
      type: 'Хронологическая линейка',
      emoji: '📅',
      questions: 10,
      difficulty: 'Сложный',
      category: 'История',
      description: 'Расставь исторические события в правильном хронологическом порядке'
    },
    {
      id: 6,
      title: 'Животные мира',
      type: 'Пазл',
      emoji: '🧩',
      questions: 20,
      difficulty: 'Средний',
      category: 'Природа',
      description: 'Собери пазлы с изображениями различных животных и узнай интересные факты'
    },
    {
      id: 7,
      title: 'Раскраска букв',
      type: 'Раскраска',
      emoji: '🎨',
      questions: 33,
      difficulty: 'Легкий',
      category: 'Русский язык',
      description: 'Учим алфавит через раскрашивание букв и ассоциативные образы'
    },
    {
      id: 8,
      title: 'География России',
      type: 'Тест',
      emoji: '📝',
      questions: 25,
      difficulty: 'Сложный',
      category: 'География',
      description: 'Проверь свои знания о городах, реках и достопримечательностях России'
    },
    {
      id: 9,
      title: 'Английские слова',
      type: 'Викторина',
      emoji: '🎯',
      questions: 30,
      difficulty: 'Средний',
      category: 'Английский',
      description: 'Интерактивная викторина для запоминания базовых английских слов'
    }
  ];

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Легкий': return 'bg-green-100 text-green-700';
      case 'Средний': return 'bg-yellow-100 text-yellow-700';
      case 'Сложный': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <div>
          <h2 className="text-3xl font-bold">Каталог игр</h2>
          <p className="text-muted-foreground">Выберите готовый шаблон или используйте как вдохновение</p>
        </div>

        <div className="relative max-w-md">
          <Icon name="Search" size={18} className="absolute left-3 top-3 text-muted-foreground" />
          <Input
            placeholder="Поиск по названию или категории..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map((game, idx) => (
          <Card 
            key={game.id} 
            className="p-6 space-y-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in"
            style={{animationDelay: `${idx * 0.05}s`}}
          >
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-3xl">
                {game.emoji}
              </div>
              <Badge variant="outline">{game.type}</Badge>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{game.title}</h3>
              <p className="text-sm text-muted-foreground">{game.description}</p>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Badge className={getDifficultyColor(game.difficulty)}>
                {game.difficulty}
              </Badge>
              <Badge variant="secondary">
                <Icon name="Book" size={12} className="mr-1" />
                {game.category}
              </Badge>
              <Badge variant="secondary">
                <Icon name="HelpCircle" size={12} className="mr-1" />
                {game.questions} вопросов
              </Badge>
            </div>

            <div className="flex gap-2 pt-2">
              <Button className="flex-1 gap-2">
                <Icon name="Play" size={16} />
                Открыть
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => {
                  setSelectedGame({id: game.id, title: game.title});
                  setShareDialogOpen(true);
                }}
              >
                <Icon name="Share2" size={16} />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
          <p className="text-muted-foreground">Попробуйте изменить поисковый запрос</p>
        </div>
      )}

      {selectedGame && (
        <ShareDialog
          open={shareDialogOpen}
          onClose={() => {
            setShareDialogOpen(false);
            setSelectedGame(null);
          }}
          gameTitle={selectedGame.title}
          gameId={selectedGame.id}
        />
      )}
    </div>
  );
};

export default GameCatalog;