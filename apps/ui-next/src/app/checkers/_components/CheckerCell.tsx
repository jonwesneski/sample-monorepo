interface CheckerCellProps {
  color: 'bg-white' | 'bg-black';
  counter: number;
  onClick: () => void;
}
export const CheckerCell = (props: CheckerCellProps) => {
  return (
    <div
      className={`w-10 h-10 border border-gray-300 ${props.color} text-red-700 flex items-center justify-center`}
      onClick={props.onClick}
    >
      {props.counter}
    </div>
  );
};
