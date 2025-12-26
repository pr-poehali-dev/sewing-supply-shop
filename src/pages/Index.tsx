import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  article: string;
  category: string;
  price: number;
  unit: string;
  image: string;
}

const mockProducts: Product[] = [
  { id: 1, name: 'Нитки швейные полиэстер', article: 'NT-001', category: 'Нитки', price: 45, unit: 'шт', image: '/placeholder.svg' },
  { id: 2, name: 'Пуговицы пластик 4 отв.', article: 'PG-142', category: 'Пуговицы', price: 12, unit: 'уп', image: '/placeholder.svg' },
  { id: 3, name: 'Молния металл 18см', article: 'ML-018', category: 'Молнии', price: 35, unit: 'шт', image: '/placeholder.svg' },
  { id: 4, name: 'Резинка эластичная 20мм', article: 'RZ-020', category: 'Резинки', price: 28, unit: 'м', image: '/placeholder.svg' },
  { id: 5, name: 'Кнопки металл 10мм', article: 'KN-210', category: 'Кнопки', price: 55, unit: 'уп', image: '/placeholder.svg' },
  { id: 6, name: 'Липучка текстиль 25мм', article: 'LP-025', category: 'Ленты', price: 42, unit: 'м', image: '/placeholder.svg' },
  { id: 7, name: 'Тесьма декоративная', article: 'TS-301', category: 'Тесьма', price: 38, unit: 'м', image: '/placeholder.svg' },
  { id: 8, name: 'Флизелин клеевой', article: 'FL-100', category: 'Материалы', price: 65, unit: 'м', image: '/placeholder.svg' },
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [activeSection, setActiveSection] = useState('catalog');

  const filteredProducts = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.article.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (productId: number) => {
    setCart((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
  };

  const cartItemsCount = Object.values(cart).reduce((sum, count) => sum + count, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Package" size={32} className="text-primary" />
              <div>
                <h1 className="text-xl font-bold text-foreground">ШвейФурнитура</h1>
                <p className="text-xs text-muted-foreground">Профессиональные товары для швейного производства</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setActiveSection('catalog')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'catalog' ? 'text-primary' : 'text-foreground'
                }`}
              >
                Каталог
              </button>
              <button
                onClick={() => setActiveSection('about')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'about' ? 'text-primary' : 'text-foreground'
                }`}
              >
                О компании
              </button>
              <button
                onClick={() => setActiveSection('delivery')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'delivery' ? 'text-primary' : 'text-foreground'
                }`}
              >
                Доставка
              </button>
              <button
                onClick={() => setActiveSection('cart')}
                className={`relative text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'cart' ? 'text-primary' : 'text-foreground'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon name="ShoppingCart" size={20} />
                  Корзина
                  {cartItemsCount > 0 && (
                    <Badge variant="default" className="ml-1">
                      {cartItemsCount}
                    </Badge>
                  )}
                </div>
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'catalog' && (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Каталог товаров</h2>
              <div className="relative max-w-xl">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Поиск по названию или артикулу..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 border-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-2">
                  <CardHeader className="p-0">
                    <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
                      <Icon name="Package2" size={64} className="text-muted-foreground group-hover:scale-110 transition-transform" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {product.article}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-base mb-2 line-clamp-2">{product.name}</CardTitle>
                    <CardDescription className="text-xl font-bold text-primary">
                      {product.price} ₽ <span className="text-sm font-normal text-muted-foreground">/ {product.unit}</span>
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button onClick={() => addToCart(product.id)} className="w-full font-medium" size="sm">
                      <Icon name="ShoppingCart" size={16} className="mr-2" />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <Icon name="SearchX" size={64} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-lg text-muted-foreground">Товары не найдены</p>
              </div>
            )}
          </>
        )}

        {activeSection === 'about' && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">О компании</h2>
            <Card>
              <CardContent className="p-8 space-y-4">
                <p className="text-foreground leading-relaxed">
                  <strong>ШвейФурнитура</strong> — надежный поставщик профессиональной швейной фурнитуры для производственных предприятий и частных мастерских.
                </p>
                <p className="text-foreground leading-relaxed">
                  Мы работаем на рынке более 15 лет и предлагаем широкий ассортимент качественной продукции по конкурентным ценам.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  <div className="flex flex-col items-center p-4 border-2 rounded-lg">
                    <Icon name="TrendingUp" size={32} className="text-primary mb-2" />
                    <div className="text-2xl font-bold text-foreground">15+</div>
                    <div className="text-sm text-muted-foreground">лет на рынке</div>
                  </div>
                  <div className="flex flex-col items-center p-4 border-2 rounded-lg">
                    <Icon name="Package" size={32} className="text-primary mb-2" />
                    <div className="text-2xl font-bold text-foreground">5000+</div>
                    <div className="text-sm text-muted-foreground">наименований</div>
                  </div>
                  <div className="flex flex-col items-center p-4 border-2 rounded-lg">
                    <Icon name="Users" size={32} className="text-primary mb-2" />
                    <div className="text-2xl font-bold text-foreground">2000+</div>
                    <div className="text-sm text-muted-foreground">клиентов</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'delivery' && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">Доставка и оплата</h2>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Truck" size={24} className="text-primary" />
                    Способы доставки
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle2" size={20} className="text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Курьерская доставка</div>
                      <div className="text-sm text-muted-foreground">По Москве — от 300 ₽, 1-2 дня</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle2" size={20} className="text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Транспортные компании</div>
                      <div className="text-sm text-muted-foreground">По всей России, расчет индивидуально</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle2" size={20} className="text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Самовывоз</div>
                      <div className="text-sm text-muted-foreground">Бесплатно из нашего склада</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="CreditCard" size={24} className="text-primary" />
                    Способы оплаты
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle2" size={20} className="text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Безналичный расчет</div>
                      <div className="text-sm text-muted-foreground">Для юридических лиц с НДС</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle2" size={20} className="text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Банковские карты</div>
                      <div className="text-sm text-muted-foreground">Visa, MasterCard, МИР</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle2" size={20} className="text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Наличные</div>
                      <div className="text-sm text-muted-foreground">При получении или в офисе</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeSection === 'cart' && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">Корзина</h2>
            {cartItemsCount === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Icon name="ShoppingCart" size={64} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg text-muted-foreground mb-4">Корзина пуста</p>
                  <Button onClick={() => setActiveSection('catalog')}>Перейти в каталог</Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {Object.entries(cart).map(([productId, count]) => {
                      const product = mockProducts.find((p) => p.id === Number(productId));
                      if (!product) return null;
                      return (
                        <div key={productId} className="flex items-center justify-between border-b pb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                              <Icon name="Package2" size={32} className="text-muted-foreground" />
                            </div>
                            <div>
                              <div className="font-medium">{product.name}</div>
                              <div className="text-sm text-muted-foreground">Артикул: {product.article}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">x{count}</div>
                            <div className="font-bold text-primary">{product.price * count} ₽</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-6 pt-6 border-t flex items-center justify-between">
                    <div className="text-xl font-bold">Итого:</div>
                    <div className="text-2xl font-bold text-primary">
                      {Object.entries(cart).reduce((sum, [productId, count]) => {
                        const product = mockProducts.find((p) => p.id === Number(productId));
                        return sum + (product?.price || 0) * count;
                      }, 0)}{' '}
                      ₽
                    </div>
                  </div>
                  <Button className="w-full mt-4" size="lg">
                    Оформить заказ
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>

      <footer className="border-t bg-muted/30 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-foreground mb-3">Контакты</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (495) 123-45-67
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@shveyfurnitura.ru
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-3">Информация</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Режим работы: Пн-Пт 9:00-18:00</div>
                <div>Адрес склада: Москва, ул. Промышленная, 15</div>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-3">Документы</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>ИНН: 7701234567</div>
                <div>ОГРН: 1027700123456</div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2024 ШвейФурнитура. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
