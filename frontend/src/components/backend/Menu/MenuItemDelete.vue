<script setup lang="ts">
const menuItem = defineModel<MenuItem>('item');
const emit = defineEmits(['on:deleted']);

const onDelete = () => {
  const promise = async () => {
    try {
      await $fetchSecure(`/menu/items`, { body: { id: menuItem.value?.id }, method: 'DELETE' });
      emit('on:deleted');
      return 'Пункт меню успешно удален!';
    } catch (error) {
      const err = (error as IFetchError<ResponseError>).data;
      throw createError({ message: err?.message, statusCode: err?.statusCode });
    }
  };

  toast.promise(promise, {
    loading: 'Удаление...',
    success: (message: string) => {
      return message;
    },
    error: (message: string) => {
      return message;
    },
  });
};
</script>

<template>
  <UiAlertDialog>
    <UiAlertDialogContent>
      <UiAlertDialogHeader>
        <UiAlertDialogTitle>Вы уверены?</UiAlertDialogTitle>
        <UiAlertDialogDescription> Вы уверены что хотите удалить пункт: {{ menuItem?.name }}? </UiAlertDialogDescription>
      </UiAlertDialogHeader>
      <UiAlertDialogFooter>
        <UiAlertDialogCancel>Нет</UiAlertDialogCancel>
        <UiAlertDialogAction class="text-white" @click="onDelete"> Да </UiAlertDialogAction>
      </UiAlertDialogFooter>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>
