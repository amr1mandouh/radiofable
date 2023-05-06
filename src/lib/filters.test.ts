import { describe, expect, it } from 'vitest'
import { filterSegments, firingProgress } from './filters'
import type { Filters, Segment } from '../types'

const pieces: Segment[] = [
  { id: 'a', name: 'Blue Mug', category: 'interview', number: 1, aired: true, priority: true, notes: 'gloss' },
  { id: 'b', name: 'Quiet Bowl', category: 'music', number: 2, aired: false, priority: false, notes: 'matte' }
]
const base: Filters = { query: '', category: 'all', status: 'all', priorityOnly: false }

describe('filterSegments', () => {
  it('returns all pieces by default', () => { expect(filterSegments(pieces, base)).toHaveLength(2); expect(firingProgress(pieces).percent).toBe(50) })
  it('matches name and notes', () => expect(filterSegments(pieces, { ...base, query: 'MATTE' })[0].id).toBe('b'))
  it('filters by category', () => expect(filterSegments(pieces, { ...base, category: 'interview' })[0].id).toBe('a'))
  it('filters aired status', () => expect(filterSegments(pieces, { ...base, status: 'aired' })[0].id).toBe('a'))
  it('filters queued status', () => expect(filterSegments(pieces, { ...base, status: 'queued' })[0].id).toBe('b'))
  it('filters priority only', () => expect(filterSegments(pieces, { ...base, priorityOnly: true })[0].id).toBe('a'))
})
