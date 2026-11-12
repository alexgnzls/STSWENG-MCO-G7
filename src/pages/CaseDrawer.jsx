import { useState } from 'react'
import {cx, BTN, INPUT} from '../lib/utils'
import Badge from "../components/Badge.jsx";

/**
 * Case drawer. One scroll: linked records (D04) > complaint > notes (D05) > resolution (D07).
 * The footer action follows the state machine Open > In Review > Resolved > Closed.
 */

export default function CaseDrawer({ c, onPatch, onClose }) {
    const [note, setNote] = useState('')
    const [resolution, setResolution] = useState(c.resolution)

    // STUBS: each would PATCH /support-cases/:id
    /*
        Add note: append to notes array
        - PATCH /support-cases/:id { notes: [...c.notes, { by: 'You', at: 'Just now', text: note.trim() }] }
     */
    const handleAddNote = () => {
        if (!note.trim()) return
        onPatch(c.id, { notes: [...c.notes, { by: 'You', at: 'Just now', text: note.trim() }] })
        setNote('')
    }

    /*
        Start review: Open -> In Review, assign to self if unassigned
        - PATCH /support-cases/:id { status: 'In Review', assignee: 'You' }
     */
    const startReview = () => onPatch(c.id, { status: 'In Review', assignee: c.assignee === 'Unassigned' ? 'You' : c.assignee })

    /*
        Resolve ticket: In Review -> Resolved, requires resolution text
        - PATCH /support-cases/:id { status: 'Resolved', resolution: '...' }
     */
    const resolveTicket = () => resolution.trim() && onPatch(c.id, { status: 'Resolved', resolution: resolution.trim() })

    /*
        Close ticket: Resolved -> Closed
        - PATCH /support-cases/:id { status: 'Closed' }
     */
    const closeTicket = () => onPatch(c.id, { status: 'Closed' })

    const links = [['Resident', c.resident], ['Aide', c.aide], ['Booking', c.booking], ['Property', c.property], ['Transaction', c.txn]]

    return (
        <div className="fixed inset-0 z-40 flex justify-end bg-ink/40" onClick={onClose}>
            <aside className="flex h-full w-full max-w-lg flex-col bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <header className="flex items-start justify-between border-b border-ink/10 p-5">
                    <div>
                        <div className="flex items-center gap-2"><h2 className="text-lg font-semibold">{c.id}</h2><Badge value={c.status} /></div>
                        <p className="mt-0.5 text-sm text-ink/60">{c.category}, assigned to {c.assignee}</p>
                    </div>
                    <button onClick={onClose} aria-label="Close case panel" className={BTN.ghost}>Close</button>
                </header>

                <div className="flex-1 space-y-6 overflow-y-auto p-5">
                    <section>
                        <h3 className="mb-2 text-sm font-semibold">Linked records</h3>
                        <dl className="divide-y divide-ink/5 rounded-lg border border-ink/10 text-sm">
                            {links.map(([k, v]) => (
                                <div key={k} className="flex justify-between gap-4 px-3 py-2"><dt className="text-ink/50">{k}</dt><dd className="text-right font-medium">{v}</dd></div>
                            ))}
                        </dl>
                    </section>

                    <section>
                        <h3 className="mb-2 text-sm font-semibold">Complaint</h3>
                        <p className="rounded-lg bg-cream p-3 text-sm leading-relaxed">{c.description}</p>
                    </section>

                    <section>
                        <h3 className="mb-2 text-sm font-semibold">Notes and responses</h3>
                        <ul className="space-y-2">
                            {c.notes.map((n, i) => (
                                <li key={i} className="rounded-lg border border-ink/10 p-3 text-sm">
                                    <p>{n.text}</p><p className="mt-1 text-xs text-ink/50">{n.by}, {n.at}</p>
                                </li>
                            ))}
                            {!c.notes.length && <li className="text-sm text-ink/50">No notes yet. Record every call or message so the history is complete.</li>}
                        </ul>
                        {c.status !== 'Closed' && (
                            <div className="mt-3 flex gap-2">
                                <input className={INPUT} value={note} placeholder="Add a note or response" onChange={(e) => setNote(e.target.value)} />
                                <button className={BTN.dark} onClick={handleAddNote} disabled={!note.trim()}>Add note</button>
                            </div>
                        )}
                    </section>

                    {c.status !== 'Open' && (
                        <section>
                            <h3 className="mb-2 text-sm font-semibold">Resolution</h3>
                            <textarea rows={3} className={INPUT} value={resolution} disabled={c.status !== 'In Review'}
                                      placeholder="Describe how the issue was resolved" onChange={(e) => setResolution(e.target.value)} />
                        </section>
                    )}
                </div>

                <footer className="border-t border-ink/10 p-4">
                    {c.status === 'Open' && <button className={cx(BTN.primary, 'w-full')} onClick={startReview}>Start review</button>}
                    {c.status === 'In Review' && <button className={cx(BTN.primary, 'w-full')} onClick={resolveTicket} disabled={!resolution.trim()}>Resolve case</button>}
                    {c.status === 'Resolved' && <button className={cx(BTN.dark, 'w-full')} onClick={closeTicket}>Close case</button>}
                    {c.status === 'Closed' && <p className="text-center text-sm text-ink/50">This case is closed and kept in the support history.</p>}
                </footer>
            </aside>
        </div>
    )
}