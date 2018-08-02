import styles from './note.css';

import React from 'react';

export default class Note extends React.PureComponent {
    render() {
        const { note } = this.props;
        const createdOn = parseInt(note.created_on, 10) * 1000;

        return (
            <div className={styles.container}>
                <div className={styles.style}>{note.style}</div>
                <div className={styles.title}>
                    <strong>{note.name}</strong>
                </div>
                <div className={styles.info}>
                    Currently <strong>{note.stage}</strong>, which is done in{' '}
                    <em>{note.stage_ends_on}</em>.<br />
                    Beer is ready in <em>{note.completes_on}</em>.<br />
                </div>
                <div className={styles.footer}>
                    Brewed On: {new Date(createdOn).toLocaleDateString()}
                </div>
            </div>
        );
    }
}
