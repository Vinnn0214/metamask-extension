import React from 'react';
import { NetworkConfiguration } from '@metamask/network-controller';
import {
  Box,
  Icon,
  IconName,
  Text,
} from '../../../components/component-library';
import {
  Display,
  FlexDirection,
  TextTransform,
} from '../../../helpers/constants/design-system';
import {
  ActionTypes,
  BridgeHistoryItem,
} from '../../../../app/scripts/controllers/bridge-status/types';
import { useSelector } from 'react-redux';
import { getNetworkConfigurationsByChainId } from '../../../selectors';
import BridgeStep from './bridge-step';

type BridgeStepsProps = {
  bridgeHistoryItem: BridgeHistoryItem;
};

export default function BridgeStepList({
  bridgeHistoryItem,
}: BridgeStepsProps) {
  const networkConfigurationsByChainId = useSelector(
    getNetworkConfigurationsByChainId,
  );
  const steps = bridgeHistoryItem.quote.steps;

  return (
    <Box display={Display.Flex} flexDirection={FlexDirection.Column} gap={4}>
      {steps.map((step, i) => (
        <BridgeStep
          step={step}
          networkConfigurationsByChainId={networkConfigurationsByChainId}
        />
      ))}
    </Box>
  );
}