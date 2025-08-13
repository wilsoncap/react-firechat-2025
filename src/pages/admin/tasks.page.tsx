import { Suspense } from "react"
import TaskList from "../../components/tasks/task-list"
import FormTask from "../../components/tasks/form-task"
import { ListTodo, Loader2 } from "lucide-react"
import { Card } from "../../components/ui/card"

const TaskPage = () => {
  return (
    <div className="container mx-auto p-4 max-w-4xl space-y-6">
      <div className="flex items-center gap-2">
        <ListTodo className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Mis Tareas</h1>
      </div>

      <Card className="p-6">
        <FormTask />
      </Card>

      <div className="bg-card rounded-lg border shadow-sm p-6">
        <Suspense 
          fallback={
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              Cargando tareas...
            </div>
          }
        >
          <TaskList />
        </Suspense>
      </div>
    </div>
  )
}

export default TaskPage