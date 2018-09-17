// import styles from './notes.css';

import React, { Fragment } from 'react';
import Immutable from 'immutable';
import uuid from 'utils/uuid';

import bindKeys from 'decorators/bindKeys';

import List from 'components/notes/List';
import Details from 'components/notes/Details';

const localNotes = localStorage.getItem('notes');

@bindKeys('notes')
export default class Notes extends React.PureComponent {
    constructor(props) {
        super(props);

        const notes = localNotes ? Immutable.fromJS(JSON.parse(localNotes)) : Immutable.List();
        this.state = {
            notes,
            selectedIndex: notes.size ? 0 : undefined,
            isDetailsFocused: false,
        };
    }

    componentDidMount() {
        this.props.keybind.register(this.getKeyBinds());
    }

    componentWillUnmount() {
        this.props.keybind.unregister();
    }

    getKeyBinds = () => {
        return [
            // enter
            { keys: [13], callback: this.onFocusDetails },
            // esc
            { keys: [27], callback: this.onBlurDetails },
            // backspace
            { keys: [8], callback: this.onDeleteNote },
            // backspace, delete
            { keys: [46], callback: this.onDeleteNote },
        ];
    };

    componentDidUpdate(prevProps, prevState) {
        localStorage.setItem('notes', JSON.stringify(this.state.notes));
    }

    render() {
        const { notes, selectedIndex, isDetailsFocused } = this.state;

        let selectedNote;
        if (selectedIndex !== undefined) {
            selectedNote = notes.get(selectedIndex);
        }

        return (
            <Fragment>
                <div>
                    <button type="button" onClick={this.onAddNote}>
                        Add Note
                    </button>
                </div>
                <List
                    notes={notes}
                    selectedNote={selectedNote}
                    onSelect={this.onSelect}
                    disableKeys={selectedNote && isDetailsFocused}
                />

                {selectedNote ? (
                    <Details
                        note={selectedNote}
                        onBlurDetails={this.onBlurDetails}
                        onUpdate={this.onUpdate}
                    />
                ) : null}
            </Fragment>
        );
    }

    onFocusDetails = () => this.setState({ isDetailsFocused: true });

    onBlurDetails = () => this.setState({ isDetailsFocused: false });

    onSelect = note => {
        this.setState({
            selectedIndex: this.state.notes.findIndex(_note => _note.get('id') === note.get('id')),
        });
    };

    onUpdate = note => {
        const { notes } = this.state;
        const index = this.state.notes.findIndex(_note => _note.get('id') === note.get('id'));
        this.setState({ notes: notes.set(index, note) });
    };

    onDeleteNote = note => {
        if (!note) {
            note = this.state.notes.get(this.state.selectedIndex);
        }

        const notes = this.state.notes.filter(_note => _note.get('id') !== note.get('id'));
        this.setState({ notes });
    };

    onAddNote = () => {
        const { notes } = this.state;
        const indexBeforeAdd = notes.size;
        this.setState({
            notes: notes.push(Immutable.Map({ id: uuid(true) })),
            selectedIndex: indexBeforeAdd,
        });
    };
}
