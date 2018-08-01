import styles from './note.css';

import React from 'react';

console.log(styles);

export default class Note extends React.PureComponent {
    render() {
        const { note } = this.props;
        const createdOn = parseInt(note.created_on, 10) * 1000;

        return (
            <div className={styles.container}>
                <div className={styles.title}>
                    <strong>{note.name}</strong>
                </div>
                <div className={styles.info}>
                    <div className={styles.key}>Style:</div>
                    <div className={styles.value}>{note.style}</div><br />
                    <div className={styles.key}>Brewed On:</div>
                    <div className={styles.value}>{new Date(createdOn).toLocaleDateString()}</div>
                </div>
            </div>
        );
    }
}
