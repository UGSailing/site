"use client";

import React, { useState } from "react";
import { H4 } from "@/components";
import { Checkbox } from "@/components/ui/checkbox";
import { 
	FieldLabel, 
	Field, 
	FieldContent, 
	FieldTitle, 
	FieldDescription 
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import JobFormFrame from "../base-form";

function FancyCheckbox({
	title, 
	description,
	checkboxId
}: {
	title: string; 
	description?: string;
	checkboxId?: string
}) {
	return <FieldLabel>
        <Field orientation="horizontal">
            <Checkbox id={checkboxId || "checkbox"} />
		    <FieldContent>
				<FieldTitle>{title}</FieldTitle>
				{description ? (
				    <FieldDescription>
				    	{description}
				    </FieldDescription>
				) : null}
		    </FieldContent>
        </Field>
    </FieldLabel>
}

function CheckboxWithNumber({
    title,
    description,
    checkboxId,
    inputProps,
}: {
    title: string;
    description?: string;
    checkboxId?: string;
    inputProps: React.ComponentProps<"input">;
}) {
    const [enabled, setEnabled] = useState(Boolean(false));
    inputProps.disabled = ! enabled;

    return (
		<FieldLabel className="w-full">
		    <div className="flex items-center justify-between gap-4 p-3 border rounded-md w-full">
				<div className="flex items-start gap-3 flex-1">
				    <Checkbox
						id={checkboxId ?? "checkbox"}
						checked={enabled}
						onCheckedChange={(c) => setEnabled(Boolean(c))}
				    />
				    <FieldContent className="p-0">
						<FieldTitle>{title}</FieldTitle>
						{description ? (
						    <FieldDescription>
						    	{description}
						    </FieldDescription>
						) : null}
				    </FieldContent>
				</div>

				<div className="h-8 w-px bg-border mx-3" />

				<div className="w-1/2">
				    <Input {...inputProps} />
				</div>
        	</div>
    	</FieldLabel>
    );
}


export function EnergyOptimisationForm() {
    return <JobFormFrame 
        jobName="Energy Optimisation"
        formTitle="Find optimal energy configurations for your boat"
        formDescription="Here you can create a new Energy Optimisation job. Fill in the required parameters and submit the form to start the optimization process. The calculations may take some time, so please be patient. Once the job is completed, you can view the results and insights to optimize your boat's energy usage."
        getRequestPayload={async () => JSON.stringify({
            "sail_configurations": "abc",
            "example_data": "def"
        })}
    >
        <H4 className="text-red-500">
        	Select the tracks and choose the number of battery recharges.
        </H4>
        <i>
        	Text yapping from Sander
        </i>
        <ul>
        	<CheckboxWithNumber id="AI_Figure_8" checkboxId="ai-figure-8" title="AI Figure 8" description="Some yapping from Sander" inputProps={{"type": "number"}} />
        	<CheckboxWithNumber id="AI_Slalom" checkboxId="ai-slalom" title="AI Slalom" description="Some yapping from Sander" inputProps={{"type": "number"}} />
        	<CheckboxWithNumber id="AI_Docking" checkboxId="ai-docking" title="AI Docking" description="Some yapping from Sander" inputProps={{"type": "number"}} />
        	<CheckboxWithNumber id="AI_Sprint" checkboxId="ai-sprint" title="AI Sprint" description="Some yapping from Sander" inputProps={{"type": "number"}} />
        </ul>
        <H4 className="text-red-500">
        	Choose your candidate batteries.
        </H4>
        <i>
        	Text yapping from Sander
        </i>
        <ul id="batteries">
        	<FancyCheckbox id="High-Drain_NMC_Molicel_P42A" checkboxId="high-drain-nmc-molicel-p42a" title="High-Drain NMC Molicel P42A" description="Some yapping from Sander" />
        	<FancyCheckbox id="Lithium_Titanate_Yinlong_LTO" checkboxId="lithium-titanate-yinlong-lto" title="Lithium Titanate Yinlong LTO" description="Some yapping from Sander" />
        	<FancyCheckbox id="High-Power_LFP_A123" checkboxId="high-power-lfp-a123" title="High-Power LFP A123" description="Some yapping from Sander" />
        </ul>
        
        <H4 className="text-red-500">
        	Choose your candidate engines.
        </H4>
        <i>
        	Text yapping from Sander
        </i>
        <ul id="engines">
        	<FancyCheckbox id="Marine_Diesel_Turbocharged" checkboxId="marine-diesel-turbocharged" title="Marine Diesel Turbocharged" description="Some yapping from Sander" />
        	<FancyCheckbox id="Racing_Gasoline_Methanol" checkboxId="racing-gasoline-methanol" title="Racing Gasoline Methanol" description="Some yapping from Sander" />
        	<FancyCheckbox id="Hydrogen_PEM_Fuel_Cell" checkboxId="hydrogen-pem-fuel-cell" title="Hydrogen PEM Fuel Cell" description="Some yapping from Sander" />
        </ul>
        
    </JobFormFrame>
}








