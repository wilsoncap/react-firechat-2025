import { useProfileActions } from "../../hooks/use-profile-actions"
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form"
import { profileZodSchema, type ProfileFormSchemaType } from "../../lib/zod.schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type {User } from 'firebase/auth';
import { toast } from "sonner";

interface Props {
    user: User
}


const FormProfile = ({user}: Props) => {
  
  const {loading, updateUserProfile} = useProfileActions();
  

  // Para que photoURL sea realmente opcional y permita dejar el campo vacío en el formulario, debes asignar undefined como valor por defecto si el usuario no tiene un valor de photoURL. Así, el campo será omitido y Zod no intentará validarlo como URL.

  const form = useForm<ProfileFormSchemaType>({
    resolver: zodResolver(profileZodSchema),
    defaultValues: {
      displayName: user?.displayName || "",
      photoURL: user?.photoURL || undefined,
    },
  });

  const onSubmit = async (data: ProfileFormSchemaType) => {
    const result = await updateUserProfile({
      displayName: data.displayName,
      photoURL: data.photoURL,
    });

    if (result?.error) {
      console.error("Error updating profile:", result.error);
      toast.error('Error try update profile')
    } else {
      toast.success('Profile update success')
    }
  };

  return (
     <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="bluuweb"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="photoURL"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Photo URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com/photo.jpg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </Form>
  )
}

export default FormProfile