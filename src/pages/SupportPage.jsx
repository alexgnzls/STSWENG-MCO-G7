import {useState} from "react";
import { CASES } from '../lib/mockData';
import Metric from '../components/Metric';
import Badge from '../components/Badge';
import {cx, TD, TH} from '../lib/utils';
import CaseDrawer from "./CaseDrawer.jsx";

export default function SupportPage() {
    const [cases, setCases] = useState(CASES)
    const [filter, setFilter] = useState('All')
    const [openId, setOpenId] = useState(null)
    const STATUSES = ['Open', 'In Review', 'Resolved', 'Closed']

    const patchCase = (id, patch) => setCases((cs) => cs.map((c) => (c.id === id ? { ...c, ...patch } : c)))
    const shown = filter === 'All' ? cases : cases.filter((c) => c.status === filter)
    const selected = cases.find((c) => c.id === openId)

    return (
        <>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {STATUSES.map((s) => <Metric key={s} label={s} value={cases.filter((c) => c.status === s).length} />)}
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-ink/10 bg-white">
                <div className="flex gap-1 border-b border-ink/10 p-2" role="tablist">
                    {['All', ...STATUSES].map((s) => (
                        <button key={s} role="tab" aria-selected={filter === s} onClick={() => setFilter(s)}
                                className={cx('rounded-lg px-3 py-1.5 text-sm font-medium', filter === s ? 'bg-ink text-cream' : 'text-ink/60 hover:bg-ink/5')}>
                            {s}
                        </button>
                    ))}
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="border-b border-ink/10">
                        <tr>{['Case', 'Resident', 'Category', 'Booking', 'Status', 'Assigned to', 'Received'].map((h) => <th key={h} className={TH}>{h}</th>)}</tr>
                        </thead>
                        <tbody className="divide-y divide-ink/5">
                        {shown.map((c) => (
                            <tr key={c.id} tabIndex={0} onClick={() => setOpenId(c.id)} onKeyDown={(e) => e.key === 'Enter' && setOpenId(c.id)}
                                className="cursor-pointer hover:bg-brand/10">
                                <td className={cx(TD, 'font-semibold')}>{c.id}</td>
                                <td className={TD}>{c.resident.split(',')[0]}</td>
                                <td className={TD}>{c.category}</td>
                                <td className={TD}>{c.booking.split(',')[0]}</td>
                                <td className={TD}><Badge value={c.status} /></td>
                                <td className={cx(TD, c.assignee === 'Unassigned' && 'text-ink/40')}>{c.assignee}</td>
                                <td className={cx(TD, 'text-ink/60')}>{c.created}</td>
                            </tr>
                        ))}
                        {!shown.length && <tr><td colSpan={7} className="px-4 py-10 text-center text-ink/50">No {filter.toLowerCase()} cases right now.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>

            {selected && <CaseDrawer key={selected.id} c={selected} onPatch={patchCase} onClose={() => setOpenId(null)} />}
        </>
    )
}