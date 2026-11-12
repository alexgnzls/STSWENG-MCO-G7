import { useState } from 'react'
import {cx, BTN, TH, TD, peso, signed} from '../lib/utils'
import Badge from "../components/Badge.jsx";
import {EXCLUDED, ROWS, total} from "../lib/mockData.js";
import Metric from "../components/Metric.jsx";


/**
 * Payroll run. Reading order: totals (D14) > per-aide breakdown (D11, D12) > exclusions (D13).
 * Payouts can be marked processed only after review; processed rows lock so they never re-enter a run (D15).
 */
export function PayrollRun({ period, onStatus, onBack }) {
    const [payouts, setPayouts] = useState(() => Object.fromEntries(ROWS.map((r) => [r.id, period.status === 'Processed' ? 'Processed' : 'Pending'])))
    const [expanded, setExpanded] = useState(null)
    const [verified, setVerified] = useState(false)

    // STUBS: would POST to /payroll-periods/:id/review, /process and /payouts/:id/process
    const handleMarkReviewed = () => onStatus('Reviewed')
    const handleMarkPayoutProcessed = (id) => setPayouts((p) => ({ ...p, [id]: 'Processed' }))
    const handleProcessPayroll = () => {
        setPayouts(Object.fromEntries(ROWS.map((r) => [r.id, 'Processed'])))
        onStatus('Processed')
    }

    return (
        <>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <button className={BTN.ghost} onClick={onBack}>Back to periods</button>
                    <h2 className="text-lg font-semibold">{period.label}</h2>
                    <Badge value={period.status} />
                </div>
                <div className="flex items-center gap-3">
                    {period.status === 'Generated' && (
                        <>
                            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={verified} onChange={(e) => setVerified(e.target.checked)} className="size-4 accent-brand" />I checked the totals</label>
                            <button className={BTN.primary} disabled={!verified} onClick={handleMarkReviewed}>Mark as reviewed</button>
                        </>
                    )}
                    {period.status === 'Reviewed' && <button className={BTN.primary} onClick={handleProcessPayroll}>Process payroll</button>}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
                <Metric label="Gross services" value={peso(total('gross'))} />
                <Metric label="Commission (15%)" value={'−' + peso(total('fee'))} />
                <Metric label="Adjustments" value={signed(total('adjustment'))} />
                <Metric label="Net payout" value={peso(total('net'))} />
                <Metric label="Aides paid" value={ROWS.length} hint={`${Object.values(payouts).filter((s) => s === 'Processed').length} processed`} />
            </div>

            <div className="mt-6 overflow-x-auto rounded-xl border border-ink/10 bg-white">
                <table className="w-full text-sm">
                    <thead className="border-b border-ink/10">
                    <tr>{['Aide', 'Services', 'Gross', 'Commission', 'Adjustment', 'Final payout', 'Payout', ''].map((h) => <th key={h} className={TH}>{h}</th>)}</tr>
                    </thead>
                    <tbody className="divide-y divide-ink/5">
                    {ROWS.map((r) => (
                        <PayrollRows key={r.id} r={r} open={expanded === r.id} onToggle={() => setExpanded(expanded === r.id ? null : r.id)}
                                     status={payouts[r.id]} canProcess={period.status === 'Reviewed'} onProcess={() => handleMarkPayoutProcessed(r.id)} />
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 rounded-xl border border-ink/10 bg-white p-4">
                <h3 className="text-sm font-semibold">Excluded from this run</h3>
                <p className="mb-3 text-sm text-ink/60">Only completed, payable bookings are paid. These were left out:</p>
                <ul className="divide-y divide-ink/5 text-sm">
                    {EXCLUDED.map((x) => <li key={x.booking} className="flex justify-between py-2"><span className="font-medium">{x.booking}</span><span className="text-ink/60">{x.reason}</span></li>)}
                </ul>
            </div>
        </>
    )
}

/** One aide: summary row plus an expandable list of the completed bookings that make up the gross. */
export function PayrollRows({ r, open, onToggle, status, canProcess, onProcess }) {
    return (
        <>
            <tr>
                <td className={cx(TD, 'font-semibold')}>{r.name}</td>
                <td className={TD}><button className="underline decoration-brand decoration-2 underline-offset-4" onClick={onToggle} aria-expanded={open}>{r.services.length} bookings</button></td>
                <td className={TD}>{peso(r.gross)}</td>
                <td className={TD}>{'−' + peso(r.fee)}</td>
                <td className={TD} title={r.adjustmentNote}>{signed(r.adjustment)}</td>
                <td className={cx(TD, 'font-semibold')}>{peso(r.net)}</td>
                <td className={TD}><Badge value={status} /></td>
                <td className={cx(TD, 'text-right')}>
                    {status === 'Pending' && <button className={BTN.ghost} disabled={!canProcess} onClick={onProcess} title={canProcess ? '' : 'Review the payroll period first'}>Mark processed</button>}
                    {status === 'Processed' && <span className="text-xs text-ink/50">Locked</span>}
                </td>
            </tr>
            {open && (
                <tr className="bg-cream">
                    <td colSpan={8} className="px-4 py-3">
                        <table className="w-full text-sm">
                            <tbody>
                            {r.services.map((s) => (
                                <tr key={s.booking}><td className="py-1 font-medium">{s.booking}</td><td className="py-1 text-ink/60">{s.date}</td><td className="py-1">{s.type}</td><td className="py-1 text-right">{peso(s.amount)}</td></tr>
                            ))}
                            <tr><td colSpan={4} className="pt-2 text-xs text-ink/50">Adjustment: {r.adjustmentNote}</td></tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            )}
        </>
    )
}