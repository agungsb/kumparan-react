RootComponent = React.createClass({
  displayName: 'RootComponent',
  componentDidMoun() {

  },
  getInitialState() {
    return {
      deleteBtn: 'hide',
      pointedArrSsn: [],
      checkedBoxes: null,
      employeesData: [{
        "id": 0,
        "ssn": "1234",
        "nama": "Arkan",
        "email": "arkan.garda@gmail.com",
        "foto": "data:image/png;base64,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"
      }, {
          "id": 1,
          "ssn": "4567",
          "nama": "Akbar",
          "email": "akbarkusumanegaralth@gmail.com",
          "foto": "data:image/png;base64,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",
        }]
    }
  },
  onClickRow(td) {
    console.log(td.rowIndex);
    var td_length = td.children.length;
    var id = this.state.employeesData[td.rowIndex - 1].id;
    var c = td.children[td_length - 1].children[0];
    var icon = td.children[td_length - 1].children[1];
    if (c.checked == false) {
      c.checked = true;
      icon.innerHTML = `<i class="text-primary glyphicon glyphicon-ok"></i>`;   
      var pas = this.state.pointedArrSsn;
      pas.push({ "rowIndex": td.rowIndex, "id": parseInt(id) });
      this.setState({pointedArrSsn: pas});
    } else {
      c.checked = false;
      icon.innerHTML = `<i></i>`; 
      var pas = this.state.pointedArrSsn;
      let loc = pas.map(function (d) { return d['id']; }).indexOf(id);
      pas.splice(loc, 1);
      this.setState({pointedArrSsn: pas});
    }
    checkedBoxes = getCheckedBoxes("mycheckboxes");
    if (checkedBoxes != null) {
        if (checkedBoxes.length > 0) {
            this.setState({deleteBtn: "animated zoomIn form-control"});
        } else {
            this.setState({deleteBtn: "animated zoomOut form-control"});
        }
    } else {
            this.setState({deleteBtn: "animated zoomOut form-control"});
    }
    console.log(this.state.pointedArrSsn);
  },
  addRecord(data) {
    var employeesData = this.state.employeesData;
    var lastIndex = this.state.employeesData.length - 1;
    employeesData.push({
      "id": parseInt(this.state.employeesData[lastIndex].id) + 1,
      "ssn": data.ssn,
      "nama": data.nama,
      "email": data.email,
      "foto": data.foto
    });
    this.setState({ employeesData: employeesData });
    alert('record successfully added!');
  },
  deleteRecords(data) {
    console.log(data);
    alert('deleted');
  },
  getCheckedBoxes() {
    var checkboxes = document.getElementsByClassName('checker');
    var checkboxesChecked = [];
    // loop over them all
    for (var i = 0; i < checkboxes.length; i++) {
        // And stick the checked ones onto an array...
        if (checkboxes[i].checked) {
            checkboxesChecked.push(checkboxes[i]);
        }
    }
    // Return the array if it is non-empty, or null
    return checkboxesChecked.length > 0 ? checkboxesChecked : null;
  },
  render() {
    return (
      <div>
        <div className="col-xs-12 text-center">
          <h1>Employees Control</h1>
        </div>
        <div className="col-xs-12 col-sm-3 col-md-2">
          <ModalComponent onAddRecord={this.addRecord}/>
        </div>
          <TableComponent onDeleteRecords={this.deleteRecords} deleteBtn={this.state.deleteBtn} onClickRow={this.onClickRow} employeesData={this.state.employeesData}/>
          <table id="mainTable" className="table table-responsive table-hover table-bordered">
            <thead>
              <tr>
                <th className="hide">Id</th>
                <th>SSN</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Foto</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="tbo"></tbody>
          </table>
      </div>
    );
  }
});

ReactDOM.render(<RootComponent/>, document.getElementById('rootcomponent'));