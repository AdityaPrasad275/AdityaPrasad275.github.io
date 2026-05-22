# Content Schema

One content item is the shared primitive for both `reel` and `post`.

## Core
- `id`: stable unique id
- `kind`: `reel` or `post`
- `slug`: optional route-friendly id
- `canonicalUrl`: optional permalink for sharing/opening
- `createdAt`: optional timestamp

## Copy
- `content.question`: opening prompt or hook
- `content.kicker`: small label above the main title
- `content.title`: main heading
- `content.summary`: short supporting text
- `content.points[]`: optional supporting lines
- `content.footerCaption`: optional footer line
- `content.linkPrompt`: optional label before links

## Engagement
- `engagement.comments[]`: fake or real comment items
- `engagement.likesCount`: optional count
- `engagement.allowComments`: optional behavior flag
- `engagement.allowLikes`: optional behavior flag

## Links
- `links[]`: icon links or CTAs attached to the item

## Surface Hints
- `theme.accent`: highlight color for the renderer
- `theme.background`: background gradient or color

Surface hints choose the visual style. They do not decide mobile vs desktop layout.
