import { useInfiniteQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import axios from 'axios';

import type { GoodsResponseData } from '@/types';

const infiniteGoodsSelection = async (theme: string, page: string) => {
  const url = `https://react-gift-mock-api-seungbeom.vercel.app/api/v1/themes/${theme}/products?maxResults=20&pageToken=${page}`;
  const response = await axios.get<GoodsResponseData>(url);
  console.log('API response:', response.data);

  return response.data;
};

export const useInfiniteGoodsSelection = (themeKey: string) => {
  const {
    data: goodsmoreinfo,
    isLoading,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<GoodsResponseData, AxiosError>({
    queryKey: ['products', themeKey],
    queryFn: ({ pageParam = '0' }) => infiniteGoodsSelection(themeKey, pageParam as string),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      console.log('getNextPageParam called:', lastPage.nextPageToken);
      return lastPage.nextPageToken;
    },
  });

  // const goods = goodsmoreinfo?.pages.flatMap((page) => page.products) ?? [];

  return { goodsmoreinfo, isFetchingNextPage, hasNextPage, isLoading, error, fetchNextPage };
};
