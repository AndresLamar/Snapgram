import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate  } from 'react-router-dom'

import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from '@/components/ui/use-toast'

import { Button } from "@/components/ui/button";
import { signupValidation } from "@/lib/validation";
import { z } from 'zod'
import Loader from "@/components/shared/Loader";
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"

function SignUpForm() {
  const { toast } = useToast()
  const { checkAuthUser } = useUserContext()
  const navigate = useNavigate()

  const { mutateAsync: createUserAccount, isPending: isCreatingUser } = useCreateUserAccount()

  const { mutateAsync: signInAccount } = useSignInAccount()

  async function onSubmit(values: z.infer<typeof signupValidation>){

    const newUser = await createUserAccount(values)    

    
    if (!newUser){
      return toast({
        title: 'Sign up failed. Please try again.'
      })
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password
    })    
    

    if (!session){
      return toast({
        title: 'Sign in failed. Please try again.'
      })
    }

    localStorage.setItem('cookieFallback', session.token)
    localStorage.setItem('userId', session.id)

    const isLoggedIn = await checkAuthUser()

    if(isLoggedIn) {
      form.reset()

      navigate('/')
    } else {
      return toast({title: 'Sign up failed. Please try again.'})
    }
  }
  
  // 1. Define your form.j
  const form = useForm<z.infer<typeof signupValidation>>({
    resolver: zodResolver(signupValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: ''
    },
  })
 

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use snapgram, Please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            {isCreatingUser ? (
              <div className="flex-center gap-2 cursor-not-allowed">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>

          <p className='text-small regular text-light-2 text-center mt-2'>
            Already have an account?
            <Link to='/sign-in' className="text-primary-500 text-small-semibold ml-1">Log in</Link>
          </p>

        </form>
      </div>
    </Form>
  )
}

export default SignUpForm