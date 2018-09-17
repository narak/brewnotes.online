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
            selectedNote: notes.get(0),
            isShowingDetails: false,
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
            { keys: [13], callback: this.onOpenDetails },
            // esc
            { keys: [27], callback: this.onCloseDetails },
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
        const { notes, selectedNote, isShowingDetails } = this.state;

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
                    disableKeys={isShowingDetails}
                />

                {isShowingDetails ? (
                    <Details note={selectedNote} onCloseDetails={this.onCloseDetails} />
                ) : null}
            </Fragment>
        );
    }

    onOpenDetails = () => this.setState({ isShowingDetails: true });

    onCloseDetails = () => this.setState({ isShowingDetails: false });

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
