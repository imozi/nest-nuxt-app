<script setup lang="ts">
import { useFileFiltering } from './composables/useFileFiltering';
import { Tabs, type FileUploadTypes } from '.';

type FileViewerProps = {
  type?: FileUploadTypes;
  disabled?: boolean;
  choice?: boolean;
  deleted?: boolean;
  doubleClickChoice?: boolean;
};

const props = defineProps<FileViewerProps>();
const { currentTab, selectedFiles, search, filteredFiles, formatedFilterQuery, data, refresh, status } = await useFileFiltering({
  type: props.type,
});
const emit = defineEmits(['on:chice-file']);

const deleteFiles = async () => {
  const promise = async () => {
    try {
      await $fetchSecure('/files', {
        method: 'DELETE',
        body: { files: selectedFiles.map((file) => ({ id: file.id, url: file.url })) },
      });
      refresh();
      selectedFiles.length = 0;
      return 'Удаление прошло успешно!';
    } catch (error) {
      const message = (error as IFetchError<ResponseError>).data!.message;
      throw new Error(message);
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

const choiceFile = () => {
  emit('on:chice-file', selectedFiles[0]);
};

watch(filteredFiles, () => {
  const router = useRouter();
  router.push({ query: formatedFilterQuery() });
});
</script>

<template>
  <UiTabs v-model:model-value="currentTab" class="files-viewer" :default-value="currentTab">
    <div class="files-viewer__wrapper">
      <div class="files-viewer__title">
        <Icon name="solar:hashtag-square-linear" class="size-5" />
        <p>Файлы</p>
      </div>
      <UiTabsList class="files-viewer__list">
        <UiTabsTrigger v-for="tab of Tabs" :key="tab.value" :value="tab.value" :disabled="props.disabled && currentTab !== tab.value">
          {{ tab.name }}
        </UiTabsTrigger>
      </UiTabsList>
      <div class="files-viewer__collumn">
        <FilesViewerFileControls
          v-model:typefiles="currentTab"
          :countfiles="selectedFiles.length"
          :deleted="props.deleted"
          :choice="props.choice"
          @on:confirmed-choice="choiceFile"
          @on:confirmed-delete="deleteFiles"
          @on:file-uploaded="refresh"
        />
        <div class="relative w-full max-w-sm items-center">
          <UiInput id="search" v-model="search" type="text" placeholder="Поиск..." class="pl-10" />
          <span class="absolute inset-y-0 start-0 flex items-center justify-center px-2">
            <Icon name="lucide:search" class="size-4 text-muted-foreground" />
          </span>
        </div>
      </div>
    </div>

    <UiTabsContent :value="currentTab" class="files-viewer__content">
      <UiContextMenu>
        <UiContextMenuTrigger as-child>
          <Empty v-if="!data?.data.length" />
          <FilesViewerFileList
            v-else
            v-model:selected="selectedFiles"
            :files="data?.data"
            :loading="status === 'pending'"
            :double-click-choice="props.doubleClickChoice"
            @on:dblclick-choice="choiceFile"
          />
          <template v-if="data">
            <Pagination
              v-if="data.meta.lastPage > 1"
              v-model:page="filteredFiles.page"
              :pagination="data.meta"
              :default-page="filteredFiles.page"
            />
          </template>
        </UiContextMenuTrigger>
        <UiContextMenuContent>
          <UiContextMenuItem>Скопировать ссылку</UiContextMenuItem>
          <UiContextMenuItem>Подробнее</UiContextMenuItem>
          <UiContextMenuItem>Удалить</UiContextMenuItem>
        </UiContextMenuContent>
      </UiContextMenu>
    </UiTabsContent>
  </UiTabs>
</template>

<style lang="scss">
.files-viewer {
  @apply flex flex-col gap-y-5;

  &__wrapper {
    @apply flex items-center gap-x-5 border-b pb-5;
  }

  &__title {
    @apply flex items-center gap-x-2 border-r pr-4;
  }

  &__collumn {
    @apply ml-auto flex h-full gap-x-3;
  }

  &__content {
    @apply flex h-full flex-col gap-y-5;
  }
}
</style>
