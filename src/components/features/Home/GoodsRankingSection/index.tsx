import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';
import type { RankingFilterOption } from '@/types';
import type { GoodsData } from '@/types';
import type { GoodsResponse } from '@/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });
  const [GoodsItem, setGoodsItem] = useState<GoodsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    const fetchGoods = async () => {
      const url = `https://react-gift-mock-api-seungbeom.vercel.app/api/v1/ranking/products?targetType=${filterOption.targetType}&rankType=${filterOption.rankType}`;
      try {
        const response = await axios.get<GoodsResponse>(url);
        setGoodsItem(response.data.products);
        setErrorMessage(null);
      } catch (error) {
        console.error(error);
        setErrorMessage('데이터를 불러오는 중에 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchGoods();
  }, [filterOption]);

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        <GoodsRankingList goodsList={GoodsItem} loading={loading} errorMessage={errorMessage} />
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 0 16px 32px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 0 16px 80px;
  }
`;

const Title = styled.h2`
  color: #000;
  width: 100%;
  text-align: left;
  font-size: 20px;
  line-height: 30px;
  font-weight: 700;

  @media screen and (min-width: ${breakpoints.sm}) {
    text-align: center;
    font-size: 35px;
    line-height: 50px;
  }
`;
