import React from 'react';
import { render, screen } from '../../../common/utils/testUtils';
import Summary from '@/pages/summary';

describe('Data source', () => {
  it('should match snapshot', async () => {
    const { container } = render(<Summary />);
    expect(container).toMatchSnapshot();
  });

  it('displays returned tasks on successful fetch', async () => {
    const { getByText, getByRole } = render(<Summary />);

    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();

    expect(screen.getByText('Datasources')).toBeInTheDocument();
  });
});
