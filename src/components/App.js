import styles from './app.css';

import React, { Fragment } from 'react';
import cns from 'classnames';

import Notes from 'components/containers/Notes';

class App extends React.PureComponent {
    render() {
        return (
            <Fragment>
                <div className={cns(styles.triangle, styles.userTriangle)} />
                <div className={cns(styles.triangle, styles.pageTriangle)} />
                <div className={styles.content}>
                    <header className={styles.header}>
                        <h1 className={styles.logo}>BrewNotes</h1>
                        for narak
                    </header>
                    <Notes />
                </div>
            </Fragment>
        );
    }
}

export default App;
