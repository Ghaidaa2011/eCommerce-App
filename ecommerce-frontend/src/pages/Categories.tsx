import useCategories from "@hooks/useCategories";
import { Container } from "react-bootstrap";
import { Category } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/common";
import { TCategory } from "@types";
import { useTranslation } from "react-i18next";
const Categories = () => {
  const { loading, error, records } = useCategories();
  const { t } = useTranslation("global");
  return (
    <Container>
      <Heading title={t("categories.categories")} />
      <Loading status={loading} error={error} type="category">
        <GridList<TCategory>
          type="search"
          emptyMessage="There are no categories"
          records={records}
          renderItem={(record) => <Category {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Categories;
