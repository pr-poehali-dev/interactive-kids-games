import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const Instructions = () => {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Инструкции</h2>
        <p className="text-muted-foreground">Всё, что нужно знать для создания увлекательных игр</p>
      </div>

      <Card className="p-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-semibold">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="Rocket" size={18} className="text-primary" />
                </div>
                Как начать создавать игру?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-3 pt-4">
              <p>Создание игры — это просто! Следуйте этим шагам:</p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Перейдите в раздел "Конструктор" через верхнее меню</li>
                <li>Выберите тип игры (викторина, пазл, раскраска или тест)</li>
                <li>Придумайте название для вашей игры</li>
                <li>Начните добавлять вопросы и задания</li>
                <li>Сохраните готовую игру</li>
              </ol>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-semibold">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="Image" size={18} className="text-primary" />
                </div>
                Как добавлять медиафайлы?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-3 pt-4">
              <p>Вы можете обогатить вопросы различными медиафайлами:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <Icon name="Image" size={16} className="mt-1 text-primary" />
                  <span><strong>Изображения:</strong> Поддерживаются форматы JPG, PNG, GIF</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Music" size={16} className="mt-1 text-primary" />
                  <span><strong>Аудио:</strong> Добавьте звуковые эффекты или голосовые вопросы (MP3, WAV)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Video" size={16} className="mt-1 text-primary" />
                  <span><strong>Видео:</strong> Встройте обучающие видеоролики (MP4, WebM)</span>
                </li>
              </ul>
              <p className="text-sm">Просто нажмите на соответствующую кнопку загрузки файла при создании вопроса.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-semibold">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="Palette" size={18} className="text-primary" />
                </div>
                Какие типы игр можно создавать?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-3 pt-4">
              <p>Платформа поддерживает 4 основных типа игр:</p>
              <div className="grid gap-3">
                <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <strong>Викторина</strong>
                    <p className="text-sm">Классический формат вопрос-ответ с несколькими вариантами</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <span className="text-2xl">🧩</span>
                  <div>
                    <strong>Пазл</strong>
                    <p className="text-sm">Интерактивные задания на сопоставление и сборку</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <span className="text-2xl">🎨</span>
                  <div>
                    <strong>Раскраска</strong>
                    <p className="text-sm">Творческие задания для развития мелкой моторики</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <span className="text-2xl">📝</span>
                  <div>
                    <strong>Тест</strong>
                    <p className="text-sm">Проверка знаний с подсчетом результатов</p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-semibold">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="Share2" size={18} className="text-primary" />
                </div>
                Как поделиться созданной игрой?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-3 pt-4">
              <p>После создания игры у вас есть несколько способов поделиться ей:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Получите уникальную ссылку на игру</li>
                <li>Отправьте приглашение по email</li>
                <li>Встройте игру на свой сайт через iframe</li>
                <li>Экспортируйте игру для офлайн-использования</li>
              </ul>
              <p className="text-sm">Все созданные игры хранятся в вашем личном кабинете в разделе "Мои упражнения".</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg font-semibold">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="HelpCircle" size={18} className="text-primary" />
                </div>
                Рекомендации по созданию эффективных игр
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-3 pt-4">
              <p>Следуйте этим рекомендациям для создания качественных образовательных игр:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="mt-1 text-green-600" />
                  <span>Делайте вопросы короткими и понятными для целевой аудитории</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="mt-1 text-green-600" />
                  <span>Используйте яркие и качественные изображения</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="mt-1 text-green-600" />
                  <span>Чередуйте легкие и сложные вопросы</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="mt-1 text-green-600" />
                  <span>Добавляйте элементы геймификации (баллы, награды)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="mt-1 text-green-600" />
                  <span>Тестируйте игру перед публикацией</span>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>

      <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
            <Icon name="Lightbulb" size={24} className="text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Нужна помощь?</h3>
            <p className="text-muted-foreground mb-3">
              Если у вас возникли вопросы или нужна дополнительная помощь, посетите раздел "Каталог" 
              для примеров готовых игр или обратитесь в нашу службу поддержки.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Instructions;
