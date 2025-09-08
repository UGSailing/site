import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { type Generation } from "@/data/generation";
import { Button } from "./ui/button";
import Link from "next/link";

export function GenerationCard({ generation }: { generation: Generation }) {
    const grey = !generation.dateLaunch;
    return (
        <div className="w-full h-full grid grid-flow-col py-1 justify-items-center">
            <Card className={`w-full max-w-sm ${grey ? "border-gray-500 opacity-70" : "border-red-500"}`}>
                <CardHeader>
                    <CardTitle className={`${grey ? "text-black" : "text-red-700"} text-lg`}>
                        { generation.name }
                    </CardTitle>
                    <CardDescription>
                        <span className="icon-[bi--tools]"></span>{ generation.year } {
                            generation.dateLaunch && (
                                <>
                                    - 
                                    <span className="icon-[material-symbols--anchor-rounded]"></span> 
                                    { generation.dateLaunch }
                                </>
                            )
                        }
                    </CardDescription>
                    <CardAction>
                        {
                            generation.link ? (
                                <Link href={generation.link}>
                                    <Button variant="secondary" size="sm" className={`mt-2 cursor-pointer ${grey ? "bg-black" : "bg-red-500"} text-white hover:bg-red-600`}>
                                        More info
                                    </Button>
                                </Link>
                            ) : (
                                <Button variant="secondary" size="sm" className={`mt-2 ${grey ? "cursor-not-allowed" : "cursor-pointer"} ${grey ? "bg-black" : "bg-red-500"} text-white hover:bg-red-600`} disabled>
                                    No info
                                </Button>
                            )
                        }
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <img src={generation.image} alt={generation.name + " image"} className={`mb-4 rounded-md ${grey ? "grayscale" : ""}`} />
                </CardContent>
            </Card>
        </div>
    );
};