import cn from "classnames";
import { ImSpinner3 } from "react-icons/im";

interface Props {
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
}

export default function Spinner({ sm, md, lg }: Props) {
  const classNames = cn("animate-spin text-white-300 fill-white-300 mr-3", {
    "w-4 h-4": sm,
    "w-6 h-6": md,
    "w-8 h-8": lg,
  });
  return (
    <div role="status">
      <ImSpinner3 className={`text-purple-500 ${classNames}`} />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
