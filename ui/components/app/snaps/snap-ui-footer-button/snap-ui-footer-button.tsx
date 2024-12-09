import React, { FunctionComponent, MouseEvent as ReactMouseEvent } from 'react';
import {
  ButtonType,
  ButtonVariant,
  UserInputEventType,
} from '@metamask/snaps-sdk';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import {
  Button,
  ButtonProps,
  ButtonSize,
  Icon,
  IconName,
  IconSize,
  ButtonVariant as ExtensionButtonVariant,
} from '../../../component-library';
import {
  AlignItems,
  Display,
  FlexDirection,
} from '../../../../helpers/constants/design-system';
import { useSnapInterfaceContext } from '../../../../contexts/snaps';
import { SnapIcon } from '../snap-icon';
import { getHideSnapBranding } from '../../../../selectors';

type SnapUIFooterButtonProps = {
  name?: string;
  variant?: ButtonVariant;
  isSnapAction?: boolean;
  onCancel?: () => void;
};

export const SnapUIFooterButton: FunctionComponent<
  SnapUIFooterButtonProps & ButtonProps<'button'>
> = ({
  onCancel,
  name,
  children,
  disabled = false,
  isSnapAction = false,
  type,
  variant = ButtonVariant.Primary,
  form,
  ...props
}) => {
  const { handleEvent, snapId } = useSnapInterfaceContext();
  const hideSnapBranding = useSelector((state) =>
    getHideSnapBranding(state, snapId),
  );

  const handleSnapAction = (event: ReactMouseEvent<HTMLElement>) => {
    if (type === ButtonType.Button) {
      event.preventDefault();
    }

    handleEvent({
      event: UserInputEventType.ButtonClickEvent,
      name,
    });
  };

  const handleClick = isSnapAction ? handleSnapAction : onCancel;

  const brandedButtonVariant = isSnapAction
    ? ButtonVariant.Primary
    : ButtonVariant.Secondary;

  const buttonVariant = hideSnapBranding ? variant : brandedButtonVariant;
  const finalButtonVariant =
    buttonVariant === 'loading' ? ButtonVariant.Primary : buttonVariant;

  return (
    <Button
      className={classnames('snap-ui-renderer__footer-button', {
        'snap-ui-renderer__footer-button--disabled': disabled,
        'hide-snap-branding': hideSnapBranding,
      })}
      type={type}
      form={form}
      {...props}
      size={ButtonSize.Lg}
      block
      disabled={disabled}
      variant={finalButtonVariant as unknown as ExtensionButtonVariant}
      onClick={handleClick}
      textProps={{
        display: Display.Flex,
        alignItems: AlignItems.center,
        flexDirection: FlexDirection.Row,
      }}
    >
      {isSnapAction && !hideSnapBranding && variant !== 'loading' && (
        <SnapIcon snapId={snapId} avatarSize={IconSize.Sm} marginRight={2} />
      )}
      {variant === 'loading' ? (
        <Icon
          name={IconName.Loading}
          style={{ animation: 'spin 2s linear infinite' }}
        />
      ) : (
        children
      )}
    </Button>
  );
};
