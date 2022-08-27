import React from 'react';
import { render, screen } from '../../../common/utils/testUtils';
import SalesCodes from '@/pages/sales-codes';

describe('Data source', () => {
  it('should match snapshot', async () => {
    const { container } = render(<SalesCodes />);
    expect(container).toMatchSnapshot();
  });

  it('should match element in document', async () => {
    const { getByText, getByRole } = render(<SalesCodes />);

    expect(
      screen.getByRole('button', { name: 'Previous' })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'Add New Row' })
    ).toBeInTheDocument();

    expect(screen.getByRole('textbox', { name: '' })).toBeInTheDocument();

    expect(screen.getByText('Datasources')).toBeInTheDocument();
  });
});
