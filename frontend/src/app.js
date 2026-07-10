const CONFIG = Object.freeze({
  apiBase: String(window.LUNARIA_CONFIG?.apiBase || '').replace(/\/$/, ''),
  storeMode: window.LUNARIA_CONFIG?.storeMode || 'demo',
  currency: window.LUNARIA_CONFIG?.currency || 'EUR',
  deliveryFeeCents: Number(window.LUNARIA_CONFIG?.deliveryFeeCents ?? 800),
});

const translations = {
  en: {
    announcement: 'Complimentary gift wrapping on orders over €45', announcementSecondary: 'Freshly made in small batches',
    navShop: 'Shop', navGifts: 'Gift boxes', navStory: 'Our story', navVisit: 'Visit', cart: 'Cart',
    heroEyebrow: 'A nocturnal pâtisserie', heroTitleLine1: 'Desserts made', heroTitleLine2: 'like small constellations.',
    heroLead: 'Layered by hand, finished with a little theatre, and baked fresh for evenings worth remembering.',
    shopCollection: 'Shop the collection', discoverStory: 'Discover our story', heroProofRating: 'average rating', heroProofFresh: 'made fresh', heroProofFlavours: 'seasonal flavours', heroProduct: 'Moonberry Tart',
    marquee1: 'Small-batch', marquee2: 'Natural ingredients', marquee3: 'Gift-ready', marquee4: 'Seasonal menu',
    catalogEyebrow: 'The current constellation', catalogTitle: 'Choose your little obsession.', catalogLead: 'Every piece is layered, glazed and decorated by hand. Quantities reset each morning.',
    categoryAll: 'All', categorySignature: 'Signature', categoryPastry: 'Pastries', categoryCake: 'Cakes', categoryGift: 'Gifts', categoryVegan: 'Vegan',
    searchProducts: 'Search products', searchPlaceholder: 'Search flavours…', sortProducts: 'Sort products', sortFeatured: 'Featured', sortPriceLow: 'Price: low to high', sortPriceHigh: 'Price: high to low', sortRating: 'Top rated',
    emptyTitle: 'Nothing in this orbit.', emptyText: 'Try another flavour, category or search.', resetFilters: 'Reset filters',
    giftPieces: 'pieces', giftCombinations: 'combinations', giftEyebrow: 'Build a constellation', giftTitle: 'A gift box with no dull stars.',
    giftLead: 'Pick six individual desserts. We arrange them in a keepsake box, add a handwritten card, and make you look impossibly thoughtful.',
    giftStep1Title: 'Choose six', giftStep1Text: 'Mix signatures, seasonal pieces and vegan options.', giftStep2Title: 'Write a note', giftStep2Text: 'Up to 180 characters, handwritten on textured paper.', giftStep3Title: 'Pick a date', giftStep3Text: 'Collect in the atelier or choose local delivery.', addGiftBox: 'Add gift box',
    storyEyebrow: 'Our philosophy', storyQuote: '“A dessert should be familiar enough to tempt you — and strange enough to haunt you.”', founder: 'Founder & pastry chef',
    storyTitle: 'Classical technique. A slightly unruly imagination.', storyText1: 'Lunaria began after midnight in a borrowed kitchen: one mixer, two trays and a stubborn idea that pastry could feel cinematic.', storyText2: 'Today our small team still makes every mousse, biscuit, gel and glaze in-house. The menu changes with the season; the obsession with detail does not.', meetAtelier: 'Meet the atelier',
    reviewsEyebrow: 'Notes from our guests', reviewsTitle: 'Sweet words, no bribery.', reviewCount: 'from 328 verified orders', verifiedBuyer: 'Verified buyer',
    review1: '“The Caramel Eclipse somehow tastes elegant and dangerous. I ordered six more before finishing the first.”', review2: '“The box looked like jewellery and survived a 40-minute drive perfectly. The pistachio one disappeared first.”', review3: '“Finally, a vegan dessert that is not an apology. Citrus Orbit is bright, creamy and genuinely beautiful.”',
    visitEyebrow: 'Come after the moon rises', visitTitle: 'Visit the atelier.', visitLead: 'Watch the final glazing through the open kitchen, collect your order, or stay for an espresso and something reckless.',
    addressLabel: 'Address', hoursLabel: 'Opening hours', hoursValue: 'Tue–Sun · 11:00–20:00\nMonday · closed', contactLabel: 'Contact', openMap: 'Open map',
    newsletterEyebrow: 'A little secret, occasionally', newsletterTitle: 'New flavours. Midnight drops. No spam.', emailAddress: 'Email address', emailPlaceholder: 'you@example.com', subscribe: 'Subscribe',
    footerTagline: 'Pâtisserie after dark.\nHandcrafted in Genève.', footerShop: 'Shop', footerHelp: 'Help', footerFollow: 'Follow the crumbs', delivery: 'Delivery', allergens: 'Allergens', careGuide: 'Care guide', privacy: 'Privacy', terms: 'Terms', cookies: 'Cookies', backToTop: 'Back to top',
    yourSelection: 'Your selection', cartTitle: 'The dessert box', cartEmptyTitle: 'A tragically empty box.', cartEmptyText: 'Choose something beautiful. Restraint is overrated.', subtotal: 'Subtotal', deliveryCalculated: 'Delivery is calculated at checkout', checkout: 'Checkout', clearCart: 'Clear cart',
    availability: 'Availability', inStock: '{count} available today', soldOut: 'Sold out', addToCart: 'Add to cart', add: 'Add', remove: 'Remove', itemAdded: '{name} joined your box.', cartCleared: 'The box is empty again.',
    secureOrder: 'Secure order', checkoutTitle: 'Where should the stars land?', checkoutLead: 'This demo does not charge a card. Connect your payment provider in the backend before accepting live orders.',
    fullName: 'Full name', phone: 'Phone', deliveryDate: 'Preferred date', fulfillment: 'Fulfilment', pickup: 'Atelier pickup', pickupDetail: 'Free · Rue des Étoiles 17', localDelivery: 'Local delivery', deliveryDetail: '€8 · within central Genève', deliveryAddress: 'Delivery address', orderNote: 'A note for us', notePlaceholder: 'Allergies, gift message, timing…', consent: 'I confirm the order details and understand that this storefront is running in demo payment mode.',
    orderSummary: 'Order summary', total: 'Total', placeOrder: 'Place demo order', paymentNotice: 'No card details are collected in this build.',
    orderReceived: 'Order received', successTitle: 'Your constellation is reserved.', successText: 'A confirmation has been prepared. In production, your mail provider would send it automatically.', orderReference: 'Order reference', continueShopping: 'Continue shopping',
    newsletterSuccess: 'You are on the midnight list.', emailInvalid: 'Enter a valid email address.', formInvalid: 'Please complete the highlighted fields.', orderFailed: 'The order could not be created. Please try again.', networkFailed: 'The atelier API did not answer. Check your connection or use demo mode.',
    quantity: 'Quantity', items: '{count} items', item: '{count} item', apiMode: 'API mode', demoMode: 'Demo mode',
    allergen_gluten: 'gluten', allergen_nuts: 'nuts', allergen_eggs: 'eggs', allergen_milk: 'milk', allergen_soy: 'soy', allergen_sesame: 'sesame',
  },
  ru: {
    announcement: 'Подарочная упаковка бесплатно при заказе от €45', announcementSecondary: 'Готовим свежими небольшими партиями',
    navShop: 'Магазин', navGifts: 'Наборы', navStory: 'О нас', navVisit: 'Ателье', cart: 'Корзина',
    heroEyebrow: 'Ночная кондитерская', heroTitleLine1: 'Десерты, похожие', heroTitleLine2: 'на маленькие созвездия.',
    heroLead: 'Собираем вручную, добавляем немного театра и готовим свежими — для вечеров, которые хочется запомнить.',
    shopCollection: 'Смотреть коллекцию', discoverStory: 'Узнать нашу историю', heroProofRating: 'средняя оценка', heroProofFresh: 'свежая работа', heroProofFlavours: 'сезонных вкусов', heroProduct: 'Тарт «Лунная ягода»',
    marquee1: 'Малые партии', marquee2: 'Натуральные ингредиенты', marquee3: 'Готово для подарка', marquee4: 'Сезонное меню',
    catalogEyebrow: 'Текущее созвездие', catalogTitle: 'Выберите свою маленькую одержимость.', catalogLead: 'Каждый десерт вручную собирают, глазируют и украшают. Количество обновляется каждое утро.',
    categoryAll: 'Все', categorySignature: 'Фирменные', categoryPastry: 'Пирожные', categoryCake: 'Торты', categoryGift: 'Подарки', categoryVegan: 'Веган',
    searchProducts: 'Поиск товаров', searchPlaceholder: 'Найти вкус…', sortProducts: 'Сортировка', sortFeatured: 'Рекомендуемые', sortPriceLow: 'Сначала дешевле', sortPriceHigh: 'Сначала дороже', sortRating: 'По рейтингу',
    emptyTitle: 'На этой орбите пусто.', emptyText: 'Попробуйте другой вкус, категорию или запрос.', resetFilters: 'Сбросить фильтры',
    giftPieces: 'десертов', giftCombinations: 'комбинаций', giftEyebrow: 'Соберите созвездие', giftTitle: 'Подарочная коробка без скучных звёзд.',
    giftLead: 'Выберите шесть десертов. Мы уложим их в красивую многоразовую коробку, добавим открытку от руки — и сделаем вас невозможным молодцом.',
    giftStep1Title: 'Выберите шесть', giftStep1Text: 'Смешивайте фирменные, сезонные и веганские позиции.', giftStep2Title: 'Напишите послание', giftStep2Text: 'До 180 символов — перепишем от руки на фактурной бумаге.', giftStep3Title: 'Выберите дату', giftStep3Text: 'Заберите в ателье или оформите местную доставку.', addGiftBox: 'Добавить набор',
    storyEyebrow: 'Наша философия', storyQuote: '«Десерт должен быть достаточно знакомым, чтобы соблазнить, и достаточно странным, чтобы преследовать вас.»', founder: 'Основатель и шеф-кондитер',
    storyTitle: 'Классическая техника. Слегка неуправляемая фантазия.', storyText1: 'Lunaria началась после полуночи на чужой кухне: один миксер, два противня и упрямая идея, что десерт может ощущаться как кино.', storyText2: 'Сегодня наша маленькая команда по-прежнему готовит каждый мусс, бисквит, гель и глазурь самостоятельно. Меню меняется вместе с сезоном; одержимость деталями — нет.', meetAtelier: 'Познакомиться с ателье',
    reviewsEyebrow: 'Записки наших гостей', reviewsTitle: 'Сладкие слова. Без подкупа.', reviewCount: 'на основе 328 подтверждённых заказов', verifiedBuyer: 'Подтверждённый покупатель',
    review1: '«Карамельное затмение одновременно элегантное и опасное. Я заказала ещё шесть, не успев доесть первое.»', review2: '«Коробка выглядела как украшение и идеально пережила 40 минут в машине. Фисташковое исчезло первым.»', review3: '«Наконец-то веганский десерт, который не звучит как извинение. Цитрусовая орбита яркая, кремовая и правда красивая.»',
    visitEyebrow: 'Приходите после восхода луны', visitTitle: 'Загляните в ателье.', visitLead: 'Посмотрите на финальную глазировку через открытую кухню, заберите заказ или останьтесь на эспрессо и что-нибудь безрассудное.',
    addressLabel: 'Адрес', hoursLabel: 'Часы работы', hoursValue: 'Вт–Вс · 11:00–20:00\nПонедельник · выходной', contactLabel: 'Контакты', openMap: 'Открыть карту',
    newsletterEyebrow: 'Иногда — маленький секрет', newsletterTitle: 'Новые вкусы. Ночные дропы. Никакого спама.', emailAddress: 'Электронная почта', emailPlaceholder: 'you@example.com', subscribe: 'Подписаться',
    footerTagline: 'Кондитерская после заката.\nРучная работа в Женеве.', footerShop: 'Магазин', footerHelp: 'Помощь', footerFollow: 'Следуйте за крошками', delivery: 'Доставка', allergens: 'Аллергены', careGuide: 'Хранение', privacy: 'Конфиденциальность', terms: 'Условия', cookies: 'Cookie', backToTop: 'Наверх',
    yourSelection: 'Ваш выбор', cartTitle: 'Коробка десертов', cartEmptyTitle: 'Трагически пустая коробка.', cartEmptyText: 'Выберите что-нибудь красивое. Сдержанность переоценена.', subtotal: 'Подытог', deliveryCalculated: 'Доставка рассчитывается при оформлении', checkout: 'Оформить заказ', clearCart: 'Очистить корзину',
    availability: 'Наличие', inStock: 'Сегодня доступно: {count}', soldOut: 'Нет в наличии', addToCart: 'Добавить в корзину', add: 'Добавить', remove: 'Удалить', itemAdded: '«{name}» уже в вашей коробке.', cartCleared: 'Коробка снова пуста.',
    secureOrder: 'Безопасный заказ', checkoutTitle: 'Куда доставить звёзды?', checkoutLead: 'В деморежиме карта не списывается. Перед приёмом реальных заказов подключите платёжного провайдера на бэкенде.',
    fullName: 'Имя и фамилия', phone: 'Телефон', deliveryDate: 'Желаемая дата', fulfillment: 'Получение', pickup: 'Самовывоз из ателье', pickupDetail: 'Бесплатно · Rue des Étoiles 17', localDelivery: 'Доставка по городу', deliveryDetail: '€8 · центральная Женева', deliveryAddress: 'Адрес доставки', orderNote: 'Комментарий к заказу', notePlaceholder: 'Аллергии, текст открытки, время…', consent: 'Я подтверждаю детали заказа и понимаю, что витрина работает в демонстрационном платёжном режиме.',
    orderSummary: 'Состав заказа', total: 'Итого', placeOrder: 'Оформить демозаказ', paymentNotice: 'В этой сборке данные карты не запрашиваются.',
    orderReceived: 'Заказ получен', successTitle: 'Ваше созвездие забронировано.', successText: 'Подтверждение подготовлено. В продакшене почтовый сервис отправит его автоматически.', orderReference: 'Номер заказа', continueShopping: 'Продолжить покупки',
    newsletterSuccess: 'Вы в полуночном списке.', emailInvalid: 'Введите корректный адрес почты.', formInvalid: 'Заполните обязательные поля.', orderFailed: 'Не удалось создать заказ. Попробуйте ещё раз.', networkFailed: 'API ателье не ответил. Проверьте соединение или включите деморежим.',
    quantity: 'Количество', items: '{count} товаров', item: '{count} товар', apiMode: 'Режим API', demoMode: 'Деморежим',
    allergen_gluten: 'глютен', allergen_nuts: 'орехи', allergen_eggs: 'яйца', allergen_milk: 'молоко', allergen_soy: 'соя', allergen_sesame: 'кунжут',
  },
};

const state = {
  locale: localStorage.getItem('lunaria.locale') || (navigator.language?.toLowerCase().startsWith('ru') ? 'ru' : 'en'),
  products: [],
  cart: readCart(),
  category: 'all',
  search: '',
  sort: 'featured',
  activeProduct: null,
  activeQty: 1,
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const t = (key, vars = {}) => {
  let value = translations[state.locale]?.[key] ?? translations.en[key] ?? key;
  for (const [name, replacement] of Object.entries(vars)) value = value.replaceAll(`{${name}}`, String(replacement));
  return value;
};
const localText = (value) => typeof value === 'string' ? value : value?.[state.locale] || value?.en || '';
const money = (cents) => new Intl.NumberFormat(state.locale === 'ru' ? 'ru-RU' : 'en-GB', { style: 'currency', currency: CONFIG.currency }).format(cents / 100);
const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
const apiUrl = (path) => `${CONFIG.apiBase}${path}`;

function readCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem('lunaria.cart') || '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => typeof item?.id === 'string' && Number.isInteger(item?.quantity) && item.quantity > 0).slice(0, 50);
  } catch { return []; }
}
function saveCart() { localStorage.setItem('lunaria.cart', JSON.stringify(state.cart)); }
function cartQuantity() { return state.cart.reduce((sum, item) => sum + item.quantity, 0); }
function cartSubtotal() { return state.cart.reduce((sum, item) => {
  const product = state.products.find((entry) => entry.id === item.id);
  return sum + (product ? product.priceCents * item.quantity : 0);
}, 0); }
function productById(id) { return state.products.find((product) => product.id === id); }
function productBySlug(slug) { return state.products.find((product) => product.slug === slug); }

async function request(path, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);
  try {
    const response = await fetch(apiUrl(path), {
      ...options,
      headers: { 'Content-Type': 'application/json', 'Accept-Language': state.locale, ...(options.headers || {}) },
      signal: controller.signal,
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.detail || payload.message || `HTTP ${response.status}`);
    return payload;
  } finally { clearTimeout(timeout); }
}

async function loadProducts() {
  const staticPath = './data/products.json';
  try {
    const payload = CONFIG.apiBase ? await request('/products') : await fetch(staticPath).then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    });
    state.products = Array.isArray(payload) ? payload : payload.items || [];
  } catch (error) {
    console.error('Catalog load failed:', error);
    if (CONFIG.apiBase) {
      try { state.products = await fetch(staticPath).then((response) => response.json()); }
      catch { state.products = []; }
      toast(t('networkFailed'), 'error');
    }
  }
  state.cart = state.cart.filter((item) => state.products.some((product) => product.id === item.id));
  saveCart();
  renderCatalog();
  renderCart();
}

function applyTranslations() {
  document.documentElement.lang = state.locale;
  document.title = state.locale === 'ru' ? 'Lunaria Atelier — кондитерская после заката' : 'Lunaria Atelier — Pâtisserie after dark';
  const description = state.locale === 'ru'
    ? 'Lunaria Atelier — авторские пирожные, праздничные торты и подарочные наборы ручной работы.'
    : 'Lunaria Atelier — celestial petits gâteaux, celebration cakes and gift boxes, crafted in small batches.';
  $('meta[name="description"]')?.setAttribute('content', description);
  $$('[data-i18n]').forEach((node) => {
    const value = t(node.dataset.i18n);
    if (value.includes('\n')) {
      node.replaceChildren(...value.split('\n').flatMap((line, index) => index ? [document.createElement('br'), document.createTextNode(line)] : [document.createTextNode(line)]));
    } else node.textContent = value;
  });
  $$('[data-i18n-placeholder]').forEach((node) => node.setAttribute('placeholder', t(node.dataset.i18nPlaceholder)));
  $$('.language-switch button').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.lang === state.locale)));
  renderCatalog();
  renderCart();
  if ($('#checkout-dialog')?.open) renderCheckoutSummary();
  if ($('#product-dialog')?.open && state.activeProduct) populateProductDialog(state.activeProduct);
}

function setLocale(locale) {
  if (!translations[locale] || locale === state.locale) return;
  state.locale = locale;
  localStorage.setItem('lunaria.locale', locale);
  applyTranslations();
}

function filteredProducts() {
  const needle = state.search.trim().toLocaleLowerCase(state.locale === 'ru' ? 'ru' : 'en');
  const filtered = state.products.filter((product) => {
    const categoryMatches = state.category === 'all' || product.category === state.category || product.tags?.includes(state.category);
    const haystack = [localText(product.name), localText(product.short), localText(product.description), ...(product.tags || [])].join(' ').toLocaleLowerCase(state.locale === 'ru' ? 'ru' : 'en');
    return categoryMatches && (!needle || haystack.includes(needle));
  });
  return filtered.sort((a, b) => {
    if (state.sort === 'price-asc') return a.priceCents - b.priceCents;
    if (state.sort === 'price-desc') return b.priceCents - a.priceCents;
    if (state.sort === 'rating') return b.rating - a.rating;
    return Number(b.featured) - Number(a.featured) || b.rating - a.rating;
  });
}

function renderCatalog() {
  const grid = $('#product-grid');
  if (!grid) return;
  const products = filteredProducts();
  grid.innerHTML = products.map((product) => `
    <article class="product-card" data-product="${escapeHtml(product.slug)}">
      <div class="product-card__media" role="button" tabindex="0" aria-label="${escapeHtml(localText(product.name))}">
        <img src="${escapeHtml(product.image)}" alt="${escapeHtml(localText(product.name))}" width="800" height="620" loading="lazy">
        ${localText(product.badge) ? `<span class="product-card__badge">${escapeHtml(localText(product.badge))}</span>` : ''}
        <button class="product-card__quick" type="button" aria-label="${escapeHtml(localText(product.name))}">↗</button>
      </div>
      <div class="product-card__body">
        <div class="product-card__head"><h3>${escapeHtml(localText(product.name))}</h3><strong>${money(product.priceCents)}</strong></div>
        <p>${escapeHtml(localText(product.short))}</p>
        <div class="product-card__footer">
          <div class="product-rating"><span aria-label="${product.rating} out of 5">★★★★★</span><small>${product.rating.toFixed(1)}</small></div>
          <button class="add-button" type="button" data-add="${escapeHtml(product.id)}" ${product.stock < 1 ? 'disabled' : ''}><span>${t('add')}</span><span aria-hidden="true">＋</span></button>
        </div>
      </div>
    </article>`).join('');
  $('#empty-state').hidden = products.length > 0;

  $$('.product-card__media', grid).forEach((media) => {
    const card = media.closest('.product-card');
    const open = () => openProduct(card.dataset.product);
    media.addEventListener('click', (event) => { if (!event.target.closest('[data-add]')) open(); });
    media.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); } });
  });
  $$('[data-add]', grid).forEach((button) => button.addEventListener('click', (event) => {
    event.stopPropagation();
    addToCart(button.dataset.add, 1);
  }));
}

function populateProductDialog(product) {
  $('#product-dialog-image').src = product.image;
  $('#product-dialog-image').alt = localText(product.name);
  $('#product-dialog-badge').textContent = localText(product.badge);
  $('#product-dialog-title').textContent = localText(product.name);
  $('#product-dialog-short').textContent = localText(product.short);
  $('#product-dialog-description').textContent = localText(product.description);
  $('#product-dialog-rating').textContent = `${product.rating.toFixed(1)} / 5`;
  $('#product-dialog-allergens').textContent = (product.allergens || []).map((name) => t(`allergen_${name}`)).join(', ');
  $('#product-dialog-stock').textContent = product.stock > 0 ? t('inStock', { count: product.stock }) : t('soldOut');
  $('#product-dialog-price').textContent = money(product.priceCents * state.activeQty);
  $('#product-dialog-qty').textContent = state.activeQty;
  $('#product-dialog-add').disabled = product.stock < 1;
}

function openProduct(slug) {
  const product = productBySlug(slug);
  if (!product) return;
  state.activeProduct = product;
  state.activeQty = 1;
  populateProductDialog(product);
  openDialog($('#product-dialog'));
}

function changeProductQty(delta) {
  if (!state.activeProduct) return;
  state.activeQty = Math.min(Math.max(1, state.activeQty + delta), Math.max(1, state.activeProduct.stock));
  populateProductDialog(state.activeProduct);
}

function addToCart(productId, quantity = 1) {
  const product = productById(productId);
  if (!product || product.stock < 1) return;
  const existing = state.cart.find((item) => item.id === productId);
  const nextQuantity = Math.min((existing?.quantity || 0) + quantity, product.stock, 20);
  if (existing) existing.quantity = nextQuantity;
  else state.cart.push({ id: productId, quantity: Math.min(quantity, product.stock, 20) });
  saveCart();
  renderCart();
  toast(t('itemAdded', { name: localText(product.name) }));
}

function updateCartItem(productId, delta) {
  const item = state.cart.find((entry) => entry.id === productId);
  const product = productById(productId);
  if (!item || !product) return;
  item.quantity = Math.min(item.quantity + delta, product.stock, 20);
  if (item.quantity <= 0) state.cart = state.cart.filter((entry) => entry.id !== productId);
  saveCart();
  renderCart();
}
function removeCartItem(productId) { state.cart = state.cart.filter((entry) => entry.id !== productId); saveCart(); renderCart(); }

function renderCart() {
  const count = cartQuantity();
  $('#cart-count').textContent = String(count);
  $('#cart-toggle').setAttribute('aria-label', `${t('cart')}: ${count}`);
  const body = $('#cart-items');
  if (!body) return;
  body.innerHTML = state.cart.map((item) => {
    const product = productById(item.id);
    if (!product) return '';
    return `<article class="cart-item">
      <img src="${escapeHtml(product.image)}" alt="${escapeHtml(localText(product.name))}" width="86" height="86">
      <div><h3>${escapeHtml(localText(product.name))}</h3><p>${escapeHtml(localText(product.short))}</p><div class="cart-item__controls"><button type="button" data-cart-minus="${escapeHtml(product.id)}" aria-label="-">−</button><output aria-label="${t('quantity')}">${item.quantity}</output><button type="button" data-cart-plus="${escapeHtml(product.id)}" aria-label="+">＋</button></div></div>
      <div class="cart-item__price"><strong>${money(product.priceCents * item.quantity)}</strong><button class="cart-item__remove" type="button" data-cart-remove="${escapeHtml(product.id)}">${t('remove')}</button></div>
    </article>`;
  }).join('');
  const empty = state.cart.length === 0;
  $('#cart-empty').hidden = !empty;
  $('#cart-summary').hidden = empty;
  $('#cart-subtotal').textContent = money(cartSubtotal());
  $$('[data-cart-minus]', body).forEach((button) => button.addEventListener('click', () => updateCartItem(button.dataset.cartMinus, -1)));
  $$('[data-cart-plus]', body).forEach((button) => button.addEventListener('click', () => updateCartItem(button.dataset.cartPlus, 1)));
  $$('[data-cart-remove]', body).forEach((button) => button.addEventListener('click', () => removeCartItem(button.dataset.cartRemove)));
  if ($('#checkout-dialog')?.open) renderCheckoutSummary();
}

function openCart() {
  $('#drawer-backdrop').hidden = false;
  $('#cart-drawer').classList.add('is-open');
  $('#cart-drawer').setAttribute('aria-hidden', 'false');
  document.body.classList.add('locked');
  setTimeout(() => $('#cart-close').focus(), 50);
}
function closeCart() {
  $('#cart-drawer').classList.remove('is-open');
  $('#cart-drawer').setAttribute('aria-hidden', 'true');
  $('#drawer-backdrop').hidden = true;
  if (!$$('dialog[open]').length) document.body.classList.remove('locked');
}

function openDialog(dialog) {
  if (!dialog) return;
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else dialog.setAttribute('open', '');
  document.body.classList.add('locked');
}
function closeDialog(dialog) {
  if (!dialog) return;
  if (typeof dialog.close === 'function') dialog.close();
  else dialog.removeAttribute('open');
  if (!$('#cart-drawer').classList.contains('is-open') && !$$('dialog[open]').length) document.body.classList.remove('locked');
}

function renderCheckoutSummary() {
  const fulfillment = $('#checkout-form input[name="fulfillment"]:checked')?.value || 'pickup';
  const delivery = fulfillment === 'delivery' ? CONFIG.deliveryFeeCents : 0;
  $('#checkout-items').innerHTML = state.cart.map((item) => {
    const product = productById(item.id);
    if (!product) return '';
    return `<div class="checkout-summary-item"><img src="${escapeHtml(product.image)}" alt="" width="48" height="48"><div><strong>${escapeHtml(localText(product.name))}</strong><small>× ${item.quantity}</small></div><span>${money(product.priceCents * item.quantity)}</span></div>`;
  }).join('');
  $('#checkout-subtotal').textContent = money(cartSubtotal());
  $('#checkout-delivery').textContent = money(delivery);
  $('#checkout-total').textContent = money(cartSubtotal() + delivery);
}

function openCheckout() {
  if (!state.cart.length) return;
  closeCart();
  const dateInput = $('#checkout-form input[name="deliveryDate"]');
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().slice(0, 10);
  dateInput.min = minDate;
  if (!dateInput.value) dateInput.value = minDate;
  $('#checkout-error').textContent = '';
  renderCheckoutSummary();
  openDialog($('#checkout-dialog'));
}

async function submitOrder(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const errorNode = $('#checkout-error');
  errorNode.textContent = '';
  if (!form.checkValidity()) {
    form.reportValidity();
    errorNode.textContent = t('formInvalid');
    return;
  }
  const data = new FormData(form);
  const fulfillment = String(data.get('fulfillment'));
  const payload = {
    customerName: String(data.get('customerName')).trim(),
    email: String(data.get('email')).trim(),
    phone: String(data.get('phone')).trim(),
    fulfillment,
    address: fulfillment === 'delivery' ? String(data.get('address') || '').trim() : null,
    deliveryDate: String(data.get('deliveryDate')),
    note: String(data.get('note') || '').trim() || null,
    locale: state.locale,
    items: state.cart.map((item) => ({ productId: item.id, quantity: item.quantity })),
  };
  if (fulfillment === 'delivery' && !payload.address) {
    $('#address-field input').focus();
    errorNode.textContent = t('formInvalid');
    return;
  }

  const submitButton = $('#place-order');
  submitButton.disabled = true;
  try {
    let result;
    if (CONFIG.apiBase) {
      result = await request('/orders', {
        method: 'POST',
        headers: { 'Idempotency-Key': crypto.randomUUID?.() || `${Date.now()}-${Math.random()}` },
        body: JSON.stringify(payload),
      });
    } else {
      await new Promise((resolve) => setTimeout(resolve, 450));
      result = { orderId: `LUN-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}` };
      const demoOrders = JSON.parse(localStorage.getItem('lunaria.demoOrders') || '[]');
      demoOrders.unshift({ ...payload, ...result, totalCents: cartSubtotal() + (fulfillment === 'delivery' ? CONFIG.deliveryFeeCents : 0), createdAt: new Date().toISOString() });
      localStorage.setItem('lunaria.demoOrders', JSON.stringify(demoOrders.slice(0, 20)));
    }
    state.cart = [];
    saveCart();
    renderCart();
    form.reset();
    $('#address-field').hidden = true;
    closeDialog($('#checkout-dialog'));
    $('#success-order-id').textContent = result.orderId || result.publicId || result.id || 'LUNARIA';
    openDialog($('#success-dialog'));
  } catch (error) {
    console.error('Order failed:', error);
    errorNode.textContent = error.name === 'AbortError' ? t('networkFailed') : (error.message || t('orderFailed'));
  } finally { submitButton.disabled = false; }
}

async function submitNewsletter(event) {
  event.preventDefault();
  const input = $('#newsletter-email');
  const error = $('#newsletter-error');
  error.textContent = '';
  if (!input.checkValidity()) { error.textContent = t('emailInvalid'); input.focus(); return; }
  try {
    if (CONFIG.apiBase) await request('/newsletter', { method: 'POST', body: JSON.stringify({ email: input.value.trim(), locale: state.locale }) });
    else localStorage.setItem('lunaria.newsletter', input.value.trim());
    input.value = '';
    toast(t('newsletterSuccess'));
  } catch (requestError) { error.textContent = requestError.message || t('networkFailed'); }
}

function toast(message, type = 'success') {
  const region = $('#toast-region');
  const node = document.createElement('div');
  node.className = `toast${type === 'error' ? ' toast--error' : ''}`;
  node.textContent = message;
  region.append(node);
  setTimeout(() => node.remove(), 3800);
}

function initInteractions() {
  $('#current-year').textContent = String(new Date().getFullYear());
  $$('.language-switch button').forEach((button) => button.addEventListener('click', () => setLocale(button.dataset.lang)));
  $('#cart-toggle').addEventListener('click', openCart);
  $('#cart-close').addEventListener('click', closeCart);
  $('#drawer-backdrop').addEventListener('click', closeCart);
  $('#cart-shop').addEventListener('click', () => { closeCart(); $('#catalog').scrollIntoView({ behavior: 'smooth' }); });
  $('#checkout-open').addEventListener('click', openCheckout);
  $('#clear-cart').addEventListener('click', () => { state.cart = []; saveCart(); renderCart(); toast(t('cartCleared')); });
  $('#add-gift-box').addEventListener('click', () => addToCart(productBySlug('constellation-box')?.id, 1));
  $('#search-toggle').addEventListener('click', () => { $('#catalog').scrollIntoView({ behavior: 'smooth' }); setTimeout(() => $('#catalog-search').focus(), 450); });
  $('#catalog-search').addEventListener('input', (event) => { state.search = event.target.value; renderCatalog(); });
  $('#catalog-sort').addEventListener('change', (event) => { state.sort = event.target.value; renderCatalog(); });
  $$('#category-tabs [data-category]').forEach((button) => button.addEventListener('click', () => {
    state.category = button.dataset.category;
    $$('#category-tabs [data-category]').forEach((entry) => entry.setAttribute('aria-selected', String(entry === button)));
    renderCatalog();
  }));
  $('#reset-filters').addEventListener('click', () => {
    state.category = 'all'; state.search = ''; state.sort = 'featured';
    $('#catalog-search').value = ''; $('#catalog-sort').value = 'featured';
    $$('#category-tabs [data-category]').forEach((entry) => entry.setAttribute('aria-selected', String(entry.dataset.category === 'all')));
    renderCatalog();
  });

  $$('[data-scroll-to]').forEach((button) => button.addEventListener('click', () => document.getElementById(button.dataset.scrollTo)?.scrollIntoView({ behavior: 'smooth' })));
  $('#menu-toggle').addEventListener('click', () => {
    const menu = $('#mobile-menu');
    const nextOpen = menu.hidden;
    menu.hidden = !nextOpen;
    $('#menu-toggle').setAttribute('aria-expanded', String(nextOpen));
  });
  $$('#mobile-menu a').forEach((link) => link.addEventListener('click', () => { $('#mobile-menu').hidden = true; $('#menu-toggle').setAttribute('aria-expanded', 'false'); }));

  $$('[data-dialog-close]').forEach((button) => button.addEventListener('click', () => closeDialog(button.closest('dialog'))));
  $$('dialog').forEach((dialog) => {
    dialog.addEventListener('click', (event) => {
      const rect = dialog.getBoundingClientRect();
      const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (!inside) closeDialog(dialog);
    });
    dialog.addEventListener('close', () => { if (!$('#cart-drawer').classList.contains('is-open') && !$$('dialog[open]').length) document.body.classList.remove('locked'); });
  });
  $$('[data-qty]').forEach((button) => button.addEventListener('click', () => changeProductQty(button.dataset.qty === 'plus' ? 1 : -1)));
  $('#product-dialog-add').addEventListener('click', () => {
    if (!state.activeProduct) return;
    addToCart(state.activeProduct.id, state.activeQty);
    closeDialog($('#product-dialog'));
    openCart();
  });
  $('#checkout-form').addEventListener('submit', submitOrder);
  $$('#checkout-form input[name="fulfillment"]').forEach((radio) => radio.addEventListener('change', () => {
    const delivery = radio.value === 'delivery' && radio.checked;
    $('#address-field').hidden = !delivery;
    $('#address-field input').required = delivery;
    renderCheckoutSummary();
  }));
  $('#newsletter-form').addEventListener('submit', submitNewsletter);

  window.addEventListener('scroll', () => $('#top').classList.toggle('is-scrolled', window.scrollY > 12), { passive: true });
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .1 });
  $$('.reveal').forEach((node) => observer.observe(node));
}

async function init() {
  initInteractions();
  applyTranslations();
  await loadProducts();
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch((error) => console.warn('Service worker unavailable:', error)));
  }
}

init().catch((error) => {
  console.error('Application failed to initialise:', error);
  toast('The storefront could not be initialised.', 'error');
});
