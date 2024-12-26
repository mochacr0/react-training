type PanelContainerProps = {
    name: string;
    index: number;
    onRemoveItem: (index: number) => void;
    children: React.ReactElement;
};

const PanelContainer = ({ name, index, onRemoveItem, children }: PanelContainerProps) => {
    return (
        <fieldset key={index} className="relative mb-6 rounded-lg border border-gray-200 p-6 shadow-md">
            <legend className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-1 text-sm font-medium">
                <span className="capitalize">{name}</span> {`#${index + 1}`}
                <button
                    type="button"
                    onClick={() => onRemoveItem(index)}
                    className="rounded-full p-1 text-red-500 transition-colors hover:bg-red-100 hover:text-red-700"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
            </legend>
            {children}
        </fieldset>
    );
};

export default PanelContainer;
