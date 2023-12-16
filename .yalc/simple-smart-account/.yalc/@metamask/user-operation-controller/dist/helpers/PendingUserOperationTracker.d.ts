/// <reference types="node" />
import { PollingControllerOnly } from '@metamask/polling-controller';
import type { Json } from '@metamask/utils';
import EventEmitter from 'events';
import type { UserOperationMetadata } from '../types';
import type { UserOperationControllerMessenger } from '../UserOperationController';
declare type Events = {
    'user-operation-confirmed': [metadata: UserOperationMetadata];
    'user-operation-failed': [txMeta: UserOperationMetadata, error: Error];
    'user-operation-updated': [txMeta: UserOperationMetadata];
};
export declare type PendingUserOperationTrackerEventEmitter = EventEmitter & {
    on<T extends keyof Events>(eventName: T, listener: (...args: Events[T]) => void): PendingUserOperationTrackerEventEmitter;
    once<T extends keyof Events>(eventName: T, listener: (...args: Events[T]) => void): PendingUserOperationTrackerEventEmitter;
    emit<T extends keyof Events>(eventName: T, ...args: Events[T]): boolean;
};
export declare class PendingUserOperationTracker extends PollingControllerOnly {
    #private;
    hub: PendingUserOperationTrackerEventEmitter;
    constructor({ getUserOperations, messenger, }: {
        getUserOperations: () => UserOperationMetadata[];
        messenger: UserOperationControllerMessenger;
    });
    _executePoll(networkClientId: string, _options: Json): Promise<void>;
}
export {};
//# sourceMappingURL=PendingUserOperationTracker.d.ts.map