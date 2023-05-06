import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'
import './test/setup'

describe('RadioFable app', () => {
  it('renders the sample load and progressbar', () => { render(<App />); expect(screen.getByRole('heading', { name: 'Signal 07' })).toBeInTheDocument(); expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '40'); expect(screen.getByText('2 of 5 pieces aired')).toBeInTheDocument() })
  it('keeps selection when a status filter hides it', async () => { const user = userEvent.setup(); render(<App />); await user.click(screen.getByRole('checkbox', { name: 'Select Voices from the tram' })); await user.click(screen.getByRole('radio', { name: 'Queued' })); expect(screen.getByText('1 selected (3 visible)')).toBeInTheDocument(); await user.click(screen.getByRole('radio', { name: 'All' })); expect(screen.getByRole('checkbox', { name: 'Select Voices from the tram' })).toBeChecked() })
  it('marks selected segments aired', async () => { const user = userEvent.setup(); render(<App />); await user.click(screen.getByRole('checkbox', { name: 'Select Midnight brass break' })); await user.click(screen.getByRole('button', { name: 'Mark aired' })); expect(screen.getByRole('checkbox', { name: 'Select Midnight brass break' })).not.toBeChecked(); expect(screen.getByText('3 of 5 pieces aired')).toBeInTheDocument() })
  it('adds a new piece row', async () => { const user = userEvent.setup(); render(<App />); await user.type(screen.getByLabelText('Segment name'), 'Dawn cup'); await user.click(screen.getByRole('button', { name: /Add to load/ })); expect(screen.getByText('Dawn cup')).toBeInTheDocument() })
  it('hides non-priority rows with priority-only', async () => { const user = userEvent.setup(); render(<App />); const table = screen.getByRole('table'); expect(within(table).getByText('Midnight brass break')).toBeInTheDocument(); await user.click(screen.getByRole('checkbox', { name: 'Priority only' })); expect(within(table).queryByText('Midnight brass break')).not.toBeInTheDocument(); expect(within(table).getByText('Two-minute city news')).toBeInTheDocument() })
})
