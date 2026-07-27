/* Pol Grek — content model (LitRes + Threads + bio) */
window.POL_GREK = {
 links: {
 litresAuthor: 'https://www.litres.ru/author/pol-grek/',
 amazonAuthor:
 'https://www.amazon.in/s?i=digital-text&rh=p_27%3A%25D0%259F%25D0%25BE%25D0%25BB%2B%25D0%2593%25D1%2580%25D1%258D%25D0%25BA&s=relevancerank&text=%D0%9F%D0%BE%D0%BB+%D0%93%D1%80%D1%8D%D0%BA&ref=dp_byline_sr_ebooks_1',
 threads: 'https://www.threads.net/@pol.grek',
 telegram: 'https://t.me/+KGQgs6MVHHYwZGVi',
 },

 /**
  * Партнёрка Литрес через AdvCake (my.advcake.com).
  * Формат генератора «Ручной»: те же query-параметры на URL litres.ru.
  *
  * {url}  — прямой URL книги/автора (без query), как есть
  * {url_enc} — encodeURIComponent(url) — для редких трекинг-доменов
  * {sub1} — метка (slug книги / author)
  *
  * utm_content + erid — из вашего кабинета; не менять без перегенерации.
  * См. ADVCATE.md
  */
 affiliate: {
  enabled: true,
  // Из генератора 2026-07-16: utm_content=f71f3ad5, erid=2VfnxyNkZrY, keyword=polgrek / site
  template:
   '{url}?utm_source=advcake&utm_medium=cpa&utm_campaign=affiliate&utm_content=f71f3ad5&advcake_params=&utm_term=&sub1={sub1}&keyword=polgrek+%2F+site&erid=2VfnxyNkZrY&advcake_method=1&m=1',
  authorSub1: 'author',
  authorUrl: '',
        bySlug: {
    'anatomiya-energii':
      'https://www.litres.ru/book/pol-grek/anatomiya-energii-73551286/?utm_source=advcake&utm_medium=cpa&utm_campaign=affiliate&utm_content=f71f3ad5&advcake_params=&utm_term=&sub1=anatomiya-energii&keyword=polgrek+%2F+site&erid=2VfnxyNkZrY&advcake_method=1&m=1',
    'biohacking-mozga':
      'https://www.litres.ru/book/pol-grek/biohaking-mozga-73755942/?utm_source=advcake&utm_medium=cpa&utm_campaign=affiliate&utm_content=f71f3ad5&advcake_params=&utm_term=&sub1=biohaking-mozga&keyword=polgrek%2F+site&erid=2VfnxyNkZrY&advcake_method=1&m=1',
    'detskiy-mozg':
      'https://www.litres.ru/book/pol-grek/detskiy-mozg-73952409/?utm_source=advcake&utm_medium=cpa&utm_campaign=affiliate&utm_content=f71f3ad5&advcake_params=&utm_term=&sub1=detskiy-mozg&keyword=polgrek+%2F+site&erid=2VfnxyNkZrY&advcake_method=1&m=1',
    'glubokiy-son-bez-tabletok':
      'https://www.litres.ru/book/pol-grek/glubokiy-son-bez-tabletok-neyrobiologiya-vosstanovleniya-mozga-no-73936374/?utm_source=advcake&utm_medium=cpa&utm_campaign=affiliate&utm_content=f71f3ad5&advcake_params=&utm_term=&sub1=glubokiy-son-bez&keyword=polgrek+%2F+site&erid=2VfnxyNkZrY&advcake_method=1&m=1',
    'mentalnyy-debag':
      'https://www.litres.ru/book/pol-grek/mental-nyy-debag-kak-perezagruzit-mozg-za-5-minut-v-den-73443798/?utm_source=advcake&utm_medium=cpa&utm_campaign=affiliate&utm_content=f71f3ad5&advcake_params=&utm_term=&sub1=mental-nyy-debag&keyword=polgrek+%2F+site&erid=2VfnxyNkZrY&advcake_method=1&m=1',
    'mozg-i-dengi':
      'https://www.litres.ru/book/pol-grek/mozg-i-dengi-74048009/?utm_source=advcake&utm_medium=cpa&utm_campaign=affiliate&utm_content=f71f3ad5&advcake_params=&utm_term=&sub1=mozg-i-dengi&keyword=polgrek+%2F+site&erid=2VfnxyNkZrY&advcake_method=1&m=1',
    'mozg-na-100':
      'https://www.litres.ru/book/pol-grek/mozg-na-100-nauchnyy-plan-sohraneniya-kognitivnyh-funkciy-do-glub-73556522/?utm_source=advcake&utm_medium=cpa&utm_campaign=affiliate&utm_content=f71f3ad5&advcake_params=&utm_term=&sub1=mozg-na-100&keyword=polgrek+%2F+site&erid=2VfnxyNkZrY&advcake_method=1&m=1',
    'mozg-ne-stareet-on-lomaetsya':
      'https://www.litres.ru/book/pol-grek/mozg-ne-stareet-on-lomaetsya-74072773/?utm_source=advcake&utm_medium=cpa&utm_campaign=affiliate&utm_content=f71f3ad5&advcake_params=&utm_term=&sub1=mozg-ne-stareet&keyword=polgrek+%2F+site&erid=2VfnxyNkZrY&advcake_method=1&m=1',
    'muzhskoy-mozg':
      'https://www.litres.ru/book/lora-grek/muzhskoy-mozg-73738682/?utm_source=advcake&utm_medium=cpa&utm_campaign=affiliate&utm_content=f71f3ad5&advcake_params=&utm_term=&sub1=muzhskoy-mozg&keyword=polgrek+%2F+site&erid=2VfnxyNkZrY&advcake_method=1&m=1',
    'neyrodengi':
      'https://www.litres.ru/book/lora-grek/neyrodengi-kak-mozg-meshaet-nam-bogatet-i-kak-zastavit-ego-rabot-74175788/?utm_source=advcake&utm_medium=cpa&utm_campaign=affiliate&utm_content=f71f3ad5&advcake_params=&utm_term=&sub1=neyrodengi-kak-mozg&keyword=polgrek+%2F+site&erid=2VfnxyNkZrY&advcake_method=1&m=1',
    'ostorozhnyy-biohaker':
      'https://www.litres.ru/book/pol-grek/ostorozhnyy-biohaker-73548892/?utm_source=advcake&utm_medium=cpa&utm_campaign=affiliate&utm_content=f71f3ad5&advcake_params=&utm_term=&sub1=ostorozhnyy-biohaker&keyword=polgrek+%2F+site&erid=2VfnxyNkZrY&advcake_method=1&m=1',
    'reset':
      'https://www.litres.ru/book/pol-grek/reset-neyrobiologiya-vygoraniya-i-vosstanovlenie-adaptacionnogo-r-74066286/?utm_source=advcake&utm_medium=cpa&utm_campaign=affiliate&utm_content=f71f3ad5&advcake_params=&utm_term=&sub1=reset-&keyword=polgrek+%2F+site&erid=2VfnxyNkZrY&advcake_method=1&m=1',
    'snachala-dengi-potom-soznanie':
      'https://www.litres.ru/book/pol-grek/snachala-dengi-potom-soznanie-73569016/?utm_source=advcake&utm_medium=cpa&utm_campaign=affiliate&utm_content=f71f3ad5&advcake_params=&utm_term=&sub1=snachala-dengi&keyword=polgrek+%2F+site&erid=2VfnxyNkZrY&advcake_method=1&m=1',
    'stress-i-mozg':
      'https://www.litres.ru/book/pol-grek/stress-i-mozg-74047783/?utm_source=advcake&utm_medium=cpa&utm_campaign=affiliate&utm_content=f71f3ad5&advcake_params=&utm_term=&sub1=stress-i-mozg&keyword=polgrek+%2F+site&erid=2VfnxyNkZrY&advcake_method=1&m=1',
    'svyashchennye-chasy':
      'https://www.litres.ru/book/pol-grek/svyaschennye-chasy-neyroinzheneriya-soznaniya-73479341/?utm_source=advcake&utm_medium=cpa&utm_campaign=affiliate&utm_content=f71f3ad5&advcake_params=&utm_term=&sub1=svyaschennye-chasy&keyword=polgrek+%2F+site&erid=2VfnxyNkZrY&advcake_method=1&m=1',
    'telo-pomnit-vse':
      'https://www.litres.ru/book/pol-grek/telo-pomnit-vse-no-ne-umeet-govorit-73602871/?utm_source=advcake&utm_medium=cpa&utm_campaign=affiliate&utm_content=f71f3ad5&advcake_params=&utm_term=&sub1=telo-pomnit-vse&keyword=polgrek+%2F+site&erid=2VfnxyNkZrY&advcake_method=1&m=1',
    'zhenskiy-mozg':
      'https://www.litres.ru/book/lora-grek/zhenskiy-mozg-73580927/?utm_source=advcake&utm_medium=cpa&utm_campaign=affiliate&utm_content=f71f3ad5&advcake_params=&utm_term=&sub1=zhenskiy-mozg&keyword=polgrek%2F+site&erid=2VfnxyNkZrY&advcake_method=1&m=1',
  },
 },

 socialProof: {
 source: 'Литрес / Amazon',
 sourceUrl: 'https://www.litres.ru/author/pol-grek/',
 checkedAt: '2026-07-18',
 // Real public reviews only. Do not invent more.
 reviews: [
  {
   author: 'Людмила',
   book: 'Мозг на 100+',
   slug: 'mozg-na-100',
   dateLabel: '14 мая 2026',
   store: 'litres',
   storeLabel: 'Литрес',
   text:
    'Отличная книга. Понятно изложен материал. Есть непонятные для простого человека медицинские термины, но это не мешает чтению. Очень легко читается.',
   url: 'https://www.litres.ru/book/pol-grek/mozg-na-100-nauchnyy-plan-sohraneniya-kognitivnyh-funkciy-do-glub-73556522/reviews/',
  },
  {
   author: "Bobbie's playlist",
   book: 'Анатомия энергии',
   slug: 'anatomiya-energii',
   dateLabel: '29 июня 2026',
   store: 'amazon',
   storeLabel: 'Amazon',
   rating: 4,
   title: 'Helps answer the questions you never ask',
   // Original English review on Amazon (US, Verified Purchase, Kindle)
   text:
    'This book is great for explaining issues that everybody goes through and pushes on the side as normal when they may not be.',
   url: 'https://www.amazon.com/dp/B0GTLMCS4N/',
   lang: 'en',
   verified: true,
  },
 ],
 items: [
  { book: 'Мозг на 100+', rating: 3.7, votes: 3, slug: 'mozg-na-100' },
  { book: 'Биохакинг мозга', rating: 4.2, votes: 5, slug: 'biohacking-mozga' },
  { book: 'Женский мозг', rating: 3.8, votes: 4, slug: 'zhenskiy-mozg' },
 ],
 note: 'Оценки с Литрес (18.07.2026). Тексты: один отзыв на Литрес («Мозг на 100+») и один на Amazon US — «Anatomy of Energy» / «Анатомия энергии», Verified Purchase, 4★, 29.06.2026. Оригинал на английском — не переводим и не «улучшаем».',
 },
 // Optional email for excerpt link (FormSubmit → legal.email). Empty endpoint = download only.
 emailCapture: {
  enabled: true,
  endpoint: 'https://formsubmit.co/ajax/hello@polgrek.site',
 },
 legal: {
 email: 'hello@polgrek.site',
 disclaimer:
 'Материалы сайта носят образовательный характер и не заменяют очную консультацию врача, психотерапевта или финансового советника. При острых состояниях обращайтесь к специалистам и службам экстренной помощи.',
 privacy:
 'Отрывок скачивается без email. Если оставляете почту — только для ссылки на главу и редких писем о книгах (не чаще раза в месяц), обработка через FormSubmit на hello@polgrek.site. Метрика 110711984 всегда включена. Подробнее: privacy.html.',
 },
 faq: [
 {
 q: 'Чем это отличается от обычного «биохакинга» в ленте?',
 a: 'Если коротко: нет курсов «станешь сверхчеловеком» и чудо-протоколов. Важные утверждения — с уровнями A–D: где данные крепче, а где нужна осторожность. Хайп (в том числе жёсткие «обязательные 2 литра») разбирается в тексте, а не продаётся. Главу можно прочитать здесь. Покупка — на Литрес, не в «закрытом клубе».',
 },
 {
 q: 'Почему на русском, если автор из Англии?',
 a: 'Жена — Лора Грэк, клинический психолог, МГУ. Русский Пол начал учить с 35, чтобы говорить с семьёй на одном языке. Книги и короткие посты — для той же аудитории, не «перевод ради рынка». Пишет коротко и по делу.',
 },
 {
 q: 'Насколько это научно — и кто отвечает?',
 a: 'Научпоп о мозге: где можно — уровни A–D, без обещания «всё уже доказано». Лора — клинический психолог, соавтор части книг (тревога, гормоны, EI). Это не медруководство: решения о здоровье — с вашим врачом. Книги и отзывы — на Литрес.',
 },
 {
 q: 'Где купить и как убедиться, что автор настоящий?',
 a: 'Проще всего — профиль на Литрес: litres.ru/author/pol-grek/ — книги, описания, оценки. Здесь 13 книг с отрывками; оплату мы не принимаем. Рядом — Telegram и Threads @pol.grek. Живые ответы, не вместо Литрес.',
 },
 ],
 methodExample: {
 title: 'Пример без хайпа — не абстракция',
 myth: '«Пейте 2 литра воды в день — иначе мозг не работает»',
 fact: 'Жёсткая цифра 2 л без учёта веса, климата и нагрузки — чаще маркетинг, чем физиология. База (сон, свет, движение, стресс) важнее ритуала «аквариума». Так же Пол разбирает хайп-советы: есть база уровня A–B — оставляем; остальное — не принимайте на веру.',
 },
 author: {
 name: 'Пол Грэк',
 nameEn: 'Pol Grek',
 threads: 'pol.grek',
 role: 'Прикладная нейропсихология · автор научпопа',
 tagline: 'Без воды и эзотерики — только то, что реально работает и подтверждено исследованиями.',
 bioShort:
 'Англичанин, пишет по-русски: язык с 35 лет — ради жены Лоры (клинический психолог, МГУ) и семьи. Научпоп о мозге без эзотерики и «сверхчеловека»: сначала на себе, потом в книгах. Где уместно — уровни A–D. Проверить автора проще всего на Литрес.',
 bioFull: [
 'Пол Грэк родился в Англии. Образование и практика связаны с когнитивными науками и работой с людьми в высоконагруженных средах. Пишет научпоп о мозге, стрессе и когнитивном здоровье без эзотерики.',
 'Консультирует по устойчивости к стрессу и когнитивной эффективности — в IT, финансах, командах. В книгах указываются уровни доказательности A–D и принцип минимально эффективной дозы.',
 'Русский язык начал учить с 35 лет, во многом благодаря жене, Лоре Грэк, клиническому психологу и выпускнице МГУ. Сегодня пишет по-русски коротко и по делу.',
 'Прежде чем писать о выгорании, сам прошёл через истощение: сначала разбирался, что помогает лично, потом оформлял материал для читателей. Публичный каталог — на Литрес.',
 ],
 education:
 'Когнитивные науки и прикладная нейропсихология: как устроен мозг и как люди выгорают в реальной работе.',
 practice:
 'Практика на стыке нейропсихологии, технологий и управления командами: устойчивость к стрессу и когнитивная эффективность. Не «коучинг успеха», а проверяемые протоколы.',
 publications:
 'Книги на Литрес — от «RESET» о выгорании до «Мозга на 100+» и «Мозга и денег». На сайте — 13 книг; весь каталог — на странице автора. В текстах — уровни доказательности A–D.',
 burnoutStory:
 'Сам прошёл через выгорание: «просто отдохни» не возвращало ясность. Сначала личный разбор, потом научпоп — «сначала починить себя, потом поделиться».',
 birth: 'Англия',
 russianFromAge: 35,
 principles: [
 {
 title: 'Доказательность',
 text: 'Каждое утверждение маркируется по уровню доказательности A–D — «мне кажется» не в счёт.',
 },
 {
 title: 'Без хайпа',
 text: 'Отдельно разбирает хайп и «волшебные» протоколы — что реально работает, а что нет.',
 },
 {
 title: 'Минимально эффективная доза',
 text: 'В книгу попадает наименьшее, что даёт результат — без раздувания списков рекомендаций.',
 },
 {
 title: 'Сначала на себе',
 text: 'Прежде чем что-то советовать, Пол проверяет это лично.',
 },
 ],
 voiceCode: {
 title: 'Код общения pol.grek (Threads)',
 patterns: [
 'Снятие диагноза с человека → перевод на физиологию',
 'Короткий переворот: «дело не в X, а в Y»',
 'Механика в 2–4 предложениях без академизма',
 'Конкретный минимум (15 мин, 1 шаг, 3 дня)',
 'Иногда — тёплая ирония и вопрос в конце',
 'Мягкий CTA к книге только когда просят / по теме',
 ],
 examples: [
 {
 situation: '«Я слетела с катушек?»',
 reply: 'Не слетела. Мозг честно говорит, что устал от абстрактного. KPI без видимого результата плохо кормит дофамин. Плантация — осязаемый итог. Это не деградация.',
 },
 {
 situation: '«Хочу улететь на 30 дней»',
 reply: 'Это не каприз — ресурс на исходе. Иногда хватает 3 дней настоящей тишины. Если через неделю после отпуска снова хочется сбежать — дело в режиме, не в отдыхе.',
 },
 {
 situation: '«Выгорание = я просто заебалась»',
 reply: 'Честнее не скажешь. «Заебалась» — ощущение, «выгорание» — механизм. Суть одна: тело говорит стоп, а мы едем на красный.',
 },
 ],
 },
 autobiography: [
 {
 checkpoint: '1. Опора: наука о мозге и живая практика',
 text: 'Внимание, сон, стресс, привычки — как устроено. Книги без эзотерики и без «стань сверхчеловеком». Где данные крепче — A–B, где осторожно — C–D.',
 },
 {
 checkpoint: '2. Работа с людьми под сильной нагрузкой',
 text: 'Работает с людьми из IT, финансов, команд: снаружи «всё успешно», внутри — туман, бессонница, стресс. Устойчивость, а не героизм до выгорания.',
 },
 {
 checkpoint: '3. Своё выгорание — не красивый слоган',
 text: 'Сам прошёл истощение: выходные и «просто отдохни» ясность не возвращали. Сначала починил себя — потом собрал в тексты. Без воды.',
 },
 {
 checkpoint: '4. Книги на Литрес — можно проверить',
 text: 'Полка на Литрес: мозг, биохакинг, RESET, стресс, энергия, деньги. С Лорой — женский и мужской мозг, EI. Описания и отзывы — на открытой площадке, не «закрытый клуб».',
 },
 {
 checkpoint: '5. Семья, русский язык и живой канал',
 text: 'Соавтор — Лора Грэк, клинический психолог, МГУ. Русский — с 35 лет, чтобы говорить с семьёй на одном языке. Threads @pol.grek — коротко: механизм и один шаг. Книга — только если уместно.',
 },
 ],
 threadsQuote: {
 text: 'Все мои книги теперь на ЛитРес… Про сон, мозг, бернаут, биохакинг и деньги — всё, что я собирал годами, сначала чтобы починить себя, потом чтобы поделиться с другими. Без воды и эзотерики.',
 date: 'июнь 2026',
 url: 'https://www.threads.net/@pol.grek',
 },
 },

 laura: {
 name: 'Лора Грэк',
 role: 'Клинический психолог · МГУ · соавтор',
 bio: 'Лора Грэк — клинический психолог, МГУ, соавтор. Голос кабинета: тревога, перименопауза, выгорание — то, с чем приходят на приём.',
 },

 quotes: [
 {
 text: 'Мозг обожает ощущение контроля. Даже когда его нет. Особенно когда его нет.',
 source: 'Пол Грэк',
 },
 {
 text: 'Мотивация — не причина действия. Это его побочный продукт.',
 source: 'Пол Грэк',
 },
 {
 text: 'Настоящий отдых начинается там, где заканчивается входящий поток.',
 source: 'Пол Грэк',
 },
 {
 text: 'Сила не в знаниях. Сила в том, что ты с ними делаешь.',
 source: 'Пол Грэк',
 },
 ],

 books: [
 {
 slug: 'mozg-na-100',
 coverFile: 'mozg-na-100.webp',
 excerptFile: 'mozg-na-100-otryvok.txt',
 flagship: true,
 featured: true,
 title: 'Мозг на 100+',
 subtitle: 'Что реально держит ясность с годами — и что остаётся мифом',
 pullQuote: 'Большинство людей ждут, что мозг «сам как-нибудь» продержится до пенсии. Мозг так не работает.',
 authors: ['Пол Грэк'],
 cover: 'cover-1',
 series: 'Серия «Мозг»',
 tags: ['когнитивное-здоровье'],
 genre: 'Научпоп',
 evidenceGrades: true,
 researchNote: 'По данным 100+ исследований · уровни A–D',
 promise: 'Не «гений за неделю». Как не потерять ясность, пока заняты «более важным».',
 annotation:
 'Не сборник лайфхаков. Спокойный план: что реально держит ясность с годами, а что — миф. Данные 100+ исследований, уровни A–D. Без «станешь сверхчеловеком» и без «просто пей больше воды».',
 forWhom: [
 'После 40 — туман, память, «ватность»',
 'Устали от рекламы «чудо-таблеток»',
 'Нужна механика, а не мотивационные слоганы',
 'Готовы к базе: сон, движение, нагрузка «с усилием»',
 ],
 takeaways: [
 'Сон, движение, давление, сахар — главные рычаги',
 '«Ночная очистка» мозга — без магии',
 'Когнитивный резерв: копить, а не ждать генов',
 'Что тихо крадёт память в обычном дне',
 '40 / 50 / 60+ — без паники «уже поздно»',
 ],
 excerpt:
 'Большинство ждут, что мозг «сам как-нибудь» дотянет до пенсии. Мозг так не работает. Это не лотерея и не приговор генов. Это сумма решений, которые либо копят резерв, либо медленно его жгут.\n\nНе про «гений за неделю». Про то, как не потерять ясность, пока заняты «более важным».',
 litres:
 'https://www.litres.ru/book/pol-grek/mozg-na-100-nauchnyy-plan-sohraneniya-kognitivnyh-funkciy-do-glub-73556522/',
 amazon:
 'https://www.amazon.com/dp/B0GTF2PQ21',
 },
 {
 slug: 'biohacking-mozga',
 coverFile: 'biohacking-mozga.webp',
 excerptFile: 'biohacking-mozga-otryvok.txt',
 flagship: true,
 featured: true,
 title: 'Биохакинг мозга',
 subtitle: 'Память, фокус, энергия — без «прокачки до поломки»',
 pullQuote: 'Я чувствовал себя сверхчеловеком. А потом перестал чувствовать что-либо. Выгорел.',
 authors: ['Пол Грэк'],
 cover: 'cover-2',
 series: 'Серия «Мозг»',
 tags: ['биохакинг', 'когнитивное-здоровье', 'энергия'],
 genre: 'Научпоп',
 evidenceGrades: true,
 researchNote: 'Уровни доказательности A–D · без «волшебных» протоколов',
 promise: 'Что оставить, что отсечь. База и минимальная эффективная доза — без «волшебных» стеков.',
 annotation:
 'Пробовал всё — и выгорел. Эта книга, чтобы вы не платили ту же цену. Нейропластичность, стресс, дофамин, сон, свет, движение. Главный навык биохакинга — вовремя остановиться.',
 forWhom: [
 'Пробовали «прокачать» мозг — и выгорели',
 'Хотите без инфоцыганства и хайпа ленты',
 'Только то, у чего есть данные (A–D)',
 'Нужен ритм, а не война с собой',
 ],
 takeaways: [
 'Нейропластичность — без сказки',
 'Почему «быстрые» методы выжигают',
 'Сон, свет, движение — до любых стеков',
 'Где граница у ноотропов и трендов',
 'Минимальная эффективная доза',
 ],
 excerpt:
 'Перепробовал всё: модафинил, ноотропы, пептиды, микродозинг, десятки «протоколов». Гордился. Чувствовал себя сверхчеловеком. Потом перестал чувствовать что-либо. Выгорел.\n\nВернулся к базе. К минимальной эффективной дозе. Книга — чтобы вы не платили полную цену за мои ошибки.',
 litres: 'https://www.litres.ru/book/pol-grek/biohaking-mozga-73755942/',
 amazon:
 'https://www.amazon.com/dp/B0H7YP5QJ9',
 },
 {
 slug: 'anatomiya-energii',
 coverFile: 'anatomiya-energii.webp',
 excerptFile: 'anatomiya-energii-otryvok.txt',
 title: 'Анатомия энергии',
 subtitle: 'Три системы, которые решают, хватит ли вам сил',
 pullQuote: "Ваш провал в 15:00 — не черта характера. Это физиология трёх систем энергии.",
 authors: ['Пол Грэк'],
 cover: 'cover-3',
 series: 'Восстановление',
 tags: ['энергия', 'стресс'],
 promise: 'Три системы. Если чините только одну — «всё правильное» не сработает.',
 annotation:
 'Провал в 15:00 — не характер. Три системы: митохондрии, когнитивная нагрузка, циркадный ритм. Чините одну и игнорируете остальные — будете удивляться, почему «всё правильное» не работает. Плюс: что не стоит покупать.',
 forWhom: [
 'К обеду уже пусто',
 'Смена или 10 часов за столом',
 'Устали от wellness-хайпа',
 'Нужны простые рычаги, не шкаф с банками',
 ],
 takeaways: [
 'Три источника энергии: mito / cognitive / circadian',
 'Самодиагностика и короткие эксперименты',
 'Evidence grades на вмешательства',
 'Что не работает: alkaline, detox-скамы',
 ],
 excerpt:
 'Провал в 15:00 — не черта характера. Это физиология.\n\nЭнергия — не «настрой» и не мораль. Это три системы. Чините одну — и будете удивляться, почему «всё правильное» не работает.',
 litres: 'https://www.litres.ru/book/pol-grek/anatomiya-energii-73551286/',
 amazon:
 'https://www.amazon.com/dp/B0GTLMCS4N',
 },
 {
 slug: 'mozg-i-dengi',
 coverFile: 'mozg-i-dengi.webp',
 excerptFile: 'mozg-i-dengi-otryvok.txt',
 title: 'Мозг и деньги',
 subtitle: 'Деньги — не математика. Это нейробиология',
 pullQuote: "Деньги — это не математика. Это нейробиология. Знания — потенциал, а не результат.",
 authors: ['Пол Грэк'],
 cover: 'cover-4',
 series: 'Серия «Мозг»',
 tags: ['деньги'],
 promise: 'Это не про жадность. Как мозг просчитывает риски — шопинг, страх потерь, статус в кредит.',
 annotation:
 'Доход «стоит», сила воли не спасает — и это не характер. Дофамин и шопинг, страх потерь, статус в кредит, ловушка дефицита. Без графиков акций. Про автоматику: чтобы префронтальная кора снова вела, а не импульс.',
 forWhom: [
 'Доход есть — накоплений нет',
 'Покупки «для настроения»',
 'Устали «брать себя в руки»',
 'Нужна механика, а не мораль',
 ],
 takeaways: [
 'Дофамин — гормон предвкушения',
 'Почему потери «болят» сильнее выигрышей',
 'Финансовые профили мозга',
 'Стресс и туннельное мышление',
 'Протокол архитектуры выбора',
 ],
 excerpt:
 '«Деньги — это не математика. Это нейробиология».\n\nЗнания — потенциал, не результат. Мозг отлично подменяет действие изучением: ещё книга, ещё курс — прогресс есть, результата нет. Сила не в знаниях. Сила в том, что ты с ними делаешь.',
 litres: 'https://www.litres.ru/book/pol-grek/mozg-i-dengi-74048009/',
 amazon:
 'https://www.amazon.com/dp/B0H6MN9DX1',
 },
 {
 slug: 'snachala-dengi-potom-soznanie',
 coverFile: 'snachala-dengi-potom-soznanie.webp',
 excerptFile: 'snachala-dengi-potom-soznanie-otryvok.txt',
 title: 'Сначала деньги, потом сознание',
 subtitle: 'Как внешний порядок перестраивает мышление',
 pullQuote: "Сначала наведи порядок во внешнем — и «сознание» само станет яснее. Без аффирмаций вместо дебиторки.",
 authors: ['Пол Грэк'],
 cover: 'cover-4',
 series: 'Серия «Мозг» · деньги',
 tags: ['деньги'],
 promise:
 'Сначала внешний порядок. «Сознание» само станет яснее. Не аффирмации вместо дебиторки.',
 annotation:
 'Читали про «сознание изобилия» — а дебиторка на месте. Меняем порядок: сначала действие и системы, потом ясность. Без «Вселенная подарит». Когда кортизол высокий, а «потока» нет — нужны скрипты и дедлайны, не аффирмации.',
 forWhom: [
 'Дырявая операционка — и «проработка блоков» вместо звонков',
 'Читали про изобилие — дебиторка и runway стоят',
 'Устали ждать «состояния» перед действием',
 'Нужна механика: CRM, скрипты, 90 дней — не метафизика',
 ],
 takeaways: [
 '«Сначала сознание» часто — бегство от звонков',
 'Действие раньше готовности',
 'Дебиторка как стресс 24/7',
 'Кейсы: маркетплейс, IT, курс без «полной готовности»',
 'Формула: операционка → результат → перестройка',
 ],
 excerpt:
 'Сначала наведи порядок во внешнем — и «сознание» само станет яснее.\n\nВзял телефон и начал звонить должникам. Без аффирмаций. Без «я достоин». Скрипт, CRM, жёсткий дедлайн. Через 45 дней — деньги на счету. Синдром самозванца ушёл не от «проработки» — от результата.\n\nСначала деньги. Потом сознание.',
 litres: 'https://www.litres.ru/book/pol-grek/snachala-dengi-potom-soznanie-73569016/',
 amazon: '',
 },
 {
 slug: 'stress-i-mozg',
 coverFile: 'stress-i-mozg.webp',
 excerptFile: 'stress-i-mozg-otryvok.txt',
 title: 'Стресс и мозг',
 subtitle: 'Когда «просто успокойся» не работает',
 pullQuote: "Мозг обожает ощущение контроля. Даже когда его нет. Особенно когда его нет.",
 authors: ['Пол Грэк'],
 cover: 'cover-5',
 series: 'Серия «Мозг»',
 tags: ['стресс', 'выгорание'],
 promise: 'Кортизол, амигдала, один следующий шаг. Без «просто расслабься».',
 annotation:
 'Мозг обожает ощущение контроля. Даже когда его нет. Особенно когда его нет. Кортизол, амигдала, префронтальная кора, сон, границы. «Просто успокойся» — самый бесполезный совет. Дайте системе один понятный шаг.',
 forWhom: [
 'Напряжение стало фоном',
 'Под стрессом — глупые решения',
 'Ведете людей или проекты',
 'Нужен механизм, а не аффирмации',
 ],
 takeaways: [
 'Стресс как адаптивный механизм',
 'Кортизол: мало и много — разные вещи',
 'Профиль стресса',
 'Техники и долгосрочная стратегия',
 ],
 excerpt:
 'Мозг обожает ощущение контроля. Даже когда его нет. Особенно когда его нет. Паника в тумане — не слабость. Системе не дали понятной задачи. Один конкретный шаг — и фону часто становится легче.',
 litres: 'https://www.litres.ru/book/pol-grek/stress-i-mozg-74047783/',
 amazon:
 '',
 },
 {
 slug: 'reset',
 coverFile: 'reset.webp',
 excerptFile: 'reset-otryvok.txt',
 flagship: true,
 featured: true,
 genre: 'Научпоп',
 evidenceGrades: true,
 researchNote: 'Уровни A–D · после системного истощения',
 title: 'RESET',
 subtitle: 'Когда выходные не помогают — и это не лень',
 pullQuote: "Усталость лечится отдыхом. Выгорание — нет. Можно проспать выходные и проснуться таким же.",
 authors: ['Пол Грэк'],
 cover: 'cover-6',
 series: 'Восстановление',
 tags: ['выгорание', 'стресс'],
 promise: 'Усталость лечится отдыхом. Выгорание — нет. С чего реально начинать.',
 annotation:
 'Писал и из своего опыта. Не про позитивное мышление. Почему «просто отдохни» не работает и с чего реально начинать. Аллостаз, ресурс, возврат контроля. Тело жмёт стоп — а мы едем на красный.',
 forWhom: [
 'Выходные не помогают',
 'Ничего не радует — и это уже не «просто устал»',
 '«Заебалась» — и хочется понять механизм',
 ],
 takeaways: [
 'Выгорание ≠ обычная усталость',
 'Маркеры системного истощения',
 'Почему «просто отдохни» не работает',
 'С чего начинать восстановление',
 ],
 excerpt:
 'Усталость лечится отдыхом. Выгорание — нет. Можно проспать выходные и проснуться таким же.\n\n«Заебалась» — ощущение. «Выгорание» — механизм. Кортизол, истощение. Суть одна: тело говорит стоп, а мы едем на красный.',
 litres:
 'https://www.litres.ru/book/pol-grek/reset-neyrobiologiya-vygoraniya-i-vosstanovlenie-adaptacionnogo-r-74066286/',
 amazon:
 'https://www.amazon.com/dp/B0H6K6BG5Z',
 },
 {
 slug: 'mentalnyy-debag',
 coverFile: 'mentalnyy-debag.webp',
 excerptFile: 'mentalnyy-debag-otryvok.txt',
 title: 'Ментальный дебаг',
 subtitle: 'Короткие шаги, когда нет сил на «личностный рост»',
 pullQuote: "Мотивация — не причина действия. Это его побочный продукт.",
 authors: ['Пол Грэк'],
 cover: 'cover-7',
 series: 'Восстановление',
 tags: ['выгорание', 'стресс'],
 promise: 'Мотивация — побочный продукт. Сначала движение, потом настрой.',
 annotation:
 'Когда мотивационные книги бесят, а на «проработать себя» нет сил. Короткие шаги: сначала действие, потом состояние. Не чините мотивацию — чините вход в действие.',
 forWhom: [
 'Тревога и пустота на фоне работы',
 'Нет сил на длинные программы',
 'Нужен шаг, а не вдохновение',
 ],
 takeaways: [
 'Диагностика «где сломалось»',
 'Короткие протоколы восстановления',
 'Как не спутать лень с физиологией',
 ],
 excerpt:
 '«Как себя заставить начать?» — уже вопрос не туда. Заставлять себя = работать против своего мозга. Мотивация — не причина действия. Это побочный продукт. Сначала маленькое движение. Мозг видит действие — и подстраивается. Не наоборот.',
 litres:
 'https://www.litres.ru/book/pol-grek/mental-nyy-debag-kak-perezagruzit-mozg-za-5-minut-v-den-73443798/',
 amazon:
 '',
 },
 {
 slug: 'ostorozhnyy-biohaker',
 coverFile: 'ostorozhnyy-biohaker.webp',
 excerptFile: 'ostorozhnyy-biohaker-otryvok.txt',
 title: 'Осторожный биохакер',
 subtitle: 'Сначала не навреди. Главный навык — вовремя остановиться',
 pullQuote: "2 литра воды в день — часто маркетинг, а не физиология. Главный навык биохакинга — вовремя остановиться.",
 authors: ['Пол Грэк'],
 cover: 'cover-8',
 series: 'Серия «Мозг»',
 tags: ['биохакинг'],
 promise: '«2 литра воды» — часто маркетинг. Фильтр хайпа вместо гонки за протоколами.',
 annotation:
 'Больше протоколов — часто хуже. Как отделить пользу от маркетинга, не превращая жизнь в лабораторию без выходных. Осторожный — не робкий. Это про дорогие ошибки, которых можно избежать.',
 forWhom: [
 'Только начинаете — и лента уже давит стеками',
 'Уже переборщили с экспериментами',
 ],
 takeaways: [
 'Философия осторожного подхода',
 'Фильтры для трендов и хайпа',
 'База важнее стека',
 ],
 excerpt:
 '2 литра в день — часто маркетинг, не физиология. Биохакинг — не «делать больше». Правильные вещи в правильном ритме. Главный навык — вовремя остановиться.',
 litres: 'https://www.litres.ru/book/pol-grek/ostorozhnyy-biohaker-73548892/',
 amazon:
 '',
 },
 {
 slug: 'svyashchennye-chasy',
 coverFile: 'svyashchennye-chasy.webp',
 excerptFile: 'svyashchennye-chasy-otryvok.txt',
 title: 'Священные часы',
 subtitle: 'Сон, циклы, свет — без мистики',
 pullQuote: "Лежите с телефоном и думаете, что отдыхаете. А мозг продолжает жевать информацию — как весь день.",
 authors: ['Пол Грэк'],
 cover: 'cover-9',
 series: 'Восстановление',
 tags: ['энергия', 'когнитивное-здоровье'],
 promise: 'Спите «8 часов» — и всё равно разбиты. Считайте циклы, уберите входящий поток.',
 annotation:
 'Сон и циркадные ритмы — без эзотерики. Циклы, свет, мелатонин. Короткие шаги, которые влезают в обычный день. Лежите с телефоном и думаете, что отдыхаете — мозг всё ещё жуёт входящий поток.',
 forWhom: [
 '8 часов в кровати — и всё равно разбиты',
 'Экран до ночи, телефон с утра',
 'Нужны короткие шаги, не «режим монаха»',
 ],
 takeaways: [
 'Считайте циклы, не только часы',
 'Свет утром и вечером',
 '5–20 минут протоколов в день',
 ],
 excerpt:
 'Лежите с телефоном и думаете, что отдыхаете. Мозг продолжает жевать новое — то же, что весь день. Настоящий отдых начинается там, где заканчивается входящий поток. Хотя бы 15 минут.',
 litres:
 'https://www.litres.ru/book/pol-grek/svyaschennye-chasy-neyroinzheneriya-soznaniya-73479341/',
 amazon:
 '',
 },
 {
 slug: 'zhenskiy-mozg',
 coverFile: 'zhenskiy-mozg.webp',
 excerptFile: 'zhenskiy-mozg-otryvok.txt',
 title: 'Женский мозг',
 subtitle: 'Гормоны, циклы, ясность — без мифов и «женской логики»',
 pullQuote: '«Я больше не понимаю свой мозг» — не слабость. Часто это физиология, а не «характер».',
 authors: ['Пол Грэк', 'Лора Грэк'],
 cover: 'cover-10',
 series: 'Вместе с Лорой',
 tags: ['гормоны', 'лора'],
 promise: 'Два голоса: лаборатория + кабинет. «Привыкайте» — не ответ.',
 annotation:
 '«Я больше не понимаю свой мозг» — часто физиология, не «характер». Цикл, перименопауза, ясность. Пол — механизмы. Лора (МГУ, клиника) — то, что реально говорят в кресле. Без эзотерики и ярлыков.',
 forWhom: [
 'Разные недели цикла — разный мозг',
 'Перименопауза: туман, тревога, бессонница',
 'Устали слышать «это возрастное» / «привыкайте»',
 'Партнёры, которым важно понимать',
 ],
 takeaways: [
 'Как гормоны меняют мышление и эмоции',
 'Цикл как нейробиологический контекст',
 'Что наука подтверждает — и чего нет',
 'Практики и красные флаги',
 ],
 excerpt:
 'Пол: Лора сказала: «Я больше не понимаю свой мозг». Ей было сорок три. Я полез в исследования — и это не слабость. Это физиология.\n\nЛора: Врач сказал «привыкайте». Я не хотела привыкать. Я хотела понимать.',
 litres: 'https://www.litres.ru/book/lora-grek/zhenskiy-mozg-73580927/',
 amazon:
 'https://www.amazon.com/dp/B0H7SB181H',
 },
 {
 slug: 'muzhskoy-mozg',
 coverFile: 'muzhskoy-mozg.webp',
 excerptFile: 'muzhskoy-mozg-otryvok.txt',
 title: 'Мужской мозг',
 subtitle: 'Энергия и фокус после 40 — без паники «как в 25»',
 pullQuote: "В сорок два энергия таяла к обеду. Я нейробиолог — но когда это коснулось меня, стало не по себе.",
 authors: ['Пол Грэк', 'Лора Грэк'],
 cover: 'cover-11',
 series: 'Вместе с Лорой',
 tags: ['гормоны', 'лора', 'энергия'],
 promise: 'Энергия тает к обеду. Это не «просто возраст». Взрослая версия, не охота за 25-ю.',
 annotation:
 'После 40: тестостерон, энергия, фокус, отношения. Без стыда, без паники «кризис среднего возраста», без чудес. Пол и Лора — механика, не мораль.',
 forWhom: [
 '35–55: энергия и фокус «не те»',
 'Раздражение «из ниоткуда»',
 'Нужна механика, а не «кризис среднего возраста»',
 ],
 takeaways: [
 'Мужской мозг — не «женский + тестостерон»',
 'Энергия и восстановление',
 'Когнитивная мощь после 40',
 'Отношения и 8-недельный протокол',
 ],
 excerpt:
 'В сорок два проснулся и понял: что-то сдвинулось. Энергия таяла к обеду. Фокус разъезжался. Я нейробиолог — но когда это коснулось меня, стало не по себе. «Просто возраст?» Дело глубже.',
 litres: 'https://www.litres.ru/book/lora-grek/muzhskoy-mozg-73738682/',
 amazon:
 '',
 },
 {
 slug: 'ei-2',
 coverFile: 'ei-2.webp',
 excerptFile: 'ei-2-otryvok.txt',
 title: 'Эмоциональный интеллект 2.0',
 subtitle: 'Амигдала, дофамин, стыд — вместо «просто успокойся»',
 pullQuote: '«Просто успокойся» — самый бесполезный совет нервной системе. Амигдала срабатывает быстрее мысли.',
 authors: ['Пол Грэк', 'Лора Грэк'],
 cover: 'cover-12',
 series: 'Психика',
 tags: ['лора', 'стресс'],
 promise: '«Просто успокойся» — самый бесполезный совет. Амигдала быстрее мысли.',
 annotation:
 'Амигдала быстрее мысли. Это не слабость — архитектура. «Дешёвый» дофамин ленты, стыд, вина. STOP, дыхание, один микрошаг. Научпоп — не замена терапии, если тяжело.',
 forWhom: [
 'Эмоции перехватывают руль',
 'Стыд и вина жрут ресурс',
 'Нужны навыки, а не «просто успокойся»',
 ],
 takeaways: [
 'Амигдала vs префронтальная кора',
 'Дофамин соцсетей',
 'STOP, RAIN, дыхание',
 'Стыд через самосострадание',
 ],
 excerpt:
 '«Просто успокойся» — самый бесполезный совет нервной системе. Амигдала быстрее мысли. Это не слабость характера. Это архитектура. Вопрос — как вернуть руль, когда тело уже в угрозе.',
 buyUrl: 'https://www.litres.ru/book/pol-grek/emocional-nyy-intellekt-2-0-73597132/',
 litres: 'https://www.litres.ru/book/pol-grek/emocional-nyy-intellekt-2-0-73597132/',
 amazon:
 '',
 },
 ],

 /* Статьи лаборатории — развёрнуты из постов Threads @pol.grek */
 articles: [], /* see data-articles.js — lab pages only */

 filters: [
 { id: 'all', label: 'Все книги' },
 {
 id: 'стресс',
 label: 'Стресс и энергия',
 match: (b) => b.tags.some((t) => ['стресс', 'энергия', 'выгорание'].includes(t)),
 },
 {
 id: 'когнитивное-здоровье',
 label: 'Когнитивное здоровье',
 match: (b) => b.tags.includes('когнитивное-здоровье'),
 },
 { id: 'деньги', label: 'Деньги', match: (b) => b.tags.includes('деньги') },
 { id: 'гормоны', label: 'Гормоны и пол', match: (b) => b.tags.includes('гормоны') },
 { id: 'выгорание', label: 'Выгорание', match: (b) => b.tags.includes('выгорание') },
 { id: 'лора', label: 'Вместе с Лорой', match: (b) => b.tags.includes('лора') },
 { id: 'биохакинг', label: 'Биохакинг', match: (b) => b.tags.includes('биохакинг') },
 ],
};

window.POL_GREK.getBook = (slug) => window.POL_GREK.books.find((b) => b.slug === slug);
window.POL_GREK.getArticle = (slug) => window.POL_GREK.articles.find((a) => a.slug === slug);
window.POL_GREK.relatedBooks = (slug, n = 3) => {
 const book = window.POL_GREK.getBook(slug);
 if (!book) return window.POL_GREK.books.slice(0, n);
 return window.POL_GREK.books
 .filter((b) => b.slug !== slug)
 .map((b) => ({
 b,
 score:
 b.tags.filter((t) => book.tags.includes(t)).length +
 (b.authors.some((a) => book.authors.includes(a)) ? 0.5 : 0),
 }))
 .sort((a, c) => c.score - a.score)
 .slice(0, n)
 .map((x) => x.b);
};
