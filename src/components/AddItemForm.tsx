import { useState } from 'react'
import type { AddSegmentInput } from '../hooks/useRadioFable'
import type { SegmentCategory } from '../types'

type Props = { onAdd: (piece: AddSegmentInput) => void }

export function AddItemForm({ onAdd }: Props) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState<SegmentCategory>('interview')
  const [priority, setPriority] = useState(false)
  const [notes, setNotes] = useState('')
  const submit = (event: React.FormEvent) => { event.preventDefault(); if (!name.trim()) return; onAdd({ name: name.trim(), category, priority, notes: notes.trim(), aired: false }); setName(''); setNotes(''); setPriority(false) }
  return <form className="add-form" onSubmit={submit}><div><span className="eyebrow">Make room</span><h2>Add a piece</h2><p>Keep the next shelf decision close at hand.</p></div><label>Segment name<input value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Morning tide cup" required /></label><label>Format<select value={category} onChange={(event) => setCategory(event.target.value as SegmentCategory)}><option value="interview">Mug</option><option value="music">Bowl</option><option value="news">Tile</option><option value="story">Vase</option><option value="sponsor">Sculpture</option></select></label><label className="form-notes">Note<input value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="A small reminder for the firing day" /></label><label className="form-check"><input type="checkbox" checked={priority} onChange={(event) => setPriority(event.target.checked)} /> Priority piece</label><button type="submit">Add to load <span>↗</span></button></form>
}

