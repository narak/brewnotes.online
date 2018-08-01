import styles from './search.css';

import React from 'react';

export default class LoggedInUser extends React.PureComponent {
    render() {
        return (
            <header className={styles.search}>
                <input
                    type="text"
                    name="search"
                    placeholder="Type here to search..."
                    className={styles.searchInput}
                    autoComplete="off"
                />
            </header>
        );
    }
}
