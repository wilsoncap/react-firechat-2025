import { useTransition } from "react";
import { useTaskActions } from "../../hooks/use-task-action"
import type { Task } from "../../schemas/task.schema"
import { Button } from "../ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "../ui/card";
import { toast } from "sonner";
import { cn } from "../../lib/utils";

interface Prosp {
    task: Task
}

const ItemTask = ({task}: Prosp) => {
 const {deleteTask, toggleTaskCompleted} = useTaskActions();
 const [isPending, startTransiction] = useTransition();

 const handleDelete = async() =>{
    startTransiction(async()=>{
        try {
            deleteTask(task.id)
        } catch (error) {
            console.log(error);
            toast.error("Error deleting task")
            
        }
    })
 }

 const handleToogleCompetion = async () => {
    startTransiction(async()=>{
        try {
            toggleTaskCompleted(task.id)
        } catch (error) {
            console.log(error);
            toast.error("Error updating task")
            
        }
    })
 }
  return (
    <Card>
        <CardHeader >
            <CardTitle
            className={
                cn(
                    "text-lg font-semibold",
                    task.completed ? "line-through text-gray-500" : ""
                )
            }
            >{task.title}</CardTitle>
            <CardAction className="space-x-2">
                <Button variant={"outline"} onClick={handleToogleCompetion} disabled={isPending}>
                    Update
                </Button>

                <Button variant={"destructive"} onClick={handleDelete} disabled={isPending}>
                    Delete
                </Button>
            </CardAction>
            <CardContent>
                {
                    task.description && (
                        <CardContent>
                          {task.description}  
                        </CardContent>
                    )
                }
            </CardContent>
        </CardHeader>
    </Card>
  )
}

export default ItemTask