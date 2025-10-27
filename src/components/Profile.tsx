import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Profile = () => {
  const myGames = [
    {
      id: 1,
      title: 'Моя первая викторина',
      type: 'Викторина',
      questions: 10,
      created: '15.01.2024',
      plays: 45,
      emoji: '🎯'
    },
    {
      id: 2,
      title: 'Учим цвета',
      type: 'Раскраска',
      questions: 8,
      created: '12.01.2024',
      plays: 28,
      emoji: '🎨'
    },
    {
      id: 3,
      title: 'Тест по истории',
      type: 'Тест',
      questions: 15,
      created: '10.01.2024',
      plays: 67,
      emoji: '📝'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Мои упражнения</h2>
          <p className="text-muted-foreground">Все созданные вами игры и упражнения</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 text-center space-y-2 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="text-3xl font-bold text-primary">{myGames.length}</div>
          <p className="text-sm text-muted-foreground">Всего игр</p>
        </Card>
        <Card className="p-6 text-center space-y-2 bg-gradient-to-br from-accent/10 to-accent/5">
          <div className="text-3xl font-bold text-accent-foreground">
            {myGames.reduce((sum, game) => sum + game.plays, 0)}
          </div>
          <p className="text-sm text-muted-foreground">Всего запусков</p>
        </Card>
        <Card className="p-6 text-center space-y-2 bg-gradient-to-br from-secondary/20 to-secondary/10">
          <div className="text-3xl font-bold text-secondary-foreground">
            {myGames.reduce((sum, game) => sum + game.questions, 0)}
          </div>
          <p className="text-sm text-muted-foreground">Всего вопросов</p>
        </Card>
      </div>

      <div className="space-y-4">
        {myGames.map((game, idx) => (
          <Card 
            key={game.id} 
            className="p-6 hover:shadow-md transition-all animate-slide-up"
            style={{animationDelay: `${idx * 0.1}s`}}
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-3xl flex-shrink-0">
                {game.emoji}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold truncate">{game.title}</h3>
                  <Badge variant="outline">{game.type}</Badge>
                </div>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Icon name="HelpCircle" size={14} />
                    {game.questions} вопросов
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Calendar" size={14} />
                    {game.created}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Play" size={14} />
                    {game.plays} запусков
                  </span>
                </div>
              </div>

              <div className="flex gap-2 flex-shrink-0">
                <Button variant="outline" size="icon">
                  <Icon name="Edit" size={18} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Share2" size={18} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Trash2" size={18} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {myGames.length === 0 && (
        <Card className="p-12 text-center space-y-4">
          <div className="text-6xl">📦</div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Пока нет созданных игр</h3>
            <p className="text-muted-foreground mb-4">Начните создавать свои первые образовательные игры</p>
            <Button className="gap-2">
              <Icon name="Plus" size={18} />
              Создать первую игру
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Profile;
