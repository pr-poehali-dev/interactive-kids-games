import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface ShareDialogProps {
  open: boolean;
  onClose: () => void;
  gameTitle: string;
  gameId: number;
}

const ShareDialog = ({ open, onClose, gameTitle, gameId }: ShareDialogProps) => {
  const { toast } = useToast();
  const gameUrl = `https://eduplay.app/game/${gameId}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(gameUrl)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(gameUrl);
    toast({
      title: 'Ссылка скопирована!',
      description: 'Ссылка на игру скопирована в буфер обмена'
    });
  };

  const handleCopyEmbed = () => {
    const embedCode = `<iframe src="${gameUrl}" width="800" height="600" frameborder="0"></iframe>`;
    navigator.clipboard.writeText(embedCode);
    toast({
      title: 'Код скопирован!',
      description: 'HTML-код для встраивания скопирован'
    });
  };

  const handleDownloadQR = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `qr-${gameTitle}.png`;
    link.click();
    toast({
      title: 'QR-код загружен',
      description: 'Файл сохранён на ваше устройство'
    });
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent(`Поделюсь игрой: ${gameTitle}`);
    const body = encodeURIComponent(`Привет! Хочу поделиться образовательной игрой "${gameTitle}". \n\nСсылка: ${gameUrl}\n\nСоздано на платформе EduPlay`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Образовательная игра "${gameTitle}": ${gameUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleShareTelegram = () => {
    const text = encodeURIComponent(`Образовательная игра "${gameTitle}"`);
    window.open(`https://t.me/share/url?url=${encodeURIComponent(gameUrl)}&text=${text}`, '_blank');
  };

  const handleShareVK = () => {
    window.open(`https://vk.com/share.php?url=${encodeURIComponent(gameUrl)}&title=${encodeURIComponent(gameTitle)}`, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Icon name="Share2" size={24} className="text-primary" />
            Поделиться игрой
          </DialogTitle>
          <p className="text-muted-foreground">"{gameTitle}"</p>
        </DialogHeader>

        <Tabs defaultValue="link" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="link" className="gap-1">
              <Icon name="Link" size={14} />
              Ссылка
            </TabsTrigger>
            <TabsTrigger value="qr" className="gap-1">
              <Icon name="QrCode" size={14} />
              QR-код
            </TabsTrigger>
            <TabsTrigger value="social" className="gap-1">
              <Icon name="Share2" size={14} />
              Соцсети
            </TabsTrigger>
            <TabsTrigger value="embed" className="gap-1">
              <Icon name="Code" size={14} />
              Встроить
            </TabsTrigger>
          </TabsList>

          <TabsContent value="link" className="space-y-4">
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Icon name="Link" size={18} className="text-primary" />
                    Прямая ссылка на игру
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Поделитесь ссылкой с учениками или коллегами
                  </p>
                  <div className="flex gap-2">
                    <Input 
                      value={gameUrl} 
                      readOnly 
                      className="font-mono text-sm"
                    />
                    <Button onClick={handleCopyLink} className="gap-2 flex-shrink-0">
                      <Icon name="Copy" size={16} />
                      Копировать
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <Button variant="outline" onClick={handleShareEmail} className="gap-2 justify-start">
                    <Icon name="Mail" size={18} />
                    Отправить по Email
                  </Button>
                  <Button variant="outline" className="gap-2 justify-start">
                    <Icon name="Download" size={18} />
                    Создать PDF с ссылкой
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-primary/20 bg-primary/5">
              <div className="flex gap-3">
                <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium mb-1">Публичная ссылка</p>
                  <p className="text-muted-foreground">
                    Любой, у кого есть эта ссылка, сможет открыть и пройти игру
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="qr" className="space-y-4">
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
              <div className="text-center space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center justify-center gap-2">
                    <Icon name="QrCode" size={18} className="text-primary" />
                    QR-код для быстрого доступа
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Отсканируйте камерой телефона для быстрого открытия игры
                  </p>
                </div>

                <div className="inline-block p-4 bg-white rounded-xl shadow-sm">
                  <img 
                    src={qrCodeUrl} 
                    alt="QR Code" 
                    className="w-64 h-64 mx-auto"
                  />
                </div>

                <div className="flex gap-2 justify-center">
                  <Button onClick={handleDownloadQR} className="gap-2">
                    <Icon name="Download" size={18} />
                    Скачать QR-код
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Icon name="Printer" size={18} />
                    Распечатать
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-accent/20 bg-accent/5">
              <div className="flex gap-3">
                <Icon name="Lightbulb" size={20} className="text-accent-foreground flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium mb-1">Совет</p>
                  <p className="text-muted-foreground">
                    Разместите QR-код на доске или раздайте ученикам — они смогут мгновенно открыть игру
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-4">
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Icon name="Share2" size={18} className="text-primary" />
                Поделиться в социальных сетях
              </h4>
              
              <div className="grid gap-3">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={handleShareWhatsApp}
                  className="gap-3 justify-start hover:bg-green-50 hover:border-green-500"
                >
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <Icon name="MessageCircle" size={18} className="text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">WhatsApp</div>
                    <div className="text-xs text-muted-foreground">Отправить в чат или группу</div>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={handleShareTelegram}
                  className="gap-3 justify-start hover:bg-blue-50 hover:border-blue-500"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <Icon name="Send" size={18} className="text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Telegram</div>
                    <div className="text-xs text-muted-foreground">Поделиться в канале или группе</div>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={handleShareVK}
                  className="gap-3 justify-start hover:bg-blue-50 hover:border-blue-600"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">VK</span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">ВКонтакте</div>
                    <div className="text-xs text-muted-foreground">Опубликовать на стене</div>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={handleShareEmail}
                  className="gap-3 justify-start hover:bg-gray-50"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                    <Icon name="Mail" size={18} className="text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Email</div>
                    <div className="text-xs text-muted-foreground">Отправить письмо</div>
                  </div>
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="embed" className="space-y-4">
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Icon name="Code" size={18} className="text-primary" />
                    Встроить игру на сайт
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Разместите игру на своём сайте или в блоге
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium mb-2 block">HTML код для встраивания</label>
                    <div className="relative">
                      <textarea 
                        readOnly
                        value={`<iframe src="${gameUrl}" width="800" height="600" frameborder="0" allowfullscreen></iframe>`}
                        className="w-full p-3 font-mono text-xs bg-muted rounded-lg border resize-none"
                        rows={3}
                      />
                      <Button 
                        size="sm"
                        onClick={handleCopyEmbed}
                        className="absolute top-2 right-2 gap-1"
                      >
                        <Icon name="Copy" size={14} />
                        Копировать
                      </Button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Ширина (px)</label>
                      <Input type="number" defaultValue={800} />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Высота (px)</label>
                      <Input type="number" defaultValue={600} />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-primary/20 bg-primary/5">
              <div className="flex gap-3">
                <Icon name="Sparkles" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium mb-1">Для веб-разработчиков</p>
                  <p className="text-muted-foreground">
                    Игра адаптируется под размер iframe и корректно работает на всех устройствах
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
