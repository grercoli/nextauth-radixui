"use client"

import axios from "axios"
import { useForm, Controller } from "react-hook-form"
import { Flex, TextField, Button, Text } from '@radix-ui/themes'
import { EnvelopeClosedIcon, LockClosedIcon, PersonIcon } from '@radix-ui/react-icons'
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

const SignupForm = () => {
  const router = useRouter()
  const { control, handleSubmit, formState: { errors } } = useForm({
    values: {
      name: "",
      email: "",
      password: ""
    }
  })

  const onSubmit = (handleSubmit(async (data) => {
    const respuesta = await axios.post("/api/auth/register", data)

    // el status 201 es el que defini en api/auth/register y 201 significa que se creo un dato
    if (respuesta.status === 201) {
      const result = await signIn("credentials", {
        email: respuesta.data.email,
        password: data.password,
        redirect: false
      })

      if (!result?.ok) console.log(result?.error)

      router.push("/dashboard")
    }
  }))

  return (
    <form onSubmit={onSubmit}>
      <Flex direction="column" gap="2">
        <label htmlFor="name">Name</label>
        <TextField.Root>
          <TextField.Slot>
            <PersonIcon width="16" height="16" />
          </TextField.Slot>
          <Controller
            name="name"
            control={control}
            rules={{
              required: {
                message: "Name is required",
                value: true
              }
            }}
            render={({ field }) => (
              <TextField.Input
                type='text'
                placeholder='Write your name'
                autoFocus
                {...field}
              />
            )}
          />
        </TextField.Root>

        {errors.name && <Text color="ruby" className="text-xs">{errors.name.message}</Text>}

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

        <Button type="submit" mt="4" variant="solid" color="blue">Sign Up</Button>
      </Flex>
    </form>
  )
}

export default SignupForm
