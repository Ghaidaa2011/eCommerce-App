import { TLoading, TProduct } from "@types";
import { Pagination } from "react-bootstrap";

interface IProps {
  page: number;
  records: TProduct[];
  clickPrev: () => void;
  clickNext: () => void;
  loading: TLoading;
}
const Paginator = ({
  page = 1,
  clickPrev,
  clickNext,
  records,
  loading,
}: IProps) => {
  return (
    <Pagination className="d-flex justify-content-center align-items-center">
      <Pagination.First
        disabled={page === 1 || loading === "pending"}
        onClick={clickPrev}
      />
      <span className="px-2">Page {page}</span>
      <Pagination.Last
        disabled={records?.length < 10 || loading === "pending"}
        onClick={clickNext}
      />
    </Pagination>
  );
};
export default Paginator;
