import { ChangeEvent } from "react";
import { Form } from "react-bootstrap";

interface IProps {
  onChangeSort: (e: ChangeEvent<HTMLSelectElement>) => void;
  sortBy: string;
  order: string | null;
}
const Selector = ({ onChangeSort, order, sortBy }: IProps) => {
  return (
    <Form.Select
      aria-label="SORT BY"
      style={{ width: "auto" }}
      onChange={onChangeSort}
      value={`${sortBy}-${order}`}
    >
      <option value="title-asc">Name A to Z</option>
      <option value="title-desc">Name Z to A</option>
      <option value="price-asc">Price Low to High</option>
      <option value="price-desc">Price High to Low</option>
    </Form.Select>
  );
};
export default Selector;
