import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface DialogModalProps {
  open: boolean,
  setOpen: (arg0:boolean) => void,
  description: string,
  title: string,
  children: React.ReactNode
}

export const DialogModal: React.FC<DialogModalProps> = ({
  open,
  setOpen,
  description,
  title,
  children
}) => {
  const onChange = () => {
    if(open) setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={onChange} >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}

