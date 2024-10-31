import type { FileUploadTypes } from '..';
import type { FileApi, ResponeWithMeta } from '~/types';

interface FileQueryParams extends QueryParams {
  type: FileUploadTypes;
}

export const useFileFiltering = async ({ limit = 30, type }: { limit?: number; type?: FileUploadTypes }) => {
  const { query } = useRoute();

  const currentTab = ref<FileUploadTypes>(query.type ? (query.type as FileUploadTypes) : type ? type : 'all');
  const selectedFiles = reactive<FileApi[]>([]);

  const search = ref<string>(query.search ? (query.search as string) : '');
  const debounced = refDebounced(search, 500);

  const filteredFiles = reactive<FileQueryParams>({
    type: type ? type : query.type ? (query.type as FileUploadTypes) : 'all',
    page: query.page ? +query.page : 1,
    search: query.search ? (query.search as string) : '',
    limit: limit,
  });

  const formatedFilterQuery = () => {
    const formatedFilterQuery: Record<string, string | number> = {};

    for (const [key, value] of Object.entries(filteredFiles)) {
      if (!value || value === 1 || value === 'all') continue;

      formatedFilterQuery[key] = value;
    }

    return formatedFilterQuery;
  };

  const { data, refresh, status } = await useAsyncData(
    'files',
    () =>
      $fetch<ResponeWithMeta<FileApi>>(
        `/api/files${`${filteredFiles.type === 'all' ? '' : `/${filteredFiles.type}`}`}`,
        {
          query: formatedFilterQuery(),
        },
      ),
    {
      watch: [filteredFiles],
    },
  );

  watch(
    () => currentTab.value,
    () => {
      filteredFiles.type = currentTab.value;
      selectedFiles.length = 0;
    },
  );

  watch(
    () => filteredFiles.type,
    (newSearch, oldSearch) => {
      if (newSearch !== oldSearch) {
        filteredFiles.page = 1;
        filteredFiles.search = '';
        search.value = '';
      }
    },
  );

  watch(debounced, () => {
    filteredFiles.search = debounced.value;
  });

  watch(
    () => filteredFiles.search,
    (newSearch, oldSearch) => {
      if (newSearch !== oldSearch) {
        filteredFiles.page = 1;
      }
    },
  );

  return {
    currentTab,
    search,
    selectedFiles,
    filteredFiles,
    formatedFilterQuery,
    data,
    refresh,
    status,
  };
};
