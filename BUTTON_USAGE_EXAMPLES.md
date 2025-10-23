# Button Component - Icon Usage Examples

## How to Use Icons with the Button Component

The Button component accepts `iconLeft` and `iconRight` props that take **React components** (not strings).

### Basic Usage

```tsx
import { Button } from "@/components/atoms/ui/button";
import { ArrowRight, Check, Loader2, Trash2 } from "lucide-react";

// Icon on the left
<Button iconLeft={<Check />}>
  Success
</Button>

// Icon on the right
<Button iconRight={<ArrowRight />}>
  Continue
</Button>

// Both icons
<Button iconLeft={<Check />} iconRight={<ArrowRight />}>
  Complete
</Button>
```

### Loading State Example

```tsx
import { Button } from "@/components/atoms/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";

function SubmitButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    // ... your async logic
    setIsLoading(false);
  };

  return (
    <Button
      onClick={handleSubmit}
      disabled={isLoading}
      iconRight={isLoading ? <Loader2 className="animate-spin" /> : null}
    >
      {isLoading ? "Submitting..." : "Submit"}
    </Button>
  );
}
```

### Icon-Only Button

```tsx
import { Button } from "@/components/atoms/ui/button";
import { Home } from "lucide-react";

<Button variant="ghost" size="icon">
  <Home />
</Button>;
```

### Different Icon Positions

```tsx
import { Button } from "@/components/atoms/ui/button";
import { ArrowLeft, ArrowRight, Download, Upload } from "lucide-react";

// Back button - icon on left
<Button variant="outline" iconLeft={<ArrowLeft />}>
  Back
</Button>

// Next button - icon on right
<Button iconRight={<ArrowRight />}>
  Next
</Button>

// Upload button - icon on left
<Button variant="secondary" iconLeft={<Upload />}>
  Upload File
</Button>

// Download button - icon on right
<Button variant="secondary" iconRight={<Download />}>
  Download
</Button>
```

### Delete Button with Icon

```tsx
import { Button } from "@/components/atoms/ui/button";
import { Trash2 } from "lucide-react";

<Button variant="destructive" iconLeft={<Trash2 />}>
  Delete
</Button>;
```

## Available Icons

You can use any icon from [Lucide React](https://lucide.dev/icons/). Just import the icon you need:

```tsx
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
  Home,
  Loader2,
  Mail,
  Plus,
  Save,
  Search,
  Settings,
  Trash2,
  Upload,
  User,
  X,
} from "lucide-react";
```

## Key Points

1. **Import the icon component** from `lucide-react`
2. **Pass it as JSX** to `iconLeft` or `iconRight` props: `iconLeft={<IconName />}`
3. **Icons are optional** - only render when provided
4. **Icons auto-size** - they inherit the button's size styling
5. **Add custom classes** to icons if needed: `<Loader2 className="animate-spin" />`
