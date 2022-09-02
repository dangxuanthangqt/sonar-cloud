import React from 'react';
import { render, screen } from '../../../common/utils/testUtils';
import SalesCodes from '@/pages/sales-codes';
import LOPParts from '@/pages/summary/components/LOPParts';

describe('Data source', () => {
  it('should match snapshot', async () => {
    const { container } = render(<LOPParts />);
    expect(container).toMatchSnapshot();
  });

  it('should match element in document', async () => {
    const { getByText, getByRole } = render(<LOPParts />);

    expect(
      screen.getByRole('button', { name: 'Data sources' })
    ).toBeInTheDocument();

    expect(screen.getByText('Required')).toBeInTheDocument();

    expect(screen.getByText('Optional')).toBeInTheDocument();

    expect(screen.getByText('Not Applicable')).toBeInTheDocument();
  });
});
