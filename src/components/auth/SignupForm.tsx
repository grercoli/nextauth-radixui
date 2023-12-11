"use client"

import { Flex, TextField, Button } from '@radix-ui/themes'
import { EnvelopeClosedIcon, LockClosedIcon, PersonIcon } from '@radix-ui/react-icons'

const SignupForm = () => {
  return (
    <Flex direction="column" gap="2">
      <label htmlFor="name">Name</label>
      <TextField.Root>
        <TextField.Slot>
          <PersonIcon width="16" height="16" />
        </TextField.Slot>
        <TextField.Input
          type='text'
          placeholder='Write your name'
        />
      </TextField.Root>

      <label htmlFor="email">Email</label>
      <TextField.Root>
        <TextField.Slot>
          <EnvelopeClosedIcon width="16" height="16" />
        </TextField.Slot>
        <TextField.Input
          type='email'
          placeholder='email@domain.com'
        />
      </TextField.Root>

      <label htmlFor="password">Password</label>
      <TextField.Root>
        <TextField.Slot>
          <LockClosedIcon width="16" height="16" />
        </TextField.Slot>
        <TextField.Input
          type='password'
          placeholder='******'
        />
      </TextField.Root>

      <Button>Sign Up</Button>
    </Flex>
  )
}

export default SignupForm
