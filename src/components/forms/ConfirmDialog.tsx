import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ConfirmDialog = ({
  open,
  setOpen,
  message,
  children,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: { title: string; description: string };
  children: React.ReactNode;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only">success</DialogTitle>
        </DialogHeader>
        <div className="pb-10 flex flex-col items-center">
          <div className="">
            <svg
              width={110}
              height={110}
              viewBox="0 0 110 110"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#a)">
                <path
                  d="M108.804 90.564 62.643 10.612c-3.398-5.885-11.887-5.887-15.286 0L1.197 90.564c-3.398 5.885.845 13.238 7.642 13.238h92.322c6.795 0 11.041-7.35 7.643-13.238m-49.76-7.842a4.044 4.044 0 0 1-8.087 0v-2.415a4.044 4.044 0 0 1 8.087 0zm0-15.755a4.044 4.044 0 0 1-8.087 0v-23.18a4.044 4.044 0 0 1 8.087 0z"
                  fill="#E31D1C"
                />
              </g>
              <defs>
                <clipPath id="a">
                  <path fill="#fff" d="M0 0h110v110H0z" />
                </clipPath>
              </defs>
            </svg>
          </div>

          <div className="mt-10 mb-10 space-y-1 text-center">
            <p className="font-bold text-lg">{message.title}</p>
            <p className="text-sm text-text-normal">{message.description}</p>
          </div>

          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
