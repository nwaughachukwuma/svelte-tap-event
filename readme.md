# svelte-tap-event

Simple click/tap support in Svelte for devices of all input forms.

## Challenge

Read the post on [The Annoying Mobile Double-Tap Link Issue](https://css-tricks.com/annoying-mobile-double-tap-link-issue/).

## Motivation

The goal is to provide a consistent interface for all device types and as well solve touch-twice-to-activate a click issue on iOS.

TODO:

- [ ] API description
- [ ] Example

## Example

See a demo here: https://svelte.dev/repl/283339196318412e8e649f5999e8819c?version=3.44.0

## Installation

```
pnpm install svelte-tap-event

yarn add svelte-tap-event

npm install svelte-tap-event
```

Note [typescript project]: to use it on a `HTMLElement` e.g. a div or a tag, create a `declaration.d.ts` file with the following content and ensure to reference the file in `tsconfig.json`

```ts
declare namespace svelte.JSX {
  export interface DOMAttributes<T> {
    ontap?: CompositionEventHandler<T>
  }
}
```