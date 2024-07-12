import styled from '@emotion/styled';

import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { Spinner } from '@/components/common/Spinner';
import { useGoodsSelection } from '@/hooks/useGoodsSelection';
import { breakpoints } from '@/styles/variants';
import { handleError } from '@/utils/errorHandler';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const { goods, isLoading, error } = useGoodsSelection(themeKey);
  const errorMessage = error ? handleError(error) : null;

  return (
    <Wrapper>
      <Container alignItems="center">
        {isLoading && <Spinner />}
        {errorMessage && <div>{errorMessage}</div>}
        <Grid
          columns={{
            initial: 2,
            md: 4,
          }}
          gap={16}
        >
          {' '}
          {goods?.map(({ id, imageURL, name, price, brandInfo }) => (
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
