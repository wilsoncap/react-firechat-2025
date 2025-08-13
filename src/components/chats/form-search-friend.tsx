import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { emailFriendZodSchema, type emailFrindZodSchemaType } from "../../lib/zod.schema"
import { Search, Loader2 } from "lucide-react"
import { Button } from "../ui//button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { useTransition } from "react"
import { useRoomActions } from "../../hooks/use-room-actions"
import { toast } from "sonner"

interface Props {
    handleClickRoomId: (id: string) => void
}

const FormSearchFrined = ({handleClickRoomId}: Props) => {

  const [isLoading, starTransition] = useTransition()
  const {findOrCreateRoom} = useRoomActions();

  const form = useForm<emailFrindZodSchemaType>({
    resolver: zodResolver(emailFriendZodSchema),
    defaultValues: {
      email: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: emailFrindZodSchemaType) {
    starTransition(async() => {
        const response = await findOrCreateRoom(values.email)
        form.reset()
        if (response.success) {
            handleClickRoomId(response.roomId)
            toast.success("Friend encontrado, comienza a chatear")
        }
        toast.error(response.message)
    })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="email" 
                    placeholder="Buscar por email..." 
                    className="pl-8 bg-background"
                    {...field} 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          variant="secondary"
          size="icon"
          disabled={isLoading}
          className="shrink-0"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
          <span className="sr-only">Buscar amigo</span>
        </Button>
      </form>
    </Form>
  )
}

export default FormSearchFrined