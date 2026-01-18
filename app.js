const todoColumn = document.querySelector('#todo-tasks');
const doingColumn = document.querySelector('#doing-tasks');
const doneColumn = document.querySelector('#done-tasks');
const modalOverlay = document.querySelector('#task-modal');
const modalTitle = document.querySelector('.modal h3'); // Ο τίτλος του παραθύρου
const addTaskBtn = document.querySelector('#add-task-btn');
const closeModalBtn = document.querySelector('#close-modal-btn');
const saveTaskBtn = document.querySelector('#save-task-btn');

const titleInput = document.querySelector('#task-title');
const descInput = document.querySelector('#task-desc');
const priorityInput = document.querySelector('#task-priority');

let editId = null;

const savedData = localStorage.getItem('myTasks');
// Αν υπάρχουν δεδομένα τα κάνουμε Parse, αλλιώς ξεκινάμε με κενό πίνακα
const tasks = savedData ? JSON.parse(savedData) : [];

function saveToLocalStorage() {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

function renderTasks() {

    todoColumn.innerHTML = '<h3>To Do</h3>';
    doingColumn.innerHTML = '<h3>In Progress</h3>';
    doneColumn.innerHTML = '<h3>Done</h3>';

    tasks.forEach((task) => {
        const priorityClass = task.priority.toLowerCase();
        const cardHTML = `
             <article class="task-card"
                draggable="true"
                ondragstart="drag(event, '${task.id}')">
               <div class="task-card__header">
                 <span class="task-card__tag task-card__tag--${priorityClass}">${task.priority} Priority</span>
                 <h4 class="task-card__title">${task.title}</h4>
               </div>
               <p class="task-card__description">${task.description}</p>           
               <div class="task-card__footer">
                 <span class="task-card__date">${task.date}</span> 
                 <div class="task-actions">
                    <button class="task-card__btn" onclick="openEditModal('${task.id}')">Edit</button>
                    <button class="delete-btn" onclick="deleteTask('${task.id}')">🗑️</button>
                 </div>
               </div>
             </article>`;

        if (task.status === 'todo') {
            todoColumn.innerHTML += cardHTML;
        } else if (task.status === 'doing') {
            doingColumn.innerHTML += cardHTML;
        } else if (task.status === 'done') {
            doneColumn.innerHTML += cardHTML;
        }
    });
}

function deleteTask(id) {
    if (confirm('Are you sure you want to delete?')) {
        const filteredTasks = tasks.filter(t => t.id !== id);
        tasks.length = 0;
        tasks.push(...filteredTasks);
        saveToLocalStorage();
        renderTasks();
    }
}

function openEditModal(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        titleInput.value = task.title;
        descInput.value = task.description;
        priorityInput.value = task.priority;
        editId = task.id;
        modalTitle.innerText = 'Edit Task';
        saveTaskBtn.innerText = 'Update Task';

        modalOverlay.classList.add('active');
    }
}
addTaskBtn.addEventListener('click', () => {
    modalOverlay.classList.add('active');
    titleInput.value = '';
    descInput.value = '';
    priorityInput.value = 'low';
    editId = null;
    modalTitle.innerText = 'New Task';
    saveTaskBtn.innerText = 'Save Task';
});


closeModalBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
});

saveTaskBtn.addEventListener('click', () => {

    if (editId) {
        const taskIndex = tasks.findIndex(t => t.id === editId);
        if (taskIndex > -1) {
            tasks[taskIndex].title = titleInput.value;
            tasks[taskIndex].description = descInput.value;
            tasks[taskIndex].priority = priorityInput.value;
        }
    } else {
        const newTask = {
            id: Math.random().toString(),
            title: titleInput.value,
            description: descInput.value,
            priority: priorityInput.value,
            date: 'Dec 14',
            status: 'todo'
        };
        tasks.push(newTask);
    }
    saveToLocalStorage();
    renderTasks();
    modalOverlay.classList.remove('active');
});
renderTasks();

// DRAG AND DROP

function drag(event, taskId) {
    event.dataTransfer.setData('text', taskId);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event, newStatus) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text');

    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex > -1) {
        tasks[taskIndex].status = newStatus;
        saveToLocalStorage();
        renderTasks();
    }
}
