import styles from './form.css';

import React from 'react';
import cns from 'classnames';

export default class TextInput extends React.PureComponent {
    render() {
        const cls = cns(styles.input, this.props.className);

        return <input {...this.props} className={cls} onChange={this.onChange} />;
    }

    onChange = e => this.props.onChange(e.target.name, e.target.value);
}
