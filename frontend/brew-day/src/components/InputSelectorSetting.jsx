import * as React from 'react';
import JimTable from './JimTable';
import Selector from './Selector';

export default class InputSelectorSetting extends React.Component {
    render() {
        return (<JimTable>
            <p style={{textAlign: "center"}}>{this.props.title}</p>
            <Selector
                label={this.props.label}
                value={this.props.value}
                onChange={this.props.onChange}
                options={this.props.options}/>
        </JimTable>)
    }
}