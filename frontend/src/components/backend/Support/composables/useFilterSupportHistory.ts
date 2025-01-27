export const useFilterSupportHistory = async (id: string) => {
  const filters = reactive<QueryParams>({
    page: 1,
    search: '',
    limit: 50,
  });

  const search = ref<string>('');
  const debounced = refDebounced(search, 500);

  const formatedFilterQuery = () => {
    const formatedFilterQuery: Record<string, string | number> = {};

    for (const [key, value] of Object.entries(filters)) {
      formatedFilterQuery[key] = value;
    }

    return formatedFilterQuery;
  };

  const { data, refresh, status } = await useAsyncData(
    'support-mail-history',
    () =>
      $fetchSecure<ResponseData<SupportMail>>(`/support-mail/history`, {
        query: { id, ...formatedFilterQuery() },
      }),
    {
      watch: [filters],
      lazy: true,
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

  return { data, refresh, status, filters, search };
};
