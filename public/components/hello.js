var Hello = React.createClass({
  displayName: 'Hello',
  render: function () {
    return React.createElement("h1", null, "Hello ", this.props.name);
  }
});

ReactDOM.render(
  React.createElement(Hello, { name: "World" }),
  document.getElementById('container')
);