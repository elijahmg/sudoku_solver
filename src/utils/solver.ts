import { intersection } from 'lodash';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class Solver {
  private possibleVars = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  private sudoku: Array<Array<number>> = [[]];

  constructor(sudoku: Array<Array<number>>) {
    this.sudoku = sudoku;
  }

  private zeroFilter(values: Array<number>) {
    return values.filter((el) => el !== 0);
  }

  private getRowValues(rowIndex: number) {
    return this.zeroFilter(this.sudoku[rowIndex]);
  }

  private getColumnValues(columnIndex: number) {
    const columnValues: Array<number> = [];

    this.sudoku.forEach((row) => {
      columnValues.push(row[columnIndex]);
    });

    return this.zeroFilter(columnValues);
  }

  private getSubgridValues(indexes: Array<number>) {
    const [rowIndex, columnIndex] = this.findStartIndexes(indexes);
    const subgridValues: Array<number> = [];

    for (let i = rowIndex; i < rowIndex + 3; i++) {
      for (let j = columnIndex; j < columnIndex + 3; j++) {
        subgridValues.push(this.sudoku[i][j]);
      }
    }

    return this.zeroFilter(subgridValues);
  }

  private findStartIndexes(indexes: Array<number>) {
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
  ): Promise<boolean> {
    // @TODO make sleep configurable
    // await sleep(10);
    let [rowIndex, columnIndex] = indexes;

    if (rowIndex === 8 && columnIndex === 9) return true;

    if (columnIndex === 9) {
      rowIndex = rowIndex + 1;
      columnIndex = 0;
    }

    if (this.sudoku[rowIndex][columnIndex] !== 0) {
      return await this.solve([rowIndex, columnIndex + 1], callback);
    }

    const uniqValues = this.findPossibleValuesToSet([rowIndex, columnIndex]);

    if (uniqValues.length === 0) return false;

    for (const uniqValue of uniqValues) {
      if (this.isSafeToSet([rowIndex, columnIndex], uniqValue)) {
        this.update([rowIndex, columnIndex], callback, uniqValue);

        if (await this.solve([rowIndex, columnIndex + 1], callback)) {
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
}

export default Solver;
