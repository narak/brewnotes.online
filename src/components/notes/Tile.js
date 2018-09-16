import styles from './tile.css';

import React from 'react';
import ReactDOM from 'react-dom';
import cns from 'classnames';

import { getRowCol } from 'helpers/GridHelpers';
import { Grid } from 'constants/GridConstants';

export default class Note extends React.PureComponent {
    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.isSelected && this.props.isSelected) {
            const $el = ReactDOM.findDOMNode(this);
            $el.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
    }

    render() {
        const { note, isSelected, index } = this.props;

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

        const { row, col } = getRowCol(index);
        const left = col * (Grid.WIDTH + Grid.PADDING_RIGHT) + 'px';
        const top = row * (Grid.HEIGHT + Grid.PADDING_BOTTOM) + 'px';

        return (
            <div className={cls} style={{ left, top }} onClick={this.onClick}>
                <div>{note.get('name')}</div>
                {attrs}
            </div>
        );
    }

    onClick = () => {
        this.props.onClick(this.props.row, this.props.col);
    };
}
