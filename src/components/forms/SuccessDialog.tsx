import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
const SuccessDialog = ({
  open,
  setOpen,
  message,
  children,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  children: React.ReactNode;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only">success</DialogTitle>
        </DialogHeader>
        <div className="pb-10 flex flex-col items-center">
          <div className="p-5">
            <svg
              width={100}
              height={100}
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 0a50 50 0 1 1 0 100A50 50 0 0 1 50 0m-6.229 59.864L32.664 48.75a4.288 4.288 0 0 0-6.064 6.064l14.143 14.143a4.27 4.27 0 0 0 6.064 0l29.286-29.293a4.287 4.287 0 0 0-4.666-7.007 4.3 4.3 0 0 0-1.391.943z"
                fill="#3E97D1"
              />
            </svg>
          </div>

          <p className="mt-4 mb-10 font-bold text-lg">{message}</p>

          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
