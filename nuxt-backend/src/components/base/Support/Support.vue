<script setup lang="ts">
const data = ref([
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'Алиса Джонсон',
    email: 'alice.johnson@example.com',
    position: 'Руководитель проекта',
    organization: 'Tech Solutions Inc.',
    question:
      'Мы сталкиваемся с задержками в сроках проекта из-за зависимости от других команд. Команда бэкенда отстает от графика, что влияет на возможность продолжить разработку фронтенда. Какие шаги мы можем предпринять, чтобы более эффективно разрешить эти зависимости? Есть ли способ приоритизировать задачи иначе, чтобы избежать дальнейших задержек?',
    remoteId: '100234567',
    createdAt: '2024-10-01T08:30:00Z',
    updatedAt: '2024-10-05T10:00:00Z',
    status: 'viewed',
  },
  {
    id: '6e1a842b-ff21-4c3b-b2f6-1b9f6f0c6a45',
    name: 'Боб Смит',
    email: 'bob.smith@example.com',
    position: 'Программист',
    organization: 'Innovatech LLC',
    question:
      'Я сталкиваюсь с проблемами производительности нашего приложения при интеграции некоторых сторонних библиотек с открытым исходным кодом. Время загрузки значительно увеличилось, и периодически возникают сбои. Существуют ли конкретные рекомендации или лучшие практики для оптимизации этих библиотек? Также, есть ли предпочтительный способ профилирования производительности, чтобы помочь выявить корень проблемы?',
    remoteId: '200345678',
    createdAt: '2024-10-02T09:15:00Z',
    updatedAt: '2024-10-06T11:20:00Z',
    status: 'technical',
  },
  {
    id: '9fd72d26-7d24-4855-bada-4bfe74fcd8b1',
    name: 'Кэрол Уайт',
    email: 'carol.white@example.com',
    position: 'Маркетолог',
    organization: 'MarketForce Ltd.',
    question:
      'Показатели вовлеченности пользователей в нашей последней кампании оказались ниже ожидаемых. Мы следовали стандартным маркетинговым тактикам, но кажется, что наша аудитория не взаимодействует так активно, как предполагалось. Может ли это быть связано с форматом нашего контента, или следует рассмотреть альтернативные стратегии? Будут полезны любые идеи по улучшению вовлеченности через определенные каналы.',
    remoteId: '300456789',
    createdAt: '2024-10-03T10:45:00Z',
    updatedAt: '2024-10-07T12:30:00Z',
    status: 'new',
  },
  {
    id: '7c6b580d-bdcf-4f7c-91c4-0f5ad2d02412',
    name: 'Дэвид Ли',
    email: 'david.lee@example.com',
    position: 'Аналитик данных',
    organization: 'Data Insights Co.',
    question:
      'Анализируя наши данные, я замечаю несоответствия в исторических записях, особенно с пропущенными данными за ключевые периоды прошлого года. Это влияет на нашу способность генерировать точные прогнозы. Существует ли рекомендуемый метод для заполнения этих пробелов, например, с использованием оценки или интерполяции, чтобы повысить надежность наших прогнозов?',
    remoteId: '400567890',
    createdAt: '2024-10-04T11:00:00Z',
    updatedAt: '2024-10-08T13:45:00Z',
    status: 'closed',
  },
  {
    id: '4c9743d3-8b8f-4926-8f8d-cb19eced4e12',
    name: 'Ева Мартинес',
    email: 'eve.martinez@example.com',
    position: 'Дизайнер продукта',
    organization: 'DesignHub',
    question:
      'Наши текущие принципы дизайна кажутся слишком ограничивающими, ограничивая нашу креативность и гибкость. Мы стремимся к балансу между последовательностью и инновациями, но часто сталкиваемся с трудностями при внедрении новых идей без противоречия установленным стандартам. Есть ли стратегии для обновления дизайн-систем, которые позволят больше творческой свободы, не теряя при этом целостности?',
    remoteId: '500678901',
    createdAt: '2024-10-05T12:15:00Z',
    updatedAt: '2024-10-09T14:00:00Z',
    status: 'deferred',
  },
  {
    id: '10a94ddf-ff90-4f61-8a76-8efb4a634001',
    name: 'Фрэнк Уилсон',
    email: 'frank.wilson@example.com',
    position: 'Менеджер по персоналу',
    organization: 'People First Corp.',
    question:
      'Уровень вовлеченности и морального состояния сотрудников снижается, как показали результаты нашего последнего опроса. Многие сотрудники сообщают, что чувствуют себя перегруженными и недооцененными, что влияет на их продуктивность. Мы рассматриваем возможность введения новых тимбилдинговых мероприятий, но хотели бы получить советы по эффективным методам для устойчивого повышения морального духа и устранения коренных причин.',
    remoteId: '600789012',
    createdAt: '2024-10-06T13:00:00Z',
    updatedAt: '2024-10-10T15:15:00Z',
    status: 'progress',
  },
  {
    id: 'f7630247-fbd1-40b8-8b6e-2e4e20e41d23',
    name: 'Грейс Ким',
    email: 'grace.kim@example.com',
    position: 'Операционный менеджер',
    organization: 'LogiX Solutions',
    question:
      'Наша команда столкнулась с множеством логистических проблем при координации поставок в разных регионах. Текущая система планирования устарела и не поддерживает отслеживание в реальном времени, что приводит к задержкам и жалобам клиентов. Можете ли вы предложить современные решения для логистики или программное обеспечение, которое может повысить эффективность и обеспечить больший контроль над нашими операциями?',
    remoteId: '700890123',
    createdAt: '2024-10-07T14:30:00Z',
    updatedAt: '2024-10-11T16:45:00Z',
    status: 'technical',
  },
  {
    id: '1b47a5ef-a821-49e7-bb1f-e2bc7e5c9321',
    name: 'Хэнк Браун',
    email: 'hank.brown@example.com',
    position: 'Финансовый специалист',
    organization: 'Financial Growth Ltd.',
    question:
      'Мы обнаружили некоторые несоответствия в наших квартальных финансовых отчетах, возможно, из-за неконсистентных записей из различных отделов. Трудно определить источники этих проблем. Существуют ли инструменты или процессы, которые мы могли бы внедрить для оптимизации ввода данных и обеспечения последовательности между отделами? Кроме того, мы бы хотели получить советы по лучшим практикам для финансовой сверки.',
    remoteId: '800901234',
    createdAt: '2024-10-08T15:00:00Z',
    updatedAt: '2024-10-12T17:30:00Z',
    status: 'deferred',
  },
  {
    id: 'a1837f31-6d89-47b6-9b36-7d486841b287',
    name: 'Айви Дэвис',
    email: 'ivy.davis@example.com',
    position: 'Копирайтер',
    organization: 'Creative Texts Co.',
    question:
      'В последнее время наша команда сталкивается с отсутствием вдохновения и усталостью от написания. Спрос на качественные и оригинальные статьи остаётся высоким, но становится всё сложнее соблюдать сроки, поддерживая при этом креативность. Есть ли рекомендации или инструменты, которые помогут обновить творческий процесс и поддерживать вдохновение у наших писателей?',
    remoteId: '900012345',
    createdAt: '2024-10-09T16:30:00Z',
    updatedAt: '2024-10-13T18:15:00Z',
    status: 'closed',
  },
  {
    id: 'd83acdf3-4f99-4fa4-b9f8-cf4ed0937167',
    name: 'Джек Харрис',
    email: 'jack.harris@example.com',
    position: 'Специалист по поддержке',
    organization: 'Supportly Inc.',
    question:
      'Мы наблюдаем рост числа обращений по вопросам сбоев в работе продукта, что вызывает недовольство среди пользователей и сотрудников службы поддержки. Эти обращения часто перегружают наши ресурсы. Какие процессы или инструменты могут помочь лучше управлять и приоритизировать такие обращения? Любые советы по сокращению времени отклика и повышению скорости разрешения вопросов будут полезны.',
    remoteId: '100123456',
    createdAt: '2024-10-10T17:45:00Z',
    updatedAt: '2024-10-14T19:00:00Z',
    status: 'progress',
  },
  {
    id: '10a94ddf-ff90-4f61-8a76-8efq4a534001',
    name: 'Фрэнк Уилсон',
    email: 'frank.wilson@example.com',
    position: 'Менеджер по персоналу',
    organization: 'People First Corp.',
    question:
      'Уровень вовлеченности и морального состояния сотрудников снижается, как показали результаты нашего последнего опроса. Многие сотрудники сообщают, что чувствуют себя перегруженными и недооцененными, что влияет на их продуктивность. Мы рассматриваем возможность введения новых тимбилдинговых мероприятий, но хотели бы получить советы по эффективным методам для устойчивого повышения морального духа и устранения коренных причин.',
    remoteId: '600789012',
    createdAt: '2024-10-06T13:00:00Z',
    updatedAt: '2024-10-10T15:15:00Z',
    status: 'progress',
  },
  {
    id: 'f7630247-fbd1-40b8-8b6e-2e4c20q41d23',
    name: 'Грейс Ким',
    email: 'grace.kim@example.com',
    position: 'Операционный менеджер',
    organization: 'LogiX Solutions',
    question:
      'Наша команда столкнулась с множеством логистических проблем при координации поставок в разных регионах. Текущая система планирования устарела и не поддерживает отслеживание в реальном времени, что приводит к задержкам и жалобам клиентов. Можете ли вы предложить современные решения для логистики или программное обеспечение, которое может повысить эффективность и обеспечить больший контроль над нашими операциями?',
    remoteId: '700890123',
    createdAt: '2024-10-07T14:30:00Z',
    updatedAt: '2024-10-11T16:45:00Z',
    status: 'technical',
  },
  {
    id: '1b47a5ef-a821-49e7-bb1f-e2bc7t5s9321',
    name: 'Хэнк Браун',
    email: 'hank.brown@example.com',
    position: 'Финансовый специалист',
    organization: 'Financial Growth Ltd.',
    question:
      'Мы обнаружили некоторые несоответствия в наших квартальных финансовых отчетах, возможно, из-за неконсистентных записей из различных отделов. Трудно определить источники этих проблем. Существуют ли инструменты или процессы, которые мы могли бы внедрить для оптимизации ввода данных и обеспечения последовательности между отделами? Кроме того, мы бы хотели получить советы по лучшим практикам для финансовой сверки.',
    remoteId: '800901234',
    createdAt: '2024-10-08T15:00:00Z',
    updatedAt: '2024-10-12T17:30:00Z',
    status: 'deferred',
  },
  {
    id: 'a1837f31-6d89-47b6-9b36-7d486841bf4f5',
    name: 'Айви Дэвис',
    email: 'ivy.davis@example.com',
    position: 'Копирайтер',
    organization: 'Creative Texts Co.',
    question:
      'В последнее время наша команда сталкивается с отсутствием вдохновения и усталостью от написания. Спрос на качественные и оригинальные статьи остаётся высоким, но становится всё сложнее соблюдать сроки, поддерживая при этом креативность. Есть ли рекомендации или инструменты, которые помогут обновить творческий процесс и поддерживать вдохновение у наших писателей?',
    remoteId: '900012345',
    createdAt: '2024-10-09T16:30:00Z',
    updatedAt: '2024-10-13T18:15:00Z',
    status: 'closed',
  },
  {
    id: 'd83acdf3-4f99-4fa4-b9f8-cf4ed0935432',
    name: 'Джек Харрис',
    email: 'jack.harris@example.com',
    position: 'Специалист по поддержке',
    organization: 'Supportly Inc.',
    question:
      'Мы наблюдаем рост числа обращений по вопросам сбоев в работе продукта, что вызывает недовольство среди пользователей и сотрудников службы поддержки. Эти обращения часто перегружают наши ресурсы. Какие процессы или инструменты могут помочь лучше управлять и приоритизировать такие обращения? Любые советы по сокращению времени отклика и повышению скорости разрешения вопросов будут полезны.',
    remoteId: '100123456',
    createdAt: '2024-10-10T17:45:00Z',
    updatedAt: '2024-10-14T19:00:00Z',
    status: 'progress',
  },
]);

const selected = reactive<SupportMail[]>([]);
const loading = ref<boolean>(false);

const onRequestNextData = async () => {
  if (loading.value) return;

  loading.value = true;

  await new Promise((res, _rej) => {
    setTimeout(() => {
      console.log('запрос');
      res(data.value.push(...data.value));
    }, 2500);
  });

  loading.value = false;
};
</script>

<template>
  <ClientOnly>
    <div class="support">
      <UiResizablePanelGroup direction="horizontal">
        <UiResizablePanel :default-size="30" :min-size="30" :max-size="30">
          <div class="grid grid-cols-[max-content,1fr]">
            <div class="p-2">
              <UiButton size="icon" variant="ghost">
                <Icon name="solar:calendar-outline" class="size-5" />
              </UiButton>
            </div>
            <SupportMailList
              :mails="data"
              :loading="loading"
              :selected="selected"
              @on:scroll-bottom="onRequestNextData"
            />
          </div>
        </UiResizablePanel>
        <UiResizableHandle disabled />
        <UiResizablePanel>
          <Empty v-if="!selected.length">
            <template #icon>
              <Icon name="solar:inbox-line-outline" class="size-16" />
            </template>
            <p>Выберите обращение</p>
          </Empty>

          <div v-else class="support__mail-content">
            <div class="support__mail-controls">
              <UiButton variant="ghost" size="icon">
                <Icon name="" class="size-5" />
              </UiButton>
            </div>
            <div class="support__mail-wrapper">
              <div class="support__mail-name">
                <h3>От: {{ selected[0].name }}</h3>
              </div>
              <div class="support__mail-email">
                <p>({{ selected[0].email }})</p>
              </div>
              <div class="support__mail-remote-id">
                <p>Ассистент ID: {{ selected[0].remoteId }}</p>
              </div>
            </div>
            <div class="support__mail-wrapper">
              <div class="support__mail-organization">
                <p>Организация: {{ selected[0].organization }}</p>
              </div>
              <div class="support__mail-position">
                <p>Должность: {{ selected[0].position }}</p>
              </div>
            </div>
            <UiSeparator class="my-2" />
            <div class="support__mail-question">
              <p>{{ selected[0].question }}</p>
            </div>
          </div>
        </UiResizablePanel>
      </UiResizablePanelGroup>
    </div>
  </ClientOnly>
</template>

<style lang="scss">
.support {
  @apply h-[calc(100vh_-_(var(--height-original)_+_(var(--height-inner)_*_2))_-_40px)];

  &__mail-content {
    @apply flex flex-col px-5 py-3;
  }

  &__mail-wrapper {
    @apply mb-1 flex gap-3;
  }

  &__mail-email {
    @apply text-muted-foreground;
  }

  &__mail-organization {
    @apply text-sm text-muted-foreground;
  }

  &__mail-position {
    @apply text-sm text-muted-foreground;
  }

  &__mail-question {
    @apply py-3;
  }

  &__mail-remote-id {
    @apply ml-auto text-sm text-muted-foreground;
  }
}
</style>
