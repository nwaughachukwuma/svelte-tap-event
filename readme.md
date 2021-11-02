# svelte-tap-event

Simple cross platform click/touch event support for Svelte.

## Challenge

Read the post on [The Annoying Mobile Double-Tap Link Issue](https://css-tricks.com/annoying-mobile-double-tap-link-issue/).

## Motivation

The goal is to provide a consistent interface for all device types and as well solve touch-twice-to-activate a click/tap issue on iOS.

TODO:

- [X] API description
- [X] Example

## Installation

```bash
pnpm install svelte-tap-event

yarn add svelte-tap-event

npm install svelte-tap-event
```

## Example

See a demo here: https://svelte.dev/repl/283339196318412e8e649f5999e8819c?version=3.44.0

```svelte
<script>
import tapEvent from 'svelte-tap-event'

let tapCounter = 0
const onTap = () => {
	tapCounter++
}
</script>

<div use:tapEvent on:tap={onTap}>
	<h1 class="header">Tap me!</h1>

	{#if tapCounter}
		<p>
			Tapped x{tapCounter}
		</p>
	{/if}

</div>
```

You can get what event triggered the tap - click or touch

```svelte
<script>
import tapEvent from 'svelte-tap-event'

const onTap = ({detail}: CustomEvent) => {
  if (detail.type === 'touch') {
    // do something
  } else {
    // it's a click - do something else
  }
}
</script>

<div use:tapEvent on:tap={onTap}>
...
</div>
```

Note [typescript project]: to use it on a `HTMLElement` e.g. a div or a tag, create a `declaration.d.ts` file with the following content and ensure to reference the file in `tsconfig.json`

```ts
declare namespace svelte.JSX {
  export interface DOMAttributes<T> {
    ontap?: (e: CustomEvent<T>) => void;
  }
}
```

## API

### tapEvent

Instance of `CustomEvent` containing event data with a `detail` payload

**detail**<br>
Type: object

Defined as:

```ts
detail: {
  type: 'click' | 'touch';
}
```

- 'click': triggered by a mouse action
- 'touch': triggered by a touch action
