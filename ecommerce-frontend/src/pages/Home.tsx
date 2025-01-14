import { Form } from "react-bootstrap";
import { useState } from "react";
import { GridList } from "@components/common";
import { Product } from "@components/eCommerce";
import { TProduct } from "@types";
import useSearchByTitle from "@hooks/useSearchByTitle";
import { Loading } from "@components/feedback";
import { useTranslation } from "react-i18next";

import Search from "@assets/svg/search.svg?react";
import X from "@assets/svg/x.svg?react";

const Home = () => {
  const [product, setProduct] = useState("");
  const { loading, error, productsFullInfo } = useSearchByTitle(product);
  const { t } = useTranslation("global");

  // Prevent form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // Clear the search input and results
  const clearSearch = () => {
    setProduct("");
  };

  return (
    <>
      <Form
        className="d-flex justify-content-center mt-1"
        onSubmit={handleFormSubmit}
      >
        <Form.Group
          style={{ width: "500px" }}
          className="mb-3 position-relative"
          controlId="formBasic"
        >
          <Form.Label className="d-flex align-items-center">
            {t("search.what-are-you-looking-for")}
            <Search className="ms-2" />
          </Form.Label>
          <div className="d-flex align-items-center position-relative">
            <Form.Control
              type="text"
              placeholder={t("search.find-a-product")}
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              style={{ paddingRight: "30px" }}
            />
            {product && (
              <X
                className="position-absolute"
                style={{
                  right: "10px",
                  cursor: "pointer",
                }}
                onClick={clearSearch}
              />
            )}
          </div>
        </Form.Group>
      </Form>
      <Loading status={loading} error={error} type="product">
        <GridList<TProduct>
          emptyMessage={t("search.no-products-found")}
          type="search"
          records={productsFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
};

export default Home;
