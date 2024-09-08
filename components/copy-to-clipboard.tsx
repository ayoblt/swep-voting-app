'use client'

import {Button} from "@/components/ui/button";
import {CopyIcon} from "@radix-ui/react-icons";
import {toast} from "sonner";

const CopyToClipboard = ({textToCopy}: {textToCopy: string}) => {

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.info("Copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy to clipboard!");
    }
  };

  return (
      <span onClick={copyToClipboard} className="cursor-pointer p-2"><CopyIcon /></span>
  );
};

export default CopyToClipboard;
