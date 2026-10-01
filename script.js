let expenses = [];

const form = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const amount = Number(document.getElementById("amount").value);
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;

    const expense = {
        id: Date.now(),
        amount: amount,
        description: description,
        category: category,
        date: date
    };

    expenses.push(expense);

    displayExpenses();
    updateSummary();

    form.reset();
});


function displayExpenses() {

    expenseList.innerHTML = "";

    expenses.forEach(function(expense) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${expense.date}</td>
            <td>${expense.description}</td>
            <td>${expense.category}</td>
            <td>₹${expense.amount}</td>
            <td>
                <button
                    class="delete-btn"
                    onclick="deleteExpense(${expense.id})">
                    Delete
                </button>
            </td>
        `;

        expenseList.appendChild(row);
    });
}


function deleteExpense(id) {

    expenses = expenses.filter(function(expense) {
        return expense.id !== id;
    });

    displayExpenses();
    updateSummary();
}


function updateSummary() {

    let total = 0;

    expenses.forEach(function(expense) {
        total += expense.amount;
    });

    document.getElementById("totalExpense").textContent = `₹${total}`;

    document.getElementById("expenseCount").textContent = expenses.length;
}
