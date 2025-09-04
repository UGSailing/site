import { type Partner, type Vacancy } from "@/data/partners";

import Link from 'next/link';
import { H4 } from ".";

export function PartnerCard({ partner }: { partner: Partner }) {
    return (
        <div className="flex w-full">
            <div className="w-75 h-25 flex-none">
                <img className="max-w-75 max-h-25 rounded-md" src={partner.logo} alt={`${partner.name} logo`} />
            </div>
            <div className="mx-3 w-125 flex-none">
                <H4>{partner.name}</H4>
                <p>{partner.description}</p>
            </div>
            <div className="vacancies">
                {
                    partner.vacancies && partner.vacancies.length ? (
                        <>
                            <h3>Vacancies:</h3>
                            {
                                partner.vacancies.map((vacancy: Vacancy, i: number) => (
                                    <Link 
                                        href={vacancy.link}  
                                        key={i}            
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="block text-blue-500 underline"
                                    >
                                        {vacancy.title}
                                    </Link>
                                ))
                            }
                        </>
                    ) : (
                        <p>Currently no vacancies.</p>
                    )
                }
            </div>
        </div>
    );
};

export default PartnerCard;