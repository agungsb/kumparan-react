var RootComponent = React.createClass({
  displayName: 'RootComponent',
  render() {
    return (
      <div>
        <div className="col-xs-12 text-center">
          <h1>Employees Control</h1>
        </div>
        <div className="col-xs-12 col-sm-3 col-md-2">
          <div id="modalcomponent"></div>
        </div>
        <div className="col-xs-12 col-sm-3 col-md-2">
          <button id="deleteBtn" className="btn btn-danger form-control"><i className="glyphicon glyphicon-remove"></i>&nbsp; Hapus</button>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-md-offset-2">
          <div className="inner-addon right-addon">
            <i className="glyphicon glyphicon-search"></i>
            <input type="text" className="form-control" />
          </div>
        </div>
        <div className="col-xs-12 margin-top-10">
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
      </div>
    );
  }
});

ReactDOM.render(<RootComponent/>, document.getElementById('rootcomponent'));