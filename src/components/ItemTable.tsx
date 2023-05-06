import type { Segment } from '../types'

type Props = { pieces: Segment[]; selected: Set<string>; totalSelected: number; onToggle: (id: string) => void; onToggleAll: () => void }

export function ItemTable({ pieces, selected, totalSelected, onToggle, onToggleAll }: Props) {
  const allVisibleSelected = pieces.length > 0 && pieces.every((piece) => selected.has(piece.id))
  return <section className="table-card" aria-labelledby="pieces-heading">
    <div className="table-head"><div><span className="eyebrow">The rundown</span><h2 id="pieces-heading">Segments in this episode</h2></div><span className="selection-note">{totalSelected} selected ({pieces.length} visible)</span></div>
    <div className="table-scroll"><table><thead><tr><th scope="col"><input type="checkbox" aria-label="Select all visible pieces" checked={allVisibleSelected} onChange={onToggleAll} /></th><th scope="col">Segment</th><th scope="col">Format</th><th scope="col">Cue note</th><th scope="col">Status</th></tr></thead><tbody>{pieces.map((piece) => <tr key={piece.id} className={selected.has(piece.id) ? 'is-selected' : ''}><td><input type="checkbox" aria-label={'Select ' + piece.name} checked={selected.has(piece.id)} onChange={() => onToggle(piece.id)} /></td><td><div className="piece-name"><strong>{piece.name}</strong><span>Segment {String(piece.number).padStart(2, '0')}</span></div></td><td><span className="format-pill">{piece.category}</span></td><td className="notes">{piece.notes}</td><td><span className={'status ' + (piece.aired ? 'status-aired' : 'status-queued')}>{piece.aired ? 'Fired' : 'Queued'}</span>{piece.priority && <span className="priority-label">Priority</span>}</td></tr>)}</tbody></table>{pieces.length === 0 && <div className="empty-state"><span>☼</span><h3>No pieces in this view</h3><p>Try another filter, or add a new piece below.</p></div>}</div>
  </section>
}

