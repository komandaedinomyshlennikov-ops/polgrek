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
 source: 'Литрес',
 sourceUrl: 'https://www.litres.ru/author/pol-grek/',
 checkedAt: '2026-07-13',
 items: [
 { book: 'Биохакинг мозга', rating: 5.0, votes: 4, slug: 'biohacking-mozga' },
 { book: 'Мозг на 100+', rating: 5.0, votes: 2, slug: 'mozg-na-100' },
 { book: 'Женский мозг', rating: 4.7, votes: 3, slug: 'zhenskiy-mozg' },
 ],
 note: 'Снято с профиля автора на Литрес, 13.07.2026. Книги вышли недавно — оценок мало, и это нормально. Без выдуманных цитат: только публичные оценки. Живые отзывы — на странице книги на Литрес.',
 },
 legal: {
 email: 'hello@polgrek.site',
 disclaimer:
 'Материалы сайта носят образовательный характер и не заменяют очную консультацию врача, психотерапевта или финансового советника. При острых состояниях обращайтесь к специалистам и службам экстренной помощи.',
 privacy:
 'Сайт не собирает персональные данные через собственные формы. На сайте всегда работает Яндекс.Метрика (счётчик 110711984: клики и Вебвизор). Переходы на Литрес и внешние площадки — по их правилам. Подробнее: privacy.html.',
 },
 faq: [
 {
 q: 'Это не очередной биохакинг-развод?',
 a: 'Сайт и книги не продают курсы «станешь сверхчеловеком» и чудо-протоколы. Есть дисклеймеры; в книгах важные утверждения помечаются уровнями A–D, где это уместно, и разбирается хайп (в т.ч. «обязательные 2 литра воды»). Проверяйте: отрывок бесплатно → покупка на Литрес, не «закрытый клуб».',
 },
 {
 q: 'Почему писал на русском, если родился в Англии?',
 a: 'Жена — Лора Грэк, клинический психолог, МГУ. Русский язык Пол начал учить с 35 лет — ради семьи и общего языка. Книги, Telegram и Threads @pol.grek — на русском: язык семьи и аудитории, не «перевод ради рынка». Стиль намеренно короткий — меньше когнитивной нагрузки.',
 },
 {
 q: 'Кто отвечает за научную часть?',
 a: 'Тексты Пола — прикладная нейропсихология и научпоп: где можно — уровни A–D, без маски «всё доказано». Лора — клинический психолог, соавтор части книг (тревога, гормоны, ЭИ). Это научпоп, не клиническое руководство: решения о здоровье — с вашим врачом. Проверяемая витрина — профиль на Литрес.',
 },
 {
 q: 'Где купить и как проверить, что автор настоящий?',
 a: 'Главная проверяемая точка — страница автора на Литрес: litres.ru/author/pol-grek/ (книги, описания, оценки). На сайте — 13 книг с отрывками; весь каталог — на Литрес. Сайт — витрина, не магазин: оплата на площадке. Живые каналы: Telegram t.me/+KGQgs6MVHHYwZGVi и Threads @pol.grek.',
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
 'Родился в Англии. Пишет научпоп о мозге без эзотерики — на стыке нейропсихологии, технологий и работы с командами. Русский язык начал учить с 35 лет, во многом благодаря жене Лоре, клиническому психологу и выпускнице МГУ. Сам прошёл через выгорание и только после этого начал писать книги. Проверяемая витрина — Литрес.',
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
 checkpoint: '1. База: мозг + реальная работа',
 text: 'Когнитивные науки и прикладная нейропсихология. Книги — не эзотерика, а протоколы с механизмами: сон, стресс, внимание, когнитивный резерв — с уровнями доказательности A–D.',
 },
 {
 checkpoint: '2. Практика: команды под нагрузкой',
 text: 'Консультации по устойчивости к стрессу и когнитивной эффективности — IT, финансы, high-load команды, где «снаружи успех», а внутри — туман и бессонница.',
 },
 {
 checkpoint: '3. Личное выгорание — не слоган',
 text: 'Сам прошёл истощение: выходные «просто отдохни» не помогали. Сначала разобрался, что возвращает ясность, — потом оформил в научпоп.',
 },
 {
 checkpoint: '4. Апробация: книги на Литрес',
 text: 'Публичная витрина — litres.ru/author/pol-grek/: когнитивное долголетие, биохакинг без вреда, RESET/выгорание, стресс, энергия, деньги; с Лорой — женский/мужской мозг и ЭИ.',
 },
 {
 checkpoint: '5. Лора · русский с 35 · живой канал',
 text: 'Соавтор Лора Грэк (клинический психолог, МГУ). Русский — с 35, ради семьи. Threads @pol.grek: не стыдить → механика → один шаг → мягкий CTA к книге.',
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
 bio: 'Лора Грэк — клинический психолог, выпускница МГУ, соавтор части книг. Клинический голос: тревога, перименопауза, выгорание — то, с чем люди приходят на приём.',
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
 subtitle: 'Научный план сохранения когнитивных функций до глубокой старости',
 pullQuote: 'Большинство людей ждут, что мозг «сам как-нибудь» продержится до пенсии. Мозг так не работает.',
 authors: ['Пол Грэк'],
 cover: 'cover-1',
 series: 'Серия «Мозг»',
 tags: ['когнитивное-здоровье'],
 promise: 'Протокол когнитивного долголетия — без лайфхаков и пустых обещаний.',
 annotation:
 '«Мозг на 100+» — не сборник лайфхаков, а научный план сохранения когнитивных функций на всю жизнь. Пол Грэк систематизировал данные 100+ исследований, включая работы 2025–2026 годов. Без магии и пустых обещаний — факты с уровнями доказательности A–D. Адаптировано для российского читателя.',
 forWhom: [
 'Хотите сохранить память и фокус на годы вперёд',
 'Устали от рекламы «чудо-таблеток» для мозга',
 'Ищете честный протокол, а не мотивационные слоганы',
 'Готовы к системной работе: сон, движение, нагрузка «с усилием»',
 ],
 takeaways: [
 'Почему сон, движение, давление и сахар — главные рычаги',
 'Как устроена «ночная очистка» мозга',
 'Как строить когнитивный резерв',
 'Какие привычные факторы крадут память',
 'Что делать в 40, 50, 60+ — без паники',
 ],
 excerpt:
 'Большинство людей ждут, что мозг «сам как-нибудь» продержится до пенсии. Мозг так не работает. Когнитивное долголетие — это не лотерея и не генетический приговор. Это сумма ежедневных решений, которые либо укрепляют резерв, либо медленно его сжигают.\n\nЭта книга — не про то, как стать гением за неделю. Это про то, как не потерять ясность ума, пока вы заняты «более важными делами».',
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
 subtitle: 'Как улучшить память, фокус и энергию — и не сломать психику',
 pullQuote: 'Я чувствовал себя сверхчеловеком. А потом перестал чувствовать что-либо. Выгорел.',
 authors: ['Пол Грэк'],
 cover: 'cover-2',
 series: 'Серия «Мозг»',
 tags: ['биохакинг', 'когнитивное-здоровье', 'энергия'],
 promise: 'Честный гайд: база и минимальная эффективная доза, без «волшебных» таблеток.',
 annotation:
 'Как улучшить память, фокус и энергию — и не сломать психику «прокачкой»? Честный гайд: нейропластичность, стресс, дофамин, сон, свет, движение, границы «прокачки». Главный навык — знать, когда хватит.',
 forWhom: [
 'Уже пробовали «прокачать мозг» и выгорели на протоколах',
 'Хотите подход без инфоцыганства',
 'Только то, что имеет доказательную базу',
 'Нужен ритм, а не война с собой',
 ],
 takeaways: [
 'Как работает нейропластичность',
 'Почему «быстрые» методы выгорают',
 'Сон, свет, движение: база до «прокачки»',
 'Где граница у ноотропов и трендов',
 'Минимальная эффективная доза (MED)',
 ],
 excerpt:
 'Я перепробовал всё: модафинил, ноотропы, пептиды, микродозинг, десятки «протоколов». Гордился собой. Чувствовал себя сверхчеловеком. А потом перестал чувствовать что-либо. Выгорел.\n\nВернулся к базе. К минимальной эффективной дозе. Эта книга — чтобы уберечь вас от моих ошибок.',
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
 promise: 'Три системы энергии — без хайпа и лишних «протоколов».',
 annotation:
 'Научно грамотный каркас хронической усталости. Три измеримые системы: митохондриальная, когнитивная и циркадная. Протоколы с уровнями доказательности, N-of-1 эксперименты, честный разбор того, что не стоит покупать.',
 forWhom: [
 'Ловите «провал в 15:00»',
 'Работаете в смене или за столом по 10 часов',
 'Устали от wellness-хайпа',
 'Хотите низкобюджетные протоколы',
 ],
 takeaways: [
 'Три источника энергии: mito / cognitive / circadian',
 'Самодиагностика и короткие эксперименты',
 'Evidence grades на вмешательства',
 'Что не работает: alkaline, detox-скамы',
 ],
 excerpt:
 'Ваш 3 PM crash — не черта характера. Это физиология.\n\nЭнергия — не «настрой» и не моральный ресурс. Это сумма трёх систем. Если чините только одну — будете удивляться, почему «всё правильное» не работает.',
 litres: 'https://www.litres.ru/book/pol-grek/anatomiya-energii-73551286/',
 amazon:
 'https://www.amazon.com/dp/B0GTLMCS4N',
 },
 {
 slug: 'mozg-i-dengi',
 coverFile: 'mozg-i-dengi.webp',
 excerptFile: 'mozg-i-dengi-otryvok.txt',
 title: 'Мозг и деньги',
 subtitle: 'Как мозг влияет на доходы — и что с этим делать',
 pullQuote: "Деньги — это не математика. Это нейробиология. Знания — потенциал, а не результат.",
 authors: ['Пол Грэк'],
 cover: 'cover-4',
 series: 'Серия «Мозг»',
 tags: ['деньги'],
 promise: 'Как мозг мешает копить: шопинг, страх потерь, статус в кредит.',
 annotation:
 'Почему доход «стоит», а сила воли не спасает? Научпоп о финансовом поведении: дофамин и шопинг, страх потерь, статус в кредит, ловушка дефицита. Без графиков акций — про автоматику, чтобы префронтальная кора снова управляла деньгами.',
 forWhom: [
 'Хороший доход — и нет накоплений',
 'Импульсивные покупки «для настроения»',
 'Устали «брать себя в руки»',
 'Хотите механику, а не мораль',
 ],
 takeaways: [
 'Дофамин — гормон предвкушения',
 'Почему потери «болят» сильнее выигрышей',
 'Финансовые профили мозга',
 'Стресс и туннельное мышление',
 'Протокол архитектуры выбора',
 ],
 excerpt:
 '«Деньги — это не математика. Это нейробиология».\n\nЗнания — это потенциал, а не результат. Мозг отлично умеет подменять действие изучением: ещё одна книга, ещё один курс — ощущение прогресса есть, результата нет. Сила не в знаниях. Сила в том, что ты с ними делаешь.',
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
 'Сначала операционка и результат — потом «состояние». Не аффирмации вместо дебиторки.',
 annotation:
 'Для тех, кто читал Джиканди и ждал «сознания изобилия», а дебиторка осталась. Пол Грэк меняет последовательность: внешнее действие → деньги и системы → нейронная перестройка уверенности. Поведенческая активация, DSO, скрипты, кейсы предпринимателей. Без «Вселенная подарит» — инженерный протокол, когда кортизол высокий, а «потока» нет.',
 forWhom: [
 'Предприниматели и самозанятые с «дырявой» операционкой',
 'Читали про изобилие — а дебиторка и runway не растут',
 'Устали «прорабатывать блоки» вместо звонков клиентам',
 'Нужна механика: CRM, скрипты, 90 дней — не метафизика',
 ],
 takeaways: [
 'Почему «сначала сознание» часто становится бегством',
 'Поведенческая активация: действие раньше готовности',
 'DSO и дебиторка как нейронный стресс 24/7',
 'Кейсы: маркетплейс, IT, курс без «полной готовности»',
 'Формула: операционка → результат → перестройка мозга',
 ],
 excerpt:
 'Сначала наведи порядок во внешнем — и тень (то самое «сознание») сама станет красивой.\n\nВзял телефон и начал звонить должникам. Без аффирмаций. Без «я достоин». Просто скрипт, CRM и жёсткий дедлайн. Через 45 дней — деньги на счету. Синдром самозванца ушёл не от «проработки» — от результата.\n\nФормула: внешнее действие → деньги + системы → нейронная перестройка. Сначала деньги. Потом сознание.',
 litres: 'https://www.litres.ru/book/pol-grek/snachala-dengi-potom-soznanie-73569016/',
 amazon: '',
 },
 {
 slug: 'stress-i-mozg',
 coverFile: 'stress-i-mozg.webp',
 excerptFile: 'stress-i-mozg-otryvok.txt',
 title: 'Стресс и мозг',
 subtitle: 'Как перестать выгорать и начать использовать стресс как топливо',
 pullQuote: "Мозг обожает ощущение контроля. Даже когда его нет. Особенно когда его нет.",
 authors: ['Пол Грэк'],
 cover: 'cover-5',
 series: 'Серия «Мозг»',
 tags: ['стресс', 'выгорание'],
 promise: 'Стресс как механизм: кортизол, амигдала и возврат контроля.',
 annotation:
 'Научный план: кортизол, амигдала, префронтальная кора, телесные маркеры, дыхание, сон, движение, границы. Без «просто расслабься».',
 forWhom: [
 'Хроническое напряжение',
 'Глупые решения под стрессом',
 'Руководите людьми или проектами',
 'Хотите механизм, а не аффирмации',
 ],
 takeaways: [
 'Стресс как адаптивный механизм',
 'Кортизол: мало и много — разные вещи',
 'Профиль стресса',
 'Техники и долгосрочная стратегия',
 ],
 excerpt:
 'Мозг обожает ощущение контроля. Даже когда его нет. Особенно когда его нет. Поэтому паника при неопределённости — не слабость. Просто мозгу не поставили понятную задачу. Дайте один конкретный следующий шаг — и станет полегче.',
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
 title: 'RESET',
 subtitle: 'Нейробиология выгорания и восстановление адаптационного ресурса',
 pullQuote: "Усталость лечится отдыхом. Выгорание — нет. Можно проспать выходные и проснуться таким же.",
 authors: ['Пол Грэк'],
 cover: 'cover-6',
 series: 'Восстановление',
 tags: ['выгорание', 'стресс'],
 promise: 'Когда выходные не восстанавливают — протокол после системного истощения.',
 annotation:
 'Писал в том числе из собственного опыта. Не про позитивное мышление — про то, почему отдых не помогает и с чего реально начинать восстановление. Аллостаз, адаптационный ресурс, возврат когнитивного контроля.',
 forWhom: [
 'Отдых не помогает',
 'Ничего не радует',
 '«Заебалась» — и хочется понять механизм',
 ],
 takeaways: [
 'Выгорание ≠ обычная усталость',
 'Маркеры системного истощения',
 'Почему «просто отдохни» не работает',
 'С чего начинать восстановление',
 ],
 excerpt:
 'Усталость лечится отдыхом. Бёрнаут — нет. Можно проспать выходные и проснуться таким же.\n\n«Заебалась» описывает ощущение. «Выгорание» объясняет механизм. Кортизол, истощение. Суть одна: тело говорит стоп, а мы продолжаем ехать на красный.',
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
 subtitle: 'Как перезагрузить мозг за 5 минут в день',
 pullQuote: "Мотивация — не причина действия. Это его побочный продукт.",
 authors: ['Пол Грэк'],
 cover: 'cover-7',
 series: 'Восстановление',
 tags: ['выгорание', 'стресс'],
 promise: 'Короткие протоколы, когда нет сил на «личностный рост».',
 annotation:
 'Практический протокол перезагрузки. Когда мотивационные книги раздражают, а сил на длинные практики нет — короткие, физиологически обоснованные шаги возврата ясности.',
 forWhom: [
 'Тревога и истощение на фоне работы',
 'Нет ресурса на длинные программы',
 'Нужен протокол, а не вдохновение',
 ],
 takeaways: [
 'Диагностика «где сломалось»',
 'Короткие протоколы восстановления',
 'Как не спутать лень с физиологией',
 ],
 excerpt:
 'Если возник вопрос «как себя заставить начать?» — заставлять себя значит работать против собственного мозга. Мотивация — не причина действия. Это его побочный продукт. Сначала маленькое движение. Мозг видит действие — и подстраивается. Не наоборот.',
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
 subtitle: 'Манифест подхода «сначала не навреди»',
 pullQuote: "2 литра воды в день — часто маркетинг, а не физиология. Главный навык биохакинга — вовремя остановиться.",
 authors: ['Пол Грэк'],
 cover: 'cover-8',
 series: 'Серия «Мозг»',
 tags: ['биохакинг'],
 promise: 'Осторожность вместо гонки за хайпом. «2 литра воды» — иногда просто маркетинг.',
 annotation:
 'Манифест осторожного биохакинга. Почему «больше протоколов» часто хуже, и как отделить пользу от маркетинга, не превращая жизнь в лабораторию без выходных.',
 forWhom: [
 'Новички в биохакинге',
 'Те, кто уже переборщил с экспериментами',
 ],
 takeaways: [
 'Философия осторожного подхода',
 'Фильтры для трендов и хайпа',
 'База важнее стека',
 ],
 excerpt:
 '2 литра воды в день — маркетинг, а не физиология. Биохакинг — не про то, чтобы делать больше. Это про то, чтобы делать правильные вещи в правильном ритме. Главный навык — вовремя остановиться.',
 litres: 'https://www.litres.ru/book/pol-grek/ostorozhnyy-biohaker-73548892/',
 amazon:
 '',
 },
 {
 slug: 'svyashchennye-chasy',
 coverFile: 'svyashchennye-chasy.webp',
 excerptFile: 'svyashchennye-chasy-otryvok.txt',
 title: 'Священные часы',
 subtitle: 'Нейроинженерия сознания · сон, циклы, свет',
 pullQuote: "Лежите с телефоном и думаете, что отдыхаете. А мозг продолжает жевать информацию — как весь день.",
 authors: ['Пол Грэк'],
 cover: 'cover-9',
 series: 'Восстановление',
 tags: ['энергия', 'когнитивное-здоровье'],
 promise: 'Если главная проблема — разбитость с утра и сбитый режим.',
 annotation:
 'О сне и циркадных ритмах без эзотерики. Циклы, свет, мелатонин — и короткие протоколы, которые встраиваются в обычный день. (На Литрес также: «Нейроинженерия сознания» / линейка про сон.)',
 forWhom: [
 'Спите 8 часов и всё равно разбиты',
 'Экраны до ночи / с телефона с утра',
 'Нужны короткие протоколы',
 ],
 takeaways: [
 'Считайте циклы, не только часы',
 'Свет утром и вечером',
 '5–20 минут протоколов в день',
 ],
 excerpt:
 'Лежите с телефоном и думаете, что отдыхаете. А мозг продолжает жевать новую информацию — то же, что весь день. Настоящий отдых начинается там, где заканчивается входящий поток. Хотя бы на 15 минут.',
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
 subtitle: 'Научный гид по гормонам, циклам и когнитивному здоровью',
 pullQuote: '«Я больше не понимаю свой мозг» — не слабость. Часто это физиология, а не «характер».',
 authors: ['Пол Грэк', 'Лора Грэк'],
 cover: 'cover-10',
 series: 'Вместе с Лорой',
 tags: ['гормоны', 'лора'],
 promise: 'Два голоса: лаборатория + кабинет. Без мифов и «женской логики».',
 annotation:
 'Нейробиологический и клинико-психологический подход к женскому мозгу. Без эзотерики и мифов. Доказательная медицина, цикл, перименопауза, когнитивное здоровье. Пол — механизмы. Лора (МГУ, клиника) — то, что женщины реально говорят в кресле.',
 forWhom: [
 'Хотите понять разные недели цикла',
 'Перименопауза: туман, тревога, бессонница',
 'Устали слышать «это возрастное»',
 'Партнёры, которые хотят понимать',
 ],
 takeaways: [
 'Как гормоны меняют мышление и эмоции',
 'Цикл как нейробиологический контекст',
 'Что наука подтверждает — и чего нет',
 'Практики и красные флаги',
 ],
 excerpt:
 'Пол: Лора сказала: «Я больше не понимаю свой мозг». Ей было сорок три. Я начал читать исследования — и понял: это не слабость. Это физиология.\n\nЛора: Врач сказал «привыкайте». Я не хотела привыкать. Я хотела понимать.',
 litres: 'https://www.litres.ru/book/lora-grek/zhenskiy-mozg-73580927/',
 amazon:
 'https://www.amazon.com/dp/B0H7SB181H',
 },
 {
 slug: 'muzhskoy-mozg',
 coverFile: 'muzhskoy-mozg.webp',
 excerptFile: 'muzhskoy-mozg-otryvok.txt',
 title: 'Мужской мозг',
 subtitle: 'Сила, фокус и характер после сорока',
 pullQuote: "В сорок два энергия таяла к обеду. Я нейробиолог — но когда это коснулось меня, стало не по себе.",
 authors: ['Пол Грэк', 'Лора Грэк'],
 cover: 'cover-11',
 series: 'Вместе с Лорой',
 tags: ['гормоны', 'лора', 'энергия'],
 promise: 'После 40: энергия, фокус, характер — взрослая версия, а не охота за «как в 25».',
 annotation:
 'Мужской мозг после 40: тестостерон, энергия, фокус, отношения, 8-недельный протокол. Пол и Лора — без стыда, без паники, без чудес.',
 forWhom: [
 'Мужчины 35–55: энергия и фокус «не те»',
 'Раздражение «из ниоткуда»',
 'Хотите механику, а не «кризис среднего возраста»',
 ],
 takeaways: [
 'Мужской мозг — не «женский + тестостерон»',
 'Энергия и восстановление',
 'Когнитивная мощь после 40',
 'Отношения и 8-недельный протокол',
 ],
 excerpt:
 'В сорок два я проснулся и почувствовал: что-то сдвинулось. Энергия таяла к обеду. Концентрация рассеивалась. Я нейробиолог — но когда это коснулось меня, стало не по себе. «Неужели это просто возраст?» Дело глубже.',
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
 promise: 'Нейробиология + клиническая психология. Без эзотерики.',
 annotation:
 'Почему амигдала быстрее мысли; «дешёвый» дофамин соцсетей; стыд и вина; STOP, RAIN, дыхание. Научпоп и самопомощь — не замена терапии.',
 forWhom: [
 'Эмоции «перехватывают руль»',
 'Стыд и вина мешают жить',
 'Хотите навыки, а не аффирмации',
 ],
 takeaways: [
 'Амигдала vs префронтальная кора',
 'Дофамин соцсетей',
 'STOP, RAIN, дыхание',
 'Стыд через самосострадание',
 ],
 excerpt:
 '«Просто успокойся» — самый бесполезный совет нервной системе. Амигдала срабатывает быстрее мысли. Это не слабость характера. Это архитектура мозга. Вопрос — как вернуть контроль, когда тело уже в режиме угрозы.',
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
