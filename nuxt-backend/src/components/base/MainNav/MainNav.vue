<script setup lang="ts">
const { menu } = useMenuStore();
</script>

<template>
  <Navbar v-if="!menu.collapsed" class="main-nav">
    <template v-for="item of menu.list" :key="item.id">
      <NavbarItem v-if="!item.crud" class="main-nav-item">
        <ButtonLink :link="{ to: item.to }">
          <Icon :name="item.icon" class="mr-4 size-5" />
          {{ item.name }}
        </ButtonLink>
      </NavbarItem>

      <NavbarItem v-else class="main-nav-item">
        <UiAccordion type="single" collapsible class="main-nav__accordion">
          <UiAccordionItem value="item">
            <UiAccordionTrigger>
              <span class="flex">
                <Icon :name="item.icon" class="mr-4 size-5" />
                {{ item.name }}
              </span>
            </UiAccordionTrigger>
            <UiAccordionContent class="pl-10">
              <ButtonLink :link="{ to: item.to }">Все</ButtonLink>
              <ButtonLink :link="{ to: `${item.to}/create` }"> Создать </ButtonLink>
            </UiAccordionContent>
          </UiAccordionItem>
        </UiAccordion>
      </NavbarItem>
    </template>
  </Navbar>

  <Navbar v-else class="main-nav" :class="{ collapsed: menu.collapsed }">
    <template v-for="item of menu.list" :key="item.id">
      <NavbarItem v-if="!item.crud" class="main-nav-item">
        <UiTooltipProvider :delay-duration="100">
          <UiTooltip>
            <UiTooltipTrigger as-child>
              <ButtonLink :link="{ to: item.to }" variant="ghost" size="icon">
                <Icon :name="item.icon" class="size-5" />
              </ButtonLink>
            </UiTooltipTrigger>
            <UiTooltipContent side="right">
              <p>{{ item.name }}</p>
            </UiTooltipContent>
          </UiTooltip>
        </UiTooltipProvider>
      </NavbarItem>

      <NavbarItem v-else class="main-nav-item">
        <MainNavMenuItemDropdown :icon="item.icon" :name="item.name" :to="item.to" />
      </NavbarItem>
    </template>
  </Navbar>
</template>

<style lang="scss">
.main-nav {
  @apply min-w-64;

  &__list {
    @apply flex flex-col gap-y-2;
  }

  &.collapsed {
    @apply min-w-max;
  }
}
</style>
