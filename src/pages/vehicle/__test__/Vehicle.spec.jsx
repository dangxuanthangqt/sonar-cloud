import React from 'react';
import Vehicle from '@/pages/summary/components/Vehicles';
import { render, screen } from '../../../common/utils/testUtils';

describe('Data source', () => {
  it('should match snapshot', async () => {
    const { container } = render(<Vehicle />);
    expect(container).toMatchSnapshot();
  });

  it('should match element in document', async () => {
    const { getByText, getByRole } = render(<Vehicle />);

    expect(
      screen.getByRole('button', { name: 'Data sources' })
    ).toBeInTheDocument();

    expect(screen.getByText('Required')).toBeInTheDocument();

    expect(screen.getByText('Optional')).toBeInTheDocument();

    expect(screen.getByText('Not Applicable')).toBeInTheDocument();
  });
});
