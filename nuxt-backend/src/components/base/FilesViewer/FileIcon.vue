<script setup lang="ts">
const props = defineProps<{ ext: string }>();
</script>

<template>
  <div class="file-icon relative h-full w-full">
    <Icon name="solar:file-bold" mode="svg" class="h-full w-full" :class="`${props.ext}`" />
    <span class="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] text-background">{{ props.ext }}</span>
  </div>
</template>

<style lang="scss">
.file-icon {
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
}
</style>
