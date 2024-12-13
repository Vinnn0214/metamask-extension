import React from 'react';
import type { Store } from '@reduxjs/toolkit';
import { screen } from '@testing-library/react';
import { TransactionType } from '@metamask/transaction-controller';
import { ConfirmContext } from '../../context/confirm';
import type { Confirmation, SignatureRequestType } from '../../types/confirm';
import { renderWithProvider } from '../../../../../test/jest/rendering';
import configureStore from '../../../../store/store';
import { AlertTypes } from '../../../../../shared/constants/alerts';
import { setAlertEnabledness } from '../../../../store/actions';
import { SmartTransactionsBannerAlert } from './smart-transactions-banner-alert';

type TestConfirmContextValue = {
  currentConfirmation: Confirmation;
  isScrollToBottomCompleted: boolean;
  setIsScrollToBottomCompleted: (isScrollToBottomCompleted: boolean) => void;
};

jest.mock('../../../../hooks/useI18nContext', () => ({
  useI18nContext: () => (key: string) => key,
  __esModule: true,
  default: () => (key: string) => key,
}));

jest.mock('../../../../store/actions', () => ({
  setAlertEnabledness: jest.fn(() => ({ type: 'mock-action' })),
}));

const renderWithConfirmContext = (
  component: React.ReactElement,
  store: Store,
  confirmationValue: TestConfirmContextValue = {
    currentConfirmation: {
      type: TransactionType.simpleSend,
      id: '1', // Required by SignatureRequestType
    } as SignatureRequestType,
    isScrollToBottomCompleted: true,
    setIsScrollToBottomCompleted: () => undefined,
  },
) => {
  return renderWithProvider(
    <ConfirmContext.Provider value={confirmationValue}>
      {component}
    </ConfirmContext.Provider>,
    store,
  );
};

describe('SmartTransactionsBannerAlert', () => {
  const mockState = {
    metamask: {
      alertEnabledness: {
        [AlertTypes.smartTransactionsMigration]: true,
      },
      preferences: {
        smartTransactionsOptInStatus: true,
      },
    },
  };

  it('renders banner when alert is enabled and STX is opted in', () => {
    const store = configureStore(mockState);
    renderWithProvider(<SmartTransactionsBannerAlert />, store);

    expect(
      screen.getByTestId('smart-transactions-banner-alert'),
    ).toBeInTheDocument();
    expect(screen.getByText('smartTransactionsEnabled')).toBeInTheDocument();
    expect(screen.getByText('learnMore')).toBeInTheDocument();
  });

  it('does not render when alert is disabled', () => {
    const disabledState = {
      metamask: {
        alertEnabledness: {
          [AlertTypes.smartTransactionsMigration]: false,
        },
        preferences: {
          smartTransactionsOptInStatus: true,
        },
      },
    };
    const store = configureStore(disabledState);
    renderWithProvider(<SmartTransactionsBannerAlert />, store);

    expect(
      screen.queryByTestId('smart-transactions-banner-alert'),
    ).not.toBeInTheDocument();
  });

  it('does not render when STX is not opted in', () => {
    const notOptedInState = {
      metamask: {
        alertEnabledness: {
          [AlertTypes.smartTransactionsMigration]: true,
        },
        preferences: {
          smartTransactionsOptInStatus: false,
        },
      },
    };
    const store = configureStore(notOptedInState);
    renderWithProvider(<SmartTransactionsBannerAlert />, store);

    expect(
      screen.queryByTestId('smart-transactions-banner-alert'),
    ).not.toBeInTheDocument();
  });

  it('calls setAlertEnabledness when close button clicked', () => {
    const store = configureStore(mockState);
    renderWithProvider(<SmartTransactionsBannerAlert />, store);

    screen.getByRole('button', { name: /close/iu }).click();

    expect(setAlertEnabledness).toHaveBeenCalledWith(
      AlertTypes.smartTransactionsMigration,
      false,
    );
  });

  it('calls setAlertEnabledness when learn more link clicked', () => {
    const store = configureStore(mockState);
    renderWithProvider(<SmartTransactionsBannerAlert />, store);

    screen.getByText('learnMore').click();

    expect(setAlertEnabledness).toHaveBeenCalledWith(
      AlertTypes.smartTransactionsMigration,
      false,
    );
  });

  it('renders banner when inside ConfirmContext with supported transaction type', () => {
    const store = configureStore(mockState);
    renderWithConfirmContext(<SmartTransactionsBannerAlert />, store);

    expect(
      screen.getByTestId('smart-transactions-banner-alert'),
    ).toBeInTheDocument();
    expect(screen.getByText('smartTransactionsEnabled')).toBeInTheDocument();
  });

  it('does not render banner for unsupported transaction types', () => {
    const store = configureStore(mockState);
    const unsupportedConfirmation: TestConfirmContextValue = {
      currentConfirmation: {
        type: TransactionType.signTypedData, // Using an unsupported type
        id: '2',
      } as SignatureRequestType,
      isScrollToBottomCompleted: true,
      setIsScrollToBottomCompleted: () => undefined,
    };

    renderWithConfirmContext(
      <SmartTransactionsBannerAlert />,
      store,
      unsupportedConfirmation,
    );

    expect(
      screen.queryByTestId('smart-transactions-banner-alert'),
    ).not.toBeInTheDocument();
  });

  describe('margin style tests', () => {
    const store = configureStore(mockState);

    it('applies no styles with default margin type', () => {
      renderWithConfirmContext(<SmartTransactionsBannerAlert />, store);
      const alert = screen.getByTestId('smart-transactions-banner-alert');
      expect(alert).not.toHaveStyle({ margin: 0 });
      expect(alert).not.toHaveStyle({ marginTop: 0 });
    });

    it('applies zero margin when marginType is "none"', () => {
      renderWithConfirmContext(
        <SmartTransactionsBannerAlert marginType="none" />,
        store,
      );
      const alert = screen.getByTestId('smart-transactions-banner-alert');
      expect(alert).toHaveStyle({ margin: 0 });
    });

    it('applies zero top margin when marginType is "noTop"', () => {
      renderWithConfirmContext(
        <SmartTransactionsBannerAlert marginType="noTop" />,
        store,
      );
      const alert = screen.getByTestId('smart-transactions-banner-alert');
      expect(alert).toHaveStyle({ marginTop: 0 });
    });

    it('applies only top margin when marginType is "onlyTop"', () => {
      renderWithConfirmContext(
        <SmartTransactionsBannerAlert marginType="onlyTop" />,
        store,
      );
      const alert = screen.getByTestId('smart-transactions-banner-alert');
      expect(alert).toHaveStyle({ margin: '16px 0px 0px 0px' });
    });
  });

  it('handles being outside of ConfirmContext correctly', () => {
    const store = configureStore(mockState);

    // Render without wrapping in ConfirmContext
    renderWithProvider(<SmartTransactionsBannerAlert />, store);

    // Should still render if alertEnabled and smartTransactionsOptIn are true
    expect(
      screen.getByTestId('smart-transactions-banner-alert'),
    ).toBeInTheDocument();
  });

  it('automatically dismisses banner when Smart Transactions is manually disabled', () => {
    const store = configureStore({
      metamask: {
        alertEnabledness: {
          [AlertTypes.smartTransactionsMigration]: true,
        },
        preferences: {
          smartTransactionsOptInStatus: false,
        },
      },
    });

    // Clear any previous calls to our mock
    jest.clearAllMocks();

    renderWithConfirmContext(<SmartTransactionsBannerAlert />, store);

    // Verify it was called exactly once and with the right arguments
    expect(setAlertEnabledness).toHaveBeenCalledTimes(1);
    expect(setAlertEnabledness).toHaveBeenCalledWith(
      AlertTypes.smartTransactionsMigration,
      false,
    );
  });
});