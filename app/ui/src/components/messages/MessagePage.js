import React, { useState, useEffect } from 'react';
import SearchBar from "material-ui-search-bar";

export function MessagePage() {

  return (
    <SearchBar
      value={this.state.value}
      onChange={(newValue) => this.setState({ value: newValue })}
      onRequestSearch={() => doSomethingWith(this.state.value)}
      />
  );
}
export default MessagePage;
