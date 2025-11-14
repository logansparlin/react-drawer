import * as _radix_ui_react_dialog from '@radix-ui/react-dialog';
import { DialogOverlayProps, DialogPortalProps, DialogContentProps } from '@radix-ui/react-dialog';
export { Close as DrawerClose, DialogCloseProps as DrawerCloseProps, Description as DrawerDescription, DialogDescriptionProps as DrawerDescriptionProps, Title as DrawerTitle, DialogTitleProps as DrawerTitleProps, Trigger as DrawerTrigger, DialogTriggerProps as DrawerTriggerProps } from '@radix-ui/react-dialog';
import * as react from 'react';
import react__default, { PointerEvent, FC, PropsWithChildren } from 'react';
import { ComponentPropsWithoutRef, Primitive } from '@radix-ui/react-primitive';

type Without<T, K extends keyof any> = Omit<T, K> & {
    [P in K]?: never;
};
type WithoutThisOrThat<T, K extends keyof any, P extends keyof any> = Without<T, K> | Without<T, P>;
type Handler<T> = (latest: T) => void;
type Set<T> = (value: T) => void;
type Get<T> = () => T;
type Unsubscribe = () => void;
type Subscribe<T> = (handler: Handler<T>) => Unsubscribe;
interface Value<T> {
    set: Set<T>;
    get: Get<T>;
    subscribe: Subscribe<T>;
}

type NumberOr<T> = number | T;
interface DragControls<T> {
    lock: () => void;
    unlock: () => void;
    locked: Value<boolean>;
    y: Value<NumberOr<T>>;
    isDragging: Value<boolean>;
}
declare enum ConstraintType {
    Min = "min",
    Max = "max"
}
type Constraint = number | ((el: HTMLElement) => number);
interface Constraints {
    [ConstraintType.Min]: Constraint;
    [ConstraintType.Max]: Constraint;
}
type TransformTemplate = <T>(y: T) => string;
interface DragInfo {
    delta: number;
    velocity: number;
}
type DragEventHandler<T = Element> = (event: PointerEvent<T>, info: DragInfo) => void;
type ConstraintEventHandler<T = Element> = (event: PointerEvent<T>, type: ConstraintType) => void | boolean;

interface DragProps<T> {
    dragControls?: DragControls<T>;
    constraints?: Constraints;
    onConstraint?: ConstraintEventHandler;
    onDragStart?: DragEventHandler;
    onDragMove?: DragEventHandler;
    onDragEnd?: DragEventHandler;
    transformTemplate?: TransformTemplate;
    scrollLockTimeout?: number;
}
type PrimitiveDivProps<T> = Omit<ComponentPropsWithoutRef<typeof Primitive.div>, keyof DragProps<T>>;
interface DraggableProps<T> extends PrimitiveDivProps<T>, DragProps<T> {
}

interface ScrollableProps extends DraggableProps<number> {
}
declare const Scrollable: react__default.ForwardRefExoticComponent<ScrollableProps & react__default.RefAttributes<HTMLDivElement>>;

type OnOpenChange = (open: boolean) => void;
type Snap = number | string;
type SetSnap = (snap: Snap) => void;

interface WithCustomPrimitiveProps {
    radixPrimitive: false;
    blockInteraction?: boolean;
}
interface WithRadixPrimitiveProps {
    radixPrimitive?: boolean;
    blockInteraction?: never;
}
type OverlayProps = DialogOverlayProps & (WithRadixPrimitiveProps | WithCustomPrimitiveProps) & {
    fadeFrom?: Snap;
    finalOpacity?: number;
};
declare const Overlay: react__default.ForwardRefExoticComponent<OverlayProps & react__default.RefAttributes<HTMLDivElement>>;

interface PortalProps extends DialogPortalProps {
}
declare const Portal: FC<PortalProps>;

interface SheetProps extends DraggableProps<Snap> {
}

interface ContentProps extends Omit<DialogContentProps, keyof SheetProps>, SheetProps {
}
declare const Content: react__default.ForwardRefExoticComponent<ContentProps & react__default.RefAttributes<HTMLDivElement>>;

type OpenProps = WithoutThisOrThat<{
    defaultOpen?: boolean;
    open: boolean;
    onOpenChange: OnOpenChange;
}, 'defaultOpen', 'open' | 'onOpenChange'>;
type SnapProps = WithoutThisOrThat<{
    snapPoints?: Snap[];
    snap: Snap;
    setSnap: SetSnap;
}, '', 'snap' | 'setSnap'>;
interface WithScaledBackground {
    scaleFrom?: Snap;
    shouldScaleBackground: true;
}
interface WithoutScaledBackground {
    scaleFrom?: never;
    shouldScaleBackground?: false;
}
type RootProps = PropsWithChildren & OpenProps & SnapProps & {
    dismissible?: boolean;
    modal?: boolean;
    scrollLockTimeout?: number;
} & (WithScaledBackground | WithoutScaledBackground);
declare const Root: FC<RootProps>;

declare const SnapAreas: react__default.ForwardRefExoticComponent<react__default.RefAttributes<HTMLDivElement>>;

declare const Drawer: {
    Root: react.FC<RootProps>;
    Content: react.ForwardRefExoticComponent<ContentProps & react.RefAttributes<HTMLDivElement>>;
    Portal: react.FC<PortalProps>;
    Overlay: react.ForwardRefExoticComponent<OverlayProps & react.RefAttributes<HTMLDivElement>>;
    SnapAreas: react.ForwardRefExoticComponent<react.RefAttributes<HTMLDivElement>>;
    Scrollable: react.ForwardRefExoticComponent<ScrollableProps & react.RefAttributes<HTMLDivElement>>;
    Trigger: react.ForwardRefExoticComponent<_radix_ui_react_dialog.DialogTriggerProps & react.RefAttributes<HTMLButtonElement>>;
    Close: react.ForwardRefExoticComponent<_radix_ui_react_dialog.DialogCloseProps & react.RefAttributes<HTMLButtonElement>>;
    Title: react.ForwardRefExoticComponent<_radix_ui_react_dialog.DialogTitleProps & react.RefAttributes<HTMLHeadingElement>>;
    Description: react.ForwardRefExoticComponent<_radix_ui_react_dialog.DialogDescriptionProps & react.RefAttributes<HTMLParagraphElement>>;
};

export { Drawer, Content as DrawerContent, type ContentProps as DrawerContentProps, Overlay as DrawerOverlay, type OverlayProps as DrawerOverlayProps, Portal as DrawerPortal, type PortalProps as DrawerPortalProps, Root as DrawerRoot, type RootProps as DrawerRootProps, Scrollable as DrawerScrollable, type ScrollableProps as DrawerScrollableProps, SnapAreas as DrawerSnapAreas, type Snap };
