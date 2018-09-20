import styles from './button.cssm';

import React from 'react';
import cns from 'classnames';

export default class Button extends React.PureComponent {
    render() {
        const { type = 'button', className, ...ptp } = this.props;

        let cls = cns(className, styles.base),
            btnType = type;

        if (type === 'icon') {
            cls = cns(cls, styles.icon);
            btnType = 'button';
        }

        return <button {...ptp} className={cls} type={btnType} />;
    }
}
