"use client"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form"
import toast from "react-hot-toast";
import * as  z from "zod";


const SignupPage = () => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const formSchema = z.object({
        name: z.string({
            required_error: 'Name is required',
            invalid_type_error: 'Name must be a string'
        }).min(3,),
        email: z.string({
            required_error: 'Email is required',
            invalid_type_error: 'Please enter valid email'
        }).email(),
        password: z.string().min(6, {
            message: 'Password must be atleast 6 characters long'
        }),
    });

    type formValue = z.infer<typeof formSchema>

    const form = useForm<formValue>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });
    const onSubmit = async (data: formValue) => {
        try {
            setLoading(true);
            const res = await axios.post(`/api/signup`, data);
            const { id } = res.data.user;
            localStorage.setItem('userId', id);
            toast.success('Account created');
            router.push(`/${id}`);

        } catch (e:any) {

            if (e.response.status === 400){
                toast.error(`${e.response.data.error}`);

            }
            else{
                toast.error('Something went wrong, Please try again');
                console.log(`Error in onSubmit ${e}`);
            }
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <main className="flex justify-center mt-10 w-screen ">
            {loading && <Loader className="absolute z-10 transition animate-spin" size={40} />}
            <section className="w-fit border px-5 py-10 space-y-5 ">
                <h1 className="text-2xl font-semibold underline">SignUp</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} >
                        <div className="space-y-5">
                            {/* <FormField>(internally it uses <Controller> component) 
                            is a wrapper component, so that we can use react hook form with external libraries
                        it provides field object, which contains methods, such as onChange,onBlur,value to the child component*/}
                            <FormField
                                name="name"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter name" {...field} autoComplete="off" />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="email"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Email" {...field} autoComplete="off" />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="password"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Enter Password" {...field} autoComplete="off" />
                                        </FormControl>
                                    </FormItem>
                                )}

                            />
                            <footer className="flex mt-10 items-center gap-10">
                                <Button
                                    disabled={loading}
                                    variant="custom">
                                    Signup
                                </Button>
                                <Link href={`/signin`}
                                    className="text-sm underline"
                                >
                                    Already have account? Login
                                </Link>
                            </footer>
                        </div>
                    </form>
                </Form>
            </section>
        </main>
    )
}

export default SignupPage