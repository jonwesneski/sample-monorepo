'use client';
import { useRef, useState } from 'react';
import { CheckerCell } from './_components/CheckerCell';

const initializeGridState = () => {
  return new Array(8).fill(0).map(() => new Array(8).fill(0));
};

const Page = () => {
  const [gridState, setGridState] = useState(initializeGridState());
  const counter = useRef(0);

  const handleOnCellClick = (rowIndex: number, colIndex: number) => {
    counter.current += 1;
    const newGridState = gridState.map((innerArray) => [...innerArray]);
    newGridState[rowIndex][colIndex] = counter.current;
    setGridState(newGridState);
  };

  const handleOnClear = () => {
    setGridState(initializeGridState());
    counter.current = 0;
  };

  return (
    <>
      <button onClick={handleOnClear}>Clear</button>
      <div className="grid grid-cols-8 w-80">
        {gridState.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const color =
              (rowIndex + colIndex) % 2 === 0 ? 'bg-white' : 'bg-black';
            return (
              <CheckerCell
                key={`${rowIndex}-${colIndex}`}
                color={color}
                counter={cell}
                onClick={() => handleOnCellClick(rowIndex, colIndex)}
              />
            );
          })
        )}
      </div>
    </>
  );
};
export default Page;
