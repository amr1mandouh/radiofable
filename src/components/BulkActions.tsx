type Props = { selectedCount: number; onMark: (aired: boolean) => void }

export function BulkActions({ selectedCount, onMark }: Props) {
  return <div className="bulk-actions"><span><strong>{selectedCount}</strong> selected</span><button type="button" onClick={() => onMark(true)} disabled={!selectedCount}>Mark aired</button><button type="button" className="quiet-button" onClick={() => onMark(false)} disabled={!selectedCount}>Move to queue</button></div>
}

