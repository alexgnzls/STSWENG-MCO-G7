import { useState } from 'react'
import {cx, BTN, TH, TD, peso, INPUT} from '../lib/utils'
import Badge from "../components/Badge.jsx";
import Modal from "../components/Modal.jsx";
import {PayrollRun} from "./PayrollRun.jsx";
import {PERIODS, ROWS, total} from "../lib/mockData.js";

export default function PayrollPage() {
    const [periods, setPeriods] = useState(PERIODS)
    const [activeId, setActiveId] = useState(null)
    const [modal, setModal] = useState(false)
    const [range, setRange] = useState({ start: '', end: '' })

    const setStatus = (id, status) => setPeriods((ps) => ps.map((p) => (p.id === id ? { ...p, status } : p)))
    // STUB: POST /payroll-periods
    const handleCreatePeriod = () => {
        if (!range.start || !range.end || range.end < range.start) return
        setPeriods([{ id: 'PP-' + Date.now().toString().slice(-4), label: `${range.start} to ${range.end}`, status: 'Draft' }, ...periods])
        setRange({ start: '', end: '' })
        setModal(false)
    }
    // STUB: POST /payroll-periods/:id/generate. Server groups completed, payable bookings per aide.
    const handleGeneratePayroll = (id) => setStatus(id, 'Generated')

    const active = periods.find((p) => p.id === activeId)
    if (active) return <PayrollRun period={active} onStatus={(s) => setStatus(active.id, s)} onBack={() => setActiveId(null)} />

    return (
        <>
            <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-ink/60">Group completed services into a period, then generate, review and process.</p>
                <button className={BTN.primary} onClick={() => setModal(true)}>New payroll period</button>
            </div>
            <div className="overflow-x-auto rounded-xl border border-ink/10 bg-white">
                <table className="w-full text-sm">
                    <thead className="border-b border-ink/10"><tr>{['Period', 'Reference', 'Status', 'Aides', 'Net payout', ''].map((h) => <th key={h} className={TH}>{h}</th>)}</tr></thead>
                    <tbody className="divide-y divide-ink/5">
                    {periods.map((p) => (
                        <tr key={p.id}>
                            <td className={cx(TD, 'font-semibold')}>{p.label}</td>
                            <td className={cx(TD, 'text-ink/60')}>{p.id}</td>
                            <td className={TD}><Badge value={p.status} /></td>
                            <td className={TD}>{p.status === 'Draft' ? '-' : ROWS.length}</td>
                            <td className={TD}>{p.status === 'Draft' ? '-' : peso(total('net'))}</td>
                            <td className={cx(TD, 'text-right')}>
                                {p.status === 'Draft'
                                    ? <button className={BTN.dark} onClick={() => handleGeneratePayroll(p.id)}>Generate payroll</button>
                                    : <button className={BTN.ghost} onClick={() => setActiveId(p.id)}>Open</button>}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {modal && (
                <Modal title="New payroll period" onClose={() => setModal(false)}>
                    <div className="grid grid-cols-2 gap-3">
                        <label className="flex flex-col gap-1.5 text-sm font-medium">Start date<input type="date" className={INPUT} value={range.start} onChange={(e) => setRange({ ...range, start: e.target.value })} /></label>
                        <label className="flex flex-col gap-1.5 text-sm font-medium">End date<input type="date" className={INPUT} value={range.end} onChange={(e) => setRange({ ...range, end: e.target.value })} /></label>
                    </div>
                    {range.start && range.end && range.end < range.start && <p className="mt-2 text-sm text-red-700">End date must be on or after the start date.</p>}
                    <div className="mt-5 flex justify-end gap-2">
                        <button className={BTN.ghost} onClick={() => setModal(false)}>Cancel</button>
                        <button className={BTN.primary} onClick={handleCreatePeriod} disabled={!range.start || !range.end || range.end < range.start}>Create period</button>
                    </div>
                </Modal>
            )}
        </>
    )
}