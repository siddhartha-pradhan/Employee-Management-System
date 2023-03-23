$(document).ready(function () {
    loadData();
});

function loadData() {
    $.ajax({
        url: "/Employee/GetAll",
        method: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.name + '</td>';
                html += '<td>' + item.age + '</td>';
                html += '<td>' + item.email + '</td>';
                html += '<td>' + item.department + '</td>';
                html += '<td>' + item.designation + '</td>';
                html += '<td>' + item.hiredDate + '</td>';
                if (!item.modifiedDate) {
                    html += '<td> Not Modified Yet </td>';
                }
                else {
                    html += '<td>' + item.modifiedDate + '</td >';
                }
                html += '<td> <a href="#" class="btn btn-primary" onclick="return getById(' + item.id + ')"> Update </a> <a href="#" class="btn btn-danger" onclick="deleteEmployee(' + item.id + ')"> Delete</a> </td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function getById(employeeId) {
    $('#exampleModal').modal('show');
    $('#empId').show();
    $('#btnAdd').hide();
    $('#btnUpdate').show();
    $('#myModalLabel span').html('Update ');

    $('#Id').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#Age').css('border-color', 'lightgrey');
    $('#Email').css('border-color', 'lightgrey');
    $('#Department').css('border-color', 'lightgrey');
    $('#Designation').css('border-color', 'lightgrey');
    $('#HiredDate').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Employee/GetById/" + employeeId,
        type: "GET",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#Id').val(result.id);
            $('#Name').val(result.name);
            $('#Age').val(result.age);
            $('#Email').val(result.email);
            $('#Department').val(result.department);
            $('#Designation').val(result.designation);
            $('#HiredDate').val(result.hiredDate);
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
    return false;
}

function addEmployee() {
    var res = validate();

    if (!res) {
        return false;
    }

    $('#myModalLabel span').html('Add ');

    var name = ($('#Name').val().trim());
    var age = ($('#Age').val().trim());
    var email = ($('#Email').val().trim());
    var department = $('#Department').find(":selected").text();
    var designation = ($('#Designation').val().trim());
    var hiredDate = ($('#HiredDate').val().trim());

    var employeeObject = {
        "Name": name,
        "Age": age,
        "Email": email,
        "Department": department,
        "Designation": designation,
        "HiredDate": hiredDate
    };

    $.ajax({
        url: "/Employee/Add",
        method: "POST",
        data: { employee: employeeObject },
        success: function (result) {
            loadData();
            $('#exampleModal').modal('hide');
            $('#Name').val("");
            $('#Age').val("");
            $('#Email').val("");
            $('#Designation').val("");
            $('#HiredDate').val("");
        },
        error: function (errorMessage) {
            alert(error.responseText);
        }
    });
}

function updateEmployee() {
    var res = validate();

    if (!res) {
        return false;
    }

    var id = ($('#Id').val().trim());
    var name = ($('#Name').val().trim());
    var age = ($('#Age').val().trim());
    var email = ($('#Email').val().trim());
    var department = ($('#Department').val().trim());
    var designation = ($('#Designation').val().trim());
    var hiredDate = ($('#HiredDate').val().trim());

    var employeeObject = {
        "Id": id,
        "Name": name,
        "Age": age,
        "Email": email,
        "Department": department,
        "Designation": designation,
        "HiredDate": hiredDate
    };

    $.ajax({
        url: "/Employee/Update",
        method: "POST",
        data: { employee: employeeObject },
        success: function (result) {
            loadData();
            $('#exampleModal').modal('hide');
            $('#Name').val("");
            $('#Age').val("");
            $('#Email').val("");
            $('#Designation').val("");
            $('#HiredDate').val("");
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function deleteEmployee(Id) {
    var confirmation = confirm("Are you sure you want to delete this employee?");

    if (confirmation) {
        $.ajax({
            url: "/Employee/Delete/" + Id,
            type: "POST",
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errorMessage) {
                alert(errorMessage.responseText);
            }
        });
    }
}

function clearTextBox() {
    $("#Name").val("");
    $("#Age").val("");
    $("#Email").val("");
    $("#Department").val("");
    $("#Designation").val("");
    $("#HiredDate").val("");

    $("btnUpdate").hide();
    $("btnAdd").show();

    $('#Name').css('border-color', 'lightgrey');
    $('#Age').css('border-color', 'lightgrey');
    $('#Email').css('border-color', 'lightgrey');
    $('#Department').css('border-color', 'lightgrey');
    $('#Designation').css('border-color', 'lightgrey');
    $('#HiredDate').css('border-color', 'lightgrey');
}

function validate() {
    var isValid = true;

    if ($("#Name").val().trim() == "") {
        $("#Name").css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }

    if ($("#Age").val().trim() == "") {
        $("#Age").css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Age').css('border-color', 'lightgrey');
    }

    if ($("#Email").val().trim() == "") {
        $("#Email").css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Email').css('border-color', 'lightgrey');
    }

    if ($("#Designation").val().trim() == "") {
        $("#Designation").css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Designation').css('border-color', 'lightgrey');
    }

    if ($("#HiredDate").val().trim() == "") {
        $("#HiredDate").css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#HiredDate').css('border-color', 'lightgrey');
    }

    return isValid;
}

function bulkExcelEntry() {
    $.ajax({
        url: "/Employee/Excel",
        method: "GET",
        success: function (result) {
            $('#partial').html(result);

        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

var excelJson = "";

function addData() {
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xlsx|.xls)$/;
    var excelFile = $('#excelFile').val();

    if (regex.test(excelFile.toLowerCase())) {
        var xlsxFlag = false;

        if (excelFile.toLowerCase().indexOf(".xlsx") > 0) {
            xlsxFlag = true;
        }

        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;
                var workbook;
                if (xlsxFlag) {
                    workbook = XLSX.read(data, {
                        type: 'binary'
                    });
                } else {
                    workbook = XLS.read(data, {
                        type: 'binary'
                    });
                }

                var sheetNameList = workbook.SheetNames;

                if (xlsxFlag) {
                    excelJson = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);
                    if (excelJson.length == 0) {
                        $.dialog({
                            title: "Warning",
                            content: "Excel is empty",
                            buttons: [{
                                type: "confirm",
                                text: "Ok"
                            }]
                        }).open();
                        return false;
                    }
                } else {
                    excelJson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y]);
                }

                //for (var i = 0; i < excelJson.length; i++) {
                //    var empSalary = excelJson[i]["Employee Salary"];
                //    var salary = parseFloat(empSalary);

                //    if (isNaN(salary)) {
                //        alert("The salary in row " + (i + 1) + " is not in a correct float format.")
                //        return false;
                //    }
                //}

                populateData(excelJson);

            };
            if (xlsxFlag) {
                reader.readAsArrayBuffer($('#excelFile').prop('files')[0])
            } else {
                reader.readAsBinaryString($('#excelFile').prop('files')[0])
            }
        } else {
            alert("Sorry! Your browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid Excel file.");
    }
}

function populateData(jsonData) {
    var html = '';

    for (var i = 0; i < jsonData.length; i++) {
        html += '<tr>';
        html += '<td>' + jsonData[i]["Name"] + '</td>';
        html += '<td>' + jsonData[i]["Age"] + '</td>';
        html += '<td>' + jsonData[i]["Email"] + '</td>';
        html += '<td>' + jsonData[i]["Department"] + '</td>';
        html += '<td>' + jsonData[i]["Designation"] + '</td>';
        html += '<td>' + jsonData[i]["Hired Date"] + '</td>';
        html += '</tr>';
    }

    $('#dataOutput').html(html);

    var pushButton = $("#push")[0];

    pushButton.style.display = "block";
}

function importEmployees() {
    var data = excelJson;

    var employeeObject = [];

    for (var i = 0; i < data.length; i++) {
        employeeObject.push(
            {
                "Name": data[i]["Name"],
                "Age": data[i]["Age"],
                "Email": data[i]["Email"],
                "Department": data[i]["Department"],
                "Designation": data[i]["Designation"],
                "HiredDate": data[i]["Hired Date"],
            }
        );
    }

    $.ajax({
        url: "/Employee/AddEmployees",
        method: "POST",
        dataType: "text",
        data: { employees: employeeObject },
        success: function (result) {
            alert("Values successfully added.");
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}