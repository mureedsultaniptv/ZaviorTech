import React from "react";

type AnyProps = Record<string, unknown>;

const motionProps = new Set([
  "animate",
  "custom",
  "drag",
  "dragConstraints",
  "exit",
  "initial",
  "layout",
  "layoutId",
  "onViewportEnter",
  "onViewportLeave",
  "transition",
  "variants",
  "viewport",
  "whileDrag",
  "whileFocus",
  "whileHover",
  "whileInView",
  "whileTap",
]);

function filterMotionProps(props: AnyProps) {
  const nextProps: AnyProps = {};

  for (const [key, value] of Object.entries(props)) {
    if (!motionProps.has(key)) {
      nextProps[key] = value;
    }
  }

  return nextProps;
}

const cache = new Map<string, React.ForwardRefExoticComponent<AnyProps>>();

export const motion = new Proxy(
  {},
  {
    get(_target, tag: string) {
      if (!cache.has(tag)) {
        const Component = React.forwardRef<HTMLElement, AnyProps>((props, ref) =>
          React.createElement(tag, {
            ...filterMotionProps(props),
            ref,
          }),
        );
        Component.displayName = `LightMotion.${tag}`;
        cache.set(tag, Component);
      }

      return cache.get(tag);
    },
  },
) as Record<string, React.ForwardRefExoticComponent<AnyProps>>;

export function AnimatePresence({
  children,
}: {
  children?: React.ReactNode;
  [key: string]: unknown;
}) {
  return <>{children}</>;
}

export function useInView(...args: unknown[]) {
  void args;
  return true;
}

export function useSpring(initialValue: number, ...args: unknown[]) {
  void args;
  return {
    get: () => initialValue,
    set: () => undefined,
  };
}

export function useTransform(
  _value: unknown,
  transform: (current: number) => React.ReactNode,
) {
  return transform(0);
}
