"use client";

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Copy } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from "zod";

const HomePage = () => {

    const [loading, setLoading] = useState(false);
    const [shortUrl, setShortUrl] = useState('');
    type formItems = z.infer<typeof formSchema>;

    const formSchema = z.object({
        url: z.string().url({
            message:'Enter valid Url',
        }),
    });

    const form = useForm<formItems>({
        defaultValues: {
            url: 'https://'
        },
        resolver: zodResolver(formSchema)
    })

    const onSubmit = async (data: { url: string }) => {
        setLoading(true);
        try {
            // toast.promise()
            const res = await axios.post(`/api/url`, data);
            if (res.status === 201) {
                setShortUrl(res.data);
                toast.success(`Url shorted`);
            }
            else {
                toast.error(`Something went wrong, PLease try again`);
            }
        } catch (e) {
            toast.error(`Something went wrong, PLease try again`);
            console.log(`Error in onSubmit ${e}`);
        }
        finally {
            setLoading(false);
        }
    }
    const handleCopy = () => {
        window.navigator.clipboard.writeText(shortUrl);
        toast.success('Copied to clipboard')
    }
    return (
        <main className='h-[calc(100vh-5rem)] flex flex-col gap-10 items-center justify-center'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='flex flex-col h-[15rem] min-w-[40rem]  gap-5 border py-10 px-5 shadow-lg rounded-md'>
                        <FormField
                            control={form.control}
                            name='url'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter URL to be shorted</FormLabel>
                                    <FormControl>
                                        <Input className='h-14 text-xl' placeholder='https://youtube.com'{...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button
                            className='w-20 self-center'
                            disabled={loading}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </Form>
            {
                shortUrl &&
                <section className='flex gap-5 items-center'>
                    <h1 className='text-underline text-xl font-semibold'>
                        Your shorted Url:
                    </h1>
                    <a
                        href={shortUrl}
                        target='blank'
                    >
                        {shortUrl}
                    </a>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCopy}
                    >
                        <Copy className='' />
                    </Button>
                </section>
            }
        </main>
    )
}

export default HomePage