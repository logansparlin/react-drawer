import { useCallback, useEffect } from "react";

import type { Value } from "@/shared/lib/types";

export const usePreventScroll = (isDragging: Value<boolean>) => {
	const handleTouchMove = useCallback(
		(e: TouchEvent) => {
			if (isDragging.get()) e.preventDefault();
		},
		[isDragging],
	);

	useEffect(() => {
		document.addEventListener("touchmove", handleTouchMove, { passive: false });

		return () => {
			document.removeEventListener("touchmove", handleTouchMove);
		};
	}, [handleTouchMove]);
};
