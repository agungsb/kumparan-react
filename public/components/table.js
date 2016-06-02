TableComponent = React.createClass({
  displayName: "TableComponent",
  getInitialState() {
    return { cols: ["SSN", "Nama", "Email", "Foto", "Action"], }
  },
  handleClick(e) {
    var td = e.target.parentElement;
    this.props.onClickRow(td);
  },
  handleChange(e) {
    console.log(e);
  },
  render: function () {
    let _self = this;
    return (
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
          {this.props.rows.map(function (row) {
            return (
              <tr key={row.id} ref="trow">
                <td onClick={_self.handleClick}>{row.ssn}</td>
                <td onClick={_self.handleClick}>{row.nama}</td>
                <td onClick={_self.handleClick}>{row.email}</td>
                <td onClick={_self.handleClick}><img src={row.foto}/></td>
                <td onClick={_self.handleClick}><input type="checkbox" className="checker hide"/><i></i></td>
              </tr>
            );
          })
          }
        </tbody>
      </Table>
    )
  }
});