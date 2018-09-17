import styles from './details.css';

import React from 'react';
import ReactDOM from 'react-dom';
import TextInput from 'components/common/form/TextInput';

export default class Details extends React.PureComponent {
    componentDidUpdate({ note: prevNote }) {
        const { note: newNote } = this.props;

        // If a new note with no name has been selected, focus the name field.
        if (newNote.get('id') !== prevNote.get('id') && !newNote.get('name')) {
            const $name = ReactDOM.findDOMNode(this.refs.nameFld);
            $name.focus();
        }
    }

    render() {
        const { note } = this.props;
        return (
            <div className={styles.container}>
                <TextInput
                    ref="nameFld"
                    name="name"
                    placeholder="Enter brew name"
                    value={note.get('name') || ''}
                    onChange={this.onChange}
                    className={styles.title}
                />
            </div>
        );
    }

    onChange = (name, value) => {
        this.props.onUpdate(this.props.note.set(name, value));
    };
}
