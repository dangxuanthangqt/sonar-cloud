import React from 'react';
import { render, screen } from '../../../common/utils/testUtils';
import Dates from '@/pages/dates';

describe('Data source', () => {
  it('should match snapshot', async () => {
    const { container } = render(<Dates />);
    expect(container).toMatchSnapshot();
  });

  it('should match element in document', async () => {
    const { getByText, getByRole } = render(<Dates />);

    expect(
      screen.getByRole('button', { name: 'Data sources' })
    ).toBeInTheDocument();

    expect(screen.getByText('Required')).toBeInTheDocument();

    expect(screen.getByText('Optional')).toBeInTheDocument();

    expect(screen.getByText('Not Applicable')).toBeInTheDocument();
  });
});
