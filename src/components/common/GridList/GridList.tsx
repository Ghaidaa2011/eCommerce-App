import { LottieHandler } from "@components/feedback";
import { TLottie } from "@types";
import { Row, Col } from "react-bootstrap";

type GridListProps<T> = {
  records: T[];
  renderItem: (record: T) => React.ReactNode;
  emptyMessage: string;
  type: TLottie;
};

const GridList = <T extends { id?: number }>({
  records,
  renderItem,
  emptyMessage,
  type,
}: GridListProps<T>) => {
  const renderList =
    records.length > 0 ? (
      records.map((record) => (
        <Col
          xs={6}
          md={3}
          key={record.id}
          className="d-flex justify-content-center mb-5 mt-2"
        >
          {renderItem(record)}
        </Col>
      ))
    ) : (
      <LottieHandler type={type} message={emptyMessage} />
    );
  return <Row>{renderList}</Row>;
};

export default GridList;
