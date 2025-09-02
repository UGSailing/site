
function NextButton({ nextEvent }: { nextEvent?: (e: any) => void }) {
    return (
        <div onClick={ nextEvent } className="w-30 h-full absolute top-1/2 right-0 transform -translate-y-1/2 z-12 hover:opacity-100 transition-opacity opacity-20 duration-300 cursor-pointer">
            <div className="bg-white w-full h-full opacity-20"></div>
            <div className="bg-white w-12 h-12 absolute top-1/2 right-4 rounded-full">
                <span className="icon-[bi--arrow-right-circle-fill] w-12 h-12 bg-red-500"></span>
            </div>
        </div>
    )
}

function PreviousButton({ previousEvent }: { previousEvent?: (e: any) => void }) {
    return (
        <div onClick={ previousEvent } className="w-30 h-full absolute top-1/2 left-0 transform -translate-y-1/2 z-12 hover:opacity-100 transition-opacity opacity-20 duration-300 cursor-pointer">
            <div className="bg-white w-full h-full opacity-20"></div>
            <div className="bg-white w-12 h-12 absolute top-1/2 left-4 rounded-full">
                <span className="icon-[bi--arrow-left-circle-fill] w-12 h-12 bg-red-500"></span>
            </div>
        </div>
    )
}

export { PreviousButton, NextButton };