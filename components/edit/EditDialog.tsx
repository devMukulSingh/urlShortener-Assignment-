"use client"
import React, { useState } from 'react'
import { DialogModal } from '../ui/DialogModal'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Url } from '@prisma/client'
import { useRouter } from 'next/navigation'

interface EditDialogProps {
    open: boolean,
    setOpen: (arg0: boolean) => void,
    urlData: {
        id: string;
        nanoId: string;
        clicks: number | null;
        redirectUrl: string;
        userId: string;
        createdAt: string;
        updatedAt: Date;
    }
}

const EditDialog: React.FC<EditDialogProps> = ({
    open,
    setOpen,
    urlData
}) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    type formItems = z.infer<typeof formSchema>;
    const formSchema = z.object({
        redirectUrl: z.string().url({
            message: 'Invalid Url, Enter in the form -> https://example.com'
        }),
    })
    const form = useForm<formItems>({
        defaultValues: {
            redirectUrl: urlData.redirectUrl
        },
        resolver: zodResolver(formSchema)
    });
    const onSubmit = async (data: formItems) => {
        try {
            setLoading(true);
            const res = await axios.put(`api/url/${urlData.userId}`, {
                data: {
                    id: urlData.id,
                    toUpdateUrl: data.redirectUrl,
                    originalUrl: urlData.redirectUrl
                }
            });
            if (res.status === 200) {
                toast.success(`Url updated`);
                router.refresh();
            }
            else {
                toast.error(`Something went wrong`);
            }
        } catch (e) {
            toast.error(`Something went wrong`);
            console.log(`Error in onSubmit ${e}`);
        }
        finally {
            setOpen(false);
            setLoading(false);
        }
    }
    return (
        <main>
            <DialogModal
                open={open}
                setOpen={setOpen}
                title='Edit Urls'
                description=''
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='flex flex-col gap-5'>
                            <FormField
                                name='redirectUrl'
                                control={form.control}
                                /* inside field object
                                {name: 'originalUrl', value: currentValue of field, onChange: ƒ, onBlur: ƒ, ref: ƒ} */
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Edit Url</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}

                            />
                            <Button
                                className='w-28'
                                type='submit'
                                disabled={loading}
                            >
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogModal>
        </main>
    )
}

export default EditDialog