import styles from './icon.cssm';

import React from 'react';
import cns from 'classnames';

export default class Icon extends React.PureComponent {
    render() {
        const { icon, className, ...ptp } = this.props;
        const classed = cns(className, styles.icon, 'svg-icon');

        if (!this.props.icon) {
            return <span className="icon-not-defined" />;
        }

        return <span {...ptp} className={classed} dangerouslySetInnerHTML={{ __html: icon }} />;
    }
}
