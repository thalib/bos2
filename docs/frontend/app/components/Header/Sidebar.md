# Sidebar Navigation Component

## Overview

The Sidebar component provides a collapsible navigation panel using Bootstrap 
5.3 Offcanvas. It serves as a wrapper that displays the Desktop navigation 
component within a sliding sidebar panel. The sidebar is triggered by the home 
button in the Navbar component and provides an alternative navigation interface 
for users.

## Features

- **Bootstrap Offcanvas**: Uses native Bootstrap 5.3 offcanvas functionality
- **Left-Sliding Panel**: Slides in from the left side of the screen
- **Desktop Integration**: Contains the HeaderDesktop component for navigation
- **Responsive Design**: Works across all screen sizes
- **Accessible**: Proper ARIA labels and keyboard navigation support
- **Self-Contained**: No props or external configuration needed
- **Close Button**: Standard Bootstrap close button in header
- **Zero Custom Logic**: Relies entirely on Bootstrap's built-in functionality

## Structure

### Offcanvas Layout
1. **Header**: Contains title ("Navigation") and close button
2. **Body**: Contains the HeaderDesktop component with navigation cards
3. **Container**: Standard Bootstrap offcanvas with left-side positioning

### Integration Points
- **Trigger**: Activated by home button in Navbar component
- **Content**: Displays HeaderDesktop navigation cards
- **ID**: Uses `navigationSidebar` for Bootstrap data-target references

## Bootstrap Classes Used

- `offcanvas`, `offcanvas-start` for left-sliding panel behavior
- `offcanvas-header` for title and close button section
- `offcanvas-title` for accessible title styling
- `btn-close` for standard Bootstrap close button
- `offcanvas-body`, `p-0` for content area without padding
- Standard ARIA attributes for accessibility compliance

## Usage

### Basic Implementation
The component is self-contained and requires no configuration:

```vue
<template>
  <HeaderSidebar />
</template>
```

### Triggering the Sidebar
The sidebar is triggered by adding Bootstrap data attributes to the home button 
in the Navbar component:

```vue
<!-- In Navbar.vue home button -->
<button
  class="btn btn-outline-secondary"
  data-bs-toggle="offcanvas"
  data-bs-target="#navigationSidebar"
  aria-controls="navigationSidebar"
>
  <i class="bi bi-house fs-5"></i>
</button>
```

### Complete Integration
1. **Add Sidebar Component**: Include `<HeaderSidebar />` in your layout
2. **Update Navbar**: Modify home button to trigger the sidebar
3. **No Additional Setup**: Bootstrap handles all show/hide functionality

## Component Structure

```vue
<template>
  <div 
    class="offcanvas offcanvas-start" 
    tabindex="-1" 
    id="navigationSidebar"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">Navigation</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas">
      </button>
    </div>
    <div class="offcanvas-body p-0">
      <HeaderDesktop />
    </div>
  </div>
</template>
```

## Behavior

### Opening
- Triggered by elements with `data-bs-target="#navigationSidebar"`
- Slides in from the left side of the screen
- Displays backdrop overlay on the main content
- Focuses on the offcanvas for accessibility

### Closing
- Close button in header
- Clicking the backdrop overlay
- Pressing the Escape key
- Programmatically via Bootstrap JavaScript API

### Navigation Behavior

#### Regular Pages
- **Direct Navigation**: Clicks navigate immediately using Vue Router
- **No Offcanvas Interaction**: Standard link behavior

#### Inside Offcanvas
- **Close First**: Bootstrap offcanvas closes using programmatic API
- **Wait for Close**: Navigation waits for `hidden.bs.offcanvas` event
- **Then Navigate**: Vue Router navigates after offcanvas fully closes
- **Smooth Experience**: No timing conflicts or interrupted animations

## Responsive Behavior

- **Mobile**: Provides slide-out navigation without taking screen space
- **Tablet**: Comfortable width for navigation cards
- **Desktop**: Alternative to always-visible navigation
- **All Sizes**: Consistent behavior across breakpoints

## Accessibility Features

- **ARIA Labels**: Proper `aria-labelledby` and `aria-controls` attributes
- **Keyboard Navigation**: Focus management and Escape key support
- **Screen Readers**: Descriptive title and close button labels
- **Tab Order**: Proper focus trapping within the offcanvas

## Styling Approach

This component follows the Bootstrap-first approach:
- **No Custom CSS**: Uses only Bootstrap 5.3 offcanvas classes
- **Zero Padding**: `p-0` on offcanvas-body for full-width navigation
- **Standard Bootstrap**: Leverages all built-in offcanvas functionality
- **Consistent Theming**: Matches Bootstrap's design system

## Implementation Notes

- **ID Reference**: Uses `navigationSidebar` as the unique identifier
- **No Props**: Component accepts no external configuration
- **Bootstrap Dependency**: Requires Bootstrap 5.3+ with JavaScript enabled
- **Desktop Component**: Embeds HeaderDesktop without modification
- **Zero Logic**: No Vue.js logic needed - Bootstrap handles everything

## Integration Requirements

### Bootstrap JavaScript
Ensure Bootstrap JavaScript is loaded for offcanvas functionality:

```javascript
// In nuxt.config.ts or main layout
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
```

### Navbar Modification
Update the Navbar home button to trigger the sidebar:

```vue
<!-- Replace the existing goHome() click handler -->
<button
  class="btn btn-outline-secondary"
  data-bs-toggle="offcanvas"
  data-bs-target="#navigationSidebar"
  aria-controls="navigationSidebar"
  aria-label="Open navigation menu"
>
  <i class="bi bi-house fs-5"></i>
</button>
```

## Future Enhancements

- Add animation customization options
- Support for different slide directions
- Programmatic control via Vue composables
- Custom backdrop and close behavior options
- Integration with Vue Router for automatic closing on navigation