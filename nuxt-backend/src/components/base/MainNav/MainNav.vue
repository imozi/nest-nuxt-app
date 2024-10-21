<script setup lang="ts">
const navList = [
  {
    id: 1,
    name: 'Новости',
    to: '/news',
    icon: 'solar:document-add-linear',
  },
  {
    id: 1,
    name: 'Материалы',
    to: '/materials',
    icon: 'solar:document-text-linear',
  },
];
</script>

<template>
  <Navbar class="main-nav">
    <NavbarItem class="main-nav-item">
      <ButtonLink :link="{ to: '/home' }" active>
        <Icon name="solar:home-angle-linear" class="mr-4 size-5 text-muted-foreground" />
        Главная
      </ButtonLink>
    </NavbarItem>

    <NavbarItem class="main-nav-item">
      <ButtonLink :link="{ to: '/home' }" active>
        <Icon name="solar:inbox-unread-linear" class="mr-4 size-5 text-muted-foreground" />
        Обращения
      </ButtonLink>
    </NavbarItem>

    <NavbarItem v-for="item of navList" :key="item.id" class="main-nav-item">
      <UiAccordion type="single" collapsible class="main-nav__accordion">
        <UiAccordionItem value="item">
          <UiAccordionTrigger>
            <span class="flex">
              <Icon :name="item.icon" class="mr-4 size-5 text-muted-foreground" />
              {{ item.name }}
            </span>
          </UiAccordionTrigger>
          <UiAccordionContent class="pl-10">
            <ButtonLink :link="{ to: item.to }" active> Все новости </ButtonLink>
            <ButtonLink :link="{ to: `${item.to}/create` }" active> Создать </ButtonLink>
          </UiAccordionContent>
        </UiAccordionItem>
      </UiAccordion>
    </NavbarItem>

    <NavbarItem class="main-nav-item">
      <ButtonLink :link="{ to: '/home' }" active>
        <Icon name="solar:folder-with-files-linear" class="mr-4 size-5 text-muted-foreground" />
        Файлы
      </ButtonLink>
    </NavbarItem>

    <NavbarItem class="main-nav-item">
      <ButtonLink :link="{ to: '/home' }" active>
        <Icon name="solar:menu-dots-square-linear" class="mr-4 size-5 text-muted-foreground" />
        Меню
      </ButtonLink>
    </NavbarItem>

    <NavbarItem class="main-nav-item">
      <UiAccordion type="single" collapsible class="main-nav__accordion">
        <UiAccordionItem value="item">
          <UiAccordionTrigger>
            <span class="flex">
              <Icon name="solar:book-linear" class="mr-4 size-5 text-muted-foreground" />
              Страницы
            </span>
          </UiAccordionTrigger>
          <UiAccordionContent class="pl-10">
            <ButtonLink> Все страницы </ButtonLink>
            <ButtonLink> Создать </ButtonLink>
          </UiAccordionContent>
        </UiAccordionItem>
      </UiAccordion>
    </NavbarItem>
  </Navbar>
</template>

<style lang="scss">
.main-nav {
  @apply min-w-64;

  &__list {
    @apply flex flex-col gap-y-2;
  }
}
</style>
