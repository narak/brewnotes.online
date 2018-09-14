import styles from './notes.css';

import React from 'react';
import Immutable from 'immutable';

import { Grid } from '../../constants/Notes';

import bindKeys from '../../decorators/bindKeys';

import Note from '../notes/Note';

const ARBIT_MAX_ROW = 4;

@bindKeys('notes')
export default class Notes extends React.PureComponent {
    state = {
        notes: Immutable.fromJS(JSON.parse(localStorage.getItem('notes'))),
        row: 0,
        col: 0,
    };

    componentDidMount() {
        this.props.keybind.register(this.getKeyBinds());
    }

    componentWillUnmount() {
        this.props.keybind.unregister();
    }

    componentDidUpdate(prevProps, prevState) {
        localStorage.setItem('notes', JSON.stringify(this.state.notes));
    }

    getKeyBinds = () => {
        return [
            // Up: K
            { keys: [75], callback: this.onUp },
            // Right: L
            { keys: [76], callback: this.onRight },
            // Down: J
            { keys: [74], callback: this.onDown },
            // Left: H
            { keys: [72], callback: this.onLeft },
        ];
    };

    render() {
        const { notes, row, col } = this.state;

        return (
            <div className={styles.container}>
                <button type="button" onClick={this.onAddNote}>
                    Add Note
                </button>
                Notes List:
                <div className={styles.notesList}>
                    {notes.map((note, i) => {
                        return (
                            <Note
                                key={i}
                                note={note}
                                isSelected={i === row * (Grid.MAX_COL + 1) + col}
                                col={Math.floor(i / (Grid.MAX_COL + 1))}
                                row={i % (Grid.MAX_COL + 1)}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }

    onRight = e => {
        let col = this.state.col;
        if (col >= Grid.MAX_COL) {
            col = 0;
        } else {
            col++;
        }
        this.setState({ col });
    };

    onLeft = e => {
        let col = this.state.col;
        if (col <= 0) {
            col = Grid.MAX_COL;
        } else {
            col--;
        }
        this.setState({ col });
    };

    onDown = e => {
        const maxRows = Math.floor(this.state.notes.size / (Grid.MAX_COL + 1));

        let row = this.state.row + 1;
        if (row >= maxRows) {
            row = 0;
        }
        this.setState({ row });
    };

    onUp = e => {
        const maxRows = Math.floor(this.state.notes.size / (Grid.MAX_COL + 1));

        let row = this.state.row - 1;
        if (row < 0) {
            row = maxRows;
        }
        this.setState({ row });
    };

    onAddNote = () => {
        this.setState({ notes: this.state.notes.push(Immutable.Map({ name: 'Untitled' })) });
    };
}
