import React from 'react';
import Vehicle from '@/pages/summary/components/Vehicles';
import { render, screen } from '../../../common/utils/testUtils';
import Keywords from '@/pages/keywords';

describe('Data source', () => {
  it('should match snapshot', async () => {
    const { container } = render(<Keywords />);
    expect(container).toMatchSnapshot();
  });

  it('should match element in document', async () => {
    const { getByText, getByRole } = render(<Keywords />);

    expect(
      screen.getByRole('button', { name: 'Data sources' })
    ).toBeInTheDocument();

    expect(screen.getByText('Required')).toBeInTheDocument();

    expect(screen.getByText('Optional')).toBeInTheDocument();

    expect(screen.getByText('Not Applicable')).toBeInTheDocument();
  });
});
