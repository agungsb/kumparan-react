TableComponent = React.createClass({
  displayName: "TableComponent",
  getInitialState() {
    return { cols: ["SSN", "Nama", "Email", "Foto", "Dipilih"], keyword: ''}
  },
  handleClick(e) {
    var td = e.target.parentElement;
    this.props.onClickRow(td);
  },
  handleChange(e) {
    console.log(e);
  },
  deleteRecords(){  
    this.props.onDeleteRecords();
  },
  searchRecords(e){
    // e.stopPropagation();
    console.log(e);
    var code = (e.keyCode ? e.keyCode : e.which);
    // if(code == 13) { //Enter keycode
      this.setState({keyword: e.target.value});
    // }
  },
  render: function () {
    let _self = this;
    let display = [];
    this.props.employeesData.map(function (row, index) {
      
    });
    console.log(display);
    return (
      <div>
        <div className="col-xs-12 col-sm-3 col-md-2">
          <Button
            onClick={this.deleteRecords}
            className={this.props.deleteBtn}
            bsStyle="danger"
            ><i className="glyphicon glyphicon-remove"></i>&nbsp; Hapus
          </Button>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-md-offset-2">
          <div className="inner-addon right-addon">
            <i className="glyphicon glyphicon-search"></i>
            <input onKeyUp={this.searchRecords} type="text" className="form-control" />
          </div>
        </div>
        <div className="col-xs-12 margin-top-10">
          <Table ref="tabel" bordered hover>
            <thead>
              <tr>
                {this.state.cols.map(function (key) {
                  return <th key={key}>{key}</th>;
                })
                }
              </tr>
            </thead>
            <tbody ref="tb">
              {this.props.employeesData.map(function (row, index) {
                var r = "";
                if(_self.state.keyword.length > 0){
                  var regex = new RegExp(_self.state.keyword, 'i');
                  var result = row.nama.search(regex);
                  r = (result > -1) ? "" : "hide";
                  console.log(r);
                } else{
                  r = "";
                }
                return (
                  <tr key={row.id} ref="trow" className={r}>
                    <td className="hide">{row.id}</td>
                    <td onClick={_self.handleClick}>{row.ssn} {_self.state.keyword}</td>
                    <td onClick={_self.handleClick}>{row.nama} {r}</td>
                    <td onClick={_self.handleClick}>{row.email}</td>
                    <td onClick={_self.handleClick}><img src={row.foto}/></td>
                    <td onClick={_self.handleClick}><input type="checkbox" className="checker hide"/><i></i></td>
                  </tr>
                );
              })
              }
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
});