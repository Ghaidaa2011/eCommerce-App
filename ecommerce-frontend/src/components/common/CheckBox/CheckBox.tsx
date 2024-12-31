import { Form } from "react-bootstrap";
import { setPrefix } from "@store/products/productsSlice";
import { Dispatch } from "redux";

interface ICheckBoxProps {
  prefix: string;
  handleChangeCheck: (category: string, isChecked: boolean) => void;
  dispatch: Dispatch;
}
const CheckBox = ({ prefix, dispatch, handleChangeCheck }: ICheckBoxProps) => {
  const categories = ["men", "women", "kids", "sport"];

  return (
    <Form style={{ width: "500px", margin: "auto" }}>
      <div className="d-flex justify-content-around align-items-center flex-row width-fit">
        {categories.map((category) => (
          <Form.Check
            key={category}
            type="checkbox"
            id={`checkbox-${category}`}
            label={category.toUpperCase()}
            checked={prefix === category} // Ensure only one category is selected at a time
            onChange={(e) => handleChangeCheck(category, e.target.checked)}
          />
        ))}
        <Form.Check
          type="checkbox"
          id="checkbox-all"
          label="ALL"
          checked={!prefix} // Checked when no prefix is set
          onChange={() => dispatch(setPrefix(""))} // Deselect all categories
        />
      </div>
    </Form>
  );
};

export default CheckBox;
