/*
AI generated mock data for Rise Residences customer service and aide management system.
Just for testing purposes, not real data.
 */
export const CASES = [
    { id: 'CS-1042', category: 'Payment issue', status: 'Open', assignee: 'Unassigned', created: 'Nov 10, 9:12 AM',
        resident: 'Maria Santos, Tower 2 Unit 14B', aide: 'Ramon Dela Cruz', property: 'Rise Residences, Makati',
        booking: 'BK-88231, Standard Service', txn: 'TX-55120, ₱1,450.00, Paid',
        description: 'Charged ₱1,450 but quoted ₱950 for a faucet replacement. Materials were not itemized.', notes: [], resolution: '' },
    { id: 'CS-1041', category: 'Incomplete repair', status: 'In Review', assignee: 'Angela Reyes', created: 'Nov 9, 4:40 PM',
        resident: 'John Lim, Tower 1 Unit 8A', aide: 'Jose Manalo', property: 'Rise Residences, Makati',
        booking: 'BK-88177, Major Repair', txn: 'TX-55088, ₱3,200.00, Paid',
        description: 'Aircon still leaks after the visit. Aide left before testing the drain line.',
        notes: [{ by: 'Angela Reyes', at: 'Nov 9, 5:05 PM', text: 'Called resident. Will offer a free revisit.' }], resolution: '' },
    { id: 'CS-1039', category: 'Aide behavior', status: 'In Review', assignee: 'Paolo Cruz', created: 'Nov 8, 11:20 AM',
        resident: 'Karla Tan, Block C Unit 3F', aide: 'Eddie Ramos', property: 'Palm Grove Condos, QC',
        booking: 'BK-88102, Standard Service', txn: 'TX-55031, ₱1,100.00, Paid',
        description: 'Resident reports the aide was rude and arrived 40 minutes late without notice.', notes: [], resolution: '' },
    { id: 'CS-1035', category: 'Booking issue', status: 'Resolved', assignee: 'Angela Reyes', created: 'Nov 6, 2:15 PM',
        resident: 'Ben Ocampo, Tower 3 Unit 21C', aide: 'Ramon Dela Cruz', property: 'Rise Residences, Makati',
        booking: 'BK-88020, Checkup', txn: 'TX-54970, ₱450.00, Paid',
        description: 'Booking was double-charged after rescheduling.',
        notes: [{ by: 'Angela Reyes', at: 'Nov 6, 3:00 PM', text: 'Duplicate confirmed in transaction log.' }],
        resolution: 'Duplicate charge of ₱450.00 refunded. Resident notified.' },
    { id: 'CS-1030', category: 'Property access issue', status: 'Closed', assignee: 'Paolo Cruz', created: 'Nov 3, 8:50 AM',
        resident: 'Liza Go, Block A Unit 5D', aide: 'Jose Manalo', property: 'Palm Grove Condos, QC',
        booking: 'BK-87955, Standard Service', txn: 'TX-54902, ₱0.00, Cancelled',
        description: 'Aide was denied entry at the lobby; the visitor pass was not filed.',
        notes: [], resolution: 'Property office confirmed pass process. Booking rebooked at no charge.' },
]

export const RATE = 0.15 // platform commission
export const AIDES = [
    { id: 'AD-201', name: 'Ramon Dela Cruz', adjustment: -450, adjustmentNote: 'Refund for CS-1035',
        services: [{ booking: 'BK-88001', date: 'Oct 17', type: 'Standard Service', amount: 950 }, { booking: 'BK-88020', date: 'Oct 19', type: 'Checkup', amount: 450 }, { booking: 'BK-88054', date: 'Oct 24', type: 'Major Repair', amount: 2800 }] },
    { id: 'AD-202', name: 'Jose Manalo', adjustment: 200, adjustmentNote: 'Materials reimbursement',
        services: [{ booking: 'BK-88012', date: 'Oct 18', type: 'Standard Service', amount: 1100 }, { booking: 'BK-88061', date: 'Oct 25', type: 'Major Repair', amount: 3400 }] },
    { id: 'AD-203', name: 'Eddie Ramos', adjustment: 0, adjustmentNote: 'None',
        services: [{ booking: 'BK-88033', date: 'Oct 21', type: 'Checkup', amount: 450 }, { booking: 'BK-88079', date: 'Oct 27', type: 'Standard Service', amount: 1200 }, { booking: 'BK-88090', date: 'Oct 30', type: 'Standard Service', amount: 1000 }] },
]
export const EXCLUDED = [
    { booking: 'BK-88231', reason: 'Open complaint CS-1042' },
    { booking: 'BK-88150', reason: 'Cancelled by resident' },
    { booking: 'BK-88177', reason: 'Not marked completed' },
]
// Pre-compute per-aide figures: final payout = gross - commission + adjustment.
export const ROWS = AIDES.map((a) => {
    const gross = a.services.reduce((s, x) => s + x.amount, 0)
    const fee = Math.round(gross * RATE * 100) / 100
    return { ...a, gross, fee, net: gross - fee + a.adjustment }
})
export const total = (k) => ROWS.reduce((s, r) => s + r[k], 0)
export const PERIODS = [
    { id: 'PP-1031', label: 'Oct 16 to Oct 31, 2026', status: 'Generated' },
    { id: 'PP-1030', label: 'Oct 1 to Oct 15, 2026', status: 'Processed' },
    { id: 'PP-1115', label: 'Nov 1 to Nov 15, 2026', status: 'Draft' },
]