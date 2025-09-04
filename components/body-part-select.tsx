import * as React from "react";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { BODY_PARTS_LABELS, BodyPart } from "@/types/anatomy";

// --- Body parts (ids + human labels) ---
// const BODY_PARTS = [
//     { id: "brain", label: "Brain" },
//     { id: "eyes", label: "Eyes" },
//     { id: "thyroid", label: "Thyroid" },
//     { id: "thymus", label: "Thymus" },
//     { id: "heart", label: "Heart" },
//     { id: "lungs", label: "Lungs" },
//     { id: "liver", label: "Liver" },
//     { id: "stomach", label: "Stomach" },
//     { id: "pancreas", label: "Pancreas" },
//     { id: "spleen", label: "Spleen" },
//     { id: "kidneys", label: "Kidneys" },
//     { id: "appendix", label: "Appendix" },
//     { id: "small-intestine", label: "Small Intestine" },
//     { id: "large-intestine", label: "Large Intestine" },
//     { id: "skeleton", label: "Skeleton" },
//     { id: "skin", label: "Skin" },
// ] as const;

interface BodyPartSelectProps {
    value?: BodyPart | undefined;
    onChange?: (id: BodyPart) => void;
    placeholder?: string;
    className?: string;
}

/**
 * Cyan-styled shadcn/ui dropdown to pick a body part.
 *
 * Example:
 * <BodyPartSelect value={selected} onChange={setSelected} />
 */
export default function BodyPartSelect({
    value,
    onChange,
    placeholder = "Select body part",
    className,
}: BodyPartSelectProps) {
    return (
        <Select
            value={value}
            onValueChange={(val) => onChange?.(val as BodyPart)}>
            <SelectTrigger
                className={cn(
                    "w-fit rounded-2xl border px-4 py-6 text-base shadow-sm",
                    // Cyan-focused styling
                    "border-cyan-300/70 hover:border-cyan-400 focus:border-cyan-500",
                    "focus:ring-2 focus:ring-cyan-500/60",
                    "data-[state=open]:ring-2 data-[state=open]:ring-cyan-500/60",
                    className
                )}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent
                className={cn(
                    "rounded-2xl border bg-white shadow-lg",
                    "border-cyan-200/70 ring-1 ring-cyan-100/70",
                    "dark:bg-neutral-900"
                )}>
                {Object.entries(BODY_PARTS_LABELS).map(([part, label]) => (
                    <SelectItem
                        key={part}
                        value={part}
                        className={cn(
                            "cursor-pointer text-base",
                            "focus:bg-cyan-50 focus:text-cyan-900",
                            "data-[state=checked]:bg-cyan-100 data-[state=checked]:text-cyan-900"
                        )}>
                        {label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

// Optional: export the list for reuse (e.g., to render legends)
export const BODY_PART_OPTIONS = BODY_PARTS_LABELS;
