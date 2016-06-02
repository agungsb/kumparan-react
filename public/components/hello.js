var Hello = React.createClass({
    displayName: 'Hello',
    render: function () {
        return React.createElement("h1", null, "Hello ", this.props.name);
        // return (
        //   <div>
        //     <h1>Hello, {this.props.name}</h1>
        //   </div>
        // )
    }
});

// ReactDOM.render(
//   React.createElement(Hello, { name: "World" }),
//   document.getElementById('hellocomponent')
// );