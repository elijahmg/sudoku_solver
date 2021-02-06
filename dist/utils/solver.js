import {intersection} from "../../_snowpack/pkg/lodash.js";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
class Solver {
  constructor(sudoku) {
    this.possibleVars = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.sudoku = [[]];
    this.sudoku = sudoku;
  }
  zeroFilter(values) {
    return values.filter((el) => el !== 0);
  }
  getRowValues(rowIndex) {
    return this.zeroFilter(this.sudoku[rowIndex]);
  }
  getColumnValues(columnIndex) {
    const columnValues = [];
    this.sudoku.forEach((row) => {
      columnValues.push(row[columnIndex]);
    });
    return this.zeroFilter(columnValues);
  }
  getSubgridValues(indexes) {
    const [rowIndex, columnIndex] = this.findStartIndexes(indexes);
    const subgridValues = [];
    for (let i = rowIndex; i < rowIndex + 3; i++) {
      for (let j = columnIndex; j < columnIndex + 3; j++) {
        subgridValues.push(this.sudoku[i][j]);
      }
    }
    return this.zeroFilter(subgridValues);
  }
  findStartIndexes(indexes) {
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
    let [rowIndex, columnIndex] = indexes;
    if (rowIndex === 8 && columnIndex === 9)
      return true;
    if (columnIndex === 9) {
      rowIndex = rowIndex + 1;
      columnIndex = 0;
    }
    if (this.sudoku[rowIndex][columnIndex] !== 0) {
      return await this.solve([rowIndex, columnIndex + 1], callback);
    }
    const uniqValues = this.findPossibleValuesToSet([rowIndex, columnIndex]);
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
    callback(copySud);
  }
}
export default Solver;
