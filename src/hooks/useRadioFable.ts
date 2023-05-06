import { useCallback, useEffect, useMemo, useState } from 'react'
import { filterSegments } from '../lib/filters'
import { createId } from '../lib/id'
import { loadKilnLoads, saveKilnLoads } from '../lib/storage'
import type { Filters, KilnLoad, Segment, SegmentCategory } from '../types'

const defaultFilters: Filters = { query: '', category: 'all', status: 'all', priorityOnly: false }

export function useRadioFable() {
  const [loads, setLoads] = useState<KilnLoad[]>(loadKilnLoads)
  const [activeLoadId, setActiveLoadId] = useState('load-amber')
  const [filters, setFilters] = useState<Filters>(defaultFilters)
  const [selected, setSelected] = useState<Set<string>>(() => new Set())
  const [announcement, setAnnouncement] = useState('')

  const activeLoad = useMemo(() => loads.find((load) => load.id === activeLoadId) ?? loads[0], [activeLoadId, loads])
  const visibleSegments = useMemo(() => filterSegments(activeLoad?.pieces ?? [], filters), [activeLoad, filters])

  useEffect(() => saveKilnLoads(loads), [loads])

  const switchLoad = useCallback((id: string) => {
    setActiveLoadId(id)
    setFilters(defaultFilters)
    setSelected(new Set())
    setAnnouncement('Episode changed and filters reset.')
  }, [])

  const updateFilters = useCallback((next: Partial<Filters>) => setFilters((current) => ({ ...current, ...next })), [])

  const toggleSelected = useCallback((id: string) => {
    setSelected((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const toggleAllVisible = useCallback(() => {
    setSelected((current) => {
      const next = new Set(current)
      const allVisibleSelected = visibleSegments.length > 0 && visibleSegments.every((piece) => next.has(piece.id))
      visibleSegments.forEach((piece) => allVisibleSelected ? next.delete(piece.id) : next.add(piece.id))
      return next
    })
  }, [visibleSegments])

  const markSelected = useCallback((aired: boolean) => {
    setLoads((current) => current.map((load) => load.id !== activeLoad?.id ? load : ({ ...load, pieces: load.pieces.map((piece) => selected.has(piece.id) ? { ...piece, aired } : piece) })))
    setAnnouncement(selected.size + ' selected segment' + (selected.size === 1 ? '' : 's') + ' marked ' + (aired ? 'aired' : 'queued') + '.')
    setSelected(new Set())
  }, [activeLoad?.id, selected])

  const addSegment = useCallback((piece: Omit<Segment, 'id' | 'number'>) => {
    setLoads((current) => current.map((load) => load.id !== activeLoad?.id ? load : ({ ...load, pieces: [...load.pieces, { ...piece, id: createId(), number: load.pieces.length + 1 }] })))
    setAnnouncement(piece.name + ' added to the episode.')
  }, [activeLoad?.id])

  const categoryCounts = useMemo(() => activeLoad?.pieces.reduce<Record<string, number>>((counts, piece) => ({ ...counts, [piece.category]: (counts[piece.category] ?? 0) + 1 }), {}) ?? {}, [activeLoad])

  return { loads, activeLoad, filters, visibleSegments, selected, announcement, categoryCounts, switchLoad, updateFilters, toggleSelected, toggleAllVisible, markSelected, addSegment }
}

export type RadioFableState = ReturnType<typeof useRadioFable>
export type AddSegmentInput = Omit<Segment, 'id' | 'number'>
export type Category = SegmentCategory

