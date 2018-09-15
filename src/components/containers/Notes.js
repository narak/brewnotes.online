import styles from './notes.css';

import React, { Fragment } from 'react';
import Immutable from 'immutable';

import { Grid } from '../../constants/Notes';

import bindKeys from '../../decorators/bindKeys';

import Note from '../notes/Note';

function getIndex(row, col) {
    return row * (Grid.MAX_COL + 1) + col;
}

const localNotes = localStorage.getItem('notes');

@bindKeys('notes')
export default class Notes extends React.PureComponent {
    state = {
        notes: localNotes ? Immutable.fromJS(JSON.parse(localNotes)) : Immutable.List(),
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
            // backspace
            { keys: [8], callback: this.onDeleteNote },
            // backspace, delete
            { keys: [46], callback: this.onDeleteNote },
        ];
    };

    render() {
        const { notes, row, col } = this.state;

        return (
            <Fragment>
                <button type="button" onClick={this.onAddNote}>
                    Add Note
                </button>
                <div className={styles.notesList}>
                    {notes.map((note, i) => {
                        return (
                            <Note
                                key={i}
                                note={note}
                                isSelected={i === getIndex(row, col)}
                                row={Math.floor(i / (Grid.MAX_COL + 1))}
                                col={i % (Grid.MAX_COL + 1)}
                                onClick={this.onSelectRowCol}
                            />
                        );
                    })}
                </div>
            </Fragment>
        );
    }

    onRight = e => {
        let col = this.state.col + 1;

        if (col > Grid.MAX_COL || !this.hasValidIndex(this.state.row, col)) {
            col = 0;
        }
        this.setState({ col });
    };

    onLeft = e => {
        let col = this.state.col - 1;

        if (col < 0) {
            col = Grid.MAX_COL;

            while (!this.hasValidIndex(this.state.row, col)) {
                col--;
            }
        }
        this.setState({ col });
    };

    onDown = e => {
        const maxRows = Math.ceil(this.state.notes.size / (Grid.MAX_COL + 1));

        let row = this.state.row + 1;
        if (row >= maxRows || !this.hasValidIndex(row, this.state.col)) {
            row = 0;
        }
        this.setState({ row });
    };

    onUp = e => {
        const maxRows = Math.ceil(this.state.notes.size / (Grid.MAX_COL + 1));

        let row = this.state.row - 1;
        if (row < 0) {
            row = maxRows - 1;

            while (!this.hasValidIndex(row, this.state.col)) {
                row--;
            }
        }
        this.setState({ row });
    };

    hasValidIndex = (row, col) => {
        const index = getIndex(row, col);
        return this.state.notes.size > index;
    };

    onSelectRowCol = (row, col) => {
        this.setState({ row, col });
    };

    onDeleteNote = () => {
        const index = getIndex(this.state.row, this.state.col);
        this.setState({ notes: this.state.notes.delete(index) });
    };

    onAddNote = () => {
        this.setState({ notes: this.state.notes.push(Immutable.Map({ name: 'Untitled' })) });
    };
}
