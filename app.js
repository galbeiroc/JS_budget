((c,d) => {
    c('Hey heyyyyy')
    class UI {
        constructor(id) {
            this.id = id;
            this.budgetFeedback = d.querySelector(".budget-feedback");
            this.expenseFeedback = d.querySelector(".expense-feedback");
            this.budgetForm = d.getElementById("budget-form");
            this.budgetInput = d.getElementById("budget-input");
            this.budgetAmount = d.getElementById("budget-amount");
            this.expenseAmount = d.getElementById("expense-amount");
            this.balanceAmount = d.getElementById("balance-amount");
            this.balance = d.querySelector(".balance");
            this.expenseForm = d.getElementById("expense-form");
            this.expenseInput = d.getElementById("expense-input");
            this.amountInput = d.getElementById("amount-input");
            this.expenseList = d.getElementById("expense-list");
            this.removeList = d.querySelector(".expense");
            this.listItem = [];
            this.itemID = 0;
        }

        //Submit Method Budget
        submitBugetForm() {
            c("Hello submitBugetForm");
            const valueInput = this.budgetInput.value;
            if (valueInput === '' || valueInput < 0) {
                this.budgetFeedback.classList.add('showItem');
                this.budgetFeedback.innerHTML = `<p>Value cannot be empty or Negative</p>`;
                const self = this;
                //c(this);
                setTimeout(()=>{
                    self.budgetFeedback.classList.remove('showItem');
                }, 3000);
            }else {
                this.budgetAmount.textContent = valueInput;
                this.budgetInput.value = '';
                this.showBalance();
            }
        }

        ////Submot Method Expense
        submitExpenseForm() {
            const expenseValue = this.expenseInput.value;
            const amountValue = this.amountInput.value;
            if (expenseValue === '' || amountValue === '' || amountValue < 0) {
                this.expenseFeedback.classList.add('showItem');
                this.expenseFeedback.innerHTML = `<p>Value cannot be empty or Negative</p>`;
                const self = this;

                setTimeout(()=>{
                    self.expenseFeedback.classList.remove('showItem');
                }, 3000);
            }else {
                let amount = parseInt(amountValue);
                this.expenseInput.value = '';
                this.amountInput.value = '';

                let expense = {
                    id: this.itemID,
                    title: expenseValue,
                    amount: amount
                };
                this.itemID++;
                this.listItem.push(expense);
                this.addExpense(expense);
                //Show Balance
                this.showBalance();
            }
        }

        //add Expense
        addExpense(expense) {
            const div = document.createElement('div');
            div.classList.add('expense');
            div.innerHTML = `
            <div class="expense-item d-flex justify-content-between align-items-baseline" id="expense-item">
                <div class="col-md-4">
                    <h6 class="expense-title mb-0 text-uppercase list-item">- ${expense.title}</h6>
                </div>    
                <div class="col-md-4">
                    <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>
                </div>
                <div class="col-md-4">
                    <div class="expense-icons list-item">
                        <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
                            <i class="fas fa-edit"></i>
                        </a>
                        <a href="#" class="delete-icon" data-id="${expense.id}">
                            <i class="fas fa-trash"></i>
                        </a>
                    </div>
                </div>
            </div>   
            `;
            console.log(expense.id)
            this.expenseList.appendChild(div);
        }

        //Show Balance
        showBalance() {
            //c(`Hey i'm getting a hold`);
            const expense = this.totalExpense();
            const total = parseInt(this.budgetAmount.textContent) - expense;
            this.balanceAmount.textContent = total;
            if(total < 0) {
                this.balance.classList.remove('showGreen', 'showBlack');
                this.balance.classList.add('showRed');
            }else if(total > 0) {
                this.balance.classList.remove('showRed', 'showBlack');
                this.balance.classList.add('showGreen');
            }else if(total === 0) {
                this.balance.classList.remove('showRed', 'showGreen');
                this.balance.classList.add('showBlack');
            }
        }

        //Total expense
        totalExpense() {
            let total = 0;
            if (this.listItem.length > 0) {
                total = this.listItem.reduce((curr, acc ) =>{
                    c(`Total is ${curr} and current value is ${acc.amount}`);
                    curr += acc.amount;
                    return curr;
                },0);
            }

            this.expenseAmount.textContent = total;
            return total;
        }

        //Edit Expense
        editExpense(data) {
            let id = parseInt(data.dataset.id),
            parent = data.parentElement.parentElement.parentElement.parentElement;
            //Remove from Dom
            this.expenseList.removeChild(parent);

            let expense = this.listItem.filter(item =>{ return item.id === id; });
            this.amountInput.value = expense[0].amount;
            this.expenseInput.value = expense[0].title;
            //remove from list
            let tempList = this.listItem.filter(item => { return item.id !== id; });
            this.listItem = tempList;
            this.showBalance();
        }

        //Delete Expense
        deleteExpense(data) {
            let id = parseInt(data.dataset.id),
            parent = data.parentElement.parentElement.parentElement.parentElement;
            //Remove from Dom
            this.expenseList.removeChild(parent);

            //remove from list
            let tempList = this.listItem.filter(item => { return item.id !== id; });
            this.listItem = tempList;
            this.showBalance();
        }
        
    }

    function eventListeners() {
        const budgetForm = d.getElementById("budget-form");
        const expenseForm = d.getElementById("expense-form");
        const expenseList = d.getElementById("expense-list");

        //Instance Class UI
        const ui = new UI();

        ////Budget form submit
        budgetForm.addEventListener('submit', e =>{
            e.preventDefault();
            ui.submitBugetForm();
        });

        //Expense form submit
        expenseForm.addEventListener('submit', e =>{
            e.preventDefault();
            ui.submitExpenseForm();
        });

        ////ExpenseList
        expenseList.addEventListener('click', e =>{
            c(e)
            if (e.target.parentElement.classList.contains('edit-icon')) {
                console.log("Edit")
                ui.editExpense(e.target.parentElement)
            }else if (e.target.parentElement.classList.contains('delete-icon')) {
                console.log("Delete")
                ui.deleteExpense(e.target.parentElement)
            }
        })
    }

    d.addEventListener('DOMContentLoaded', () =>{
        eventListeners();
    });
    
    
})(console.log,document);

/* const data = [[1,2,3], [4,5,6], [7,8,9]]

const values = data.reduce((total, value) =>{
    return total.concat(value)
})
console.log(data)
console.log(values)
const val =values.reduce((tot, val)=>{
    return tot +=val;
})
console.log(val)

const valMap = values.map((num) => {
    return num * 2;    
})
console.log(valMap)
const vals =valMap.reduce((tot, val)=>{
    return tot +=val;
})


const tt = vals.toFixed(3);
console.log(tt) */