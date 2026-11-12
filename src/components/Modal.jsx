export default function Modal({ title, onClose, children }) {
    return (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/60 p-4" onClick={onClose}>
            <div
                role="dialog"
                aria-label={title}
                className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="mb-4 text-lg font-semibold">{title}</h3>
                {children}
            </div>
        </div>
    );
}