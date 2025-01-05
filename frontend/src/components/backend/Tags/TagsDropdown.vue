<script setup lang="ts">
const emit = defineEmits(['on:delete', 'on:edit']);

const onClickDelete = () => {
  emit('on:delete');
};

const onClickEdit = () => {
  emit('on:edit');
};
</script>

<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiButton variant="ghost" size="icon">
        <Icon name="solar:menu-dots-square-outline" class="size-5" />
      </UiButton>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent>
      <UiDropdownMenuItem as-child>
        <UiButton variant="ghost" class="cursor-pointer justify-start px-3" @click="onClickEdit">Изменить</UiButton>
      </UiDropdownMenuItem>
      <UiDropdownMenuItem as-child>
        <UiButton variant="ghost" class="cursor-pointer justify-start px-3" @click="onClickDelete">Удалить</UiButton>
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
