import styles from './note.css';

import React from 'react';
import cns from 'classnames';

import { Grid } from '../../constants/Notes';

export default class Note extends React.PureComponent {
    render() {
        const { note, isSelected, row, col } = this.props;

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

        const left = (row * Grid.WIDTH) + 'px';
        const top = (col * Grid.HEIGHT) + 'px';

        return (
            <div className={cls} style={{left, top}}>
                <div>{note.get('name')}</div>
                {attrs}
            </div>
        );
    }
}