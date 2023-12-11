"use client"

import { Flex, TextField, Button } from '@radix-ui/themes'
import { EnvelopeClosedIcon, LockClosedIcon } from '@radix-ui/react-icons'

const SigninForm = () => {
  return (
    <Flex direction="column" gap="2">
      <label htmlFor="email">Email</label>
      <TextField.Root>
        <TextField.Slot>
          <EnvelopeClosedIcon width="16" height="16" />
        </TextField.Slot>
        <TextField.Input
          type='email'
          placeholder='email@domain.com'
          autoFocus
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

      <Button>Sign In</Button>
    </Flex>
  )
}

export default SigninForm
