// Constant variables of ReactBootstrap
const Modal = ReactBootstrap.Modal;
const Popover = ReactBootstrap.Popover;
const Button = ReactBootstrap.Button;
const OverlayTrigger = ReactBootstrap.OverlayTrigger;
const FormGroup = ReactBootstrap.FormGroup;
const ControlLabel = ReactBootstrap.ControlLabel;
const FormControl = ReactBootstrap.FormControl;
const HelpBlock = ReactBootstrap.HelpBlock;
const Table = ReactBootstrap.Table;

// These need to be declared as var here, since the scope of these variables are not shared between scripts (text/babel) imports.
// I found this as tne weak point of ReactJS :(
var RootComponent;
var TableComponent;
var ModalComponent;