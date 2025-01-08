<script setup lang="ts">
const { menu } = useMenuStore();
</script>

<template>
  <Navbar v-if="!menu.collapsed" class="main-nav">
    <template v-for="item of menu.list" :key="item.id">
      <NavbarItem v-if="!item.crud" class="main-nav__item">
        <ButtonLink :link="{ to: item.to }" class="main-nav__link" active-class="current">
          <Icon :name="item.icon" class="mr-4 size-5" />
          {{ item.name }}
        </ButtonLink>
      </NavbarItem>

      <NavbarItem v-else class="main-nav__item">
        <UiAccordion type="single" collapsible class="main-nav__accordion">
          <UiAccordionItem value="item">
            <UiAccordionTrigger>
              <span class="flex">
                <Icon :name="item.icon" class="mr-4 size-5" />
                {{ item.name }}
              </span>
            </UiAccordionTrigger>
            <UiAccordionContent class="mt-1 pl-10">
              <ButtonLink :link="{ to: item.to }" class="main-nav__link main-nav__accordion-item" active-class="current"> Все </ButtonLink>
              <ButtonLink :link="{ to: `${item.to}/create` }" class="main-nav__link main-nav__accordion-item" active-class="current">
                Создать
              </ButtonLink>
            </UiAccordionContent>
          </UiAccordionItem>
        </UiAccordion>
      </NavbarItem>
    </template>
  </Navbar>

  <Navbar v-else class="main-nav" :class="{ collapsed: menu.collapsed }">
    <template v-for="item of menu.list" :key="item.id">
      <NavbarItem v-if="!item.crud" class="main-nav__item">
        <UiTooltipProvider :delay-duration="100">
          <UiTooltip>
            <UiTooltipTrigger as-child>
              <ButtonLink :link="{ to: item.to }" class="main-nav__link" variant="ghost" size="icon" active-class="current">
                <Icon :name="item.icon" class="size-5" />
              </ButtonLink>
            </UiTooltipTrigger>
            <UiTooltipContent side="right">
              <p>{{ item.name }}</p>
            </UiTooltipContent>
          </UiTooltip>
        </UiTooltipProvider>
      </NavbarItem>

      <NavbarItem v-else class="main-nav__item">
        <MainNavMenuItemDropdown :icon="item.icon" :name="item.name" :to="item.to" />
      </NavbarItem>
    </template>
  </Navbar>
</template>

<style lang="scss">
.main-nav {
  @apply min-w-56;

  &__list {
    @apply flex flex-col gap-y-2;
  }

  &.collapsed {
    @apply min-w-max;
  }

  &__link {
    @apply cursor-pointer;

    &.current {
      @apply bg-accent text-accent-foreground dark:bg-zinc-900;
    }
  }

  &__accordion-item {
    @apply relative before:absolute before:-left-2 before:h-full before:w-px before:bg-muted after:absolute after:-left-[0.7rem] after:top-1/2 after:h-2 after:w-2 after:-translate-y-1/2 after:rounded-full after:bg-muted;

    &.current {
      @apply after:bg-primary;
    }
  }
}
</style>
