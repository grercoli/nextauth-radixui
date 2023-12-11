"use client"

import { useForm, Controller } from "react-hook-form"
import { signIn } from "next-auth/react"
import { Flex, TextField, Button, Text } from '@radix-ui/themes'
import { EnvelopeClosedIcon, LockClosedIcon } from '@radix-ui/react-icons'
import { useRouter } from "next/navigation"

const SigninForm = () => {
  const router = useRouter()
  const { control, handleSubmit, formState: { errors } } = useForm({
    values: {
      email: "",
      password: ""
    }
  })

  const onSubmit = (handleSubmit(async (data) => {
    // metodo que ya nos permite pasarle las credenciales y hacer la comprobacion de autenticacion
    // primer parametro el nombre del provider definido en api/auth/[...nextauth]
    // segundo parametro son los datos
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password
    })
    
    if (!res?.ok) {
      console.log(res)
    }

    // redirect
    router.push("/dashboard")
  }))

  return (
    <form onSubmit={onSubmit}>
      <Flex direction="column" gap="2">
        <label htmlFor="email">Email</label>
        <TextField.Root>
          <TextField.Slot>
            <EnvelopeClosedIcon width="16" height="16" />
          </TextField.Slot>
          <Controller
            name="email"
            control={control}
            rules={{
              required: {
                message: "Email is required",
                value: true
              }
            }}
            render={({ field }) => (
              <TextField.Input
                type='email'
                placeholder='email@domain.com'
                autoFocus
                {...field}
              />
            )}
          />
        </TextField.Root>

        {errors.email && <Text color="ruby" className="text-xs">{errors.email.message}</Text>}

        <label htmlFor="password">Password</label>
        <TextField.Root>
          <TextField.Slot>
            <LockClosedIcon width="16" height="16" />
          </TextField.Slot>
          <Controller
            name="password"
            control={control}
            rules={{
              required: {
                message: "Password is required",
                value: true
              },
              minLength: {
                message: "Password must be at least 6 characters",
                value: 6
              }
            }}
            render={({ field }) => (
              <TextField.Input
                type='password'
                placeholder='******'
                {...field}
              />
            )}
          />
        </TextField.Root>

        {errors.password && <Text color="ruby" className="text-xs">{errors.password.message}</Text>}

        <Button type="submit" mt="4">Sign In</Button>
      </Flex>
    </form>
  )
}

export default SigninForm
