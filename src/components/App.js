import styles from './app.css';

import React, { Fragment } from 'react';
import cns from 'classnames';

import Notes from './containers/Notes';

class App extends React.PureComponent {
    render() {
        return (
            <Fragment>
                <header className={styles.header}>
                    <h1 className={styles.logo}>BrewNotes</h1>
                    for narak
                </header>
                <div className={cns(styles.triangle, styles.userTriangle)} />
                <div className={cns(styles.triangle, styles.pageTriangle)} />
                <Notes />
            </Fragment>
        );
    }
}

export default App;
