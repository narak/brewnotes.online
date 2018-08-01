import styles from './loggedinuser.css';

import React from 'react';

export default class LoggedInUser extends React.PureComponent {
    render() {
        return (
            <header className={styles.userInfo}>
                <div className={styles.user}>narak</div>
            </header>
        );
    }
}
