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
    import { useState } from "react";
    import { NavLink } from "react-router-dom";
    function Register() {
        const [form, setForm] = useState(
            {
                name: "",
                email: "",
                pass: ""
            }
        )
        function resetForm() {
            setForm(
                {
                    name:"",
                    email:"",
                    pass:""
                }
            )
        }
        async function handleSubmit(e) {
            e.preventDefault();
            try {
                await api.post(`/auth/register`,
                    {
                        name: form.name,
                        email: form.email,
                        password: form.pass
                    }
                );
                alert("Registered successfully ");
                resetForm();
            }
            catch (err) {
                if (err.response?.status === 409) {
                    alert("User already exists");
                } else if (err.response?.status === 400) {
                    alert("All fields required");
                } else {
                    alert("Something went wrong");
                }
                console.log(err);
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
                            <NavLink to='/' variant="link" className='text-primary'>Login</NavLink>
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
                                    value={form.name}
                                    onChange={(e) => { setForm({ ...form, name: e.target.value }) }}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    value={form.email}
                                    onChange={(e) => { setForm({ ...form, email: e.target.value }) }}

                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    placeholder="Enter password"
                                    value={form.pass}
                                    onChange={(e) => { setForm({ ...form, pass: e.target.value }) }}

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