
let tasks = [];

function resetTasks() {
    tasks = [];
    for (let i = 0; i < 11; i++) {
        tasks.push(randomTask(i));

    }
}

const x = 0;
function randomTask(id) {
    const name = ["Buy groceries", "Go for a walk", "Prepare taxes", "Doctors appointment", "Attend show", "Watch movie", "Feed Dog", "Do laundry", "Test code", "Paint fence", "Inspect car", "Register car", "Insure car", "Ring Aunt Jane"];
    const status = ['TODO', 'IN PROGRESS', 'REVIEW', 'DONE'];
    let ran = Math.floor(Math.random() * name.length);

    let statusRandom = Math.floor(Math.random() * 4);

    newTask = { id: id, name: name[ran], description: name[ran], assignedTo: "Kriss Wilson", dueDate: new Date(2020, 2, 1 + id, id), status: status[statusRandom] }
    return newTask;
}
const taskManager = {

    getTasks: function () {
        return tasks;

    }
    ,
    getTasksWithStatus: function (status) {

        return tasks.filter(function (task) {
            return task.status == status;
        });

    },
    addTask: function (newTask) {
        tasks.push(newTask);
        return tasks;


    },
    deleteTask: function (taskToDelete) {
        let taskIndex = tasks.findIndex(function (task) {
            return task.id == taskToDelete.id;
        });
        //alert(taskIndex);
        if (taskIndex != -1) {
            let deletedItem = tasks.splice(taskIndex, 1);
        }
    },
    getTaskIndexFromId: function (taskId) {
        let taskIndex = tasks.findIndex(function (task) {
            return task.id == taskId;
        });
        return taskIndex;
    },
    getTaskFromId: function (taskId) {
        let taskIndex = tasks.findIndex(function (task) {
            return task.id == taskId;
        });
        return tasks[taskIndex];
    },

    updateTaskStatus: function (taskId, newStatus) {
        let t = null;
        t = this.getTaskFromId(taskId);
        if (t) {
            t.status = newStatus;
        }
        console.log(tasks);

    },
    assignTask: function (taskId, newAssignee) {
        let t = null;
        t = this.getTaskFromId(taskId);
        if (t) {

            t.assignedTo = newAssignee;
        }
        console.log(tasks);
    }

}


let t = taskManager.addTask({ id: 20, name: 'Go fishing', description: 'Go fishing', assignedTo: 'Sid Smith', dueDate: new Date(), status: 'TODO' });
taskManager.deleteTask({ id: 20, name: 'Go fishing', description: 'Go fishing', assignedTo: 'Sid Smith', dueDate: new Date(), status: 'TODO' });
taskManager.updateTaskStatus(1, "****STATUS****");
taskManager.assignTask(2, "**new assignee**");
console.log(tasks);
console.log("finished");

function updateOutput() {
    const output = document.getElementById("output");
    let st = "";
    let t = taskManager.getTasks();
    for (let i = 0; i < t.length; i++) {
        const element = t[i];
        st = st + JSON.stringify(element) + "<br>";

    }
    output.innerHTML = st;
}

function clearMainOuput() {
    const output = document.getElementById("output");
    let st = "";

    output.innerHTML = st;
}

function updateOutput2(st) {
    const output = document.getElementById("output2");
  
    output.innerHTML = st;
}


//     output.innerHTML=st;;
// }
function init() {

    resetTasks();

    const ALLTASKS = taskManager.getTasks();
const DONE = taskManager.getTasksWithStatus('DONE');
const TODO = taskManager.getTasksWithStatus('TODO');
const PROGRESS = taskManager.getTasksWithStatus('IN PROGRESS');
const REVIEW = taskManager.getTasksWithStatus('REVIEW');


    let button01 = null;
    let button02 = null;
    let button03 = null;
    let button04 = null;
    let button05 = null;
    let button06 = null;



    button01 = document.getElementById("button01");
    button01.addEventListener('click', updateOutput);
    button02 = document.getElementById("button02");
    button02.addEventListener('click', () => { taskManager.addTask({ id: 20, name: 'Go fishing', description: 'Go fishing', assignedTo: 'Sid Smith', dueDate: new Date(), status: 'TODO' }); updateOutput(); })
    button03 = document.getElementById("button03");
    button03.addEventListener('click', () => { taskManager.deleteTask({ id: 10, name: 'Go fishing', description: 'Go fishing', assignedTo: 'Sid Smith', dueDate: new Date(), status: 'TODO' }); updateOutput() })
    button04 = document.getElementById("button04");
    button04.addEventListener('click', () => { resetTasks(); updateOutput(); });

    button05 = document.getElementById("button05");
    button05.addEventListener('click', () => { clearMainOuput(); updateOutput2(JSON.stringify(DONE,)); });

    button06 = document.getElementById("button06");
    button06.addEventListener('click', () => {  clearMainOuput(); updateOutput2(JSON.stringify(REVIEW));});

    //updateOutput();
}
