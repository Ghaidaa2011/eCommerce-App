import { TLoading } from "@types";
import CategorySkeleton from "../skeletons/CategorySkeleton/CategorySkeleton";
import CartSkeleton from "../skeletons/CartSkeleton/CartSkeleton";
import ProductSkeleton from "../skeletons/ProductSkeleton/ProductSkeleton";
//dynamic component
const skeletonsTypes = {
  category: CategorySkeleton,
  cart: CartSkeleton,
  product: ProductSkeleton,
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
    return <div>{error}</div>;
  }
  return <div>{children}</div>;
};

export default Loading;
