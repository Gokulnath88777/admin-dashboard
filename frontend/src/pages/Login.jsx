import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/context/AuthProvider";
import { useContext, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function Login() {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const emailRef = useRef(null)
  const passRef = useRef(null)
  async function handleSubmit(e) {

    e.preventDefault()

    const user = {
      email: emailRef.current?.value,
      password: passRef.current?.value
    }

    try {
      const res = await api.post(`/auth/login`, user,
        {
          withCredentials: true
        }
      )
      login(res.data.user)
      const role = res.data.user.role;
      if (role === 'admin') {

        navigate('/admin')
      }
      else {
        console.log("user")
        navigate('/user')
      }
    }
    catch (err) {
      console.log(err)
      if (err.status === 400) {
        toast.error("Invalid Credentials")
      }

    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Login to your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col gap-3">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                ref={emailRef}
                className="border-1 rounded-xl p-2 "
              />
            </div>
            <div className="grid gap-2 ">
              <Label htmlFor="password">Password</Label>
              <input
                id="password"
                type="password"
                required
                ref={passRef}
                placeholder="Enter password"
                className="border-1 rounded-xl p-2 "
              />
            </div>
            <span className="text-center mb-2">Don't have an account ? <NavLink to='/register' className='text-primary'>Register</NavLink></span>
          </CardContent>
          <CardFooter className="flex-col bg-none gap-2">
            <Button type="submit" className="w-full">
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default Login


