import { Suspense } from "react"
import TaskList from "../../components/tasks/task-list"
import FormTask from "../../components/tasks/form-task"


const TaskPage = () => {
 

  return (
    <div>
        <h1 className="text-xl font-bold">Tasks</h1>

        <FormTask />

        <Suspense fallback={<div>Loading task</div>}>
            <TaskList />
        </Suspense>
    </div>
  )
}

export default TaskPage