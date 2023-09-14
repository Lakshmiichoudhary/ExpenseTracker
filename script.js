// Function to add expenses
function addExpenses(event) {
    event.preventDefault();
    
    const amount = document.getElementById("amount").value;
    const description = document.getElementById("description").value;
    const categorySelect = document.getElementById("category");
    const category = categorySelect.options[categorySelect.selectedIndex].value;

    const expense = {
        amount,
        description,
        category,
    };

    // Store the expense object in localStorage 
    localStorage.setItem(description, JSON.stringify(expense));

    // Display the added expense
    display(expense);
}

// Function to display an expense
function display(expense) {
    const dispValues = document.querySelector("#createTable tbody");

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${expense.amount}</td>
        <td>${expense.description}</td>
        <td>${expense.category}</td>
        <td>
            <button onclick="deleteExpense('${expense.description}')" class="btn btn-danger">Delete</button>
            <button onclick="editExpense('${expense.description}')" class="btn btn-warning m-2">Edit</button>
        </td>
    `;

    dispValues.appendChild(row);
}


// Function to delete an expense
function deleteExpense(description) {
    localStorage.removeItem(description);

    // Refresh the table
    showData();
}

// Function to edit an expense
function editExpense(description) {
    const expense = JSON.parse(localStorage.getItem(description));

    // Populate the form fields with the expense data
    document.getElementById("amount").value = expense.amount;
    document.getElementById("description").value = expense.description;
    document.getElementById("category").value = expense.category;

    // Update the button to "Update" mode
    const submitButton = document.getElementById("submit");
    submitButton.textContent = "Update";
    submitButton.onclick = function () {
        updateExpense(description);
    };
    
    // Focus on the amount field
    document.getElementById("amount").focus();
}

// Function to update an expense
function updateExpense(description) {
    const amount = document.getElementById("amount").value;
    const newDescription = document.getElementById("description").value;
    const categorySelect = document.getElementById("category");
    const category = categorySelect.options[categorySelect.selectedIndex].value;

    const updatedExpense = {
        amount,
        description: newDescription,
        category,
    };

    // Update the expense object in localStorage 
    localStorage.setItem(description, JSON.stringify(updatedExpense));

    // Reset the form fields
    resetForm();

    // Refresh the table
    showData();
}

// Function to reset 
function resetForm() {
    document.getElementById("amount").value = "";
    document.getElementById("description").value = "";
    document.getElementById("category").value = "Food & Beverage";
    const submitButton = document.getElementById("submit");
    submitButton.textContent = "Add Expenses";
    submitButton.onclick = addExpenses;
}

// Function to show data
function showData() {
    const dispValues = document.querySelector("#createTable tbody");
    dispValues.innerHTML = "";

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const expense = JSON.parse(localStorage.getItem(key));
        display(expense);
    }
}

showData();

document.getElementById("submit").addEventListener("click", addExpenses);
