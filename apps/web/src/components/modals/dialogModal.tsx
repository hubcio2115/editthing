import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

import { Button } from "../ui/button";

type DialogModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  footerText: string;
  onSubmit: () => void;
};

export default function DialogModal({
  isOpen,
  onOpenChange,
  title,
  children,
  footerText,
  onSubmit,
}: DialogModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          {children}
          <DialogFooter>
            <Button type="submit">{footerText}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
