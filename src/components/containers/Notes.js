// import styles from './notes.css';

import React, { Fragment } from 'react';
import Immutable from 'immutable';
import uuid from 'utils/uuid';

import bindKeys from 'decorators/bindKeys';

import List from 'components/notes/List';

const localNotes = localStorage.getItem('notes');

@bindKeys('notes')
export default class Notes extends React.PureComponent {
    constructor(props) {
        super(props);

        const notes = localNotes ? Immutable.fromJS(JSON.parse(localNotes)) : Immutable.List();
        this.state = {
            notes,
            selectedNote: notes.get(0),
        };
    }

    componentDidUpdate(prevProps, prevState) {
        localStorage.setItem('notes', JSON.stringify(this.state.notes));
    }

    render() {
        const { notes, selectedNote } = this.state;

        return (
            <Fragment>
                <button type="button" onClick={this.onAddNote}>
                    Add Note
                </button>
                <List notes={notes} selectedNote={selectedNote} onSelect={this.onSelect} />
            </Fragment>
        );
    }

    onSelect = note => this.setState({ selectedNote: note });

    onDeleteNote = (note = this.state.selectedNote) => {
        const notes = this.state.notes.filter(_note => _note.get('id') !== note.get('id'));
        this.setState({ notes });
    };

    onAddNote = () => {
        this.setState({
            notes: this.state.notes.push(Immutable.Map({ id: uuid(true), name: 'Untitled' })),
        });
    };
}
