"use client"

import { useActionState } from "react"
import { registerUser } from "../actions/users"

const initialState = {
  errors: {} as {
    username?: string
    password?: string
    passwordConfirm?: string
  },
}

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, initialState)

  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input type="text" name="username" required />
          </label>
          {state.errors.username && (
            <p data-testid="username-error" style={{ color: "red" }}>
              {state.errors.username}
            </p>
          )}
        </div>
        <div>
          <label>
            Name
            <input type="text" name="name" required />
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" required />
          </label>
          {state.errors.password && (
            <p data-testid="password-error" style={{ color: "red" }}>
              {state.errors.password}
            </p>
          )}
        </div>
        <div>
          <label>
            Confirm Password
            <input type="password" name="passwordConfirm" required />
          </label>
          {state.errors.passwordConfirm && (
            <p data-testid="passwordConfirm-error" style={{ color: "red" }}>
              {state.errors.passwordConfirm}
            </p>
          )}
        </div>
        <button type="submit" data-testid="register-button">
          Register
        </button>
      </form>
    </div>
  )
}
