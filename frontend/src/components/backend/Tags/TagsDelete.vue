<script setup lang="ts">
const tag = defineModel<Tags>('tag');
const emit = defineEmits(['on:deleted']);

const onDelete = () => {
  const promise = async () => {
    try {
      await $fetchSecure(`/tags`, { body: { id: tag.value?.id }, method: 'DELETE' });
      emit('on:deleted');
      return 'Тег успешно удален!';
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
        <UiAlertDialogDescription> Вы уверены что хотите удалить тег {{ tag?.name }}? </UiAlertDialogDescription>
      </UiAlertDialogHeader>
      <UiAlertDialogFooter>
        <UiAlertDialogCancel>Нет</UiAlertDialogCancel>
        <UiAlertDialogAction class="text-white" @click="onDelete"> Да </UiAlertDialogAction>
      </UiAlertDialogFooter>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>
