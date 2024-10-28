<script setup lang="ts">
const props = defineProps<{ count: number }>();

const declension = computed(() => getDeclension(props.count, ['файл', 'файла', 'файлов']));

const emit = defineEmits(['on:delete-confirmed']);

const onDeleteConfirmed = () => {
  emit('on:delete-confirmed');
};
</script>

<template>
  <UiAlertDialog>
    <UiAlertDialogTrigger as-child>
      <UiButton
        :disabled="!props.count"
        variant="ghost"
        size="sm"
        class="ml-auto flex h-full cursor-pointer items-center justify-start gap-2 p-2 dark:text-white"
      >
        <Icon name="solar:file-remove-linear" class="size-5" />
      </UiButton>
    </UiAlertDialogTrigger>

    <UiAlertDialogContent>
      <UiAlertDialogHeader>
        <UiAlertDialogTitle>Вы уверены?</UiAlertDialogTitle>
        <UiAlertDialogDescription> Вы уверены что хотите {{ declension }} ? </UiAlertDialogDescription>
      </UiAlertDialogHeader>
      <UiAlertDialogFooter>
        <UiAlertDialogCancel>Нет</UiAlertDialogCancel>
        <UiAlertDialogAction class="text-white" @click="onDeleteConfirmed"> Да </UiAlertDialogAction>
      </UiAlertDialogFooter>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>
