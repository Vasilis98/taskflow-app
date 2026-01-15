const tasks = [
    {
        id: '1',
        title: 'Σχεδιασμός Homepage',
        description: 'Δημιουργία mockups για το Login page.',
        priority: 'high',
        date: 'Dec 12',
        status: 'todo'
    },
    {
        id: '2',
        title: 'Έρευνα αγοράς',
        description: 'Ανάλυση ανταγωνισμού για features',
        priority: 'low',
        date: 'Dec 15',
        status: 'doing'
    },
    {
        id: '3',
        title: 'Στήσιμο Database',
        description: 'Δημιουργία πινάκων στη βάση δεδομένων',
        priority: 'Medium',
        date: 'Dec 18',
        status: 'done'
    }
]

const todoColumn = document.querySelector('#todo-tasks');
const doingColumn = document.querySelector('#doing-tasks');
const doneColumn = document.querySelector('#done-tasks');

    tasks.forEach((task) => {
        const priorityClass = task.priority.toLowerCase();
        const cardHTML = `
             <article class="task-card">
               <div class="task-card__header">
                 <span class="task-card__tag task-card__tag--${priorityClass}">${task.priority} Priority</span>
                 <h4 class="task-card__title">${task.title}</h4>
               </div>
               <p class="task-card__description">
                    ${task.description}       
               </p>
               <div class="task-card__footer">
                 <span class="task-card__date">${task.date}</span>
                 <button class="task-card__btn">Edit</button>
               </div>
             </article>`;

        if (task.status === 'todo') {
            todoColumn.innerHTML += cardHTML;
        } else if (task.status === 'doing') {
            doingColumn.innerHTML += cardHTML;
        } else if (task.status === 'done') {
            doneColumn.innerHTML += cardHTML;
        }
    })
