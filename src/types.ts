export type SegmentCategory = 'interview' | 'music' | 'news' | 'story' | 'sponsor'

export type Segment = {
  id: string
  name: string
  category: SegmentCategory
  number: number
  aired: boolean
  priority: boolean
  notes: string
}

export type KilnLoad = {
  id: string
  name: string
  studio: string
  city: string
  firingDate: string
  coolDate: string
  pieces: Segment[]
}

export type Filters = {
  query: string
  category: SegmentCategory | 'all'
  status: 'all' | 'aired' | 'queued'
  priorityOnly: boolean
}

