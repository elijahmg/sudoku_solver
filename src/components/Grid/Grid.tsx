import React, { FC, useEffect, useState } from 'react';
import cx from 'classnames';

import Button from '../Button/Button';
import { sudoku as defaultS } from './util';
import Solver from '../../utils/solver';

import styles from './Grid.module.scss';
import Slider from '../Slider/Slider';

type Coordinates = [number, number] | null;

/**
 * @TODO force user to fill up
 * 1. Checker is sudoku is solvable (done)
 * 2. Message in the end, sudoku is solved
 * 3. Take out button (done)
 * 4. TESTS!
 * 5. Improve functions in class with lodash
 *
 * **/

const Grid: FC = () => {
  const [sudoku, setSudoku] = useState<Array<Array<number>>>(defaultS);
  const [selected, setSelected] = useState<Array<number> | null>();
  const [possibleValues, setPossibleValues] = useState<Array<number>>();

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

  const solve = async () => {
    const solver = new Solver(sudoku);
    await solver.solve([0, 0], setSudoku, setPossibleValues, setSelected);
    setSelected(null);
  };

  const onClick = (coord: Exclude<Coordinates, null>) => {
    const newCoord = isIntersection(coord) ? null : coord;
    // setSelected(newCoord);
  };

  return (
    <div className={styles.flex}>
      <div className={styles.gameWrapper}>
        <table className={styles.gameTable}>
          <tbody>
            {sudoku.map((row, i) => (
              <tr className={styles.row} key={i}>
                {row.map((num, j) => (
                  <td
                    className={cx(styles.cell, {
                      selected: isIntersection([i, j]),
                      isNew: defaultS[i][j] === 0,
                    })}
                    key={j}
                    onClick={() => onClick([i, j])}
                    tabIndex={0}
                    onKeyDown={keyListener}
                  >
                    <div>{num || ''}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        style={{
          marginLeft: '2rem',
        }}
      >
        <div
          style={{
            fontSize: '24px',
            marginTop: '10rem',
          }}
        >
          Possible values: {possibleValues?.toString()}
        </div>
        <Button className="margin-top" onClick={solve}>
          Solve sudoku
        </Button>
      </div>
    </div>
  );
};

export default Grid;
