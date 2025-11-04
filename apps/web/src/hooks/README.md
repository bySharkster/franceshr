# Custom Hooks

## useScrollToFocus

A reusable hook for managing scroll-to-element functionality with optional highlight effects.

### Features

- Smooth scrolling to any element by ID
- Configurable highlight effect with customizable classes
- Type-safe with TypeScript generics
- Automatic ref management
- Clean API with sensible defaults

### Usage

```tsx
import { useScrollToFocus } from "@/hooks/useScrollToFocus";

function MyComponent() {
  const { scrollToElement, registerRef } = useScrollToFocus();

  const items = [
    { id: "1", name: "Item 1" },
    { id: "2", name: "Item 2" },
  ];

  return (
    <div>
      {/* Trigger button */}
      <button onClick={() => scrollToElement("1")}>Go to Item 1</button>

      {/* Register refs for scrollable elements */}
      {items.map((item) => (
        <div key={item.id} ref={registerRef(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  );
}
```

### API

#### Parameters

```tsx
useScrollToFocus<T extends HTMLElement = HTMLDivElement>(options?: ScrollToFocusOptions)
```

**Options:**

- `behavior?: ScrollBehavior` - Scroll behavior (default: `"smooth"`)
- `block?: ScrollLogicalPosition` - Vertical alignment (default: `"center"`)
- `highlightDuration?: number` - Duration of highlight in ms (default: `2000`)
- `highlightClasses?: string[]` - CSS classes for highlight effect (default: `["ring-2", "ring-primary", "ring-offset-2", "ring-offset-background"]`)

#### Returns

```tsx
{
  refs: RefObject<Map<string, T>>,
  scrollToElement: (id: string) => void,
  registerRef: (id: string) => (el: T | null) => void
}
```

### Examples

#### Basic Usage

```tsx
const { scrollToElement, registerRef } = useScrollToFocus();

// Register element
<div ref={registerRef("my-element")}>Content</div>

// Scroll to it
<button onClick={() => scrollToElement("my-element")}>Scroll</button>
```

#### Custom Options

```tsx
const { scrollToElement, registerRef } = useScrollToFocus({
  behavior: "auto",
  block: "start",
  highlightDuration: 3000,
  highlightClasses: ["bg-yellow-200", "border-2", "border-yellow-500"],
});
```

#### Without Highlight Effect

```tsx
const { scrollToElement, registerRef } = useScrollToFocus({
  highlightClasses: [], // No highlight
});
```

#### With Custom Element Type

```tsx
const { scrollToElement, registerRef } = useScrollToFocus<HTMLButtonElement>();

<button ref={registerRef("my-button")}>Click me</button>;
```

### Real-World Example

See `src/app/app/page.tsx` for a complete implementation where users can click "Ver Detalles" on an order to scroll to and highlight the corresponding onboarding data card.
