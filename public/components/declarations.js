const Hello = React.createClass({
    displayName: 'Hello',
    render: function () {
        return React.createElement("h1", null, "Hello ", this.props.name);
    }
});
const Alert = ReactBootstrap.Alert;
const Modal = ReactBootstrap.Modal;
const Popover = ReactBootstrap.Popover;
const Tooltip = ReactBootstrap.Tooltip;
const Button = ReactBootstrap.Button;
const OverlayTrigger = ReactBootstrap.OverlayTrigger;
const FormGroup = ReactBootstrap.FormGroup;
const ControlLabel = ReactBootstrap.ControlLabel;
const FormControl = ReactBootstrap.FormControl;
const HelpBlock = ReactBootstrap.HelpBlock;