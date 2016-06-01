const Example = React.createClass({

    getInitialState() {
        return { showModal: false, ssn: '', nama: '', email: '', foto: '' };
    },

    close() {
        this.setState({ showModal: false });
    },

    open() {
        this.setState({ showModal: true });
    },

    getValidationState() {
        const length = this.state.ssn.length;
        // if (length > 10) return 'success';
        // else if (length > 5) return 'warning';
        if (length == 4) return 'success';
        else if(length> 0) return 'error';
    },

    handleChange(e) {
        var nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    },
    
    handleSubmit(e){
        e.preventDefault();
        var elements = ReactDOM.findDOMNode(this.refs.addform).elements;
    },

    render() {
        let popover = <Popover title="popover">very popover.such engagement</Popover>;
        let tooltip = <Tooltip>wow.</Tooltip>;

        return (
            <div>
                <Button
                    className="form-control"
                    bsStyle="success"
                    onClick={this.open}
                    ><i className="glyphicon glyphicon-plus"></i>&nbsp; Tambah
                </Button>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tambah Karyawan</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form ref="addform" onSubmit={this.handleSubmit}>
                            <FormGroup controlId="ssn" validationState={this.getValidationState() }>
                                <ControlLabel>SSN Karyawan</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.ssn}
                                    name="ssn"
                                    placeholder="Masukkan SSN Karyawan"
                                    onChange={this.handleChange}
                                    />
                                <FormControl.Feedback />
                                <HelpBlock>SSN haruslah berisi angka.</HelpBlock>
                            </FormGroup>
                            <FormGroup controlId="nama">
                                <ControlLabel>Nama Karyawan</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.nama}
                                    name="nama"
                                    placeholder="Masukkan Nama Karyawan"
                                    onChange={this.handleChange}
                                    />
                                <FormControl.Feedback />
                            </FormGroup>
                            <FormGroup controlId="email">
                                <ControlLabel>Email Karyawan</ControlLabel>
                                <FormControl
                                    type="email"
                                    value={this.state.email}
                                    name="email"
                                    placeholder="Masukkan Email Karyawan"
                                    onChange={this.handleChange}
                                    />
                                <FormControl.Feedback />
                            </FormGroup>
                            <Button type="submit" bsStyle="primary">Submit</Button>
                            <Button onClick={this.close} bsStyle="danger">Batal</Button>
                        </form>
                   </Modal.Body>
                </Modal>
            </div>
        );
    }
});

ReactDOM.render(<Example/>, document.getElementById('modalcomponent'));