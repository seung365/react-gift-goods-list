import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';
type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const [goods, setGoods] = useState<GoodsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [rending, setRending] = useState(true);
  const maxRetries = 5;
  const retryDelay = 1000;

  useEffect(() => {
    const fetchGoods = async (retries = 0) => {
      const url = `https://react-gift-mock-api-seungbeom.vercel.app/api/v1/themes/${themeKey}/products?maxResults=20`;
      try {
        const response = await axios.get(url);
        setGoods(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error(error);
        if (retries < maxRetries) {
          setTimeout(() => fetchGoods(retries + 1), retryDelay);
        } else {
          setLoading(false);
          setRending(false);
        }
      }
    };

    fetchGoods();
  }, [themeKey]);

  return (
    <Wrapper>
      <Container alignItems="center">
        {loading && <Spinner />}
        {!rending && <div>에러가 발생했습니다.</div>}
        <Grid
          columns={{
            initial: 2,
            md: 4,
          }}
          gap={16}
        >
          {' '}
          {goods.map(({ id, imageURL, name, price, brandInfo }) => (
            <DefaultGoodsItems
              key={id}
              imageSrc={imageURL}
              title={name}
              amount={price.sellingPrice}
              subtitle={brandInfo.name}
            />
          ))}
        </Grid>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  padding: 28px 16px 180px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 360px;
  }
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #22a6b3;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: spin 1s linear infinite;
  align-items: center;
  justify-content: center;
  display: flex;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
