import { Copy, Delete, Edit, Menu } from "lucide-react"
import { Urls } from "./Columns"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./dropdown-menu"
import toast from "react-hot-toast"
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation";
import  EditDialog from "@/components/edit/EditDialog";


interface RowActionProps {
    data: Urls
}

const RowActions: React.FC<RowActionProps> = ({
    data
}) => {
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);

    const handleCopy = () => {
        window.navigator.clipboard.writeText(data.shortenedUrl);
        toast.success('Url Copied to Clipboard');
    }
    const handleDelete = async () => {
        try {
            const res = await axios.delete(`/api/${data.nanoId}`, {
                params: { urlId: data.id },
            });
            toast.success('Deleted');
            router.refresh();
        } catch (e) {
            toast.error(`Error in handleDelete ${e}`);
            console.log(`Error in handleDelete ${e}`);
        }

    }
    return (
        <main>
            { open && <EditDialog open={open} setOpen={setOpen} urlData={data} />}
            <DropdownMenu>
                <DropdownMenuTrigger><Menu /></DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Select Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => {setOpen(true) }}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleCopy}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDelete}>
                        <Delete className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
        </main>
    )
}

export default RowActions