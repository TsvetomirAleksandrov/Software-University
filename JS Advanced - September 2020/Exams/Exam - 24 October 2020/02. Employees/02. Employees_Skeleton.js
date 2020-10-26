function solveClasses() {
    class Developer {
        constructor(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.tasks = [];
            this.baseSalary = 1000;
            this.experience = 0;
        }

        addTask(id, taskName, priority) {
            //create a new task object and add it to tasks array and return the message
            let task = {
                id,
                taskName,
                priority
            }

            //taskId is always unique
            if (this.tasks.find((t) => t.id === id)) {
                return;
            } else {
                //if the task has high priority - add it as first task
                //if low priority - add it at last position
                if (task.priority === 'high') {
                    this.tasks.unshift(task);
                } else if (task.priority === 'low') {
                    this.tasks.push(task);
                }
            }

            return `Task id ${id}, with ${priority} priority, has been added.`;
        }

        doTask() {
            //if there are no tasks return: "{first name}, you have finished all your tasks. You can rest now."
            if (this.tasks.length <= 0) {
                return `${this.firstName}, you have finished all your tasks. You can rest now.`;
            }
            // removes the newest task with the highest priority and returns task name
            let newestTask = this.tasks.shift();
            return newestTask;
        }

        getSalary() {
            //shoud return "{firstName} {lastName} has a salary of: {salary}"
            return `${this.firstName} ${this.lastName} has a salary of: ${this.baseSalary}`;
        }

        reviewTasks() {
            let result = [`Tasks, that need to be completed:`];

            // //This method should return all of the incompleted tasks in the format:
            // "Tasks, that need to be completed:
            // { id }: { name } - { priority }
            //     (...)"
            if (this.tasks.length > 0) {
                this.tasks.forEach(t => {result.push(`${t.id}: ${t.taskName} - ${t.priority}`)});
            }

            return result.join('\n');
        }
    }

    class Junior extends Developer {
        constructor(firstName, lastName, bonus, experience) {
            super(firstName, lastName);
            this.experience = experience;
            this.baseSalary = 1000 + bonus;
            this.tasks = [];
        }

        learn(years) {
            return this.experience += years;
        }
    }

    class Senior extends Developer {
        constructor(firstName, lastName, bonus, experience) {
            super(firstName, lastName);
            this.baseSalary = 1000 + bonus;
            this.tasks = [];
            this.experience = experience + 5;
        }

        changeTaskPriority(taskId) {
            let currentTask = this.tasks.find((t) => t.id === taskId);

            if (currentTask.priority === 'high') {
                currentTask.priority = 'low';
                this.tasks.push(currentTask);
            } else if (currentTask.priority === 'low') {
                currentTask.priority = 'high';
                this.tasks.unshift(currentTask);
            }

            return currentTask;
        }
    }

    return {
        Developer,
        Junior,
        Senior
    }
}


let classes = solveClasses();
const junior = new classes.Junior("Jonathan", "Joestar", 200, 2);

junior.learn(4);
const learnResult = junior.experience;
//const learnExpect = 6;
//expect(learnResult).to.be.eq(learnExpect);

const salaryResult = junior.baseSalary;
//const salaryExpect = 1200;

