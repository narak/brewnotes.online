import styles from './tile.cssm';

import React from 'react';
import ReactDOM from 'react-dom';
import cns from 'classnames';

import { Styles } from 'constants/BeerConstants';

const Displayed = { name: true, id: 'true', type: true };

export default class Note extends React.PureComponent {
    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.isSelected && this.props.isSelected) {
            const $el = ReactDOM.findDOMNode(this);
            $el.scrollIntoViewIfNeeded();
        }
    }

    render() {
        const { note, isSelected } = this.props;
        const type = note.get('type');

        const attrs = [];
        note.forEach((val, key) => {
            if (Displayed[key]) return;

            attrs.push(
                <div key={key}>
                    {key}: {val}
                </div>
            );
        });

        const cls = cns(styles.note, { [styles.isSelected]: isSelected });

        return (
            <div className={cls} onClick={this.onClick}>
                {type ? <div className={styles.style}>{Styles[type] || type}</div> : null}
                <b className={styles.name}>{note.get('name') || 'Unnamed Note'}</b>
                {attrs}
            </div>
        );
    }

    onClick = () => {
        this.props.onClick(this.props.note);
    };
}
