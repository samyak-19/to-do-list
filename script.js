const wrapper = document.querySelector(".wrapper");
const backButton = document.querySelector(".back-button");
const menuButton = document.querySelector(".menu-button");
const toggleScreen = () => {
    wrapper.classList.toggle("show-category");
};

menuButton.addEventListener("click", toggleScreen);
backButton.addEventListener("click", toggleScreen);

const addTaskBtn = document.querySelector(".add-task-btn");
const addTaskForm = document.querySelector(".add-task");
const blackBackdrop = document.querySelector(".black-backdrop");

const toggleAddTaskForm = () => {
    addTaskForm.classList.toggle("active");
    blackBackdrop.classList.toggle("active");
    addTaskBtn.classList.toggle("active");
};

addTaskBtn.addEventListener("click", toggleAddTaskForm);
blackBackdrop.addEventListener("click", toggleAddTaskForm);

let categories = [
    {
        title: "Personal",
        img: "boy.png",
    },
    {
        title: "Work",
        img: "briefcase.png",
    },
    {
        title: "Shopping",
        img: "shopping.png",
    },
    {
        title: "Coding",
        img: "web-design.png",
    },
    {
        title: "Health",
        img: "healthcare.png",
    },
    {
        title: "Fitness",
        img: "dumbbell.png",
    },
    {
        title: "Education",
        img: "education.png",
    },
    {
        title: "Finance",
        img: "saving.png",
    },
];

let tasks = [
    {
        id: 1,
        task: "Go to market",
        category: "Shopping",
        completed: false,
    },
    // ... other tasks
];

let selectedCategory = categories[0];

const categoriesContainer = document.querySelector(".categories");
const categoryTitle = document.querySelector(".category-title");
const totalCategoryTasks = document.querySelector(".category-tasks");
const categoryImg = document.querySelector(".category-img");
const totalTasks = document.querySelector(".totalTasks");

const calculateTotal = () => {
    const categoryTasks = tasks.filter((task) => task.category.toLowerCase() === selectedCategory.title.toLowerCase());
    totalCategoryTasks.innerHTML = `${categoryTasks.length} Tasks`;
    totalTasks.innerHTML = tasks.length;
};

const renderCategories = () => {
    categoriesContainer.innerHTML = "";
    categories.forEach((category) => {
        const categoryTasks = tasks.filter((task) => task.category.toLowerCase() === category.title.toLowerCase());

        const div = document.createElement("div");
        div.classList.add("category");
        div.addEventListener("click", () => {
            wrapper.classList.add("show-category");
            selectedCategory = category;
            categoryTitle.innerHTML = category.title;
            categoryImg.src = `images/${category.img}`;
            calculateTotal();
            renderTasks();
        });
        div.innerHTML = `  
            <div class="left">
                <img src="IMAGES/${category.img}" alt="${category.title}">
                <div class="content">
                    <h1>${category.title}</h1>
                    <p>${categoryTasks.length} Tasks</p>
                </div>
            </div>
            <div class="option">
                <div class="toggle-button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"/>
                    </svg>
                </div>
            </div>`;
        
        categoriesContainer.appendChild(div);
    });
};

const tasksContainer = document.querySelector(".tasks");

const renderTasks = () => {
    tasksContainer.innerHTML = "";
    const categoryTasks = tasks.filter((task) => task.category.toLowerCase() === selectedCategory.title.toLowerCase());

    if (categoryTasks.length === 0) {
        tasksContainer.innerHTML = `<p class="no-task"> No task Available </p>`;
    } else {
        categoryTasks.forEach((task) => {
            const div = document.createElement("div");
            div.classList.add("task-wrapper");
            const label = document.createElement("label");
            label.classList.add("task");
            label.setAttribute("for", task.id);
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = task.id;
            checkbox.checked = task.completed;

            checkbox.addEventListener("change", () => {
                const index = tasks.findIndex((t) => t.id === task.id);
                tasks[index].completed = !tasks[index].completed;
                saveLocal();
            });

            div.innerHTML = `
                <div class="delete">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                    </svg>
                </div>
                <div class="edit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 3.487a2.121 2.121 0 013 3L8.68 17.669a8.441 8.441 0 01-3.484 2.126l-3.113.835a.75.75 0 01-.91-.911l.835-3.113a8.441 8.441 0 012.126-3.484L16.862 3.487zM9.75 15l3 3"/>
                    </svg>
                </div>`;
            label.innerHTML = `
                <span class="checkmark">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                    </svg>
                </span>
                <p>${task.task}</p>`;
            label.prepend(checkbox);
            div.prepend(label);
            tasksContainer.appendChild(div);

            const deleteBtn = div.querySelector(".delete");
            deleteBtn.addEventListener("click", () => {
                const index = tasks.findIndex((t) => t.id === task.id);
                tasks.splice(index, 1);
                saveLocal();
                renderTasks();
            });

            const editBtn = div.querySelector(".edit");
            editBtn.addEventListener("click", () => {
                taskInput.value = task.task;
                categorySelect.value = task.category.toLowerCase();
                toggleAddTaskForm();

                addBtn.removeEventListener("click", addTask);
                addBtn.addEventListener("click", () => editTask(task.id));
            });
        });
    }
    renderCategories();
    calculateTotal();
};

const saveLocal = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const getLocal = () => {
    const localTasks = JSON.parse(localStorage.getItem("tasks"));
    if (localTasks) {
        tasks = localTasks;
    }
};

const categorySelect = document.querySelector("#category-select");
const addBtn = document.querySelector(".add-btn");
const cancelBtn = document.querySelector(".cancle-btn");
const taskInput = document.querySelector("#task-input");

const addTask = () => {
    const task = taskInput.value;
    const category = categorySelect.value;

    if (task === "") {
        alert("Please enter a task");
    } else {
        const newTask = {
            id: tasks.length + 1,
            task,
            category,
            completed: false,
        };
        tasks.push(newTask);
        taskInput.value = "";
        saveLocal();
        toggleAddTaskForm();
        renderTasks();
    }
};

const editTask = (id) => {
    const task = taskInput.value;
    const category = categorySelect.value;

    if (task === "") {
        alert("Please enter a task");
    } else {
        const taskIndex = tasks.findIndex((t) => t.id === id);
        tasks[taskIndex].task = task;
        tasks[taskIndex].category = category;

        taskInput.value = "";
        saveLocal();
        toggleAddTaskForm();
        renderTasks();
        
        addBtn.removeEventListener("click", () => editTask(id));
        addBtn.addEventListener("click", addTask);
    }
};

cancelBtn.addEventListener("click", toggleAddTaskForm);
addBtn.addEventListener("click", addTask);

categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.title.toLowerCase();
    option.textContent = category.title;
    categorySelect.appendChild(option);
});

getLocal();
calculateTotal();
renderCategories();
renderTasks();