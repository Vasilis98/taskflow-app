const editButton = document.querySelectorAll('.task-card__btn');

editButton.forEach(button => {
    button.addEventListener('click', () => {
        alert('Want to edit task;');
        console.log('button clicked');
    })
})
