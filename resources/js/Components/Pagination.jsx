export default function Pagination({ links }) {
    // Check if links is undefined or null
    if (!links || !links.links) {
        return null; // or handle gracefully based on your UI requirements
    }

    return (
        <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{links.from}</span> to{" "}
                <span className="font-medium">{links.to}</span> of{" "}
                <span className="font-medium">{links.total}</span> results
            </div>
            <div className="flex space-x-2">
                {links.links.map((link, index) => (
                    <a
                        key={index}
                        href={link.url || "#"}
                        className={`px-3 py-1 rounded-md ${
                            link.active
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        </div>
    );
}
