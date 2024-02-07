"use client"
import { Button } from "@/components/ui/button";
import axios from "axios";
import { LogOut } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const DashboardPage = () => {
    const router = useRouter();
    const handleLogout = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/logout`);
            toast.success(`Logout Successful`);
            router.push(`/signin`);
        } catch (e) {
            toast.error(`Something went wrong, Please try again`);
            console.log(`Error in handleLogout ${e}`);
        }
        finally {
            setLoading(false);
        }
    }
    const [loading, setLoading] = useState(false);
    return (
        <>

            <Button
                variant="destructive"
                disabled={loading}
                onClick={handleLogout}
            >
                <LogOut />
                Logout
            </Button>
        </>
    )
}

export default DashboardPage;