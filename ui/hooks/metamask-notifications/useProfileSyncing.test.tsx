import React from 'react';
import { Provider } from 'react-redux';
import { renderHook, act } from '@testing-library/react-hooks';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import type { Store } from 'redux';
import * as actions from '../../store/actions';
import {
  useEnableProfileSyncing,
  useDisableProfileSyncing,
  useIsProfileSyncingEnabled,
} from './useProfileSyncing';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../store/actions', () => ({
  performSignIn: jest.fn(),
  performSignOut: jest.fn(),
  enableProfileSyncing: jest.fn(),
  disableProfileSyncing: jest.fn(),
  showLoadingIndication: jest.fn(),
  hideLoadingIndication: jest.fn(),
}));

describe('useProfileSyncing', () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore({
      metamask: {
        isProfileSyncingEnabled: false,
        isSignedIn: false,
        participateInMetaMetrics: false,
        internalAccounts: {
          accounts: {
            '0x123': {
              address: '0x123',
              id: 'account1',
              metadata: {},
              options: {},
              methods: [],
              type: 'eip155:eoa',
            },
          },
        },
      },
    });

    store.dispatch = jest.fn().mockImplementation((action) => {
      if (typeof action === 'function') {
        return action(store.dispatch, store.getState);
      }
      return Promise.resolve();
    });

    jest.clearAllMocks();
  });

  it('should enable profile syncing', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useEnableProfileSyncing(),
      {
        wrapper: ({ children }) => (
          <Provider store={store}>{children}</Provider>
        ),
      },
    );

    act(() => {
      result.current.enableProfileSyncing();
    });

    await waitForNextUpdate();

    expect(actions.performSignIn).toHaveBeenCalled();
    expect(actions.enableProfileSyncing).toHaveBeenCalled();
  });

  it('should disable profile syncing', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useDisableProfileSyncing(),
      {
        wrapper: ({ children }) => (
          <Provider store={store}>{children}</Provider>
        ),
      },
    );

    act(() => {
      result.current.disableProfileSyncing();
    });

    await waitForNextUpdate();

    expect(actions.disableProfileSyncing).toHaveBeenCalled();
    if (!store.getState().metamask.participateInMetaMetrics) {
      expect(actions.performSignOut).toHaveBeenCalled();
    }
  });

  it('should check if profile syncing is enabled', () => {
    const { result } = renderHook(() => useIsProfileSyncingEnabled(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.isProfileSyncingEnabled).toBe(false);
  });
});
