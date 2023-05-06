import './App.css'
import { AddItemForm } from './components/AddItemForm'
import { BulkActions } from './components/BulkActions'
import { ContainerSwitcher } from './components/ContainerSwitcher'
import { FilterBar } from './components/FilterBar'
import { ItemTable } from './components/ItemTable'
import { ProgressCard } from './components/ProgressCard'
import { useRadioFable } from './hooks/useRadioFable'

function App() {
  const kiln = useRadioFable()
  if (!kiln.activeLoad) return <main className="app-shell"><p>No episodes yet.</p></main>
  return <main className="app-shell"><header className="topbar"><a className="brand" href="/" aria-label="RadioFable home"><span className="brand-mark">kw</span><span>RadioFable</span></a><ContainerSwitcher loads={kiln.loads} activeId={kiln.activeLoad.id} onChange={kiln.switchLoad} /><div className="topbar-meta"><span className="avatar">AM</span><span>Airing room</span></div></header><section className="hero"><div><p className="kicker">{kiln.activeLoad.studio} <span>·</span> {kiln.activeLoad.city}</p><h1>{kiln.activeLoad.name}</h1><p className="date-line">Airing {new Date(kiln.activeLoad.firingDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} <span>→</span> next show {new Date(kiln.activeLoad.coolDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p></div><div className="hero-orbit" aria-hidden="true"><span>quiet<br />heat</span></div></section><ProgressCard load={kiln.activeLoad} /><FilterBar filters={kiln.filters} onChange={kiln.updateFilters} categoryCounts={kiln.categoryCounts} /><BulkActions selectedCount={kiln.selected.size} onMark={kiln.markSelected} /><ItemTable pieces={kiln.visibleSegments} selected={kiln.selected} totalSelected={kiln.selected.size} onToggle={kiln.toggleSelected} onToggleAll={kiln.toggleAllVisible} /><AddItemForm onAdd={kiln.addSegment} /><div className="sr-only" role="status" aria-live="polite">{kiln.announcement}</div><footer><span>radiofable / a softer way to track the heat</span><span>Autosaved locally</span></footer></main>
}

export default App

