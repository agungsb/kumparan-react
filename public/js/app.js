var db;
if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}

var customerData = [];
const dbName = "company_db";
const objectStoreName = "employees";
var request = indexedDB.open(dbName, 1);

request.onerror = function (event) {
    // Handle errors.
};
request.onsuccess = function (event) {
    db = event.target.result;
    console.log(db);
    console.log("DB Opened!");
    readAllRecords();
};

request.onupgradeneeded = function (event) {
    db = event.target.result;
    console.log(event);
    var objectStore;
    console.log(event.target.transaction);
    if (event.oldVersion > 0 && event.newVersion > event.oldVersion) {
        db.deleteObjectStore(objectStoreName);
    }
    // Create an objectStore to hold information about our employees. We're
    // going to use "ssn" as our key path because it's guaranteed to be
    // unique - or at least that's what I was told during the kickoff meeting.
    objectStore = db.createObjectStore(objectStoreName, { keyPath: "id", autoIncrement: true });

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
        // var customerObjectStore = db.transaction(objectStoreName, "readwrite").objectStore(objectStoreName);
        // for (var i in customerData) {
        //     customerObjectStore.add(customerData[i]);
        // }
    };
};

var readAllRecords = function () {
    var transaction = db.transaction([objectStoreName], "readwrite");
    var objectStore = transaction.objectStore(objectStoreName);
    var html = "";
    var t = document.getElementById('tbo');
    $('#tbo').html(html);
    objectStore.openCursor().onsuccess = function (event) {
        console.log(event);
        var cursor = event.target.result;
        if (cursor) {
            console.log(cursor.key);
            customerData.push({ "id": cursor.key, "ssn": cursor.value.ssn, "nama": cursor.value.nama, "email": cursor.value.email, "foto": cursor.value.foto });
            // cursor.key
            html += `<tr>
            <td class="hide">`+ cursor.key + `</td>
            <td>`+ cursor.value.ssn + `</td>
            <td>`+ cursor.value.nama + `</td>
            <td>`+ cursor.value.email + `</td>
            <td><img src="`+ cursor.value.foto + `"/></td>
            <td><input type="checkbox" class="checker hide"/><i></i></td>
            </tr>`;
            // console.log("Name for ssn " + cursor.key + " is " + cursor.value.nama + ", Email: " + cursor.value.email);
            cursor.continue();
        }
        console.log(customerData);
        $('#tbo').html(html);
    }
}

var readRecord = function () {
    var transaction = db.transaction([objectStoreName]);
    var objectStore = transaction.objectStore(objectStoreName);
    var request = objectStore.get(pointedArrSsn[0].ssn);
    request.onerror = function (event) {
        // Handle errors!
    };
    request.onsuccess = function (event) {
        // Do something with the request.result!
        // console.log(request);
        // console.log("Name for SSN " + ssn + " is " + request.result.nama);
    };
}

function tea(){
    alert();
}

var addRecord = function (obj) {
    var transaction = db.transaction([objectStoreName], "readwrite");
    transaction.oncomplete = function (event) {
        console.log(event);
        resetForm();
    }

    transaction.onerror = function (event) {
        console.log(event);
        alert("Telah terjadi kesalahan");
    }

    var objectStore = transaction.objectStore(objectStoreName);
    var lastKey = 0;
    objectStore.openCursor().onsuccess = function () {
        var cursor = event.target.result;
        console.log(obj);
        console.log(cursor);
        if (cursor) {
            lastKey = cursor.key;
            console.log(cursor.key);
            cursor.continue();
        }
        else {
            obj.id = ++lastKey;
            var request = objectStore.add(obj);
            request.onsuccess = function (event) {
                console.log(event);
                console.log(obj);
                customerData.push(obj);
                var table = document.getElementById('mainTable');
                var row = table.insertRow(-1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                cell1.innerHTML = obj.ssn;
                cell2.innerHTML = obj.nama;
                cell3.innerHTML = obj.email;
                cell4.innerHTML = `<img src="` + obj.foto + `"/>`;
                cell5.innerHTML = `<input type="checkbox" class="checker hide"/><i></i>`;
                // alert("Sukses menambah data");
                // readAllRecords();
            };
        }
    }
}

var deleteRecord = function () {
    // It's important to descend array order first, so the rowIndex won't be screwed up
    pointedArrSsn.sort(function (a, b) {
        return parseInt(b.rowIndex) - parseInt(a.rowIndex);
    });
    console.log(pointedArrSsn);
    console.log(customerData);
    for (var i in pointedArrSsn) {
        // alert("index provided: " + i);
        // console.log(pointedArrSsn[i]);
        var transaction = db.transaction([objectStoreName], "readwrite");
        transaction.oncomplete = function (event) {
            console.log(event);
            // alert('All is done');
        }

        transaction.onerror = function (event) {
            console.log(event);
            alert("Telah terjadi kesalahan");
        }

        var index = functiontofindIndexByKeyValue(customerData, "id", pointedArrSsn[i].id);
        customerData.splice(index, 1);
        document.getElementById("mainTable").deleteRow(pointedArrSsn[i].rowIndex);
        // alert("deleted rowIndex: " + pointedArrSsn[i].rowIndex);

        var objectStore = transaction.objectStore(objectStoreName);
        var request = objectStore.delete(pointedArrSsn[i].id);
        request.onsuccess = function (event) {
            console.log(event);
            pointedArrSsn.length--;
        };
    }
    // readAllRecords();
}

function functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {

    for (var i = 0; i < arraytosearch.length; i++) {

        if (arraytosearch[i][key] == valuetosearch) {
            return i;
        }
    }
    return null;
}

var pointedSsn;
var pointedArrSsn = [];
var checkedBoxes;

$(document).on('click', 'table', function (e) {
    console.log(customerData);
    var td = e.target.parentElement;
    var td_length = td.children.length;
    var id = customerData[td.rowIndex - 1].id;
    console.log(id);
    var c = td.children[td_length - 1].children[0];
    var icon = td.children[td_length - 1].children[1];
    if (c.checked == false) {
        c.checked = true;
        icon.innerHTML = `<i class="text-primary glyphicon glyphicon-ok"></i>`;
        pointedArrSsn.push({ "rowIndex": td.rowIndex, "id": parseInt(id) });
    } else {
        c.checked = false;
        icon.innerHTML = `<i></i>`;
        var loc = pointedArrSsn.map(function (d) { return d['id']; }).indexOf(id);
        pointedArrSsn.splice(loc, 1);
    }
    checkedBoxes = getCheckedBoxes("mycheckboxes");
    if (checkedBoxes != null) {
        if (checkedBoxes.length > 0) {
            $('#deleteBtn').show();
        } else {
            $('#deleteBtn').fadeOut();
        }
    } else {
        $('#deleteBtn').fadeOut();
    }
    console.log(pointedArrSsn);
});

$(document).on('click', '#deleteBtn', function (e) {
    deleteRecord();
});

// Pass the checkbox name to the function
var getCheckedBoxes = function () {
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
}

$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$(document).on('submit', '#add-form', function (event) {
    event.preventDefault();
    var canvas = document.getElementById('myCanvas');
    var dataURL = canvas.toDataURL();
    $('#foto').val(dataURL);
    // console.log(JSON.stringify($('form').serializeObject()));
    var params = JSON.parse(JSON.stringify($('form').serializeObject()));
    console.log(params);
    if (params.foto == 'data:,') {
        event.preventDefault();
        alert("Silahkan upload foto!");
    } else {
        addRecord(params);
    }
})

var resetForm = function () {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("add-form").reset();
    $('#canvasContainer').hide();
}