import { render } from '@testing-library/react';
import MyApp from '../../pages/_app';
import { AppProps } from 'next/app';
import { Router } from 'next/router';

// Mock next/head
jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    },
  };
});

describe('MyApp', () => {
  it('renders page component', () => {
    const mockPageProps = {};
    const mockComponent = () => <div data-testid="mock-page">Mock Page</div>;
    
    const mockRouter = {
      route: '/',
      pathname: '',
      query: {},
      asPath: '',
      basePath: '',
      isLocaleDomain: false,
      isReady: true,
      push: jest.fn(),
      replace: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    };

    const props = {
      Component: mockComponent,
      pageProps: mockPageProps,
      router: mockRouter as Router,
    } as AppProps;

    const { getByTestId } = render(<MyApp {...props} />);
    expect(getByTestId('mock-page')).toBeInTheDocument();
  });
}); 