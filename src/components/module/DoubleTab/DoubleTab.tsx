import React, { ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';

interface Props {
  onDoubleTab: () => void;
  children: ReactNode;
  delay?: number;
  style?: object;
}

class DoubleTab extends React.Component<Props> {
  private lastTap?: number;

  handleDoubleTab = () => {
    const { delay, onDoubleTab } = this.props;
    const now = Date.now();
    if (this.lastTap && now - this.lastTap < (delay || 300)) {
      onDoubleTab();
    } else {
      this.lastTap = now;
    }
  };

  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={this.props.style}
        onPress={this.handleDoubleTab}>
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

export default DoubleTab;
