import useAllProducts from "@hooks/useAllroducts";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { TProduct } from "@types";
import { GridList, Heading } from "@components/common";
import Paginator from "@components/common/Paginator/Paginator";
import Selector from "@components/common/Selector/Selector";
import CheckBox from "@components/common/CheckBox/CheckBox";
const AllProducts = () => {
  const {
    loading,
    error,
    productsFullInfo,
    clickPrev,
    clickNext,
    page,
    records,
    onChangeSort,
    sortBy,
    order,
    prefix,
    dispatch,
    handleChangeCheck,
  } = useAllProducts();
  return (
    <>
      <Heading title="All Products" />
      <div className="d-flex justify-content-end align-item-center fit-width mb-3">
        <CheckBox
          prefix={prefix}
          dispatch={dispatch}
          handleChangeCheck={handleChangeCheck}
        />
        <Selector onChangeSort={onChangeSort} sortBy={sortBy} order={order} />
      </div>
      <Loading status={loading} error={error} type="product">
        <GridList<TProduct>
          emptyMessage="There are no products"
          records={productsFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
      <Paginator
        page={page}
        clickPrev={clickPrev}
        clickNext={clickNext}
        records={records}
        loading={loading}
      />
    </>
  );
};

export default AllProducts;
