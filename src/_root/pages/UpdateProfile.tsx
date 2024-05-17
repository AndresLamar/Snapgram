import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ProfileValidation } from "@/lib/validation" 
import { useGetUserById, useUpdateUser } from "@/lib/react-query/queriesAndMutations"
import { useToast } from "@/components/ui/use-toast"
import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/AuthContext";

import ProfileUploader from "@/components/shared/ProfileUploader";


function UpdateProfile() {
  const { id } = useParams()

  const { data: user, isPending: isUserLoading } = useGetUserById(id ?? '')

  const { mutateAsync: updateUser, isPending: isLoadingUpdate } = useUpdateUser()

  const { setUser } = useUserContext()

  const { toast } = useToast()
  const navigate = useNavigate()

     // 1. Define your form.
  const form = useForm<z.infer<typeof ProfileValidation>>({  
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      file: [],
      name: user ? user.name : '',
      username: user ? user.username : '',
      email: user ? user.email : '',
      bio: user.bio || ""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ProfileValidation>) {
      
    const updatedUser = await updateUser({
      ...values,
      userId: user.id,
      imageId: user.imageId,
      imageUrl: user.imageUrl
    }) 

    if(!updatedUser){
      toast({ title: 'Please try again'})
    } 

    console.log({updatedUser})


    setUser(updatedUser)

    return navigate(`/profile/${user.id}`) 
    
  }

  if(isUserLoading) return <Loader />  


  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
          <img 
            src="/assets/icons/edit.svg" alt="add"
            width={36}
            height={36}
            className='invert-white'
            />
            <h2 className='h3-bold md:h2-bold text-left w-full'>Edit Post</h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">

            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ProfileUploader 
                        fieldChange={field.onChange}
                        mediaUrl={user?.imageurl}
                    />
                  </FormControl>
                  
                  <FormMessage className='shad-form_message' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='shad-form_label'>Name</FormLabel>
                  <FormControl>
                    <Input 
                    type='text' className='shad-input'
                    placeholder="Name" {...field}
                    />
                  </FormControl>
                  
                  <FormMessage className='shad-form_message' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='shad-form_label'>Username</FormLabel>
                  <FormControl>
                    <Input 
                    type='text' className='shad-input'
                    placeholder="username" {...field}
                    />
                  </FormControl>
                  
                  <FormMessage className='shad-form_message' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='shad-form_label'>Email</FormLabel>
                  <FormControl>
                    <Input 
                    type='text' className='shad-input'
                    placeholder="email" {...field}
                    />
                  </FormControl>
                  
                  <FormMessage className='shad-form_message' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='shad-form_label'>Bio</FormLabel>
                  <FormControl>
                    <Textarea className="shad-textarea custom-scrollbar" {...field} />
                  </FormControl>
                  
                  <FormMessage className='shad-form_message' />
                </FormItem>
              )}
            />

            <div className = 'flex gap-4 items-center justify-end'>
              <Button 
              type="button" onClick={() => navigate(`/profile/${user.id}`)} className={`shad-button_dark_4 ${isLoadingUpdate ? 'cursor-not-allowed opacity-50' : ''}`}>
                  Cancel
              </Button>
              <Button 
              type="submit"
              className={`shad-button_primary whitespaces-nowrap ${isLoadingUpdate ? 'cursor-not-allowed opacity-50' : ''}`}
              > 
                { isLoadingUpdate ?(
                  <Loader /> ) : `Update User`}
              </Button>
            </div>

          </form>  
        </Form>      

    </div>
    </div>
  )
}

export default UpdateProfile
