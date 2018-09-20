import styles from './app.cssm';

import React, { Fragment } from 'react';
import cns from 'classnames';

import Notes from 'components/containers/Notes';

class App extends React.PureComponent {
    render() {
        return (
            <Fragment>
                <header>
                    <h1 className={styles.logo}>BrewNotes</h1>
                </header>
                <div className={styles.content}>
                    <Notes />
                </div>
            </Fragment>
        );
    }
}

export default App;
