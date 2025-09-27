# Desktop Navigation Component

## Overview

The Desktop component provides a horizontal navigation bar designed for desktop 
layouts. It features centered navigation cards that display as Bootstrap cards 
with icons and titles. The component is **self-contained** - developers should 
edit the component directly to customize navigation links. It follows Bootstrap 
5.3 styling conventions with minimal custom CSS for enhanced hover effects.

## Features

- **Self-Contained Design**: No props required, all configuration inside component
- **Centered Layout**: Navigation cards centered horizontally across full width
- **Card-Based Navigation**: Navigation items display as Bootstrap cards with icon and title
- **Responsive Design**: Cards wrap to multiple rows when space is limited
- **Hover Effects**: Subtle elevation and shadow effects on card hover
- **Bootstrap Icons**: Full support for Bootstrap Icons iconography
- **Mobile-First**: Responsive design that adapts to smaller screens
- **TypeScript Support**: Full type safety with defined interfaces

## Configuration

To customize the component, edit the navigation links directly in the component file:

### Navigation Links
Edit the `navigationLinks` array in the component:

```typescript
const navigationLinks: NavigationLink[] = [
  { title: "Home", link: "/", icon: "bi bi-house" },
  { title: "Dashboard", link: "/dashboard", icon: "bi bi-speedometer2" },
  { title: "Profile", link: "/profile", icon: "bi bi-person" }
]
```

### NavigationLink Interface
```typescript
interface NavigationLink {
  title: string    // Display text for the navigation item
  link: string     // URL path for navigation (used with NuxtLink)  
  icon: string     // Bootstrap Icons class (e.g., "bi bi-house")
}
```

## Layout Structure

1. **Full Width Navigation**: Navigation cards centered across the entire navbar width
2. **Flex-Wrap Container**: Cards automatically wrap to multiple rows when needed

## Card Design

Each navigation item renders as a Bootstrap card with:
- **Icon**: Bootstrap Icons class at the top (fs-5 size)
- **Title**: Text label below the icon (small font weight)
- **Dimensions**: 80px min-width, 120px max-width, 80px min-height
- **Hover Effects**: Translates up 2px with enhanced shadow
- **Colors**: Primary color for icons, dark text for labels

## Bootstrap Classes Used

- `navbar`, `navbar-expand`, `navbar-light`, `bg-white` for main navigation
- `border-bottom`, `shadow-sm` for visual separation and depth
- `container-fluid`, `px-3` for layout and spacing
- `d-flex`, `align-items-center`, `justify-content-center` for flexbox layout
- `flex-wrap`, `gap-2` for responsive card wrapping
- `card`, `card-body`, `border-0`, `shadow-sm` for card styling
- `text-decoration-none` for clean link styling
- `fw-bold`, `fw-medium` for typography weights
- `text-primary`, `text-dark` for color scheme

## Usage Examples

### Basic Usage (Self-Contained)
```vue
<template>
  <HeaderDesktop />
</template>
```

### Customizing Navigation Links
Edit the component file directly:

```typescript
// In Desktop.vue <script setup>
const navigationLinks: NavigationLink[] = [
  { title: "Home", link: "/", icon: "bi bi-house" },
  { title: "Dashboard", link: "/dashboard", icon: "bi bi-speedometer2" },
  { title: "Analytics", link: "/analytics", icon: "bi bi-graph-up" },
  { title: "Settings", link: "/settings", icon: "bi bi-gear" }
]
```

### Adding More Navigation Items
Add additional navigation links to the array:

```typescript
// In Desktop.vue <script setup>
const navigationLinks: NavigationLink[] = [
  { title: "Home", link: "/", icon: "bi bi-house" },
  { title: "Dashboard", link: "/dashboard", icon: "bi bi-speedometer2" },
  { title: "Analytics", link: "/analytics", icon: "bi bi-graph-up" },
  { title: "Settings", link: "/settings", icon: "bi bi-gear" },
  { title: "Profile", link: "/profile", icon: "bi bi-person" }
]
```

## Responsive Behavior

- **Desktop**: Cards display in a horizontal row
- **Tablet**: Cards may wrap to multiple rows as needed
- **Mobile**: Cards stack vertically with consistent spacing
- **Flex-wrap**: Navigation cards automatically wrap when container width 
  is insufficient

## Styling Approach

This component follows the Bootstrap-first approach with minimal custom CSS:
- **Bootstrap Primary**: All layout and base styling through Bootstrap utilities
- **Custom CSS**: Limited to hover effects and card dimensions only
- **Responsive**: Leverages Bootstrap's flexbox system for automatic wrapping
- **Accessibility**: Uses proper semantic navigation structure and ARIA labels
- **Self-Contained**: No external dependencies or prop configuration required

## TypeScript Interface

```typescript
interface NavigationLink {
  title: string    // Navigation item display name
  link: string     // Route path for NuxtLink navigation
  icon: string     // Bootstrap Icons CSS class
}
```

## Implementation Notes

- **Edit the Component Directly**: All configuration is done by editing constants in the component file
- **No Props**: Component accepts no external configuration to keep it simple and self-contained
- **Default Navigation**: Includes Home, Dashboard, and Profile links out of the box
- **Centered Layout**: Navigation takes full width of navbar for balanced appearance

## Future Enhancements

- Add active route highlighting for navigation cards
- Implement user action area with profile dropdown
- Add notification badges to navigation items
- Support for conditional navigation based on user roles
- Keyboard navigation support for accessibility