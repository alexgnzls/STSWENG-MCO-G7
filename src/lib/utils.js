/*
peso is a utility function that formats a number as Philippine Peso currency,
adding the peso sign (₱) and formatting the number with commas and two decimal places.
 */
export const peso = (n) => '₱' + n.toLocaleString('en-PH', { minimumFractionDigits: 2 })

/*
signed is a utility function that formats a number with a sign (+ or −) and converts it to Philippine Peso format.
 */
export const signed = (n) => (n < 0 ? '−' : n > 0 ? '+' : '') + peso(Math.abs(n))

/*
cx is a utility function that combines multiple class names into a single string, filtering out any falsy values.
It is useful for conditionally applying classes in React components.
 */
export const cx = (...c) => c.filter(Boolean).join(' ')

/*
Color of badges and labels for different statuses.
 */
export const BADGE = {
    Open: 'bg-sky-100 text-blue-700',
    'In Review': 'bg-amber-100 text-amber-800',
    Resolved: 'bg-emerald-100 text-emerald-700',
    Closed: 'bg-slate-200 text-slate-600',
    Draft: 'bg-slate-200 text-slate-600',
    Generated: 'bg-sky-100 text-sky-700',
    Reviewed: 'bg-amber-100 text-amber-800',
    Processed: 'bg-emerald-100 text-emerald-700',
    Pending: 'bg-amber-100 text-amber-800',
}

/*
Button styles for different button types. Use BTN.primary, BTN.dark, or BTN.ghost to apply the corresponding styles.
 */
export const BTN = {
    primary: 'rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-ink hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40',
    dark: 'rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-cream hover:bg-ink/85 disabled:cursor-not-allowed disabled:opacity-40',
    ghost: 'rounded-lg border border-ink/15 bg-white px-3 py-1.5 text-sm font-medium hover:bg-ink/5 disabled:cursor-not-allowed disabled:opacity-40',
}

/*
Input and table cell styles for consistent spacing and appearance.
 */
export const INPUT = 'w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40'

/*
TH and TD are utility classes for table header and table data cells,
respectively, providing consistent padding, text alignment, font size, and color.
 */
export const TH = 'px-4 py-2.5 text-left text-xs font-medium text-ink/50'
export const TD = 'px-4 py-3'