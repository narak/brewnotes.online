import styles from './notes.css';
import React from 'react';

import Note from './Note';

import { notesList } from '../mocks/notes';

export default class Notes extends React.PureComponent {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.count}>
                    Showing <strong>{notesList.length}</strong> of{' '}
                    <strong>{notesList.length}</strong> brews
                </div>
                <div className={styles.list}>
                    {notesList.map((note, i) => (
                        <Note note={note} key={i} />
                    ))}
                </div>
            </div>
        );
    }
}
