import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { emailFriendZodSchema, type emailFrindZodSchemaType } from "../../lib/zod.schema"

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="emal" placeholder="shadcn@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant={"outline"} className="w-full" disabled={isLoading}>
            {
                isLoading ? "Buscando Friend ..." : "Buscar"
            }
        </Button>
      </form>
    </Form>
  )
}

export default FormSearchFrined