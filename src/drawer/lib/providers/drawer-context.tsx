import {
	type FC,
	type PropsWithChildren,
	type RefObject,
	createContext,
} from "react";

import type {
	ConstraintEventHandler,
	DragControls,
} from "@/shared/ui/draggable";

import type { OnOpenChange, SetSnap, Snap } from "../types";

export interface DrawerContextValue {
	drawerControls: DragControls<Snap>;
	scrollableControls: DragControls<number>;
	defaultOpen: boolean;
	open: boolean;
	onOpenChange: OnOpenChange;
	snapPoints: Snap[];
	snap: Snap;
	setSnap: SetSnap;
	dismissible: boolean;
	drawerRef: RefObject<HTMLDivElement | null>;
	scrollableRef: RefObject<HTMLDivElement | null>;
	scrollLockTimeout: number;
	modal: boolean;
	onDrawerConstraint: ConstraintEventHandler;
	onScrollableConstraint: ConstraintEventHandler;
}

export const DrawerContext = createContext<DrawerContextValue | null>(null);

export interface DrawerContextProviderProps extends PropsWithChildren {
	value: DrawerContextValue;
}

export const DrawerContextProvider: FC<DrawerContextProviderProps> = (
	props,
) => <DrawerContext.Provider {...props} />;
