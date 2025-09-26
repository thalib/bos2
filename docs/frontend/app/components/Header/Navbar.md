# Navbar Component

## Overview

The Navbar component provides application navigation with search functionality 
and user menu. It follows Bootstrap 5.3 styling conventions and uses only 
Bootstrap classes without any custom CSS.

## Features

- **Responsive Design**: Adapts to different screen sizes using Bootstrap 
  responsive utilities
- **Search Functionality**: Toggle search input with escape key support
- **User Menu**: Dropdown menu with click-outside-to-close behavior
- **Dynamic Page Title**: Automatically displays current page title based on 
  route
- **Keyboard Navigation**: Escape key closes both search and user menu
- **Accessibility**: Proper focus management and ARIA attributes
- **Bootstrap-Only Styling**: No custom CSS, uses only Bootstrap 5.3 classes

## Props

This component accepts no props and manages all state internally.

## Events

This component emits no events and handles all user interactions internally.

## Implementation Details

### State Management
- `showSearch`: Controls search input visibility
- `showUserMenu`: Controls user dropdown visibility  
- `searchQuery`: Stores current search input value

### Key Features
- **Route-based Title**: Automatically generates page title from current route
- **Keyboard Shortcuts**: Escape key closes open menus
- **Click Outside**: Clicking outside dropdown closes user menu
- **Focus Management**: Automatically focuses search input when opened

### Bootstrap Classes Used
- `navbar`, `navbar-expand-lg`, `navbar-dark`, `bg-primary` for main navbar
- `btn`, `btn-outline-light` for action buttons
- `dropdown`, `dropdown-menu` for user menu
- `input-group` for search functionality
- Responsive utilities: `d-none`, `d-sm-inline`, `d-lg-block`
- Spacing utilities: `me-2`, `me-3`, `mt-2`, `mb-0`
- Shadow utilities: `shadow-sm` for subtle depth effects
- Border utilities: `border-bottom`, `border-top` for visual separation

## Usage Example

```vue
<template>
  <Navbar />
</template>

<script setup lang="ts">
// Component is self-contained and requires no configuration
</script>
```

## Styling Approach

This component follows the strict Bootstrap-first approach:
- **No custom CSS**: All styling achieved through Bootstrap utility classes
- **Responsive design**: Uses Bootstrap's grid system and responsive utilities
- **Consistent theming**: Adheres to Bootstrap's color and spacing system
- **Accessibility**: Leverages Bootstrap's built-in accessibility features

## Future Enhancements

- Implement actual search functionality
- Add user authentication integration
- Add breadcrumb navigation
- Implement notification badges