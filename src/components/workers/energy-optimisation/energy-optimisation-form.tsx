"use client";

import JobFormFrame from "../base-form";


export async function EnergyOptimisationForm() {
    return <JobFormFrame 
        jobName="Energy Optimisation"
        formTitle="Find optimal energy configurations for your boat"
        formDescription="Here you can create a new Energy Optimisation job. Fill in the required parameters and submit the form to start the optimization process. The calculations may take some time, so please be patient. Once the job is completed, you can view the results and insights to optimize your boat's energy usage."
        getRequestPayload={async () => JSON.stringify({
            "sail_configurations": "abc",
            "example_data": "def"
        })}
    >
        <p></p>
    </JobFormFrame>
}