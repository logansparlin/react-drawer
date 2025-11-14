import {
	type ForwardedRef,
	type ReactElement,
	type Ref,
	forwardRef,
} from "react";

import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { Primitive } from "@radix-ui/react-primitive";

import { mergeHandlers } from "@/shared/lib/helpers";
import { useSetStyle, useValueChange } from "@/shared/lib/hooks";

import { defaultTransformTemplate } from "../lib/helpers";
import { useControlsState, useDraggable, usePreventScroll } from "../lib/hooks";
import type {
	ConstraintEventHandler,
	Constraints,
	DragControls,
	DragEventHandler,
	TransformTemplate,
} from "../lib/types";
import "./draggable.css";

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

type PrimitiveDivProps<T> = Omit<
	React.ComponentPropsWithoutRef<typeof Primitive.div>,
	keyof DragProps<T>
>;

export interface DraggableProps<T> extends PrimitiveDivProps<T>, DragProps<T> {}

const _Draggable = <T,>(
	{
		constraints,
		dragControls: cDragControls,
		onConstraint,
		onPointerDown,
		onPointerMove,
		onPointerUp,
		onPointerCancel,
		onDragStart,
		onDragMove,
		onDragEnd,
		transformTemplate = defaultTransformTemplate,
		scrollLockTimeout = 0,
		...props
	}: DraggableProps<T>,
	forwardedRef: ForwardedRef<HTMLDivElement>,
) => {
	const dragControls = useControlsState(cDragControls);
	const { y, isDragging } = dragControls;

	const { ref, wantToDrag, listeners } = useDraggable({
		dragControls,
		constraints,
		onConstraint,
		onDragStart,
		onDragMove,
		onDragEnd,
		transformTemplate,
		scrollLockTimeout,
	});

	const { handlePointerDown, handlePointerMove, handleRelease } = listeners;

	const composedRef = useComposedRefs(ref, forwardedRef);

	const [setStyle, resetStyle] = useSetStyle(ref);

	useValueChange(y, (latest) => {
		setStyle({ transform: transformTemplate(latest) });
	});

	useValueChange(wantToDrag, (latest) => {
		if (latest) setStyle({ transition: "none" });
		else resetStyle("transition");
	});

	usePreventScroll(isDragging);

	return (
		<Primitive.div
			gv-drawer-draggable=""
			draggable="false"
			ref={composedRef}
			onPointerDown={mergeHandlers(handlePointerDown, onPointerDown)}
			onPointerMove={mergeHandlers(handlePointerMove, onPointerMove)}
			onPointerUp={mergeHandlers(handleRelease, onPointerUp)}
			onPointerCancel={mergeHandlers(handleRelease, onPointerCancel)}
			{...props}
		/>
	);
};

export const Draggable = forwardRef(_Draggable) as <T>(
	props: DraggableProps<T> & { ref?: Ref<HTMLDivElement> },
) => ReactElement;
