ModalComponent = React.createClass({
    displayName: "ModalComponent",
    componentDidMount() {

    },

    getInitialState() {
        return { showModal: false, ssn: '', nama: '', email: '', foto: '', hide: 'hide', disabled: true };
    },

    close() {
        this.setState({ showModal: false, ssn: '', nama: '', email: '', foto: '', hide: 'hide' });
    },

    open() {
        this.setState({ showModal: true });
    },

    getValidationState() {
        const length = this.state.ssn.length;
        // if (length > 10) return 'success';
        // else if (length > 5) return 'warning';
        if (length == 4) {
            return 'success';
        } else if (length > 0) {
            return 'error';
        }
    },

    handleKeyDown(e) {
        if (e.target.name == 'ssn') {
            var key = typeof e.which === 'undefined' ? e.keyCode : e.which;
            if (!(key >= 48 && key <= 57) && !(key >= 96 && key <= 105) && key != 9 && key != 8 && key != 37 && key != 38 && key != 39 && key != 40) {
                e.preventDefault();
            }
        }
    },

    handleChange(e) {
        var nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    },

    handleSubmit(e) {
        e.preventDefault();
        if ((this.state.ssn.length != 4) || (this.state.nama == '') || (this.state.email == '') || (this.state.foto == '')) {
            alert("Mohon lengkapi form");
            return;
        } else {
            let data = { "ssn": this.state.ssn, "nama": this.state.nama, "email": this.state.email, "foto": this.state.foto }
            // console.log(data);
            this.setState({ showModal: false, ssn: '', nama: '', email: '', foto: '', hide: 'hide' });
            this.onAddRecord(data);
        }
    },

    handleImage(event) {
        // console.log(event);
        this.setState({ 'hide': '' });
        var _self = this;
        var files = event.target.files; // FileList object
        // console.log(files);
        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {
            // console.log(f);
            // Only process image files.
            if (!f.type.match('image.*')) {
                event.preventDefault();
                continue;
            }
            var reader = new FileReader();
            // Closure to capture the file information.
            reader.onload = function (e) {
                // // console.log(e);
                // // console.log(reader.result);
                _self.generateImage(reader.result);
            }

            // Read in the image file as a data URL.
            reader.readAsDataURL(f);
        }
    },

    generateImage(dataURL) {
        var _self = this;
        var imageHeight = 200;
        var imageWidth = 200;

        // load image from data url
        var imageObj = new Image();
        imageObj.onload = function (e) {
            // console.log(e);
            let canvas = document.getElementById('myCanvas');
            let context = canvas.getContext("2d");
            context.drawImage(this, 0, 0, imageWidth, imageHeight);
            _self.setState({ foto: canvas.toDataURL() });
        };
        imageObj.src = dataURL;
    },

    onAddRecord(data) {
        this.props.onAddRecord(data);
    },

    render() {
        let popover = <Popover title="Standar" id="popover-modal">Ukuran 200x200 piksel</Popover>;

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
                        <Modal.Title>Tambah Karyawan </Modal.Title>
                    </Modal.Header>
                    <form onSubmit={this.handleSubmit}>
                        <Modal.Body>
                            <FormGroup controlId="ssn" validationState={this.getValidationState() }>
                                <ControlLabel>SSN Karyawan</ControlLabel>
                                <FormControl
                                    type="text"
                                    required
                                    value={this.state.ssn}
                                    name="ssn"
                                    placeholder="Masukkan SSN Karyawan"
                                    onKeyDown={this.handleKeyDown}
                                    onChange={this.handleChange}
                                    />
                                <FormControl.Feedback />
                                <HelpBlock>SSN Karyawan haruslah berupa angka sebanyak 4 digit.</HelpBlock>
                            </FormGroup>
                            <FormGroup controlId="nama">
                                <ControlLabel>Nama Karyawan</ControlLabel>
                                <FormControl
                                    type="text"
                                    required
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
                                    required
                                    value={this.state.email}
                                    name="email"
                                    placeholder="Masukkan Email Karyawan"
                                    onChange={this.handleChange}
                                    />
                                <FormControl.Feedback />
                            </FormGroup>
                            <FormGroup controlId="uploadfoto">
                                <ControlLabel>Upload Foto <OverlayTrigger overlay={popover}><a href="#">?</a></OverlayTrigger></ControlLabel>
                                <FormControl
                                    type="file"
                                    required
                                    onChange={this.handleImage}
                                    />
                                <FormControl.Feedback />
                                <div id="canvasContainer" className={this.state.hide}>
                                    <canvas id="myCanvas" width="200" height="200"></canvas>
                                </div>
                            </FormGroup>
                            <FormGroup controlId="foto">
                                <FormControl
                                    type="text"
                                    required
                                    className="hide"
                                    value={this.state.foto}
                                    />
                                <FormControl.Feedback /></FormGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.close} bsStyle="danger">Batal</Button>
                            <Button type="submit" bsStyle="primary"
                                disabled={(this.state.ssn.length != 4) || (this.state.nama == '') || (this.state.email == '') || (this.state.foto == '') }>Submit</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        );
    }
});

// ReactDOM.render(<ModalComponent/>, document.getElementById('modalcomponent'));