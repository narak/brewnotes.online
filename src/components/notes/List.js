import styles from './list.css';

import React from 'react';
import { getRowCol, getIndex } from 'helpers/GridHelpers';

import { Grid } from 'constants/GridConstants';

import bindKeys from 'decorators/bindKeys';
import Tile from './Tile';

@bindKeys('notes')
export default class List extends React.PureComponent {
    componentDidMount() {
        this.props.keybind.register(this.getKeyBinds());
    }

    componentWillUnmount() {
        this.props.keybind.unregister();
    }

    getKeyBinds = () => {
        return [
            // Left: H
            { keys: [37], callback: this.onLeft },
            // Up: K
            { keys: [38], callback: this.onUp },
            // Right: L
            { keys: [39], callback: this.onRight },
            // Down: J
            { keys: [40], callback: this.onDown },
            // backspace
            { keys: [8], callback: this.onDeleteNote },
            // backspace, delete
            { keys: [46], callback: this.onDeleteNote },
        ];
    };

    render() {
        const { notes, selectedNote } = this.props;

        return (
            <div className={styles.list}>
                {notes.map((note, i) => {
                    return (
                        <Tile
                            key={i}
                            index={i}
                            note={note}
                            isSelected={selectedNote && selectedNote.get('id') === note.get('id')}
                            onClick={this.onSelectRowCol}
                        />
                    );
                })}
            </div>
        );
    }

    getIndexRowCol = () => {
        const index = this.props.notes.findIndex(
            note => note.get('id') === this.props.selectedNote.get('id')
        );
        const { row, col } = getRowCol(index);
        return { row, col, index };
    };

    gridMoveWrapper = move => () => {
        const { row, col } = this.getIndexRowCol();
        const { row: newRow, col: newCol } = move(row, col);
        const newIndex = getIndex(newRow, newCol);
        this.props.onSelect(this.props.notes.get(newIndex));
    };

    onRight = this.gridMoveWrapper((row, col) => {
        col++;
        if (col > Grid.MAX_COL || !this.hasValidIndex(row, col)) {
            col = 0;
        }
        return { row, col };
    });

    onLeft = this.gridMoveWrapper((row, col) => {
        col--;
        if (col < 0) {
            col = Grid.MAX_COL;

            while (!this.hasValidIndex(row, col)) {
                col--;
            }
        }
        return { row, col };
    });

    onDown = this.gridMoveWrapper((row, col) => {
        const maxRows = Math.ceil(this.props.notes.size / (Grid.MAX_COL + 1));
        row++;
        if (row >= maxRows || !this.hasValidIndex(row, col)) {
            row = 0;
        }
        return { row, col };
    });

    onUp = this.gridMoveWrapper((row, col) => {
        const maxRows = Math.ceil(this.props.notes.size / (Grid.MAX_COL + 1));
        row--;
        if (row < 0) {
            row = maxRows - 1;

            while (!this.hasValidIndex(row, col)) {
                row--;
            }
        }
        return { row, col };
    });

    hasValidIndex = (row, col) => {
        const index = getIndex(row, col);
        return this.props.notes.size > index;
    };

    onSelectRowCol = (row, col) => {
        this.setState({ row, col });
    };
}
