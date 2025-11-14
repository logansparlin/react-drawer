import { useEffect } from "react";

import type { Handler, Value } from "../types";

export const useValueChange = <T>(value: Value<T>, handler: Handler<T>) => {
	useEffect(() => {
		const unsub = value.subscribe(handler);

		return () => {
			unsub();
		};
	}, [handler, value.subscribe]);
};
