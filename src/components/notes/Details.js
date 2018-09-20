import styles from './details.cssm';

import React from 'react';
import ReactDOM from 'react-dom';
import objectToKVArray from 'utils/objectToKVArray';

import { Styles } from 'constants/BeerConstants';

import { TextInput, SelectInput } from 'components/common/form';

const BeerStyleOptions = objectToKVArray(Styles, 'value', 'label');

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
                <SelectInput
                    name="type"
                    placeholder="Select type"
                    value={note.get('type')}
                    isSearchable={true}
                    options={BeerStyleOptions}
                    onChange={this.onChange}
                />
            </div>
        );
    }

    onChange = (name, value) => {
        this.props.onUpdate(this.props.note.set(name, value));
    };
}
