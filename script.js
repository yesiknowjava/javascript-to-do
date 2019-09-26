class toDoClass {
    
    constructor() {

        this.tasks = JSON.parse(localStorage.getItem('todo'));
        if (!this.tasks) {
            this.tasks = []
        }
        
    }

    loadTasks() {
        let taskData
        if (this.tasks.length) {
            taskData = this.tasks.reduce((html, task, index) => html += this.generateHtml(task, index),'');
        } else {
            taskData = this.generateNoContent()
        }
        document.getElementById('taskList').innerHTML = taskData;
    }

    generateHtml(task, index) {
        return `
        <tr class="d-flex">
            <td class="col-1">${index+1}</td>
            <td class="col-1 text-center">
                <div class="form-check form-check-inline">
                    <label class="form-check-label">
                        <input class="form-check-input" type="checkbox" name="" id="" value="checkedValue" onChange='toDo.toggleTaskStatus(${index})' ${task.isComplete?'checked':''}>
                    </label>
                </div>
            </td>
            <td class="col-9">${task.name}</td>
            <td class="col-1">
                <button type="button" class="btn btn-info btn-md" data-id="${index}" onClick="toDo.deleteTask(event, ${index})">
                    <i class="fa fa-trash"></i>
                </button>
            </td>
        </tr>
        `
    }

    generateNoContent() {
        return `
        <tr class="d-flex">
            <td class="col-12 center" colspan="4">No task in your list</td>
        </tr>
        `
    }

    addTaskClick() {
        let target = document.getElementById('addTask')
        this.addTask(target.value)
        target.value = '';
    }
    addTask(task) {
        let newTask = {
            'name': task,
            'isComplete': false
        }
        if (task === '') {
            alert("Task cannot be empty")
        } else {
            this.tasks.push(newTask);
            localStorage.setItem('todo', JSON.stringify(this.tasks))
            this.loadTasks()
        }
    }
    deleteAllTasks() {
        localStorage.removeItem('todo');
        this.tasks = []
        this.loadTasks()
    }

    toggleTaskStatus(index) {
        this.tasks[index].isComplete = !this.tasks[index].isComplete;
        this.loadTasks();
    }

    deleteTask(event, index) {
        event.preventDefault();
        this.tasks.splice(index, 1);
        this.loadTasks();
    }
}

let toDo;
window.addEventListener('load', function() {
    toDo = new toDoClass()
    toDo.loadTasks();
})