import {intersection} from "../../_snowpack/pkg/lodash.js";
import {ActionType} from "../components/Grid/state.js";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
class Solver {
  constructor(sudoku, delay) {
    this.possibleVars = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.sudoku = [[]];
    this.delay = 0;
    this.sudoku = sudoku;
    this.delay = delay;
  }
  static zeroFilter(values) {
    return values.filter((el) => el !== 0);
  }
  getRowValues(rowIndex) {
    return Solver.zeroFilter(this.sudoku[rowIndex]);
  }
  getColumnValues(columnIndex) {
    const columnValues = [];
    this.sudoku.forEach((row) => {
      columnValues.push(row[columnIndex]);
    });
    return Solver.zeroFilter(columnValues);
  }
  getSubgridValues(indexes) {
    const [rowIndex, columnIndex] = Solver.findStartIndexes(indexes);
    const subgridValues = [];
    for (let i = rowIndex; i < rowIndex + 3; i++) {
      for (let j = columnIndex; j < columnIndex + 3; j++) {
        subgridValues.push(this.sudoku[i][j]);
      }
    }
    return Solver.zeroFilter(subgridValues);
  }
  static findStartIndexes(indexes) {
    return [indexes[0] - indexes[0] % 3, indexes[1] - indexes[1] % 3];
  }
  getAllValues(indexes) {
    return [
      this.getRowValues(indexes[0]),
      this.getColumnValues(indexes[1]),
      this.getSubgridValues(indexes)
    ];
  }
  isSafeToSet(indexes, num) {
    const [rowValues, columnValues, subGridValues] = this.getAllValues(indexes);
    if (rowValues.includes(num))
      return false;
    if (columnValues.includes(num))
      return false;
    return !subGridValues.includes(num);
  }
  getUniq(values) {
    return this.possibleVars.filter((val) => !values.includes(val));
  }
  findPossibleValuesToSet(indexes) {
    const values = this.getAllValues(indexes);
    const [uniqToRow, uniqToColumn, uniqToSubgrid] = values.map(this.getUniq, this);
    return intersection(uniqToRow, uniqToColumn, uniqToSubgrid);
  }
  async solve(indexes, callback) {
    await sleep(this.delay);
    let [rowIndex, columnIndex] = indexes;
    if (rowIndex === 8 && columnIndex === 9)
      return true;
    if (columnIndex === 9) {
      rowIndex = rowIndex + 1;
      columnIndex = 0;
    }
    callback({type: ActionType.SET_SELECTED, value: [rowIndex, columnIndex]});
    if (this.sudoku[rowIndex][columnIndex] !== 0) {
      return await this.solve([rowIndex, columnIndex + 1], callback);
    }
    const uniqValues = this.findPossibleValuesToSet([rowIndex, columnIndex]);
    callback({type: ActionType.SET_POSSIBLE_VALUES, value: uniqValues});
    if (uniqValues.length === 0)
      return false;
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
  update(indexes, callback, num) {
    const copySud = JSON.parse(JSON.stringify(this.sudoku));
    const [rowIndex, columnIndex] = indexes;
    copySud[rowIndex][columnIndex] = num;
    this.sudoku = copySud;
    callback({type: ActionType.SET_SUDOKU, value: copySud});
  }
  static uniqCellValues(values, el) {
    return values.map((row) => row.filter((v) => v === el));
  }
  isValidSudoku() {
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
