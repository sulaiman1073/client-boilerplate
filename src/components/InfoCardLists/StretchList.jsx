import React, { createRef, Component } from "react";

class StretchList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0
    };

    this.ref = createRef();

    this.resize = this.resize.bind(this);
  }

  resize() {
    const height = this.ref.current.clientHeight;
    if (this.state.height !== height) {
      this.setState({
        height: height
      });
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.forceRefresh !== this.props.forceRefresh) {
      this.setState({
        height: 0
      });
    } else {
      this.resize();
    }
  }

  render() {
    const { list, ...rest } = this.props;
    const List = list;

    return (
      <div ref={this.ref} className="flex flex-grow mt-px">
        <List height={this.state.height} {...rest} />
      </div>
    );
  }
}

export default StretchList;
