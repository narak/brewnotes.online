import styles from './tile.css';

import React from 'react';
import ReactDOM from 'react-dom';
import cns from 'classnames';

export default class Note extends React.PureComponent {
    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.isSelected && this.props.isSelected) {
            const $el = ReactDOM.findDOMNode(this);
            $el.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
    }

    render() {
        const { note, isSelected } = this.props;

        const attrs = [];
        note.forEach((val, key) => {
            if (key === 'name') return;

            attrs.push(
                <div key={key}>
                    {key}: {val}
                </div>
            );
        });

        const cls = cns(styles.note, { [styles.isSelected]: isSelected });

        return (
            <div className={cls} onClick={this.onClick}>
                <div>{note.get('name')}</div>
                {attrs}
            </div>
        );
    }

    onClick = () => {
        this.props.onClick(this.props.note);
    };
}
