/**
 * Icon Mapping Library
 *
 * This library provides utilities for dynamically rendering Lucide icons based on string names.
 * Useful for Storybook controls, dynamic UIs, and configuration-driven icon rendering.
 *
 * @example
 * // Basic usage - render an icon from a string name
 * import { getIcon } from "@/lib/helpers/icon-map";
 * const icon = getIcon("home");
 *
 * @example
 * // With className
 * const spinningIcon = getIcon("loader2", "animate-spin");
 *
 * @example
 * // Get the component class (not an instance)
 * import { getIconComponent } from "@/lib/helpers/icon-map";
 * const HomeIcon = getIconComponent("home");
 * if (HomeIcon) return <HomeIcon className="w-4 h-4" />;
 *
 * @example
 * // Get all available icon names
 * import { getIconNames } from "@/lib/helpers/icon-map";
 * const iconOptions = getIconNames(); // ["home", "arrow-left", "arrow-right", ...]
 *
 * @example
 * // Use in Storybook argTypes
 * import { iconMap } from "@/lib/helpers/icon-map";
 * argTypes: {
 *   icon: {
 *     control: "select",
 *     options: [null, ...Object.keys(iconMap)],
 *   }
 * }
 */

import { ArrowLeft, ArrowRight, Check, Home, Loader2, type LucideIcon, Trash2 } from "lucide-react";

// Icon mapping for dynamic icon rendering
export const iconMap = {
  home: Home,
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  check: Check,
  loader2: Loader2,
  trash2: Trash2,
} as const;

export type IconName = keyof typeof iconMap | null;

/**
 * Converts an icon name string to a Lucide React component
 * @param iconName - The name of the icon from the iconMap
 * @param className - Optional className to apply to the icon
 * @returns React element of the icon or null if iconName is null/invalid
 */
export const getIcon = (
  iconName: IconName,
  className?: string,
): React.ReactElement<{ className?: string }> | null => {
  if (!iconName) return null;
  const IconComponent = iconMap[iconName];
  return IconComponent ? <IconComponent className={className} /> : null;
};

/**
 * Gets the icon component class (not an instance)
 * @param iconName - The name of the icon from the iconMap
 * @returns The Lucide icon component class or null
 */
export const getIconComponent = (iconName: IconName): LucideIcon | null => {
  if (!iconName) return null;
  return iconMap[iconName] || null;
};

/**
 * Returns all available icon names
 */
export const getIconNames = (): string[] => {
  return Object.keys(iconMap);
};
