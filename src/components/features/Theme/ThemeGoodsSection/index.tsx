import styled from '@emotion/styled';
import type { AxiosError } from 'axios';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { Spinner } from '@/components/common/Spinner';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';
import type { GoodsResponse } from '@/types';
import { handleError } from '@/utils/errorHandler';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const [goods, setGoods] = useState<GoodsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const maxRetries = 5;
  const retryDelay = 1000;

  useEffect(() => {
    const fetchGoods = async (retries = 0) => {
      const url = `https://react-gift-mock-api-seungbeom.vercel.app/api/v1/themes/${themeKey}/products?maxResults=20`;
      try {
        const response = await axios.get<GoodsResponse>(url);
        setGoods(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error(error);
        if (retries < maxRetries) {
          setTimeout(() => fetchGoods(retries + 1), retryDelay);
        } else {
          setLoading(false);
          setErrorMessage(handleError(error as AxiosError));
        }
      }
    };

    fetchGoods();
  }, [themeKey]);

  return (
    <Wrapper>
      <Container alignItems="center">
        {loading && <Spinner />}
        {errorMessage !== null && <div>{errorMessage}</div>}
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
