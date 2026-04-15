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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef} from "react";
function Register() {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passRef = useRef(null);
    
function resetForm() {
        nameRef.current.value = "";
        emailRef.current.value = "";
        passRef.current.value = "";
    }
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await api.post(`/auth/register`,
                {
                    name: nameRef.current.value,
                    email: emailRef.current.value,
                    password: passRef.current.value,
                }
            );
            alert("Registered successfully ");
            resetForm();
        } catch (err) {
            if (err.response?.status === 409) {
                alert("User already exists");
            } else if (err.response?.status === 400) {
                alert("All fields required");
            } else {
                alert("Something went wrong");
            }
            console.log(err.message);
            resetForm();
        } 
    
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>
                        Create Account to begin your journey
                    </CardDescription>
                    <CardAction>
                        <Button variant="link">Login</Button>
                    </CardAction>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter name"
                                required
                                ref={nameRef}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                ref={emailRef}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                ref={passRef}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button type="submit" className="w-full">
                            Register
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}

export default Register;