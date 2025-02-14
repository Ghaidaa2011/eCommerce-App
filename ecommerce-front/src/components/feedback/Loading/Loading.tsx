import { TLoading } from "@types";
import CategorySkeleton from "../skeletons/CategorySkeleton/CategorySkeleton";
import CartSkeleton from "../skeletons/CartSkeleton/CartSkeleton";
import ProductSkeleton from "../skeletons/ProductSkeleton/ProductSkeleton";
import TableSkeleton from "../TableSkeleton/TableSkeleton";
import LottieHandler from "../LottieHandler/LottieHandler";

//dynamic component
const skeletonsTypes = {
  category: CategorySkeleton,
  cart: CartSkeleton,
  product: ProductSkeleton,
  table: TableSkeleton,
};
type LoadingProps = {
  status: TLoading;
  error: null | string;
  children: React.ReactNode;
  type: keyof typeof skeletonsTypes;
};

const Loading = ({ status, error, children, type }: LoadingProps) => {
  const Component = skeletonsTypes[type];
  if (status === "pending") {
    return <Component />;
  }
  if (status === "failed") {
    return (
      <div>
        <LottieHandler type="error" message={error as string} />
      </div>
    );
  }
  return <div>{children}</div>;
};

export default Loading;
