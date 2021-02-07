import React, { FC, useEffect, useState } from 'react';
import cx from 'classnames';

import Button from '../Button/Button';
import { sudoku as defaultS } from './util';
import Solver from '../../utils/solver';

import './Grid.scss';

type Coordinates = [number, number] | null;

/**
 * @TODO force user to fill up
 * 1. Checker is sudoku is solvable
 * 2. Message in the end, sudoku is solved
 * 3. Take out button (done)
 * 4. TESTS!
 * 5. Improve functions in class with lodash
 *
 * **/

const Grid: FC = () => {
  const [sudoku, setSudoku] = useState<Array<Array<number>>>(defaultS);
  const [selected, setSelected] = useState<Coordinates>(null);

  const keyListener = (e: React.KeyboardEvent<HTMLTableDataCellElement>) => {
    const keyAsNumber = Number(e.key);
    if (Number.isInteger(keyAsNumber) && selected) {
      if (sudoku[selected[0]][selected[1]] === 0) {
        // @TODO stupid javascript :(
        const copySud = JSON.parse(JSON.stringify(sudoku));
        copySud[selected[0]][selected[1]] = keyAsNumber;
        setSudoku(copySud);
      }
    }
  };

  const isIntersection = (coord: Exclude<Coordinates, null>) => {
    if (selected) {
      return coord.every((el, index) => el === selected[index]);
    }

    return false;
  };

  const solve = () => {
    const solver = new Solver(sudoku);
    solver.solve([0, 0], setSudoku);
  };

  const onClick = (coord: Exclude<Coordinates, null>) => {
    const newCoord = isIntersection(coord) ? null : coord;
    setSelected(newCoord);
  };

  return (
    <div>
      <div className="game-wrapper">
        <table className="game-table">
          <tbody>
            {sudoku.map((row, i) => (
              <tr className="row" key={i}>
                {row.map((num, j) => (
                  <td
                    className={cx('cell', {
                      selected: isIntersection([i, j]),
                      isNew: defaultS[i][j] === 0,
                    })}
                    key={j}
                    onClick={() => onClick([i, j])}
                    tabIndex={0}
                    onKeyDown={keyListener}
                  >
                    <div className="cell-value">{num || ''}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button className="margin-top" onClick={solve}>
        Solve sudoku
      </Button>
    </div>
  );
};

export default Grid;
