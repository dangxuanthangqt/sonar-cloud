import { cleanup, render, screen } from '@testing-library/react';
import withProviderTesting from 'HOCs/withProviderTesting';
import renderer from 'react-test-renderer';
import React from 'react';
import TopBar from '@/components/main-layout/TopBar';

afterEach(cleanup);

const TopBarWithProvider = withProviderTesting(TopBar);

describe('render top bar', () => {
  it('snapshot', async () => {
    const component = renderer.create(<TopBarWithProvider />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Check header app name', async () => {
    render(<TopBarWithProvider />);

    expect(screen.getByText(/Request management/i)).toBeInTheDocument();
  });
});
