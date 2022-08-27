import React from 'react';
import {
  getByRole,
  render,
  screen,
  waitFor,
} from '../../../common/utils/testUtils';
import HorizontalLinearStepper from '../index';

describe('Horizontal stepper', () => {
  it('should match snapshot', async () => {
    const { container } = render(<HorizontalLinearStepper />);
    expect(container).toMatchSnapshot();
  });
  it('should match element in document', async () => {
    render(<HorizontalLinearStepper />);

    expect(screen.getByRole('button', { name: '' })).toBeInTheDocument();

    expect(screen.getByText('Previous')).toBeInTheDocument();

    expect(screen.getByText('Datasources')).toBeInTheDocument();

    expect(screen.getByText('Keywords')).toBeInTheDocument();

    expect(screen.getByText('Vehicles')).toBeInTheDocument();

    expect(screen.getByText('Sales Codes')).toBeInTheDocument();

    expect(screen.getByText('LOPs Parts')).toBeInTheDocument();

    expect(screen.getByText('Summary')).toBeInTheDocument();
  });
});
