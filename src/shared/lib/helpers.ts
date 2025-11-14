import type { Style } from "./types";

export const isNumber = (value: unknown): value is number =>
	typeof value === "number";

export const isString = (value: unknown): value is string =>
	typeof value === "string";

export const isFunction = (value: unknown): value is (...args: any) => any =>
	typeof value === "function";

export const clamp = (min: number, max: number, value: number) =>
	Math.min(max, Math.max(min, value));

export const mergeHandlers = <T extends (...args: any) => any>(
	...handlers: Array<T | undefined>
) => {
	return (...args: Parameters<T>) =>
		handlers.forEach((handler) => void handler?.(...(args as any)));
};

// Some code was taken from https://github.com/emilkowalski/vaul/blob/main/src/helpers.ts
const cache = new WeakMap<HTMLElement, Style>();

export const setStyle = (el: HTMLElement, style: Style) => {
	const original: Style = {};
	const elStyle = el.style as unknown as Style;

	for (const [key, value] of Object.entries(style)) {
		original[key] = elStyle[key];
		elStyle[key] = value;
	}

	const cached = cache.get(el);
	cache.set(el, { ...cached, ...original });
};

export const resetStyle = (el: HTMLElement, prop?: string) => {
	const original = cache.get(el);

	if (!original) return;

	const elStyle = el.style as unknown as Style;

	if (prop) {
		elStyle[prop] = original[prop];
		return;
	}

	Object.entries(original).forEach(([key, value]) => {
		elStyle[key] = value;
	});
};
