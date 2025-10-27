import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import ShareDialog from './ShareDialog';

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<{id: number, title: string} | null>(null);
  const [profileData, setProfileData] = useState({
    name: 'Мария Петрова',
    role: 'Учитель начальных классов',
    school: 'Гимназия №5',
    bio: 'Создаю интерактивные игры для обучения детей математике и чтению',
    email: 'maria.petrova@example.com',
    city: 'Москва'
  });

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

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: 'Профиль обновлён',
      description: 'Ваши данные успешно сохранены'
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Личный кабинет</h2>
          <p className="text-muted-foreground">Управляйте своим профилем и играми</p>
        </div>
      </div>

      <Tabs defaultValue="games" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="games" className="gap-2">
            <Icon name="Gamepad2" size={16} />
            Мои игры
          </TabsTrigger>
          <TabsTrigger value="profile" className="gap-2">
            <Icon name="User" size={16} />
            Профиль
          </TabsTrigger>
        </TabsList>

        <TabsContent value="games" className="space-y-6">
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
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => {
                        setSelectedGame({id: game.id, title: game.title});
                        setShareDialogOpen(true);
                      }}
                    >
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
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-start gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src="" />
                <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-6">
                {!isEditing ? (
                  <>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-2xl font-bold mb-1">{profileData.name}</h3>
                        <p className="text-muted-foreground">{profileData.role}</p>
                      </div>
                      <Button onClick={() => setIsEditing(true)} className="gap-2">
                        <Icon name="Edit" size={18} />
                        Редактировать
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Icon name="School" size={16} />
                          <span className="font-medium">Учебное заведение:</span>
                        </div>
                        <p>{profileData.school}</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Icon name="MapPin" size={16} />
                          <span className="font-medium">Город:</span>
                        </div>
                        <p>{profileData.city}</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Icon name="Mail" size={16} />
                          <span className="font-medium">Email:</span>
                        </div>
                        <p>{profileData.email}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="FileText" size={16} />
                        <span className="font-medium">О себе:</span>
                      </div>
                      <p className="text-muted-foreground">{profileData.bio}</p>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Полное имя</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="role">Должность</Label>
                        <Input
                          id="role"
                          value={profileData.role}
                          onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="school">Учебное заведение</Label>
                        <Input
                          id="school"
                          value={profileData.school}
                          onChange={(e) => setProfileData({ ...profileData, school: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="city">Город</Label>
                        <Input
                          id="city"
                          value={profileData.city}
                          onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">О себе</Label>
                      <Textarea
                        id="bio"
                        rows={4}
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={handleSaveProfile} className="gap-2">
                        <Icon name="Save" size={18} />
                        Сохранить
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Отмена
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="Trophy" size={24} className="text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Достижения</h4>
                <div className="flex gap-2 flex-wrap">
                  <Badge className="gap-1">
                    <Icon name="Star" size={12} />
                    Первая игра
                  </Badge>
                  <Badge className="gap-1">
                    <Icon name="Zap" size={12} />
                    10 запусков
                  </Badge>
                  <Badge className="gap-1">
                    <Icon name="Heart" size={12} />
                    Популярный создатель
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

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

export default Profile;