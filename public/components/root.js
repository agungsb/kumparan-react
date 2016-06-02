RootComponent = React.createClass({
  displayName: 'RootComponent',  
  getInitialState() {
    return {
      dbName: "company_db",
      objectStoreName: "employees",
      db: null,
      deleteBtn: 'hide',
      pointedArrSsn: [],
      pointedId: null,
      checkedBoxes: null,
      temporaryData: [],
      employeesData: []
    }
  },
  componentDidMount() {
    var _self = this;
    this.setState({temporaryData: this.state.employeesData});
    var request = indexedDB.open(_self.state.dbName);
    request.onerror = function (event) {
        // Handle errors.
        // console.log(event);
        alert(event.target.error.message);
    };
    request.onsuccess = function (event) {
        _self.setState({db: event.target.result});
        // console.log(_self.state.db);
        // console.log("DB Opened!");
        _self.readAllRecords();
    };

    request.onupgradeneeded = function (event) {
        _self.setState({db: event.target.result});
        var db = _self.state.db;
        // console.log(event);
        var objectStore;
        if (event.oldVersion > 0 && event.newVersion > event.oldVersion) {
            db.deleteObjectStore(_self.state.objectStoreName);
        }
        // Create an objectStore to hold information about our employees. We're
        // going to use "ssn" as our key path because it's guaranteed to be
        // unique - or at least that's what I was told during the kickoff meeting.
        objectStore = db.createObjectStore(_self.state.objectStoreName, { keyPath: "id", autoIncrement: false });

        // Create an index to search employees by name. We may have duplicates
        // so we can't use a unique index.
        objectStore.createIndex("ssn", "ssn", { unique: true });

        // Create an index to search employees by name. We may have duplicates
        // so we can't use a unique index.
        objectStore.createIndex("nama", "nama", { unique: false });

        // Create an index to search employees by email. We want to ensure that
        // no two employees have the same email, so use a unique index.
        objectStore.createIndex("email", "email", { unique: true });

        // Create an index to display employees' image. We may have duplicates
        // so we can't use a unique index.
        objectStore.createIndex("foto", "foto", { unique: false });

        // Use transaction oncomplete to make sure the objectStore creation is 
        // finished before adding data into it.
        objectStore.transaction.oncomplete = function (event) {
            // console.log(event.target.result);
            // // Store values in the newly created objectStore.
            // var customerObjectStore = db.transaction(_self.state.objectStoreName, "readwrite").objectStore(_self.state.objectStoreName);
            // for (var i in customerData) {
            //     customerObjectStore.add(customerData[i]);
            // }
        };
    };
  },
  readAllRecords() {
      var _self = this;
      var db = this.state.db;
      var transaction = db.transaction([this.state.objectStoreName], "readwrite");
      var objectStore = transaction.objectStore(this.state.objectStoreName);
      var ed = this.state.employeesData;
      objectStore.openCursor().onsuccess = function (event) {
          // console.log(event);
          var cursor = event.target.result;
          if (cursor) {
              // console.log(cursor.key);
              ed.push({ "id": cursor.key, "ssn": cursor.value.ssn, "nama": cursor.value.nama, "email": cursor.value.email, "foto": cursor.value.foto });
              // console.log("Name for ssn " + cursor.key + " is " + cursor.value.nama + ", Email: " + cursor.value.email);
              cursor.continue();
          }
          _self.setState({employeesData: ed});
          // console.log(_self.state.employeesData);
      }
  },
  onClickRow(td) {
    // console.log(td.rowIndex);
    var td_length = td.children.length;
    var id = this.state.employeesData[td.rowIndex - 1].id;
    var c = td.children[td_length - 1].children[0];
    var icon = td.children[td_length - 1].children[1];
    if (c.checked == false) {
      c.checked = true;
      icon.innerHTML = `<i class="text-primary glyphicon glyphicon-ok"></i>`;   
      var pas = this.state.pointedArrSsn;
      pas.push(parseInt(id));
      this.setState({pointedArrSsn: pas});
    } else {
      c.checked = false;
      icon.innerHTML = `<i></i>`; 
      var pas = this.state.pointedArrSsn;
      let loc = pas.indexOf(id);
      pas.splice(loc, 1);
      this.setState({pointedArrSsn: pas});
    }
    this.state.checkedBoxes = this.getCheckedBoxes("mycheckboxes");
    if (this.state.checkedBoxes != null) {
        if (this.state.checkedBoxes.length > 0) {
            this.setState({deleteBtn: "animated zoomIn form-control"});
        } else {
            this.setState({deleteBtn: "animated zoomOut form-control"});
        }
    } else {
            this.setState({deleteBtn: "animated zoomOut form-control"});
    }
    // console.log(this.state.pointedArrSsn);
  },
  
  addRecord(data) {
    var _self = this;
    var db = this.state.db;
    var ed = this.state.employeesData;
    var transaction = db.transaction([this.state.objectStoreName], "readwrite");
    transaction.oncomplete = function (event) {
        // console.log(event);
    }

    transaction.onerror = function (event) {
        // console.log(event);
        alert(event.target.error.message);
    }

    var id = 0;
    if(ed.length > 0){
      id = ed[ed.length-1].id;
    }
    const nextId = parseInt(id) + 1;
    data.id = nextId;
    var objectStore = transaction.objectStore(this.state.objectStoreName);
    var request = objectStore.add(data);
    request.onsuccess = function (event) {
      var employee = {
        "id": nextId,
        "ssn": data.ssn,
        "nama": data.nama,
        "email": data.email,
        "foto": data.foto
      };
      ed.push(employee);
      _self.setState({ employeesData: ed });
    }
  },
  deleteRecords() {
    var _self = this;
    this.setState({deleteBtn: 'hide'});
    var db = this.state.db;
    // It's important to descend array order first, so the rowIndex won't be screwed up
    var pas = this.state.pointedArrSsn;
    pas.sort(function (a, b) {
        return parseInt(b) - parseInt(a);
    });
    // console.log(pas);
    // console.log(this.state.employeesData);
    let ed = this.state.employeesData;
    var _self = this;
    for(var i in pas){
    //   console.log(pas[i]);
      var transaction = db.transaction([this.state.objectStoreName], "readwrite");
      transaction.oncomplete = function (event) {
        // console.log(event);
        // alert('All is done');
      }

      transaction.onerror = function (event) {
        //   console.log(event);
          alert("Telah terjadi kesalahan");
      }
      var index = _self.functiontofindIndexByKeyValue(ed, "id", pas[i]);
      var objectStore = transaction.objectStore(this.state.objectStoreName);
      var request = objectStore.delete(pas[i]);
      request.onsuccess = function (event) {
        //   console.log(event);
          ed.splice(index, 1);
          pas.splice(i, 1);
          _self.setState({employeesData: ed});
      };
    };
    // console.log(ed);
    // console.log(pas);
    // Reset the variables;
    // this.setState({pointedArrSsn: []});
    // this.setState({employeesData: ed});
  },
  functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {
    for (var i = 0; i < arraytosearch.length; i++) {
        if (arraytosearch[i][key] == valuetosearch) {
            return i;
        }
    }
    return null;
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
  filterData(keyword){
      var regex = new RegExp(keyword, 'i');
      const filtered = this.state.employeesData.filter(function(obj) {
        return obj.nama.search(regex) > -1;
      });
      return filtered;
  },
  resetSearch(){
      return this.state.temporaryData;
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
          <TableComponent 
          onDeleteRecords={this.deleteRecords} 
          deleteBtn={this.state.deleteBtn} 
          onClickRow={this.onClickRow} 
          employeesData={this.state.employeesData}/>
      </div>
    );
  }
});

ReactDOM.render(<RootComponent/>, document.getElementById('rootcomponent'));