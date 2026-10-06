// Фото стейков: положи файлы в public/photos/ с этими именами (jpg).
export const steaks = [
  {
    id: 'picanha',
    name: 'Пиканья',
    meta: 'мраморная говядина',
    photo: 'pikanya.webp',
    desc: 'Бразильская классика с нежной жировой шапкой. Жир тает при жарке и делает мясо сочным, с ярким говяжьим вкусом.',
  },
  {
    id: 'ribeye',
    name: 'Ribeye Select',
    meta: 'мраморная говядина',
    photo: 'ribeye.jpg',
    desc: 'Рибай: самый «мраморный» и сочный стейк. Мягкий, жирноватый, с насыщенным вкусом. Выбор для тех, кто любит по-настоящему мясное.',
  },
  {
    id: 'chuck-eye',
    name: 'Chuck Eye',
    meta: 'мраморная говядина',
    photo: 'chuckeye.webp',
    desc: 'Родной брат рибая из соседнего отруба. Такой же сочный и мягкий, с глубоким вкусом и красивой мраморностью.',
  },
  {
    id: 'top-blade',
    name: 'Top Blade',
    meta: 'мраморная говядина',
    photo: 'topblade.jpg',
    desc: 'Стейк из лопатки. Очень нежный и сочный, с мелкой мраморностью. Один из самых мягких после филе.',
  },
  {
    id: 'new-york',
    name: 'New York',
    meta: 'мраморная говядина',
    photo: 'newyork.webp',
    desc: 'Классический стриплойн с полоской жира по краю. Плотнее рибая, с выраженным мясным вкусом и приятной упругой текстурой.',
  },
  {
    id: 'tri-tip',
    name: 'Tri-Tip',
    meta: 'мраморная говядина',
    photo: 'tritip.jpg',
    desc: 'Треугольный стейк, более постный и плотный. Насыщенный вкус, подаётся тонкими ломтиками, нарезанными поперёк волокон.',
  },
]

export const doneness = [
  { id: 'rare', name: 'Rare', desc: 'С кровью' },
  { id: 'medium-rare', name: 'Medium rare', desc: 'Слегка прожарен' },
  { id: 'medium', name: 'Medium', desc: 'Розовая середина' },
  { id: 'medium-well', name: 'Medium well', desc: 'Почти прожарен' },
  { id: 'well-done', name: 'Well done', desc: 'Полная прожарка' },
]

export const sides = [
  { id: 'sweet-fries', photo: 'batat.jpg', name: 'Батат фри', desc: 'Хрустящий и сладковатый', icon: 'fries' },
  { id: 'fries', photo: 'fri.webp', name: 'Картофель фри', desc: 'Классика, золотистая и хрустящая', icon: 'fries' },
  { id: 'country', photo: 'poderevenski.webp', name: 'Картофель по-деревенски', desc: 'Дольки со специями, запечённые до корочки', icon: 'potato' },
  { id: 'rice', photo: 'rice.jpg', name: 'Рис', desc: 'Рассыпчатый, нейтральный гарнир', icon: 'bowl' },
  { id: 'veggies', photo: 'zapechenieovoshi.jpg', name: 'Запечённые овощи', desc: 'Сладкий перец, картофель по-деревенски, кукуруза', icon: 'veg' },
]

export const drinks = [
  { id: 'cola', photo: 'cola.jpg', name: 'Coca-Cola' },
  { id: 'fanta', photo: 'fanta.png', name: 'Fanta' },
  { id: 'sprite', photo: 'sprite.png', name: 'Sprite' },
  { id: 'fuze', photo: 'fuse.webp', name: 'Fuze Tea' },
  { id: 'water', photo: 'water.jpeg', name: 'Вода' },
  { id: 'juice', photo: 'sok.jpg', name: 'Сок' },
]

export const salad = { name: 'Салат из листьев и свежих овощей', photo: 'salad.jpeg' }
