<script setup lang="ts">
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';

type TiptapEditorProps = {
  size: 'xs' | 'sm' | 'md';
};

const skeletonSize = {
  default: 'auto',
  xs: 'min-h-20',
  sm: 'min-h-60',
  md: 'min-h-80',
};

const props = defineProps<TiptapEditorProps>();
const modelValue = defineModel<string>();

const isLoadEditor = ref<boolean>(false);

const editor = useEditor({
  content: modelValue.value,
  extensions: [
    TiptapStarterKit,
    Placeholder.configure({
      placeholder: 'Текст новости...',
    }),
    Link.configure({
      HTMLAttributes: {
        class: 'link',
      },
      openOnClick: true,
    }),
    Image,
  ],
  onCreate: () => {
    isLoadEditor.value = !isLoadEditor.value;
  },
  onUpdate: (data) => {
    if (data.editor.isEmpty) {
      return (modelValue.value = undefined);
    }
    modelValue.value = data.editor.getHTML();
  },
});

onBeforeUnmount(() => {
  unref(editor)?.destroy();
});
</script>

<template>
  <UiSkeleton v-if="!isLoadEditor" class="w-full" :class="skeletonSize[props.size]" />
  <TiptapEditorContent v-else class="editor" :class="props.size" :editor="editor" />
</template>

<style lang="scss">
.editor {
  &.xs .tiptap {
    @apply min-h-20;
  }

  &.sm .tiptap {
    @apply min-h-60;
  }

  &.md .tiptap {
    @apply min-h-60;
  }
}

.tiptap {
  @apply rounded-md border border-input bg-background px-4 py-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50;

  & p.is-editor-empty:first-child::before {
    color: #adb5bd;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }

  & a {
    @apply cursor-pointer text-blue-500;
  }

  & h1 {
    @apply scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl;
  }

  & h2 {
    @apply scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0;
  }

  & h3 {
    @apply scroll-m-20 text-2xl font-semibold tracking-tight;
  }

  & h4 {
    @apply scroll-m-20 text-xl font-semibold tracking-tight;
  }

  & p {
    @apply leading-7 [&:not(:first-child)]:mt-3;
  }

  & blockquote {
    @apply mt-6 border-l-2 pl-6 italic;
  }

  & ul {
    @apply my-6 ml-6 list-disc [&>li]:mt-2;
  }
}
</style>
