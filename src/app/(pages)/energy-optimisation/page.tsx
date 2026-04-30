import React from 'react';
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Energy Optimisation",
    description: "UGent Sailing Energy Optimisation",
}
import { H2 } from '@/components';
import { EnergyOptimisationForm } from '@/components/workers/energy-optimisation/energy-optimisation-form';



export default async function CrewPage() {
    return (
        <div className="px-6 pt-5">
            <div>
                <H2 className="mb-4">Energy Optimisation</H2>
                <p className="mb-8">
                    Placeholder text
                </p>
            </div>
            <div className="flex items-center justify-center w-full">
                <div className="max-w-250 w-full border border-red-500 rounded-lg p-6">
                    <EnergyOptimisationForm />
                </div>
            </div>
        </div>
    )
};