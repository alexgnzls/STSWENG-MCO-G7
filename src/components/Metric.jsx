import { cx } from '../lib/utils';

export default function Metric({ label, value, hint }) {
    // Determine the color based directly on the label name
    // Special emphasis on "Open" and "In Review" statuses, others default to a neutral style
    const styles = {
        'Open': 'bg-brand text-ink border-brand shadow-sm',
        'In Review': 'bg-ink text-white border-ink shadow-sm'
    };

    const appliedStyles = styles[label] || 'bg-white text-ink border-ink/10';

    return (
        <div className={cx("rounded-xl border p-4", appliedStyles)}>
            {/* Switched to generic opacities so they adjust to light/dark backgrounds */}
            <p className="text-sm opacity-70">{label}</p>
            <p className="mt-1 text-2xl font-semibold">{value}</p>
            {hint && <p className="mt-0.5 text-xs opacity-60">{hint}</p>}
        </div>
    );
}