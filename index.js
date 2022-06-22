const form = document.getElementById("id_formulario");
// console.log(form);

let tableElement = document.getElementById("tablaTransaccion");
// console.log(tableElement);

form.addEventListener("submit", function(event) {
    /* body... */
    // console.log(event);
    event.preventDefault();

    if (form.monto.value > 0) {
        let formularioFormData = new FormData(form);
        let transactionObj = convertFormDataToTransactionObj(formularioFormData);
        // console.log(transactionObj);
        let save = saveTransactionObj(transactionObj);
        insertRowTransactionTable(transactionObj);
        // console.log(save);
        form.reset();
    } else {
        alert("El monto " + form.monto.value + " debe ser mayor a 0");

    }
});
window.addEventListener("DOMContentLoaded", function(event) {
    draw_category();
    let transactionObjArr = JSON.parse(localStorage.getItem("transactionData")) || [];

    transactionObjArr.forEach(
        function(arrayElement) {
            insertRowTransactionTable(arrayElement);
            // console.log("Se inserto el elemento: " + JSON.stringify(arrayElement));
        }
    );
});

function draw_category() {
    // body... 
    let allCategories = [ "Antojo", "Gasto", "Transporte", "Cursos"];

    for (let index = 0; index < allCategories.length; index++) {
        insertCategory(allCategories[index]);
    }
}

function insertCategory(categoryName) {
    // body... 
    const selectElement = document.getElementById("categoria");

    let htmlToInsert = `<option> ${categoryName} </option>`;

    selectElement.insertAdjacentHTML("beforeend", htmlToInsert)
}

function getNewTransactionId() {
    // body... 
    let lastTransactionId = localStorage.getItem("lastTransactionId") || "-1";
    let newTransactionId = JSON.parse(lastTransactionId) + 1;
    localStorage.setItem("lastTransactionId", JSON.stringify(newTransactionId));
    return newTransactionId;
}


function convertFormDataToTransactionObj(formularioFormData) {
    // body... 
    let transaccion = formularioFormData.get('transaccion');
    let descripcion = formularioFormData.get('descripcion');
    let monto = formularioFormData.get('monto');
    let categoria = formularioFormData.get('categoria');
    let transactionId = getNewTransactionId();
    return {
        "transaccion": transaccion,
        "descripcion": descripcion,
        "monto": monto,
        "categoria": categoria,
        "transactionId": transactionId
    }
}

function insertRowTransactionTable(transactionObj) {
    let tablaTransaccionRef = document.getElementById('tablaTransaccion')

    let newTransactionRowRef = tablaTransaccionRef.insertRow(-1);
    newTransactionRowRef.setAttribute("data-transaction-id", transactionObj["transactionId"]);

    let newTransactionCellRef = newTransactionRowRef.insertCell(0);
    newTransactionCellRef.textContent = transactionObj['transaccion'];

    newTransactionCellRef = newTransactionRowRef.insertCell(1);
    newTransactionCellRef.textContent = transactionObj['descripcion'];

    newTransactionCellRef = newTransactionRowRef.insertCell(2);
    newTransactionCellRef.textContent = transactionObj['monto'];

    newTransactionCellRef = newTransactionRowRef.insertCell(3);
    newTransactionCellRef.textContent = transactionObj['categoria'];

    let newDeleteCell = newTransactionRowRef.insertCell(4);
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    newDeleteCell.appendChild(deleteButton);

    deleteButton.addEventListener("click", (event) => {
        /* body... */
       // console.log(event);
        let transactionRow = event.target.parentNode.parentNode;
        let transactionId = transactionRow.getAttribute("data-transaction-id");
        transactionRow.remove();
        deleteTransactionObj(transactionId)
        // console.log(event.target.parentNode.parentNode);
        //console.log(event.view.parent.parent.localStorage)



    });

}

function deleteTransactionObj(transactionId) {
    // body... 
    let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"));
    let transactionIndexInArray = transactionObjArr.findIndex(element => element.transactionId == transactionId);

    transactionObjArr.splice(transactionIndexInArray, 1);
    let transactionArrayJSON = JSON.stringify(transactionObjArr);
    localStorage.setItem("transactionData", transactionArrayJSON);
}

function saveTransactionObj(transactionObj) {
    //let myTransactionArray=[]
    let transactionArray = JSON.parse(localStorage.getItem("transactionData")) || [];

    transactionArray.push(transactionObj);
    // console.log(transactionArray);

    let transactionArrayJSON = JSON.stringify(transactionArray);
    localStorage.setItem("transactionData", transactionArrayJSON);
    // console.log(transactionArrayJSON);

}
/*
function insertRowTransactionTable(formularioFormData) {
    let tablaTransaccionRef = document.getElementById('tablaTransaccion')

    let newTransactionRowRef = tablaTransaccionRef.insertRow(-1);

    let newTransactionCellRef = newTransactionRowRef.insertCell(0);
    newTransactionCellRef.textContent = formularioFormData.get('typoTransaccion');

    newTransactionCellRef = newTransactionRowRef.insertCell(1);
    newTransactionCellRef.textContent = formularioFormData.get('descripcion');

    newTransactionCellRef = newTransactionRowRef.insertCell(2);
    newTransactionCellRef.textContent = formularioFormData.get('monto');

    newTransactionCellRef = newTransactionRowRef.insertCell(3);
    newTransactionCellRef.textContent = formularioFormData.get('categoria');
    // body... 
}
*/