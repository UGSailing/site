import { type Partner, type Vacancy } from "@/data/partners";

import { H4, A } from ".";

export function PartnerCard({ partner }: { partner: Partner }) {
    return (
        <div className="w-full flex flex-wrap justify-center border border-red rounded-lg p-2">
            <div className="flex flex-col w-full md:w-1/2 lg:w-3/4 xl:w-8/10">
                <div className="w-full flex flex-wrap">
                    <div className="lg:px-3 flex flex-col w-full lg:w-2/3">
                        <H4>{partner.name}</H4>
                        <p>{partner.description} <A href={partner.link}>Meer info</A></p>
                    </div>
                    <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
                        {
                            partner.vacancies && partner.vacancies.length ? (
                                <>
                                    <H4>Vacancies:</H4>
                                    {
                                        partner.vacancies.map((vacancy: Vacancy, i: number) => (
                                            <A href={vacancy.link} key={i}>
                                                {vacancy.title}
                                            </A>
                                        ))
                                    }
                                </>
                            ) : (
                                <>
                                    <H4>Vacancies:</H4>
                                    <p>Currently no vacancies.</p>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="px-3 h-25 flex flex-col items-center w-full md:w-1/2 lg:w-1/4 xl:w-1/5">
                <div className="grid h-full w-full place-items-center">
                    <a href={partner.link} target="_blank" rel="noopener noreferer">
                        <img className="w-full max-w-75 max-h-25 rounded-md" src={partner.logo} alt={`${partner.name} logo`} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PartnerCard;