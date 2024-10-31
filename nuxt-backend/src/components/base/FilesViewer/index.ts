export type FileUploadTypes = 'all' | 'images' | 'docs' | 'video';

export type FilePondProps = {
  type: FileUploadTypes;
};

export const Tabs: { name: string; value: FileUploadTypes }[] = [
  {
    name: 'Все',
    value: 'all',
  },
  {
    name: 'Изображения',
    value: 'images',
  },
  {
    name: 'Документы',
    value: 'docs',
  },
  {
    name: 'Видео',
    value: 'video',
  },
];

// export const uploadIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12m10-5.75a.75.75 0 0 1 .75.75v5.19l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72V7a.75.75 0 0 1 .75-.75m-4 10a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5z" clip-rule="evenodd"/></svg>`;

export const uploadIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 7v7m0 0l3-3m-3 3l-3-3"/><path stroke-linecap="round" d="M16 17H8"/><path d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z"/></g></svg>`;

const imageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/tiff', 'image/svg+xml'];

const docsTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/rtf',
  'application/zip',
  'application/gzip',
  'application/x-tar',
  'application/x-7z-compressed',
  'application/zip-compressed',
  'application/x-zip-compressed',
];

const videoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/x-msvideo', 'video/mpeg'];

export const fileTypes = {
  all: {
    title: 'Загрузить файл',
    description: 'Все файлы',
  },
  images: {
    title: 'Загрузить картинки',
    description: 'только файлы изображений',
    types: imageTypes,
    url: `upload/images`,
  },
  docs: {
    title: 'Загрузить документы',
    description: 'только файлы документов',
    types: docsTypes,
    url: `upload/docs`,
  },
  video: {
    title: 'Загрузить видео',
    description: 'только файлы видео',
    types: videoTypes,
    url: `upload/video`,
  },
};
