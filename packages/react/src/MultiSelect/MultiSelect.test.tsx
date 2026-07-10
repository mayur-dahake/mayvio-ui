import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MultiSelect } from './MultiSelect.js';

const OPTIONS = [
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid', disabled: true },
];

describe('MultiSelect Component', () => {
  it('renders the placeholder when no options are selected', () => {
    render(<MultiSelect options={OPTIONS} placeholder="Select frameworks..." />);
    expect(screen.getByText('Select frameworks...')).toBeInTheDocument();
  });

  it('renders selected options as tags', () => {
    render(<MultiSelect options={OPTIONS} value={['react', 'vue']} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Vue')).toBeInTheDocument();
  });

  it('opens menu on click', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={OPTIONS} placeholder="Select..." />);

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    await user.click(screen.getByText('Select...'));

    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByText('Angular')).toBeInTheDocument();
  });

  it('calls onChange when an option is toggled', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<MultiSelect options={OPTIONS} placeholder="Select..." onChange={handleChange} />);

    await user.click(screen.getByText('Select...'));
    await user.click(screen.getByText('Vue'));

    expect(handleChange).toHaveBeenCalledWith(['vue']);
  });

  it('can remove a selected tag', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<MultiSelect options={OPTIONS} value={['react']} onChange={handleChange} />);

    // The tag should have a close button (aria-label="Remove React")
    const removeBtn = screen.getByLabelText('Remove React');
    await user.click(removeBtn);

    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it('disables the component if disabled prop is true', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={OPTIONS} disabled placeholder="Select..." />);

    const trigger = screen.getByText('Select...').parentElement;
    await user.click(trigger!);

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('filters options when searchable is true', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={OPTIONS} searchable placeholder="Select..." />);

    await user.click(screen.getByText('Select...'));

    const searchInput = screen.getByPlaceholderText('Search...');
    await user.type(searchInput, 're');

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.queryByText('Angular')).not.toBeInTheDocument();
  });
});
