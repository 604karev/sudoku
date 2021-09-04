module.exports = function solveSudoku(matrix) {
    const size = 9;
    const boxSize = 3;

    const findEmpty = (matrix) => {
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                if (matrix[r][c] === 0) {
                    return [r, c];
                }
            }
        }
        return null;
    };

    const isNumberValid = (num, pos, matrix) => {
        const [row, col] = pos;

        for (let i = 0; i < size; i++) {
            if (matrix[i][col] === num && i !== row) {
                return false;
            }
        }

        for (let i = 0; i < size; i++) {
            if (matrix[row][i] === num && i !== col) {
                return false;
            }
        }


        const boxRow = Math.floor(row / boxSize) * boxSize;
        const boxCol = Math.floor(col / boxSize) * boxSize;

        for (let i = boxRow; i < boxRow + boxSize; i++) {
            for (let j = boxCol; j < boxCol + boxSize; j++) {
                if (matrix[i][j] === num && i !== row && j !== col) {
                    return false;
                }
            }
        }

        return true;
    };

    const resolveSudoku = () => {
        const currPos = findEmpty(matrix);
        if (currPos === null) {
            return true;
        }
        for (let number = 1; number < size + 1; number++) {
            if (isNumberValid(number, currPos, matrix)) {
                const [x, y] = currPos;
                matrix[x][y] = number;
                if (resolveSudoku()) {
                    return true;
                }
                matrix[x][y] = 0;
            }
        }
        return false;
    };

    resolveSudoku();
    return matrix;
};
