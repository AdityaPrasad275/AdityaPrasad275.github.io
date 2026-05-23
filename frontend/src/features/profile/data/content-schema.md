# Profile Content Schema

The profile page uses one shared data model for mobile and desktop.

## Identity
- `identity.name`: display name
- `identity.handle`: profile handle
- `identity.title`: short role line
- `identity.location`: optional location
- `identity.bio`: short profile bio
- `identity.avatar.type`: avatar rendering hint
- `identity.avatar.value`: initials, image key, or other renderer input

## Highlights
- `highlights[]`: top-row links or featured actions
- `highlights[].label`: visible text
- `highlights[].href`: destination
- `highlights[].icon`: icon key for the renderer
- `highlights[].kind`: `contact`, `social`, `document`, or `feature`

## Posts Grid
- `posts[]`: ordered profile posts
- `posts[].title`: grid title and detail title
- `posts[].summary`: short one-line preview
- `posts[].grid`: grid-only preview data
- `posts[].grid.eyebrow`: small label in the card
- `posts[].grid.thumbnailText`: text the grid can show inside the thumbnail
- `posts[].grid.accent`: accent color for the card
- `posts[].grid.background`: background gradient or solid fill

## Detail View
- `posts[].detail.format`: `article` or `carousel`
- `posts[].detail.sections[]`: article-style text blocks
- `posts[].detail.slides[]`: carousel-style slides
- `posts[].detail.links[]`: actions from the expanded view

## Principle
Keep thumbnail data abstract. The data layer should describe meaning, not pixels.
Use the renderer to decide whether `thumbnailText` becomes text, a generated graphic, or an image later.
