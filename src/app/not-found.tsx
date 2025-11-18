import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-red-100 to-red-50 flex flex-col items-center justify-center px-6">
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl items-center">
                {/* Image Section */}
                <div className="flex justify-center items-center h-full">
                    <img
                        src="https://tinyurl.com/ugentsailing"
                        alt="Lost at Sea"
                        className="rounded-lg shadow-lg w-full h-70 object-cover"
                    />
                </div>

                {/* Content Section */}
                <div className="text-center lg:text-left">
                    <h1 className="text-7xl font-bold text-red-600 mb-4">404</h1>
                    <h2 className="text-4xl font-bold text-gray-800 mb-6">Lost at Sea! ⛵</h2>
                    <p className="text-xl text-gray-700 mb-4">
                        Looks like we've sailed off course!
                    </p>
                    <p className="text-lg text-gray-600 mb-8 italic">
                        "We tried to navigate to this page, but our compass must be broken.
                        We're not sure if we're coming or going... guess you could say we've
                        <span className="font-bold text-red-600"> lost our way at sea! </span>
                        🧭"
                    </p>
                    <Link
                        href="/"
                        className="inline-block px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold text-lg"
                    >
                        Return to Port
                    </Link>
                </div>
            </div>
        </div>
    );
}
