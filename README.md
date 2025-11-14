# @gv/drawer

An unstyled draggable drawer component for React.

Based on [@radix-ui/react-dialog](https://www.radix-ui.com/primitives/docs/components/dialog) and inspired by Emil Kowalski's awesome [Vaul](https://vaul.emilkowal.ski/).

Demo: [gv-drawer.vercel.app](https://gv-drawer.vercel.app)

## Documentation

For full documentation, visit [gv-drawer.vercel.app/docs](https://gv-drawer.vercel.app/docs).

### Installation

Install the component from your command line.

```shell
npm i @gv/drawer
```

### Usage

Use the drawer in your app.

```jsx
import { Drawer } from '@gv/drawer'

export const MyComponent = () => (
  <Drawer.Root>
    <Drawer.Trigger>Open Drawer</Drawer.Trigger>
    <Drawer.Portal>
      <Drawer.Overlay />
      <Drawer.Content>...</Drawer.Content>
    </Drawer.Portal>
  </Drawer.Root>
)
```

### API Reference

To see components props, visit the full [documentation](https://gv-drawer.vercel.app/docs).
