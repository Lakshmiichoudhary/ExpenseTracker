"use strict";

// Function to add expenses
function addExpenses(event) {
    event.preventDefault();

    const amount = document.getElementById("expense").value;
    const description = document.getElementById("description").value;
    const selectElements = document.getElementById("select");
    const select = selectElements.options[selectElements.selectedIndex].value;

    const obj = {
        amount,
        description,
        select,
    };

    localStorage.setItem(obj.description, JSON.stringify(obj));
    display(obj);
}

// Function to display an expense
function display(obj) {
    const dispValues = document.getElementById("formElements");

    const data = document.createElement("li");
    data.textContent = `${obj.amount} , ${obj.description} , ${obj.select}`;
    dispValues.appendChild(data);

    const deleteBtn = document.createElement("input");
    deleteBtn.type = "button";
    deleteBtn.value = "delete";
    data.appendChild(deleteBtn);

    deleteBtn.onclick = () => {
        localStorage.removeItem(obj.description);
        dispValues.removeChild(data);
    };

    const editBtn = document.createElement("input");
    editBtn.type = "button";
    editBtn.value = "edit";
    data.appendChild(editBtn);

    editBtn.onclick = () => {
        document.getElementById("expense").value = obj.amount;
        document.getElementById("description").value = obj.description;
        document.getElementById("select").value = obj.select;
        localStorage.removeItem(obj.description);
        dispValues.removeChild(data);

        const submitButton = document.getElementById("submit");
        submitButton.textContent = "Update";
        submitButton.onclick = function (event) {
            updateExpense(event, obj);
        };
    };
}

// Function to update an expense
function updateExpense(event, obj) {
    event.preventDefault();

    const amount = document.getElementById("expense").value;
    const description = document.getElementById("description").value;
    const selectElements = document.getElementById("select");
    const select = selectElements.options[selectElements.selectedIndex].value;

    const updatedObj = {
        amount,
        description,
        select,
    };

    localStorage.setItem(updatedObj.description, JSON.stringify(updatedObj));
    display(updatedObj);
}

// Load stored expenses on page load
function loadExpenses() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const expense = JSON.parse(localStorage.getItem(key));
        display(expense);
    }
}

// Load stored expenses on page load
loadExpenses();

// Event listener for adding expenses
document.getElementById("expenseForm").addEventListener("submit", addExpenses);
