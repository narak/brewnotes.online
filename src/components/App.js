import styles from './app.css';

import React, { Fragment } from 'react';
import cns from 'classnames';

import LoggedInUser from './LoggedInUser';
import Search from './Search';
import Notes from './Notes';

class App extends React.PureComponent {
    render() {
        return (
            <Fragment>
                <header className={styles.header}>
                    <h1 className={styles.logo}>BrewNotes</h1>
                </header>
                <LoggedInUser />
                <Search />
                <div className={cns(styles.triangle, styles.userTriangle)} />
                <div className={cns(styles.triangle, styles.pageTriangle)} />

                <Notes />
            </Fragment>
        );
    }
}

export default App;
