import type { KilnLoad } from '../types'

const STORAGE_KEY = 'radiofable.loads'

export function sampleKilnLoads(): KilnLoad[] {
  return [
    {
      id: 'load-amber', name: 'Signal 07', studio: 'Mosaic FM', city: 'Alexandria', firingDate: '2026-08-21', coolDate: '2026-08-23',
      pieces: [
        { id: 'amber-01', name: 'Voices from the tram', category: 'interview', number: 1, aired: true, priority: true, notes: 'Celadon rim; handle needs a gentle shelf.' },
        { id: 'amber-02', name: 'Midnight brass break', category: 'music', number: 2, aired: false, priority: false, notes: 'Oxide wash on the outside.' },
        { id: 'amber-03', name: 'Two-minute city news', category: 'news', number: 3, aired: false, priority: true, notes: 'Commission set, keep together.' },
        { id: 'amber-04', name: 'The story behind the street', category: 'story', number: 4, aired: false, priority: false, notes: 'Leave space around the neck.' },
        { id: 'amber-05', name: 'Neighbor spotlight', category: 'sponsor', number: 5, aired: true, priority: false, notes: 'Photograph before packing.' }
      ]
    },
    {
      id: 'load-cinder', name: 'Afterglow 08', studio: 'Night Window', city: 'Cairo', firingDate: '2026-08-28', coolDate: '2026-08-30',
      pieces: [
        { id: 'cinder-01', name: 'Ash handle tumbler', category: 'interview', number: 1, aired: false, priority: true, notes: 'Test glaze A7.' },
        { id: 'cinder-02', name: 'Salt pocket music', category: 'music', number: 2, aired: false, priority: false, notes: 'Place on a cookie.' },
        { id: 'cinder-03', name: 'Night market story', category: 'story', number: 3, aired: false, priority: false, notes: 'Tall shelf only.' }
      ]
    }
  ]
}

export function loadKilnLoads(): KilnLoad[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return sampleKilnLoads()
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) throw new Error('Invalid kiln data')
    return parsed as KilnLoad[]
  } catch {
    return sampleKilnLoads()
  }
}

export function saveKilnLoads(loads: KilnLoad[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(loads))
}

