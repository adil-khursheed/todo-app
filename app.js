let todoArray = [];

// Adding TODO Items
const addItem = (event) => {
    event.preventDefault();
    let text = document.getElementById("create__todo__input");
    db.collection("todo-items").add({
        text: text.value,
        status: 'active',
    })
    text.value = "";
}


// Getting the TODO Items
const getItems = () => {
    db.collection("todo-items").onSnapshot((snapshot) => {
        let items = [];
        snapshot.docs.forEach((doc) => {
            items.push({
                id: doc.id,
                ...doc.data(),
            })
        })
        generateItems(items);
        itemsLeft();
    })
}


// Display the TODO Items
const generateItems = (items) => {

    let itemsHTML = "";
    items.forEach((item) => {
        itemsHTML +=
        `<div data-id="${item.id}" class="todo__item ${item.status == "completed" ? "checked" : ""}">
            <div data-id="${item.id}" class="input__circle ${item.status == "completed" ? "checked" : ""}">
                <img src="images/icon-check.svg" alt="">
            </div>
            <div class="todo__text ${item.status == "completed" ? "checked" : ""}">
                ${item.text}
            </div>
            <div data-id="${item.id}" class="todo__delete">
                <img src="images/icon-cross.svg" alt="">
            </div>
        </div>`
    })

    document.querySelector(".todo__items").innerHTML = itemsHTML
    createEventListeners();
}


// Creating Event Listeners
const createEventListeners = () => {
    const todoCheckMarks = document.querySelectorAll(".todo__item .input__circle");
    const todoDeleteBtns = document.querySelectorAll(".todo__item .todo__delete");
    const clearTodo = document.querySelector(".todo__clear");
    const completedItems = document.querySelectorAll(".todo__item.checked");
    // console.log(completedItems);
    const todoItemFilterBtns = document.querySelectorAll(".todo__item__filter p");
    // console.log(todoItemFilterBtns);
    const todoItems = document.querySelectorAll(".todo__item");
    // console.log(todoItems);

    todoCheckMarks.forEach((checkMark) => {
        checkMark.addEventListener("click", () => {
            markCompleted(checkMark.dataset.id);
        })
    })

    todoDeleteBtns.forEach((deleteBtn) => {
        deleteBtn.addEventListener("click", () => {
            removeTodo(deleteBtn.dataset.id);
        })
    })

    completedItems.forEach((completedItem) =>{
        clearTodo.addEventListener("click", () => {
            removeTodo(completedItem.dataset.id);
        })
    })

    todoItemFilterBtns.forEach((filterBtn) => {
        filterBtn.addEventListener("click", () => {
            todoItemFilterBtns.forEach((btn) => {
                btn.classList.remove("active");
            })
            filterBtn.classList.add("active");
            if (filterBtn.innerText == "Active") {
                todoItems.forEach(todoItem => {
                    if (!todoItem.classList.contains("checked")) {
                        todoItem.style.display = "flex";
                    } else {
                        todoItem.style.display = "none";
                    }
                })
            } else if (filterBtn.innerText == "Completed") {
                todoItems.forEach(todoItem => {
                    if (todoItem.classList.contains("checked")) {
                        todoItem.style.display = "flex";
                    } else {
                        todoItem.style.display = "none";
                    }
                })
            } else {
                todoItems.forEach(todoItem => {
                    todoItem.style.display = "flex";
                })
            }
        })
    })


}


// Check Mark Update Function
const markCompleted = (id) => {
    let item = db.collection("todo-items").doc(id);
    // console.log(id);
    item.get().then((doc) => {
        if (doc.exists) {
            let status = doc.data().status;
            if (status == "active") {
                item.update({
                    status: "completed",
                })
            } else if (status == "completed"){
                item.update({
                    status: "active",
                })
            }
        }
    })
}


// Delete TODO Function
const removeTodo = (id) => {
    let item = db.collection("todo-items").doc(id);
    item.delete();
}


// Items TODO Left
const itemsLeft = () => {
    const todoText = document.querySelectorAll(".todo__text");
    const completedTodo = document.querySelectorAll(".todo__text.checked")


    let todoHTML = todoText.length - completedTodo.length;

    document.querySelector(".todo__item__left").innerHTML = `<p>${todoHTML} items left</p>`;

}

getItems();



// Light & Dark Mode Toggle
const modeTogglerIcon = document.getElementById('mode__toggler__icon');
const backgroundImage = document.getElementById('background__image');
let darkMode = localStorage.getItem('dark-mode');

const enableDarkMode = () => {
    document.body.classList.add("dark-mode");
    modeTogglerIcon.src = 'images/icon-sun.svg';
    backgroundImage.src = 'images/bg-desktop-dark.jpg';
    localStorage.setItem('dark-mode', 'enabled');
}
const disableDarkMode = () => {
    document.body.classList.remove("dark-mode");
    modeTogglerIcon.src = 'images/icon-moon.svg';
    backgroundImage.src = 'images/bg-desktop-light.jpg';
    localStorage.setItem('dark-mode', null);
}

if (darkMode === 'enabled') {
    enableDarkMode();
}

modeTogglerIcon.addEventListener("click", () => {
    darkMode = localStorage.getItem("dark-mode");
    if (darkMode !== 'enabled') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
})