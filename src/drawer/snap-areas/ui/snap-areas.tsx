import { forwardRef } from "react";

import { useDrawerContext } from "@/drawer/lib/hooks";

import { Areas } from "./areas";
import { Lines } from "./lines";

export const SnapAreas = forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => {
	const { open } = useDrawerContext();

	if (!open) return null;

	return (
		<div
			ref={ref}
			gv-drawer-snap-areas=""
			style={{
				position: "fixed",
				inset: 0,
				display: "flex",
				flexDirection: "column-reverse",
				pointerEvents: "none",
			}}
			{...props}
		>
			<Lines />
			<Areas />
		</div>
	);
});

SnapAreas.displayName = "Drawer.SnapAreas";
