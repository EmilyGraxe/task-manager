// ========================================
// GET ELEMENTS FROM HTML
// ========================================

const dayNameElement = document.getElementById("dayName");
const dateElement = document.getElementById("date");
const adviceElement = document.getElementById("advice");

const taskForm = document.getElementById("taskForm");

const taskInput = document.getElementById("taskInput");
const deadlineInput = document.getElementById("deadlineInput");

const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const taskCount = document.getElementById("taskCount");


// ========================================
// DAILY ADVICE
// ========================================

function showDailyAdvice() {

    // Get today's date
    const today = new Date();

    console.log(today);


    // Get the day number
    const day = today.getDay();

    console.log("Day number:", day);


    // Get the year
    const year = today.getFullYear();

    console.log("Year:", year);


    let dayName;
    let advice;


    switch (day) {

        case 0:

            dayName = "Sunday";

            advice = "Rest and recharge ❤️.";

            break;


        case 1:

            dayName = "Monday";

            advice = "Start strong and stay focused 🥤❤️.";

            break;


        case 2:

            dayName = "Tuesday";

            advice = "Keep pushing forward.";

            break;


        case 3:

            dayName = "Wednesday";

            advice = "Stay consistent.";

            break;


        case 4:

            dayName = "Thursday";

            advice = "Almost there, keep going!";

            break;


        case 5:

            dayName = "Friday";

            advice = "Finish strong!";

            break;


        case 6:

            dayName = "Saturday";

            advice = "Relax and enjoy your day.";

            break;


        default:

            dayName = "Unknown";

            advice = "Something went wrong.";

    }


    // Put the information into HTML

    dayNameElement.textContent = dayName;

    adviceElement.textContent = advice;


    // Create a readable date

    dateElement.textContent =
        today.toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );
}


// ========================================
// TASKS
// ========================================

// Get saved tasks from browser

let tasks =
    JSON.parse(
        localStorage.getItem("dailyTasks")
    ) || [];


// ========================================
// ADD TASK
// ========================================

taskForm.addEventListener("submit", function(event) {

    // Stop the page from refreshing

    event.preventDefault();


    // Get the values entered by the user

    const taskText = taskInput.value.trim();

    const deadline = deadlineInput.value;


    // Create a task object

    const task = {

        id: Date.now(),

        name: taskText,

        deadline: deadline,

        completed: false

    };


    // Add task to the array

    tasks.push(task);


    // Save tasks

    saveTasks();


    // Display tasks

    displayTasks();


    // Clear form

    taskForm.reset();

});


// ========================================
// DISPLAY TASKS
// ========================================

function displayTasks() {

    // Clear existing tasks

    taskList.innerHTML = "";


    // If there are no tasks

    if (tasks.length === 0) {

        taskList.innerHTML = `
            <div class="empty-message">
                <span>📝</span>

                <p>
                    No tasks yet. Add your first task!
                </p>
            </div>
        `;

        updateStatistics();

        return;
    }


    // Loop through every task

    tasks.forEach(function(task) {

        const taskElement =
            document.createElement("div");


        taskElement.className = "task";


        // Add completed class

        if (task.completed) {

            taskElement.classList.add("completed");

        }


        taskElement.innerHTML = `

            <div class="task-left">

                <input
                    type="checkbox"
                    class="task-checkbox"
                    ${task.completed ? "checked" : ""}
                >

                <div class="task-info">

                    <h3>
                        ${task.name}
                    </h3>

                    <p>
                        📅 Deadline:
                        ${formatDeadline(task.deadline)}
                    </p>

                </div>

            </div>


            <button
                class="delete-button"
                title="Delete task"
            >
                🗑️
            </button>

        `;


        // Checkbox

        const checkbox =
            taskElement.querySelector(".task-checkbox");


        checkbox.addEventListener(
            "change",
            function() {

                toggleTask(task.id);

            }
        );


        // Delete button

        const deleteButton =
            taskElement.querySelector(".delete-button");


        deleteButton.addEventListener(
            "click",
            function() {

                deleteTask(task.id);

            }
        );


        taskList.appendChild(taskElement);

    });


    updateStatistics();
}


// ========================================
// FORMAT DEADLINE
// ========================================

function formatDeadline(deadline) {

    const date = new Date(deadline);


    return date.toLocaleString(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit"
        }
    );
}


// ========================================
// COMPLETE / UNCOMPLETE TASK
// ========================================

function toggleTask(id) {

    tasks = tasks.map(function(task) {

        if (task.id === id) {

            return {
                ...task,
                completed: !task.completed
            };

        }


        return task;

    });


    saveTasks();

    displayTasks();
}


// ========================================
// DELETE TASK
// ========================================

function deleteTask(id) {

    tasks =
        tasks.filter(function(task) {

            return task.id !== id;

        });


    saveTasks();

    displayTasks();
}


// ========================================
// UPDATE STATISTICS
// ========================================

function updateStatistics() {

    const total = tasks.length;


    const completed =
        tasks.filter(function(task) {

            return task.completed;

        }).length;


    const pending =
        total - completed;


    totalTasks.textContent = total;

    completedTasks.textContent = completed;

    pendingTasks.textContent = pending;


    taskCount.textContent =
        total + (total === 1 ? " task" : " tasks");
}


// ========================================
// SAVE TASKS
// ========================================

function saveTasks() {

    localStorage.setItem(
        "dailyTasks",
        JSON.stringify(tasks)
    );

}


// ========================================
// START THE APPLICATION
// ========================================

showDailyAdvice();

displayTasks();