export const useFilterPages = async () => {
  const { query } = useRoute();

  const filters = reactive<QueryParams>({
    page: query.page ? +query.page : 1,
    search: query.search ? (query.search as string) : '',
    limit: 50,
  });

  const search = ref<string>(query.search ? (query.search as string) : '');
  const debounced = refDebounced(search, 500);

  const formatedFilterQuery = () => {
    const formatedFilterQuery: Record<string, string | number> = {};

    for (const [key, value] of Object.entries(filters)) {
      formatedFilterQuery[key] = value;
    }

    return formatedFilterQuery;
  };

  const { data, refresh, status } = await useAsyncData(
    'pages',
    () =>
      $fetchSecure<ResponseData<Page>>(`/pages`, {
        query: formatedFilterQuery(),
      }),
    {
      watch: [filters],
    },
  );

  watch(debounced, () => {
    filters.search = debounced.value;
  });

  watch(
    () => filters.search,
    (newSearch, oldSearch) => {
      if (newSearch !== oldSearch) {
        filters.page = 1;
      }
    },
  );

  watch(filters, () => {
    const router = useRouter();
    router.push({ query: formatedFilterQuery() });
  });

  return { data, refresh, status, filters, search };
};
