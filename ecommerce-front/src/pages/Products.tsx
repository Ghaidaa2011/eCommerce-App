import useProducts from "@hooks/useProducts";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { TProduct } from "@types";
import { GridList, Heading } from "@components/common";

const Products = () => {
  const { productPrefix, loading, error, productsFullInfo } = useProducts();
  return (
    <>
      <Heading title={`${productPrefix?.toUpperCase()} Products`} />
      <Loading status={loading} error={error}>
        <GridList<TProduct>
          records={productsFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
};

export default Products;
