import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, waitFor } from '../../../common/utils/testUtils';
import DataSources from '@/pages/data-sources';

describe('Data source', () => {
  it('should match snapshot', async () => {
    const { container } = render(<DataSources />);
    expect(container).toMatchSnapshot();
  });

  it('displays returned tasks on successful fetch', async () => {
    const { getByText, getByRole } = render(<DataSources />);

    expect(getByRole('button', { name: 'Next' })).toBeInTheDocument();

    expect(getByText('Datasources')).toBeInTheDocument();

    expect(getByText('Keywords')).toBeInTheDocument();

    expect(getByText('Vehicles')).toBeInTheDocument();

    expect(getByText('Sales Codes')).toBeInTheDocument();

    expect(getByText('LOPs Parts')).toBeInTheDocument();

    expect(getByText('Summary')).toBeInTheDocument();

    expect(getByText(/Step 1/)).toBeInTheDocument();

    // await waitFor(() =>
    //   expect(getByText(/Field Reports/i)).toBeInTheDocument()
    // );

    // await waitFor(() => {
    //   selectAllButton = getByRole('button', { name: 'buttons.select_all' });
    //   expect(selectAllButton).toBeInTheDocument();
    // });

    // const firstOption = getByRole('checkbox', {
    //   name: /straight time claim narrative \(stn\)/i,
    // });

    // expect(firstOption).toBeInTheDocument();
    // expect(firstOption).toHaveProperty('checked', false);

    // userEvent.click(selectAllButton);
    // expect(firstOption).toHaveProperty('checked', true);

    // const saveParamsButton = getByRole('button', {
    //   name: 'buttons.save_parameters',
    // });

    // userEvent.click(saveParamsButton);
    // await waitFor(() =>
    //   expect(
    //     getByRole('button', { name: 'buttons.in_progress' })
    //   ).toBeInTheDocument()
    // );

    // expect(saveParamsButton).toBeInTheDocument();
  });
});
