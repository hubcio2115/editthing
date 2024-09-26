import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";

import { Input } from "../ui/input";
import { useTranslation } from "~/app/i18n/client";
import type { SupportedLanguages } from "~/app/i18n/settings";

type AlertModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  unlockString?: string;
  onCancel: () => void;
  onConfirm: () => void;
  lang: SupportedLanguages;
};

export default function AlertModal({
  isOpen,
  onOpenChange,
  title,
  description,
  unlockString,
  onCancel,
  onConfirm,
  lang,
}: AlertModalProps) {
  const [inputValue, setInputValue] = useState("");
  const { t } = useTranslation(lang, "translation", {
    keyPrefix: "alert_modal",
  });

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

        {unlockString !== undefined && (
          <Input
            className="w-fit"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        )}

        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              onCancel(), setInputValue("");
            }}
          >
            {t("cancel_button")}
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={isActionDisabled}
            onClick={() => {
              onConfirm(), setInputValue("");
            }}
          >
            {t("confirm_button")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
