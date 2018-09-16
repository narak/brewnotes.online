import { Grid } from 'constants/GridConstants';

/**
 * Gets the index from the row and column.
 * @param  {Number} row The row number
 * @param  {Number} col The column number
 * @return {Number}     The item index
 */
export function getIndex(row, col) {
    return row * (Grid.MAX_COL + 1) + col;
}

/**
 * Gets the row and column from the index
 * @param  {Number} index The item index
 * @return {Object}       Object with row and col attributes
 */
export function getRowCol(index) {
    return {
        row: Math.floor(index / (Grid.MAX_COL + 1)),
        col: index % (Grid.MAX_COL + 1),
    };
}
