import 'react-select-plus/dist/react-select-plus.css';

import React from 'react';
import Select from 'react-select-plus';

export default class SelectInput extends React.Component {
    render() {
        return <Select {...this.props} onChange={this.onChange} />;
    }
    onChange = selectedOption => {
        this.props.onChange(this.props.name, selectedOption.value, selectedOption);
    };
}
