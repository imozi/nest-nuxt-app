<template>
  <section class="announcements">
    <div class="announcements__wrapper">
      <header class="announcements__header">
        <div class="announcements__column">
          <Icon name="solar:shield-warning-bold" class="size-5 text-orange-500" />
          <p>Анонсы</p>
        </div>
      </header>
      <UiSeparator />
      <div class="announcements__content">
        <div class="announcements__content-wrapper">
          <List class="announcements__list">
            <ListItem class="announcements__list-item">
              <Icon name="solar:unread-bold" class="size-4 text-primary" />
              <p>Основная часть работы админки готова</p>
            </ListItem>
            <ListItem class="announcements__list-item">
              <Icon name="solar:unread-bold" class="size-4 text-primary" />
              <p>Можно протестировать весь функционал, кроме обращений они заполняются с стороны клиента</p>
            </ListItem>
            <ListItem class="announcements__list-item">
              <Icon name="solar:close-square-bold" class="size-4 text-destructive" />
              <p>Сейчас в разработке (переделке) фронтенд клиента</p>
            </ListItem>
            <ListItem class="announcements__list-item">
              <Icon name="solar:info-square-bold" class="size-4 text-blue-600" />
              <p>Если есть какие то предложения или что то не будет работать пишите)</p>
            </ListItem>
          </List>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.announcements {
  @apply mt-auto;

  &__header {
    @apply flex items-center gap-x-5 pb-5;
  }

  &__column {
    @apply flex items-center gap-x-2;
  }

  &__content {
    @apply flex gap-4 py-4;

    &-wrapper {
      @apply w-full rounded-md border p-4;
    }
  }

  &__list {
    @apply flex flex-col gap-y-2;

    &-item {
      @apply flex items-center gap-x-2;
    }
  }
}
</style>
