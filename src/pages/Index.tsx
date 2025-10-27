import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import GameConstructor from '@/components/GameConstructor';
import GameCatalog from '@/components/GameCatalog';
import Profile from '@/components/Profile';
import Instructions from '@/components/Instructions';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 via-background to-accent/20">
      <nav className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-2xl">🎮</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              EduPlay
            </h1>
          </div>
          
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant={activeTab === 'home' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('home')}
              className="gap-2"
            >
              <Icon name="Home" size={18} />
              Главная
            </Button>
            <Button
              variant={activeTab === 'constructor' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('constructor')}
              className="gap-2"
            >
              <Icon name="Puzzle" size={18} />
              Конструктор
            </Button>
            <Button
              variant={activeTab === 'catalog' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('catalog')}
              className="gap-2"
            >
              <Icon name="Library" size={18} />
              Каталог
            </Button>
            <Button
              variant={activeTab === 'profile' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('profile')}
              className="gap-2"
            >
              <Icon name="User" size={18} />
              Мои упражнения
            </Button>
            <Button
              variant={activeTab === 'instructions' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('instructions')}
              className="gap-2"
            >
              <Icon name="BookOpen" size={18} />
              Инструкции
            </Button>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="space-y-8 animate-fade-in">
            <section className="text-center space-y-4 py-12">
              <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-slide-up">
                Создавайте интерактивные игры
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{animationDelay: '0.1s'}}>
                Образовательная платформа для создания увлекательных игр и упражнений для дошкольников и школьников
              </p>
              <div className="flex gap-4 justify-center pt-4 animate-slide-up" style={{animationDelay: '0.2s'}}>
                <Button size="lg" onClick={() => setActiveTab('constructor')} className="gap-2">
                  <Icon name="Sparkles" size={20} />
                  Создать игру
                </Button>
                <Button size="lg" variant="outline" onClick={() => setActiveTab('catalog')} className="gap-2">
                  <Icon name="Search" size={20} />
                  Посмотреть примеры
                </Button>
              </div>
            </section>

            <section className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: 'Image',
                  title: 'Мультимедиа',
                  description: 'Добавляйте фото, видео и аудио к вашим вопросам',
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  icon: 'Palette',
                  title: 'Кастомизация',
                  description: 'Настраивайте фон и музыкальное сопровождение',
                  color: 'from-purple-500 to-pink-500'
                },
                {
                  icon: 'Zap',
                  title: 'Интерактивность',
                  description: 'Создавайте увлекательные игры разных форматов',
                  color: 'from-orange-500 to-red-500'
                }
              ].map((feature, idx) => (
                <Card 
                  key={idx} 
                  className="p-6 space-y-3 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in border-2"
                  style={{animationDelay: `${idx * 0.1}s`}}
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                    <Icon name={feature.icon as any} size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </section>

            <section className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 md:p-12 space-y-6">
              <div className="text-center space-y-3">
                <h3 className="text-3xl font-bold">Готовые шаблоны</h3>
                <p className="text-muted-foreground">Выберите из библиотеки готовых игр или создайте свою уникальную</p>
              </div>
              
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { emoji: '🎯', name: 'Викторина', count: '12' },
                  { emoji: '🧩', name: 'Пазлы', count: '8' },
                  { emoji: '🎨', name: 'Раскраски', count: '15' },
                  { emoji: '📝', name: 'Тесты', count: '20' }
                ].map((template, idx) => (
                  <Card 
                    key={idx} 
                    className="p-6 text-center space-y-2 hover:shadow-md transition-all cursor-pointer hover:scale-105"
                  >
                    <div className="text-4xl">{template.emoji}</div>
                    <h4 className="font-semibold">{template.name}</h4>
                    <p className="text-sm text-muted-foreground">{template.count} шаблонов</p>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'constructor' && <GameConstructor />}
        {activeTab === 'catalog' && <GameCatalog />}
        {activeTab === 'profile' && <Profile />}
        {activeTab === 'instructions' && <Instructions />}
      </main>

      <footer className="border-t mt-16 py-8 bg-background/80">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 EduPlay. Образовательная платформа для создания интерактивных игр</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
