import { intersection } from 'lodash';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class Solver {
  private possibleVars = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  private sudoku: Array<Array<number>> = [[]];
  private delay = 0;

  constructor(sudoku: Array<Array<number>>, delay: number) {
    this.sudoku = sudoku;
    this.delay = delay;
  }

  private static zeroFilter(values: Array<number>) {
    return values.filter((el) => el !== 0);
  }

  private getRowValues(rowIndex: number) {
    return Solver.zeroFilter(this.sudoku[rowIndex]);
  }

  private getColumnValues(columnIndex: number) {
    const columnValues: Array<number> = [];

    this.sudoku.forEach((row) => {
      columnValues.push(row[columnIndex]);
    });

    return Solver.zeroFilter(columnValues);
  }

  private getSubgridValues(indexes: Array<number>) {
    const [rowIndex, columnIndex] = Solver.findStartIndexes(indexes);
    const subgridValues: Array<number> = [];

    for (let i = rowIndex; i < rowIndex + 3; i++) {
      for (let j = columnIndex; j < columnIndex + 3; j++) {
        subgridValues.push(this.sudoku[i][j]);
      }
    }

    return Solver.zeroFilter(subgridValues);
  }

  private static findStartIndexes(indexes: Array<number>) {
    return [indexes[0] - (indexes[0] % 3), indexes[1] - (indexes[1] % 3)];
  }

  private getAllValues(indexes: Array<number>) {
    return [
      this.getRowValues(indexes[0]),
      this.getColumnValues(indexes[1]),
      this.getSubgridValues(indexes),
    ];
  }

  /**
   * Check if it is possible to set value into the cell
   * @param indexes
   * @param num
   * @private
   */
  private isSafeToSet(indexes: Array<number>, num: number) {
    const [rowValues, columnValues, subGridValues] = this.getAllValues(indexes);

    if (rowValues.includes(num)) return false;
    if (columnValues.includes(num)) return false;

    return !subGridValues.includes(num);
  }

  private getUniq(values: Array<number>) {
    return this.possibleVars.filter((val) => !values.includes(val));
  }

  /**
   * Find uniq values that can be set to the cell
   * @param {Array} indexes
   * @private
   */
  private findPossibleValuesToSet(indexes: Array<number>) {
    const values = this.getAllValues(indexes);

    const [uniqToRow, uniqToColumn, uniqToSubgrid] = values.map(
      this.getUniq,
      this,
    );

    return intersection(uniqToRow, uniqToColumn, uniqToSubgrid);
  }

  async solve(
    indexes: Array<number>,
    callback: (arr: Array<Array<number>>) => void,
    setValues: (arr: Array<number>) => void,
    setSelected: (arr: Array<number>) => void,
  ): Promise<boolean> {
    // @TODO make sleep configurable
    await sleep(this.delay);
    let [rowIndex, columnIndex] = indexes;

    if (rowIndex === 8 && columnIndex === 9) return true;

    if (columnIndex === 9) {
      rowIndex = rowIndex + 1;
      columnIndex = 0;
    }
    setSelected([rowIndex, columnIndex]);

    if (this.sudoku[rowIndex][columnIndex] !== 0) {
      return await this.solve(
        [rowIndex, columnIndex + 1],
        callback,
        setValues,
        setSelected,
      );
    }

    const uniqValues = this.findPossibleValuesToSet([rowIndex, columnIndex]);
    setValues(uniqValues);

    if (uniqValues.length === 0) return false;

    for (const uniqValue of uniqValues) {
      if (this.isSafeToSet([rowIndex, columnIndex], uniqValue)) {
        this.update([rowIndex, columnIndex], callback, uniqValue);

        if (
          await this.solve(
            [rowIndex, columnIndex + 1],
            callback,
            setValues,
            setSelected,
          )
        ) {
          return true;
        }
      }
      this.update([rowIndex, columnIndex], callback, 0);
    }

    return false;
  }

  /**
   * Creates new copy of array by value
   * @param {Array} indexes
   * @param {function} callback
   * @param {number} num
   * @private
   */
  private update(
    indexes: Array<number>,
    callback: (arr: Array<Array<number>>) => void,
    num: number,
  ) {
    const copySud = JSON.parse(JSON.stringify(this.sudoku));
    const [rowIndex, columnIndex] = indexes;

    copySud[rowIndex][columnIndex] = num;

    this.sudoku = copySud;
    callback(copySud);
  }

  /**
   * Check for row, column and subgrid, if value in a cell is uniq
   * @param values
   * @param el
   * @private
   */
  private static uniqCellValues(values: Array<Array<number>>, el: number) {
    return values.map((row) => row.filter((v) => v === el));
  }

  isValidSudoku(): boolean {
    for (let i = 0; i < this.sudoku.length; i++) {
      for (let j = 0; j < this.sudoku[i].length; j++) {
        const el = this.sudoku[i][j];
        if (el !== 0) {
          const allValues = this.getAllValues([i, j]);

          const uniqCellValues = Solver.uniqCellValues(allValues, el);

          if (uniqCellValues.some((row) => row.length !== 1)) {
            return false;
          }
        }
      }
    }

    return true;
  }
}

export default Solver;
