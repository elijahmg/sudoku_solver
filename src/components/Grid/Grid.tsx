import React, { FC, useEffect, useReducer, useState } from 'react';
import cx from 'classnames';

import Button from '../Button/Button';
import { emptySudoku, sudoku as defaultS } from './util';
import Solver from '../../utils/solver';

import styles from './Grid.module.scss';
import Input from '../Input/Input';
import { initialState, reducer, ActionType } from './state';

type Coordinates = [number, number] | null;

/**
 * @TODO force user to fill up
 * 1. Checker is sudoku is solvable (done)
 * 2. Message in the end, sudoku is solved
 * 3. Take out button (done)
 * 4. TESTS!
 * 5. Improve functions in class with lodash
 * 6. Redux-like state
 *
 * **/

interface Props {
  sudoku?: Array<Array<number>>;
}

const Grid: FC<Props> = ({ sudoku: propSudoku = emptySudoku }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { possibleValues, copySudoku, isCustom, isValidSudoku, selected, sudoku } = state;

  const [delay, setDelay] = useState<number>(0);


  useEffect(() => {
    document.addEventListener('keydown', keyListener);

    return () => document.removeEventListener('keydown', keyListener);
  }, [selected]);

  const keyListener = (e: KeyboardEvent) => {
    const keyAsNumber = Number(e.key);

    if (Number.isInteger(keyAsNumber) && selected) {
      // @TODO stupid javascript :(
      const copySud = JSON.parse(JSON.stringify(sudoku));
      copySud[selected![0]][selected![1]] = keyAsNumber;

      dispatch({ type: ActionType.SET_SUDOKU, value: copySud });
    }
  };

  const isIntersection = (coord: Exclude<Coordinates, null>) => {
    if (selected) {
      return coord.every((el, index) => el === selected![index]);
    }

    return false;
  };

  const solve = async () => {
    dispatch({ type: ActionType.RESET_BEFORE_SOLVE });

    const solver = new Solver(sudoku, delay);

    if (!solver.isValidSudoku()) {
      dispatch({ type: ActionType.SET_IS_VALID_SUDOKU, value: true });
    } else {
      await solver.solve([0, 0], dispatch);
      dispatch({ type: ActionType.SET_SELECTED, value: null });
    }
  };

  const onReset = () => {
    dispatch({ type: ActionType.FULL_RESET });
  };

  const onSetExample = () => {
    dispatch({ type: ActionType.EXAMPLE_RESET });
  };

  const onClick = (coord: Exclude<Coordinates, null>) => {
    dispatch({ type: ActionType.ON_CLICK, value: isIntersection(coord) ? null : coord });
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
                    [styles.selected]: isIntersection([i, j]),
                    [styles.isNew]: copySudoku[i][j] === 0 && !isCustom,
                  })}
                  key={j}
                  onClick={() => onClick([i, j])}
                  tabIndex={0}
                >
                  <div>{num || ''}</div>
                </td>
              ))}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      <div className={styles.possibleValues}>
        {isValidSudoku && <span style={{
          color: 'red',
        }}>Your sudoku is not valid</span>}
        <span>Fill up your own sudoku or set example sudoku</span>
        <span>Select cell by mouse and use numbers on keyboard</span>
        <span>Possible values: [{possibleValues?.join(', ')}]</span>
        <Input
          onChange={(value) => setDelay(Number(value))}
          value={delay}
          className={styles.input}
          type='number'
        >Delay, ms</Input>
        <div className={styles.buttonGroup}>
          <Button onClick={solve}>Solve sudoku</Button>
          <Button onClick={onReset}>Reset</Button>
          <Button onClick={onSetExample}>Set example sudoku</Button>
        </div>
      </div>
    </div>
  );
};

export default Grid;
