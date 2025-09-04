"use client";
import BodyPartSelect from "@/components/body-part-select";
import { HumanAnatomyOrgans } from "@/components/human-anatomy-organs";
import { BodyPart } from "@/types/anatomy";
import { useState } from "react";

export default function App() {
    const [selected, setSelected] = useState<BodyPart | undefined>();
    return (
        <div className="flex flex-wrap gap-4 justify-center items-center">
            <BodyPartSelect value={selected} onChange={setSelected} />
            <HumanAnatomyOrgans
                bodyPart={selected}
                className="max-h-[98dvh] max-w-[98%]"
            />
        </div>
    );
}
