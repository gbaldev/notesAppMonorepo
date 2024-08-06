import {QueryClient} from '@tanstack/react-query';
import NotesProvider from '../services/NotesService/provider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({queryKey}) => {
        const response = await NotesProvider.get(queryKey[0] as string);

        return response.data;
      },
    },
  },
});

export default queryClient;
