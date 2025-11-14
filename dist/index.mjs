"use client"

// src/drawer/index.ts
import { Close, Description, Title, Trigger } from "@radix-ui/react-dialog";

// src/drawer/content/ui/content.tsx
import { forwardRef as forwardRef3 } from "react";
import {
  Content as ContentPrimitive
} from "@radix-ui/react-dialog";

// src/drawer/lib/hooks/use-drawer-context.ts
import { useContext } from "react";

// src/drawer/lib/providers/drawer-context.tsx
import {
  createContext
} from "react";
import { jsx } from "react/jsx-runtime";
var DrawerContext = createContext(null);
var DrawerContextProvider = (props) => /* @__PURE__ */ jsx(DrawerContext.Provider, { ...props });

// src/drawer/lib/providers/portal-context.tsx
import { createContext as createContext2 } from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var PortalContext = createContext2(void 0);
var PortalContextProvider = ({
  forceMount,
  ...props
}) => /* @__PURE__ */ jsx2(PortalContext.Provider, { value: forceMount, ...props });

// src/drawer/lib/hooks/use-drawer-context.ts
var useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (context === null) {
    throw new Error("useDrawerContext was used outside of its Provider");
  }
  return context;
};

// src/drawer/lib/hooks/use-portal-context.ts
import { useContext as useContext2 } from "react";
var usePortalContext = () => {
  const context = useContext2(PortalContext);
  if (context === null) {
    throw new Error("usePortalContext was used outside of its Provider");
  }
  return context;
};

// src/drawer/content/ui/sheet.tsx
import { forwardRef as forwardRef2, useEffect as useEffect4 } from "react";
import { useComposedRefs as useComposedRefs2 } from "@radix-ui/react-compose-refs";

// src/shared/lib/helpers.ts
var isNumber = (value) => typeof value === "number";
var isFunction = (value) => typeof value === "function";
var clamp = (min, max, value) => Math.min(max, Math.max(min, value));
var mergeHandlers = (...handlers) => {
  return (...args) => handlers.forEach((handler) => void (handler == null ? void 0 : handler(...args)));
};
var cache = /* @__PURE__ */ new WeakMap();
var setStyle = (el, style) => {
  const original = {};
  const elStyle = el.style;
  for (const [key, value] of Object.entries(style)) {
    original[key] = elStyle[key];
    elStyle[key] = value;
  }
  const cached = cache.get(el);
  cache.set(el, { ...cached, ...original });
};
var resetStyle = (el, prop) => {
  const original = cache.get(el);
  if (!original) return;
  const elStyle = el.style;
  if (prop) {
    elStyle[prop] = original[prop];
    return;
  }
  Object.entries(original).forEach(([key, value]) => {
    elStyle[key] = value;
  });
};

// src/drawer/lib/constants.ts
var PX_REGEX = /(\d{1,20})px/gi;
var PERCENT_REGEX = /[\d.]{1,20}%/;

// src/drawer/lib/helpers.ts
var cssToPx = (value, el) => {
  if (!el) throw new Error("You have to provide element");
  const rect = el.getBoundingClientRect();
  if (isNumber(value)) return value;
  if (value.match(PERCENT_REGEX))
    return rect.height * parseFloat(value) / 100;
  if (value.match(PX_REGEX)) return parseFloat(value);
  throw new Error("Unknown value units");
};
var getSnapAreas = (snapPoints, el) => {
  const toPx = (value) => cssToPx(value, el);
  const [first, ...other] = snapPoints;
  let prev = first;
  const snapAreas = [];
  for (const snap of other) {
    snapAreas.push((toPx(prev) + toPx(snap)) / 2);
    prev = snap;
  }
  return snapAreas;
};

// src/shared/lib/hooks/use-value.ts
import { useRef } from "react";
var useValue = (initial) => {
  const v = useRef(initial);
  const key = useRef(0);
  const handlers = useRef(/* @__PURE__ */ new Map());
  const notify = () => {
    handlers.current.forEach((handler) => void handler(v.current));
  };
  const set = (value) => {
    if (value === v.current) return;
    v.current = value;
    notify();
  };
  const subscribe = (handler) => {
    const oldKey = key.current;
    handlers.current.set(oldKey, handler);
    key.current += 1;
    return () => handlers.current.delete(oldKey);
  };
  const get = () => v.current;
  return {
    set,
    get,
    subscribe
  };
};

// src/shared/lib/hooks/use-value-change.ts
import { useEffect } from "react";
var useValueChange = (value, handler) => {
  useEffect(() => {
    const unsub = value.subscribe(handler);
    return () => {
      unsub();
    };
  }, [handler, value.subscribe]);
};

// src/shared/lib/hooks/use-set-style.ts
var useSetStyle = (ref) => {
  const set = (style) => {
    const el = ref == null ? void 0 : ref.current;
    if (!el) return;
    setStyle(el, style);
  };
  const reset = (prop) => {
    const el = ref == null ? void 0 : ref.current;
    if (!el) return;
    resetStyle(el, prop);
  };
  return [set, reset];
};

// src/shared/ui/draggable/ui/draggable.tsx
import {
  forwardRef
} from "react";
import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { Primitive } from "@radix-ui/react-primitive";

// src/shared/ui/draggable/lib/helpers.ts
var getConstraint = (c, el) => isFunction(c) ? c(el) : c;
var defaultTransformTemplate = (y) => `translate3d(0, ${y}px, 0)`;
var reachedBottom = (el) => Math.abs(el.scrollTop + el.clientHeight - el.scrollHeight) < 2;
var hasScrollOverflow = (el) => {
  const style = window.getComputedStyle(el);
  const overflows = ["scroll", "auto"];
  return overflows.includes(style.overflowY) || overflows.includes(style.overflow);
};
var shouldDrag = (el, root, isDraggingDown, checkScroll) => {
  var _a;
  const selection = (_a = window.getSelection()) == null ? void 0 : _a.toString();
  if (selection == null ? void 0 : selection.length) return false;
  if (!checkScroll) return true;
  let element = el;
  while (element) {
    if (element.scrollHeight > element.clientHeight) {
      const top = element.scrollTop <= 0 && isDraggingDown;
      const bottom = reachedBottom(element) && !isDraggingDown;
      const scrollOverflow = hasScrollOverflow(element);
      if (!top && !bottom && scrollOverflow) return false;
    }
    if (element === root) return true;
    element = element.parentNode;
  }
  return true;
};
var rubberband = (dis, dim, el) => {
  return dis * dim * el / (dim + el * dis);
};
var reverseRubberband = (dis, dim, el) => {
  return dis * dim / (el * (dim - dis));
};
var applyRubberband = (pos, min, max, func = rubberband, el = 0.3) => {
  if (el === 0) return clamp(min, max, pos);
  if (pos < min) return -func(min - pos, 100, el) + min;
  if (pos > max) return +func(pos - max, 100, el) + max;
  return pos;
};
var getDumpedValue = (pos, min, max) => applyRubberband(pos, min, max);
var getUndumpedValue = (pos, min, max) => applyRubberband(pos, min, max, reverseRubberband);
var getVelocity = (delta, timeDelta) => delta / timeDelta;

// src/shared/ui/draggable/lib/hooks/use-drag-controls.ts
var useDragControls = (initLocked = false) => {
  const locked = useValue(initLocked);
  const y = useValue(0);
  const isDragging = useValue(false);
  return {
    lock: () => locked.set(true),
    unlock: () => locked.set(false),
    locked,
    y,
    isDragging
  };
};

// src/shared/ui/draggable/lib/hooks/use-controls-state.ts
var useControlsState = (dragControls, initLocked) => {
  const internal = useDragControls(initLocked);
  return dragControls != null ? dragControls : internal;
};

// src/shared/ui/draggable/lib/hooks/use-draggable.ts
import { useRef as useRef2 } from "react";
var useDraggable = ({
  dragControls,
  transformTemplate: transformTemplate2,
  constraints,
  onConstraint,
  onDragStart,
  onDragMove,
  onDragEnd,
  scrollLockTimeout
}) => {
  const { y, isDragging } = dragControls;
  const last = useRef2(0);
  const lastTime = useRef2(0);
  const lastVelocity = useRef2(0);
  const initTop = useRef2(0);
  const initY = useRef2(null);
  const wantToDrag = useValue(false);
  const ref = useRef2(null);
  const [setStyle2, resetStyle2] = useSetStyle(ref);
  const lastTimePrevented = useRef2(0);
  const getNumberY = () => {
    var _a;
    const node = ref.current;
    if (!node) return 0;
    setStyle2({ transform: (_a = transformTemplate2 == null ? void 0 : transformTemplate2(0)) != null ? _a : "none" });
    const resettedTop = node.getBoundingClientRect().top;
    resetStyle2("transform");
    return initTop.current - resettedTop;
  };
  const handleDragStart = (e, info) => {
    const node = ref.current;
    if (!node) return;
    const target = e.target;
    target.setPointerCapture(e.pointerId);
    isDragging.set(true);
    onDragStart == null ? void 0 : onDragStart(e, info);
  };
  const handleDrag = (e, info) => {
    const node = ref.current;
    if (!node) return;
    const curY = y.get();
    const curNumberY = isNumber(curY) ? curY : getNumberY();
    if (!constraints) {
      y.set(curNumberY + info.delta);
    } else {
      const min = getConstraint(constraints["min" /* Min */], node);
      const max = getConstraint(constraints["max" /* Max */], node);
      const newUndumpedY = getUndumpedValue(curNumberY, min, max) + info.delta;
      let proceed = true;
      if (newUndumpedY <= min || newUndumpedY >= max) {
        const constraint = newUndumpedY <= min ? "min" /* Min */ : "max" /* Max */;
        const res = onConstraint == null ? void 0 : onConstraint(e, constraint);
        proceed = res === void 0 || res;
      }
      const newY = proceed ? getDumpedValue(newUndumpedY, min, max) : clamp(min, max, newUndumpedY);
      y.set(newY);
    }
    onDragMove == null ? void 0 : onDragMove(e, info);
  };
  const handleDragEnd = (e, info) => onDragEnd == null ? void 0 : onDragEnd(e, info);
  const resetVariables = () => {
    wantToDrag.set(false);
    isDragging.set(false);
    initY.current = null;
  };
  const handlePointerDown = (e) => {
    if (!e.isPrimary) return;
    last.current = e.clientY;
    lastTime.current = e.timeStamp;
    const node = ref.current;
    if (!node) return;
    initTop.current = node.getBoundingClientRect().top;
    wantToDrag.set(true);
    const curTop = node.getBoundingClientRect().top;
    if (initTop.current !== curTop) {
      initY.current = y.get();
      y.set(getNumberY());
    }
  };
  const handlePointerMove = (e) => {
    if (!e.isPrimary) return;
    const delta = e.clientY - last.current;
    const velocity = getVelocity(delta, e.timeStamp - lastTime.current);
    last.current = e.clientY;
    lastTime.current = e.timeStamp;
    lastVelocity.current = velocity;
    if (!wantToDrag.get()) return;
    const node = ref.current;
    if (!node) return;
    if (!isDragging.get()) {
      const passed = shouldDrag(
        e.target,
        node,
        delta > 0,
        e.pointerType === "touch"
      );
      const passedTimeout = e.timeStamp - lastTimePrevented.current >= scrollLockTimeout;
      if (!passed || !passedTimeout) {
        resetVariables();
        lastTimePrevented.current = e.timeStamp;
        if (initY.current !== null) y.set(initY.current);
        return;
      }
      handleDragStart(e, { delta, velocity });
    }
    if (dragControls.locked.get()) return;
    handleDrag(e, { delta, velocity });
  };
  const handleRelease = (e) => {
    if (!e.isPrimary) return;
    const node = ref.current;
    if (!node) return;
    const delta = e.clientY - last.current;
    const timeDelta = e.timeStamp - lastTime.current;
    const velocity = getVelocity(delta, timeDelta) || lastVelocity.current;
    const wasDragging = isDragging.get();
    resetVariables();
    if (!wasDragging) return;
    handleDragEnd(e, {
      delta,
      velocity
    });
  };
  return {
    wantToDrag,
    ref,
    listeners: {
      handlePointerDown,
      handlePointerMove,
      handleRelease
    }
  };
};

// src/shared/ui/draggable/lib/hooks/use-prevent-scroll.ts
import { useCallback, useEffect as useEffect2 } from "react";
var usePreventScroll = (isDragging) => {
  const handleTouchMove = useCallback(
    (e) => {
      if (isDragging.get()) e.preventDefault();
    },
    [isDragging]
  );
  useEffect2(() => {
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleTouchMove]);
};

// #style-inject:#style-inject
function styleInject(css, { insertAt } = {}) {
  if (!css || typeof document === "undefined") return;
  const head = document.head || document.getElementsByTagName("head")[0];
  const style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

// src/shared/ui/draggable/ui/draggable.css
styleInject("[gv-drawer-draggable] {\n}\n@media (hover: hover) and (pointer: fine) {\n  [gv-drawer-draggable] {\n    user-select: none;\n  }\n}\n");

// src/shared/ui/draggable/ui/draggable.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var _Draggable = ({
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
  transformTemplate: transformTemplate2 = defaultTransformTemplate,
  scrollLockTimeout = 0,
  ...props
}, forwardedRef) => {
  const dragControls = useControlsState(cDragControls);
  const { y, isDragging } = dragControls;
  const { ref, wantToDrag, listeners } = useDraggable({
    dragControls,
    constraints,
    onConstraint,
    onDragStart,
    onDragMove,
    onDragEnd,
    transformTemplate: transformTemplate2,
    scrollLockTimeout
  });
  const { handlePointerDown, handlePointerMove, handleRelease } = listeners;
  const composedRef = useComposedRefs(ref, forwardedRef);
  const [setStyle2, resetStyle2] = useSetStyle(ref);
  useValueChange(y, (latest) => {
    setStyle2({ transform: transformTemplate2(latest) });
  });
  useValueChange(wantToDrag, (latest) => {
    if (latest) setStyle2({ transition: "none" });
    else resetStyle2("transition");
  });
  usePreventScroll(isDragging);
  return /* @__PURE__ */ jsx3(
    Primitive.div,
    {
      "gv-drawer-draggable": "",
      draggable: "false",
      ref: composedRef,
      onPointerDown: mergeHandlers(handlePointerDown, onPointerDown),
      onPointerMove: mergeHandlers(handlePointerMove, onPointerMove),
      onPointerUp: mergeHandlers(handleRelease, onPointerUp),
      onPointerCancel: mergeHandlers(handleRelease, onPointerCancel),
      ...props
    }
  );
};
var Draggable = forwardRef(_Draggable);

// src/drawer/content/lib/helpers.ts
var transformTemplate = (y) => `translate3d(0, calc(100% + ${isNumber(y) ? `${y}px` : y}), 0)`;
var getSnap = (snapPoints, value, el) => {
  const snapAreas = getSnapAreas(snapPoints, el);
  for (let i = 0; i < snapAreas.length; i++)
    if (value <= snapAreas[i]) return snapPoints[i];
  return snapPoints[snapPoints.length - 1];
};
var getMinConstraint = (el, snapPoints) => {
  const lastPoint = snapPoints[snapPoints.length - 1];
  return -cssToPx(lastPoint, el);
};

// src/drawer/content/lib/hooks/use-drag-events/use-drag-events.ts
import { useRef as useRef3 } from "react";

// src/drawer/content/lib/hooks/use-drag-events/use-get-snap.ts
var useGetSnap = (snapPoints, ref) => {
  return (pos, velocity) => {
    if (!(ref == null ? void 0 : ref.current) || ref.current === null) return;
    const lastPoint = snapPoints[snapPoints.length - 1];
    const maxAddValue = cssToPx(lastPoint, ref.current);
    const posWithVelocity = pos + -(velocity / 7) * maxAddValue;
    return getSnap(snapPoints, posWithVelocity, ref.current);
  };
};

// src/drawer/content/lib/hooks/use-drag-events/use-drag-events.ts
var useDragEvents = ({
  snapPoints,
  snapTo,
  snap,
  setSnap,
  onClose,
  dismissible,
  locked
}) => {
  const drawerRef = useRef3(null);
  const dismissablePoints = dismissible ? [0, ...snapPoints] : snapPoints;
  const getSnap2 = useGetSnap(dismissablePoints, drawerRef);
  const handleDragEnd = (_e, { velocity }) => {
    const node = drawerRef == null ? void 0 : drawerRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const pos = window.innerHeight - rect.y;
    const newSnap = getSnap2(pos, locked.get() ? 0 : velocity);
    if (!newSnap) return;
    if (newSnap === 0) return onClose();
    setSnap(newSnap);
  };
  const handleRelease = (e) => e.isPrimary && snapTo(snap);
  return {
    drawerRef,
    listeners: {
      handleDragEnd,
      handleRelease
    }
  };
};

// src/drawer/content/lib/hooks/use-snap-to-current.ts
import { useEffect as useEffect3 } from "react";
var useSnapToCurrent = (snapTo, snap, open) => {
  return useEffect3(() => {
    if (open) snapTo(snap);
    else snapTo(0);
  }, [open, snap, snapTo]);
};

// src/drawer/content/lib/hooks/use-snap-to.ts
var useSnapTo = (y) => {
  return (to) => y.set(isNumber(to) ? -to : `-${to}`);
};

// src/drawer/content/ui/sheet.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var Sheet = forwardRef2(
  ({ onConstraint, onPointerUp, onPointerCancel, onDragEnd, ...props }, forwardedRef) => {
    const {
      open,
      onOpenChange,
      drawerControls,
      snapPoints,
      snap,
      setSnap,
      dismissible,
      drawerRef: contextRef,
      scrollLockTimeout,
      onDrawerConstraint
    } = useDrawerContext();
    const { locked } = drawerControls;
    const firstPoint = snapPoints[0];
    const snapTo = useSnapTo(drawerControls.y);
    const { drawerRef, listeners } = useDragEvents({
      snapPoints,
      snapTo,
      snap,
      setSnap,
      onClose: () => onOpenChange(false),
      dismissible,
      locked
    });
    const { handleDragEnd, handleRelease } = listeners;
    const composedRef = useComposedRefs2(drawerRef, forwardedRef, contextRef);
    const [setStyle2, resetStyle2] = useSetStyle(drawerRef);
    useSnapToCurrent(snapTo, snap, open);
    useEffect4(() => {
      if (open) resetStyle2("pointerEvents");
      else setStyle2({ pointerEvents: "none" });
    }, [open, resetStyle2, setStyle2]);
    return /* @__PURE__ */ jsx4(
      Draggable,
      {
        ref: composedRef,
        dragControls: drawerControls,
        transformTemplate,
        constraints: {
          min: (el) => getMinConstraint(el, snapPoints),
          max: (el) => dismissible ? 0 : -cssToPx(firstPoint, el)
        },
        scrollLockTimeout,
        onConstraint: (e, type) => {
          onConstraint == null ? void 0 : onConstraint(e, type);
          return onDrawerConstraint(e, type);
        },
        onDragEnd: mergeHandlers(handleDragEnd, onDragEnd),
        onPointerUp: mergeHandlers(handleRelease, onPointerUp),
        onPointerCancel: mergeHandlers(handleRelease, onPointerCancel),
        ...props
      }
    );
  }
);
Sheet.displayName = "Drawer.Sheet";

// src/drawer/content/ui/content.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
var Content = forwardRef3(
  ({
    onOpenAutoFocus,
    onCloseAutoFocus,
    onEscapeKeyDown,
    onPointerDownOutside,
    onInteractOutside,
    forceMount,
    ...props
  }, ref) => {
    const { modal, drawerControls, dismissible } = useDrawerContext();
    const primitiveProps = {
      onOpenAutoFocus,
      onCloseAutoFocus,
      onPointerDownOutside,
      forceMount
    };
    return /* @__PURE__ */ jsx5(
      ContentPrimitive,
      {
        ref,
        asChild: true,
        ...primitiveProps,
        "gv-drawer": "",
        onEscapeKeyDown: (e) => {
          if (drawerControls.isDragging.get()) return e.preventDefault();
          if (!dismissible) e.preventDefault();
          onEscapeKeyDown == null ? void 0 : onEscapeKeyDown(e);
        },
        onInteractOutside: (e) => {
          if (!modal || !dismissible) e.preventDefault();
          onInteractOutside == null ? void 0 : onInteractOutside(e);
        },
        children: /* @__PURE__ */ jsx5(Sheet, { ...props })
      }
    );
  }
);
Content.displayName = "Drawer.Content";

// src/drawer/overlay/ui/overlay.tsx
import { forwardRef as forwardRef5, useRef as useRef4 } from "react";
import { useComposedRefs as useComposedRefs3 } from "@radix-ui/react-compose-refs";
import {
  Overlay as RadixOverlayPrimitive
} from "@radix-ui/react-dialog";
import { Presence } from "@radix-ui/react-presence";

// src/drawer/overlay/ui/overlay-primitive.tsx
import { forwardRef as forwardRef4 } from "react";
import {
  Primitive as Primitive2
} from "@radix-ui/react-primitive";
import { Slot } from "@radix-ui/react-slot";
import { RemoveScroll } from "react-remove-scroll";
import { jsx as jsx6 } from "react/jsx-runtime";
var OverlayPrimitive = forwardRef4((props, ref) => {
  const { drawerRef, open, modal } = useDrawerContext();
  const { style, blockInteraction = modal, ...other } = props;
  return /* @__PURE__ */ jsx6(
    RemoveScroll,
    {
      enabled: blockInteraction,
      as: Slot,
      allowPinchZoom: true,
      shards: [drawerRef],
      children: /* @__PURE__ */ jsx6(
        Primitive2.div,
        {
          "data-state": open ? "open" : "closed",
          ref,
          style: {
            pointerEvents: blockInteraction ? "auto" : "none",
            ...style
          },
          ...other
        }
      )
    }
  );
});
OverlayPrimitive.displayName = "Drawer.OverlayPrimitive";

// src/drawer/overlay/ui/overlay.tsx
import { jsx as jsx7 } from "react/jsx-runtime";
var Overlay = forwardRef5(
  ({ radixPrimitive = true, fadeFrom = 0, finalOpacity = 0.8, ...props }, forwardedRef) => {
    const contextForceMount = usePortalContext();
    const { drawerControls, drawerRef, snapPoints, open } = useDrawerContext();
    const { forceMount = contextForceMount, ...other } = props;
    const lastPoint = snapPoints[snapPoints.length - 1];
    const ref = useRef4(null);
    const composedRef = useComposedRefs3(ref, forwardedRef);
    const [setStyle2, resetStyle2] = useSetStyle(ref);
    useValueChange(drawerControls.y, (latest) => {
      const node = drawerRef.current;
      if (!node) return;
      const y = cssToPx(latest, node);
      const fadeFromY = cssToPx(fadeFrom, node);
      const opacity = clamp(
        0,
        1,
        (-y - fadeFromY) / (cssToPx(lastPoint, node) - fadeFromY) * finalOpacity
      );
      setStyle2({ opacity: opacity.toString() });
    });
    useValueChange(drawerControls.isDragging, (latest) => {
      if (latest) setStyle2({ transition: "none" });
      else resetStyle2("transition");
    });
    if (radixPrimitive)
      return /* @__PURE__ */ jsx7(
        RadixOverlayPrimitive,
        {
          "gv-drawer-overlay": "",
          "data-testid": "overlay",
          ref: composedRef,
          ...other
        }
      );
    return /* @__PURE__ */ jsx7(Presence, { present: forceMount || open, children: /* @__PURE__ */ jsx7(
      OverlayPrimitive,
      {
        "gv-drawer-overlay": "",
        "data-testid": "overlay",
        ref: composedRef,
        ...other
      }
    ) });
  }
);
Overlay.displayName = "Drawer.Overlay";

// src/drawer/portal/ui/portal.tsx
import {
  Portal as PortalPrimitive
} from "@radix-ui/react-dialog";
import { jsx as jsx8 } from "react/jsx-runtime";
var Portal = ({ ...props }) => {
  return /* @__PURE__ */ jsx8(PortalContextProvider, { forceMount: props.forceMount, children: /* @__PURE__ */ jsx8(PortalPrimitive, { ...props }) });
};
Portal.displayName = "Drawer.Portal";

// src/drawer/root/ui/root.tsx
import { useRef as useRef5 } from "react";
import { Root as RootPrimitive } from "@radix-ui/react-dialog";

// src/drawer/root/lib/hooks/use-open-state.ts
import { useState } from "react";
var useOpenState = (init, open, onOpenChange) => {
  const internal = useState(init);
  return open && onOpenChange ? [open, onOpenChange] : internal;
};

// src/drawer/root/lib/hooks/use-snap-state.ts
import { useState as useState2 } from "react";
var useSnapState = (init, snap, setSnap) => {
  const internal = useState2(init);
  return snap && setSnap ? [snap, setSnap] : internal;
};

// src/drawer/root/lib/hooks/use-constraint-events.ts
var useConstraintEvents = (drawerRef, scrollableRef, drawerControls, scrollableControls) => {
  const onDrawerConstraint = (_, type) => {
    if (!drawerRef.current) return;
    if (!scrollableRef.current) return;
    if (type === "max" /* Max */) return;
    drawerControls.lock();
    scrollableControls.unlock();
    return false;
  };
  const onScrollableConstraint = (_, type) => {
    if (!scrollableRef.current) return;
    if (type === "min" /* Min */) return;
    drawerControls.unlock();
    scrollableControls.lock();
  };
  return { onDrawerConstraint, onScrollableConstraint };
};

// src/drawer/root/lib/hooks/use-scaled-background.ts
var useScaledBackground = (drawerControls, drawerRef, snapPoints, shouldScaleBackground, scaleFrom) => {
  const lastPoint = snapPoints[snapPoints.length - 1];
  const getWrapper = () => document.querySelector("[gv-drawer-wrapper]");
  useValueChange(drawerControls.y, (latest) => {
    if (!shouldScaleBackground) return;
    const node = drawerRef.current;
    if (!node) return;
    const wrapper = getWrapper();
    if (!wrapper) return;
    console.log("latest", latest);
    console.log(node);
    console.log(wrapper);
    const y = cssToPx(latest, node);
    const scaleFromY = cssToPx(scaleFrom, node);
    const multiplier = Math.max(
      (-y - scaleFromY) / (cssToPx(lastPoint, node) - scaleFromY),
      0
    );
    const width = wrapper.offsetWidth;
    const transform = `scale(calc(1 - ((2 * var(--offset)) / ${width}) * ${multiplier})) translate3d(0, calc(env(safe-area-inset-top) + (var(--offset) * 1px) * ${multiplier}), 0)`;
    const borderRadius = `calc(var(--border-radius) * ${multiplier})`;
    setStyle(wrapper, { transform, borderRadius });
  });
  useValueChange(drawerControls.isDragging, (latest) => {
    if (!shouldScaleBackground) return;
    const wrapper = getWrapper();
    if (!wrapper) return;
    if (latest) setStyle(wrapper, { transition: "none" });
    else resetStyle(wrapper, "transition");
  });
};

// src/drawer/root/ui/root.tsx
import { jsx as jsx9 } from "react/jsx-runtime";
var Root = ({
  defaultOpen = false,
  open: cOpen,
  onOpenChange: cOnOpenChange,
  snapPoints = ["100%"],
  snap: cSnap,
  setSnap: cSetSnap,
  dismissible = true,
  modal = true,
  scrollLockTimeout = 300,
  scaleFrom = 0,
  shouldScaleBackground = false,
  children
}) => {
  const drawerControls = useDragControls();
  const scrollableControls = useDragControls(true);
  const [open, onOpenChange] = useOpenState(defaultOpen, cOpen, cOnOpenChange);
  const [snap, setSnap] = useSnapState(snapPoints[0], cSnap, cSetSnap);
  const drawerRef = useRef5(null);
  const scrollableRef = useRef5(null);
  const constraintHandlers = useConstraintEvents(
    drawerRef,
    scrollableRef,
    drawerControls,
    scrollableControls
  );
  const context = {
    drawerControls,
    scrollableControls,
    defaultOpen,
    open,
    onOpenChange,
    snapPoints,
    snap,
    setSnap,
    dismissible,
    drawerRef,
    scrollableRef,
    scrollLockTimeout,
    modal,
    ...constraintHandlers
  };
  useScaledBackground(
    drawerControls,
    drawerRef,
    snapPoints,
    shouldScaleBackground,
    scaleFrom
  );
  return /* @__PURE__ */ jsx9(RootPrimitive, { open, onOpenChange, modal, children: /* @__PURE__ */ jsx9(DrawerContextProvider, { value: context, children }) });
};

// src/drawer/scrollable/ui/scrollable.tsx
import { forwardRef as forwardRef6, useEffect as useEffect5, useRef as useRef6 } from "react";
import { useComposedRefs as useComposedRefs4 } from "@radix-ui/react-compose-refs";

// src/drawer/scrollable/lib/helpers.ts
var getMinConstraint2 = (el) => {
  const rect = el.getBoundingClientRect();
  const parent = el.parentNode;
  const parentRect = parent.getBoundingClientRect();
  return parentRect.height - rect.height;
};

// src/drawer/scrollable/ui/scrollable.tsx
import { jsx as jsx10 } from "react/jsx-runtime";
var Scrollable = forwardRef6(
  ({ onConstraint, onDragEnd, onPointerDown, ...props }, forwardedRef) => {
    const {
      drawerControls,
      scrollableControls,
      scrollableRef,
      snap,
      snapPoints,
      onScrollableConstraint
    } = useDrawerContext();
    const { y } = scrollableControls;
    const animationId = useRef6(null);
    const composedRef = useComposedRefs4(scrollableRef, forwardedRef);
    const [setStyle2, resetStyle2] = useSetStyle(scrollableRef);
    const max = 0;
    useEffect5(() => {
      if (snap === snapPoints[snapPoints.length - 1]) return;
      y.set(max);
      drawerControls.unlock();
      scrollableControls.lock();
    }, [
      snap,
      drawerControls.unlock,
      scrollableControls.lock,
      snapPoints.length,
      snapPoints[snapPoints.length - 1],
      y.set
    ]);
    useEffect5(() => {
      y.set(max);
    }, [y.set]);
    const resetTransition = () => resetStyle2("transitionDuration");
    const resetToBounds = () => {
      const node = scrollableRef.current;
      if (!node) return;
      y.set(clamp(getMinConstraint2(node), max, y.get()));
    };
    const animate = (prev, cur, velocity) => {
      const node = scrollableRef.current;
      if (!node) return;
      const time = cur - prev;
      const min = getMinConstraint2(node);
      const delta = velocity * time;
      const newUndumpedY = getUndumpedValue(y.get(), min, max) + delta;
      y.set(getDumpedValue(newUndumpedY, min, max));
      const acceleration = -15e-4;
      const newVelocity = Math.sign(velocity) * Math.max(Math.abs(velocity) + acceleration * time, 0);
      const maxDist = Math.abs(velocity) * 100;
      const outOfMax = newUndumpedY - min <= -maxDist || newUndumpedY - max >= maxDist;
      if (newVelocity === 0 || outOfMax) {
        resetTransition();
        return resetToBounds();
      }
      animationId.current = window.requestAnimationFrame(
        (time2) => animate(cur, time2, newVelocity)
      );
    };
    const handleDragEnd = (_, { velocity }) => {
      if (scrollableControls.locked.get()) return resetToBounds();
      setStyle2({ transitionDuration: "0s" });
      animationId.current = window.requestAnimationFrame(
        (time) => animate(time, time, velocity)
      );
    };
    const handlePointerDown = () => {
      if (animationId.current === null) return;
      window.cancelAnimationFrame(animationId.current);
      animationId.current = null;
      resetTransition();
    };
    return /* @__PURE__ */ jsx10(
      Draggable,
      {
        "gv-drawer-scrollable": "",
        ref: composedRef,
        dragControls: scrollableControls,
        constraints: {
          min: getMinConstraint2,
          max
        },
        onDragEnd: mergeHandlers(handleDragEnd, onDragEnd),
        onPointerDown: mergeHandlers(handlePointerDown, onPointerDown),
        onConstraint: mergeHandlers(onScrollableConstraint, onConstraint),
        ...props
      }
    );
  }
);
Scrollable.displayName = "Drawer.Scrollable";

// src/drawer/snap-areas/ui/snap-areas.tsx
import { forwardRef as forwardRef7 } from "react";

// src/drawer/snap-areas/lib/hooks/use-mounted.ts
import { useEffect as useEffect6, useState as useState3 } from "react";
var useMounted = () => {
  const [mounted, setMounted] = useState3(false);
  useEffect6(() => setMounted(true), []);
  return mounted;
};

// src/drawer/snap-areas/ui/areas.tsx
import { jsx as jsx11 } from "react/jsx-runtime";
var Areas = () => {
  const { snapPoints, dismissible, drawerRef } = useDrawerContext();
  const dismissiblePoints = dismissible ? [0, ...snapPoints] : snapPoints;
  const mounted = useMounted();
  if (!mounted) return null;
  const snapAreas = getSnapAreas(dismissiblePoints, drawerRef.current);
  const [_, snapHeights] = snapAreas.reduce(
    ([prev, acc], cur) => [cur, [...acc, cur - prev]],
    [0, []]
  );
  return [...snapHeights, `100%`].map((height, index) => /* @__PURE__ */ jsx11(
    "div",
    {
      "gv-drawer-area": "",
      style: {
        flexShrink: 0,
        opacity: 0,
        height
      }
    },
    index
  ));
};

// src/drawer/snap-areas/lib/constants.ts
var COLORS = [
  "#ef4444",
  "#3b82f6",
  "#cffafe",
  "#84cc16",
  "#8b5cf6",
  "#f97316"
];

// src/drawer/snap-areas/ui/lines.tsx
import { jsx as jsx12 } from "react/jsx-runtime";
var Lines = () => {
  const { snapPoints, dismissible, drawerRef } = useDrawerContext();
  const mounted = useMounted();
  if (!mounted) return null;
  const snapLines = (dismissible ? [0, ...snapPoints] : snapPoints).map(
    (point) => cssToPx(point, drawerRef.current)
  );
  return snapLines.map((line, index) => /* @__PURE__ */ jsx12(
    "div",
    {
      "gv-drawer-lines": "",
      style: {
        left: 0,
        right: 0,
        position: "fixed",
        borderTop: "1px dashed",
        borderColor: COLORS[index % COLORS.length],
        bottom: line
      }
    },
    line
  ));
};

// src/drawer/snap-areas/ui/snap-areas.tsx
import { jsx as jsx13, jsxs } from "react/jsx-runtime";
var SnapAreas = forwardRef7(({ ...props }, ref) => {
  const { open } = useDrawerContext();
  if (!open) return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      "gv-drawer-snap-areas": "",
      style: {
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column-reverse",
        pointerEvents: "none"
      },
      ...props,
      children: [
        /* @__PURE__ */ jsx13(Lines, {}),
        /* @__PURE__ */ jsx13(Areas, {})
      ]
    }
  );
});
SnapAreas.displayName = "Drawer.SnapAreas";

// src/drawer/index.css
styleInject('@source ".";\n[gv-drawer-overlay],\n[gv-drawer],\n[gv-drawer-scrollable],\n[gv-drawer-wrapper] {\n  --duration: 0.5s;\n  --timing-function: cubic-bezier(0.32, 0.72, 0, 1);\n  --scroll-bar-shift: var(--removed-body-scroll-bar-size, 0);\n}\n[gv-drawer-overlay] {\n  opacity: 0;\n  transition: opacity var(--duration) var(--timing-function);\n}\n[gv-drawer] {\n  transform: translate3d(0, 100%, 0);\n}\n[gv-drawer],\n[gv-drawer-scrollable] {\n  transition: transform var(--duration) var(--timing-function);\n}\n[gv-drawer-wrapper] {\n  --border-radius: 8px;\n  --offset: 14;\n  transform-origin: top center;\n  transition-property: transform, border-radius;\n  transition-duration: var(--duration);\n  transition-timing-function: var(--timing-function);\n}\n[gv-drawer]::after {\n  content: "";\n  position: absolute;\n  top: calc(100% - 1px);\n  background: inherit;\n  background-color: inherit;\n  left: 0;\n  right: 0;\n  height: 100%;\n  z-index: -1;\n}\n[gv-drawer-overlay][data-state=closed],\n[gv-drawer][data-state=closed] {\n  animation: fake-animation var(--duration) var(--timing-function);\n}\n@keyframes fake-animation {\n  from {\n  }\n  to {\n  }\n}\n');

// src/drawer/index.ts
var Drawer = {
  Root,
  Content,
  Portal,
  Overlay,
  SnapAreas,
  Scrollable,
  Trigger,
  Close,
  Title,
  Description
};
export {
  Drawer,
  Close as DrawerClose,
  Content as DrawerContent,
  Description as DrawerDescription,
  Overlay as DrawerOverlay,
  Portal as DrawerPortal,
  Root as DrawerRoot,
  Scrollable as DrawerScrollable,
  SnapAreas as DrawerSnapAreas,
  Title as DrawerTitle,
  Trigger as DrawerTrigger
};
//# sourceMappingURL=index.mjs.map