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

const tracks: [string, string][] = [
	["AI_Figure_8", "Some yapping from Sander"],
	["AI_Slalom", "Some yapping from Sander"],
	["AI_Docking", "Some yapping from Sander"],
	["AI_Sprint", "Some yapping from Sander"],
]

const batteries: [string, string][] = [
	["High-Drain_NMC_Molicel_P42A", "Some yapping from Sander"],
	["Lithium_Titanate_Yinlong_LTO", "Some yapping from Sander"],
	["High-Power_LFP_A123", "Some yapping from Sander"],
]

const engines: [string, string][] = [
	["Marine_Diesel_Turbocharged", "Some yapping from Sander"],
	["Racing_Gasoline_Methanol", "Some yapping from Sander"],
	["Hydrogen_PEM_Fuel_Cell", "Some yapping from Sander"],
]


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
        	{
        		tracks.map(([track, description]) => {
        			const track_id = track.toLowerCase().replace(/[\s_]/g, "-")
        			const list_item_id = `li-${track_id}`
        			const title = track.replace(/_/g, " ")
        			return (
		    			<li id={list_item_id} key={list_item_id}>
		    				<CheckboxWithNumber checkboxId={track_id} title={title} description={description} inputProps={{"type": "number", "value": "0"}} />
		    			</li>
        			)
        		})
        	}
        </ul>
        <H4 className="text-red-500">
        	Choose your candidate batteries.
        </H4>
        <i>
        	Text yapping from Sander
        </i>
        <ul id="batteries">
        	{
        		batteries.map(([battery, description]) => {
        			const battery_id = battery.toLowerCase().replace(/[\s_]/g, "-")
        			const list_item_id = `li-${battery_id}`
        			const title = battery.replace(/_/g, " ")
        			return (
		    			<li id={list_item_id} key={list_item_id}>
		    				<FancyCheckbox checkboxId={battery_id} title={title} description={description}/>
		    			</li>
        			)
        		})
        	}
        </ul>
        
        <H4 className="text-red-500">
        	Choose your candidate engines.
        </H4>
        <i>
        	Text yapping from Sander
        </i>
        <ul id="engines">
        	{
        		engines.map(([engine, description]) => {
        			const engine_id = engine.toLowerCase().replace(/[\s_]/g, "-")
        			const list_item_id = `li-${engine_id}`
        			const title = engine.replace(/_/g, " ")
        			return (
		    			<li id={list_item_id} key={list_item_id}>
		    				<FancyCheckbox checkboxId={engine_id} title={title} description={description}/>
		    			</li>
        			)
        		})
        	}
        </ul>
        
    </JobFormFrame>
}








