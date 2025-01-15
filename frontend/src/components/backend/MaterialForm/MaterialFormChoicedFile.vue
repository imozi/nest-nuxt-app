<script setup lang="ts">
type MaterialChoicedFile = {
  file: {
    url: string;
    name: string;
    type: string;
    originalName: string;
    extention: string;
    size: string;
    text?: string;
    description?: string;
  };
};

const { file } = defineProps<MaterialChoicedFile>();
</script>

<template>
  <div class="choiced-file">
    <div class="choiced-file__extention">
      <Icon name="solar:file-bold" mode="svg" class="h-full w-full" :class="`${file.extention}`" />
      <span class="absolute bottom-0.5 left-1/2 -translate-x-1/2 text-[9px] text-background">{{ file.extention }}</span>
    </div>
    <div class="choiced-file__name">{{ file.name }}</div>
    <div class="choiced-file__size">{{ file.size }}</div>
  </div>
</template>

<style lang="scss">
.choiced-file {
  @apply p-1;
  @apply flex items-center gap-x-5;

  &__extention {
    @apply relative size-8 flex-shrink-0;

    & svg.docx,
    & svg.doc {
      & path:last-child {
        @apply text-blue-500;
      }
    }

    & svg.xlsx {
      & path:last-child {
        @apply text-green-500;
      }
    }

    & svg.zip {
      & path:last-child {
        @apply text-yellow-500;
      }
    }

    & svg.pdf {
      & path:last-child {
        @apply text-red-500;
      }
    }

    & svg.mp4 {
      & path:last-child {
        @apply text-indigo-500;
      }
    }

    & svg.jpg {
      & path:last-child {
        @apply text-sky-500;
      }
    }
  }

  &__name {
    @apply line-clamp-1;
  }

  &__size {
    @apply ml-auto flex-shrink-0;
  }
}
</style>
