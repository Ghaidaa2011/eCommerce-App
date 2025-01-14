import useAllProducts from "@hooks/useAllroducts";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { TProduct } from "@types";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("global");
  return (
    <>
      <Heading title={t("products.products")} />
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
          type="empty"
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
