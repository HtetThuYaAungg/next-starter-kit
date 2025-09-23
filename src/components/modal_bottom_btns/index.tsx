import {
  Eraser,
  Gavel,
  ListRestart,
  Loader,
  PlusCircle,
  SquarePen,
} from "lucide-react";
import { Button } from "../ui/button";
import { UseFormReturn } from "react-hook-form";

interface BottomBtnsProps {
  formId: string;
  editedData?: boolean;
  isPending?: boolean;
  form: UseFormReturn<any>;
  handleReset?: () => void;
  isDisabled?: boolean;
  confirmText?: string;
  isRollover?: boolean;
}

const BottomBtns = ({
  editedData,
  isPending,
  isDisabled,
  formId,
  form,
  handleReset,
  confirmText,
  isRollover,
}: BottomBtnsProps) => {
  return (
    <div className="flex w-full items-center justify-end space-x-2">
      <Button
        type="button"
        onClick={handleReset ? handleReset : () => form.reset()}
        variant={"secondary"}
      >
        {editedData ? <ListRestart /> : isRollover ? <Eraser /> : <Eraser />}
        {editedData ? "Reset" : isRollover ? "Reset" : "Cancel"}
      </Button>
      <Button
        type="submit"
        size={"sm"}
        form={formId}
        disabled={isPending || isDisabled}
      >
        {isPending ? (
          <Loader />
        ) : (
          <>
            {editedData ? (
              <SquarePen />
            ) : isRollover ? (
              <Gavel />
            ) : (
              <PlusCircle />
            )}
          </>
        )}
        {confirmText ||
          (editedData ? "Update" : isRollover ? "Rollover" : "Create")}
      </Button>
    </div>
  );
};

export default BottomBtns;
