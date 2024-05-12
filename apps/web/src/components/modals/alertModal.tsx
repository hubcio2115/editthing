import { type FunctionComponent, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";

import { Input } from "../ui/input";

type AlertModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  unlockString?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function AlertModal({
  isOpen,
  onOpenChange,
  title,
  description,
  unlockString,
  onCancel,
  onConfirm,
}: AlertModalProps) {
  const [inputValue, setInputValue] = useState("");

  const isActionDisabled =
    unlockString !== undefined && unlockString !== inputValue;

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="pr-10">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {unlockString !== undefined && (
            <Input
              className="w-fit"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          )}
          <AlertDialogCancel
            onClick={() => {
              onCancel(), setInputValue("");
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isActionDisabled}
            onClick={() => {
              onConfirm(), setInputValue("");
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
