import { H4, A } from ".";

type ExtendedPartner ={
    logo: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        filename: string;
        filepath: string;
        mimetype: string;
        size: number;
        width: number | null;
        height: number | null;
        uploadedById: string | null;
    } | null;
    vacancies: {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        url: string;
        description: string | null;
        title: string;
        partnerId: number;
    }[];
} & {
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    active: boolean;
    url: string;
    description: string | null;
    logoId: string | null;
}

export function PartnerCard({ partner }: { partner: ExtendedPartner }) {
    return (
        <div className="w-full flex flex-wrap justify-center border border-red rounded-lg p-2">
            <div className="flex flex-col w-full md:w-1/2 lg:w-3/4 xl:w-8/10">
                <div className="w-full flex flex-wrap">
                    <div className="lg:px-3 flex flex-col w-full lg:w-2/3">
                        <H4>{partner.name}</H4>
                        <p>{partner.description} <A href={partner.url}>Meer info</A></p>
                    </div>
                    <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
                        {
                            partner.vacancies && partner.vacancies.length ? (
                                <>
                                    <H4>Vacancies:</H4>
                                    {
                                        partner.vacancies.map((vacancy, i: number) => (
                                            <A href={vacancy.url} key={i}>
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
                    <a href={partner.url} target="_blank" rel="noopener noreferer">
                        <img className="w-full max-w-75 max-h-25 rounded-md" src={partner.logo?.filepath} alt={`${partner.name} logo`} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PartnerCard;