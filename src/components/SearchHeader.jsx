import React, { Component } from "react";
import Input from "./Controls/Input";

export function buildSearchInput(input, setInput) {
  return (
    <Input
      variant="filter"
      size="sm"
      value={input}
      placeholder="Search"
      onChange={e => setInput(e.target.value)}
      className="w-full"
    />
  );
}

class SearchHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ""
    };

    this.setInput = this.setInput.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  setInput(value) {
    this.setState({
      input: value
    });
  }

  handleEnter() {
    this.setState({
      input: ""
    });

    this.props.handleEnter();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.input !== prevState.input ||
      this.props.items.length !== prevProps.items.length
    ) {
      this.props.filterSearch(this.state.input, this.props.items);
    }
  }

  render() {
    return (
      <div className="inset-x-0 top-0 bg-secondaryBackground rounded-t-xl flex flex-col items-center border-b py-2 px-4">
        <h4 className="text-sm text-primaryText font-bold py-2">
          {this.props.title}
        </h4>
        {this.props.buildInput(
          this.state.input,
          this.setInput,
          this.handleEnter
        )}
      </div>
    );
  }
}

export default SearchHeader;
