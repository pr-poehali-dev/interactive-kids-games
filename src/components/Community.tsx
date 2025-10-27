import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Community = () => {
  const { toast } = useToast();
  const [newPost, setNewPost] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const discussions = [
    {
      id: 1,
      author: 'Анна Иванова',
      role: 'Учитель математики',
      avatar: 'АИ',
      title: 'Как мотивировать детей проходить викторины?',
      content: 'Поделитесь опытом, какие механики вы используете для повышения интереса учеников к образовательным играм?',
      likes: 24,
      comments: 12,
      time: '2 часа назад',
      tags: ['викторины', 'мотивация']
    },
    {
      id: 2,
      author: 'Дмитрий Соколов',
      role: 'Преподаватель истории',
      avatar: 'ДС',
      title: 'Делюсь игрой "История России"',
      content: 'Создал игру с хронологической линейкой по основным событиям XX века. Готов поделиться и обсудить улучшения!',
      likes: 45,
      comments: 28,
      time: '5 часов назад',
      tags: ['история', 'обмен']
    },
    {
      id: 3,
      author: 'Елена Смирнова',
      role: 'Учитель английского',
      avatar: 'ЕС',
      title: 'Советы по созданию игр для изучения слов',
      content: 'Какие типы игр лучше всего работают для запоминания новой лексики? Пробовала "Найди пару" и "Найди слово".',
      likes: 31,
      comments: 18,
      time: 'вчера',
      tags: ['английский', 'советы']
    }
  ];

  const sharedGames = [
    {
      id: 1,
      title: 'Математика 1 класс',
      author: 'Ольга Петрова',
      type: 'Викторина',
      emoji: '🎯',
      downloads: 156,
      rating: 4.8
    },
    {
      id: 2,
      title: 'Страны и столицы',
      author: 'Игорь Васильев',
      type: 'Найти пару',
      emoji: '🎴',
      downloads: 203,
      rating: 4.9
    },
    {
      id: 3,
      title: 'Великие события',
      author: 'Дмитрий Соколов',
      type: 'Хронологическая линейка',
      emoji: '📅',
      downloads: 89,
      rating: 4.7
    },
    {
      id: 4,
      title: 'Животные Африки',
      author: 'Мария Новикова',
      type: 'Тест',
      emoji: '📝',
      downloads: 134,
      rating: 4.6
    }
  ];

  const handlePostSubmit = () => {
    if (!newPost.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Введите текст сообщения',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Опубликовано!',
      description: 'Ваше сообщение добавлено в обсуждения'
    });
    setNewPost('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Сообщество</h2>
          <p className="text-muted-foreground">Общайтесь с коллегами и делитесь опытом</p>
        </div>
      </div>

      <Tabs defaultValue="discussions" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="discussions" className="gap-2">
            <Icon name="MessageCircle" size={16} />
            Обсуждения
          </TabsTrigger>
          <TabsTrigger value="shared" className="gap-2">
            <Icon name="Share2" size={16} />
            Общие игры
          </TabsTrigger>
        </TabsList>

        <TabsContent value="discussions" className="space-y-6">
          <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5">
            <h3 className="text-lg font-semibold mb-4">Создать новое обсуждение</h3>
            <div className="space-y-4">
              <Input
                placeholder="Заголовок обсуждения..."
                className="text-base"
              />
              <Textarea
                placeholder="Что вы хотите обсудить с коллегами?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                rows={4}
              />
              <div className="flex gap-2">
                <Button onClick={handlePostSubmit} className="gap-2">
                  <Icon name="Send" size={18} />
                  Опубликовать
                </Button>
                <Button variant="outline" className="gap-2">
                  <Icon name="Paperclip" size={18} />
                  Прикрепить игру
                </Button>
              </div>
            </div>
          </Card>

          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-3 text-muted-foreground" />
            <Input
              placeholder="Поиск по обсуждениям..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-4">
            {discussions.map((discussion, idx) => (
              <Card 
                key={discussion.id} 
                className="p-6 hover:shadow-md transition-all animate-slide-up cursor-pointer"
                style={{animationDelay: `${idx * 0.1}s`}}
              >
                <div className="flex gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {discussion.avatar}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{discussion.author}</h4>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{discussion.role}</span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{discussion.time}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{discussion.title}</h3>
                      <p className="text-muted-foreground">{discussion.content}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {discussion.tags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <button className="flex items-center gap-1 hover:text-primary transition-colors">
                          <Icon name="ThumbsUp" size={16} />
                          {discussion.likes}
                        </button>
                        <button className="flex items-center gap-1 hover:text-primary transition-colors">
                          <Icon name="MessageCircle" size={16} />
                          {discussion.comments}
                        </button>
                        <button className="flex items-center gap-1 hover:text-primary transition-colors">
                          <Icon name="Share2" size={16} />
                          Поделиться
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-8 text-center bg-gradient-to-br from-primary/5 to-accent/5">
            <Icon name="Users" size={48} className="mx-auto mb-3 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Присоединяйтесь к обсуждениям!</h3>
            <p className="text-muted-foreground mb-4">
              Задавайте вопросы, делитесь опытом и находите вдохновение в работах коллег
            </p>
            <Button className="gap-2">
              <Icon name="Plus" size={18} />
              Создать обсуждение
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="shared" className="space-y-6">
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-3 text-muted-foreground" />
            <Input
              placeholder="Поиск игр от коллег..."
              className="pl-10"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {sharedGames.map((game, idx) => (
              <Card 
                key={game.id} 
                className="p-6 hover:shadow-lg transition-all animate-scale-in"
                style={{animationDelay: `${idx * 0.05}s`}}
              >
                <div className="flex gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-3xl flex-shrink-0">
                    {game.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold mb-1 truncate">{game.title}</h3>
                    <p className="text-sm text-muted-foreground">{game.author}</p>
                    <Badge variant="outline" className="mt-1">{game.type}</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Icon name="Star" size={16} fill="currentColor" />
                    <span className="font-semibold">{game.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <Icon name="Download" size={16} />
                    <span>{game.downloads} скачиваний</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 gap-2">
                    <Icon name="Download" size={16} />
                    Скачать
                  </Button>
                  <Button variant="outline" size="icon">
                    <Icon name="Eye" size={18} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-8 text-center bg-gradient-to-br from-accent/5 to-primary/5">
            <Icon name="Gift" size={48} className="mx-auto mb-3 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Поделитесь своими играми</h3>
            <p className="text-muted-foreground mb-4">
              Помогите коллегам и получите признание за ваш труд
            </p>
            <Button className="gap-2">
              <Icon name="Upload" size={18} />
              Опубликовать игру
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Community;
