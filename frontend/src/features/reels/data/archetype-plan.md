# Reel Archetype Plan

## Goal

Move reel rendering away from one growing template and toward a small set of explicit content archetypes.

The current `ReelContent.jsx` works, but it is starting to behave like a template engine. As more content shapes appear, such as contact links and carousel slides, the component will become harder to reason about if every optional field is handled in one place.

## Recommendation

Use explicit archetypes.

Do not make every reel a carousel by default. A one-slide carousel sounds clean, but it makes simple reels carry carousel complexity forever: slide state, dots, nested gestures, horizontal swipe handling, link handling, and accessibility edge cases.

Recommended initial archetypes:

- `statement`: a normal single-screen reel with question, kicker, title, summary, and optional points.
- `contact`: a link-forward reel where social/contact links are primary UI.
- `carousel`: a multi-slide reel for blog previews, project explainers, or longer narratives.

## Data Shape

### Statement

```js
{
  id: 'who-are-you',
  kind: 'reel',
  archetype: 'statement',
  canonicalUrl: '/reels/who-are-you',
  content: {
    question: 'Who are you?',
    kicker: 'Identity',
    title: 'Aditya Prasad',
    summary: 'I build data systems for the physical world.',
    points: ['Battery Intelligence @ Ola Electric', 'Hardware-software boundary'],
    footerCaption: 'Building data systems at the hardware-software boundary.',
  },
}
```

### Contact

```js
{
  id: 'contact',
  kind: 'reel',
  archetype: 'contact',
  canonicalUrl: '/reels/contact',
  content: {
    question: 'How do I reach you?',
    kicker: 'Contact',
    title: 'Say hi.',
    summary: 'Email is the fastest route. Links are here if you want more context.',
    footerCaption: 'Email is fastest. Links are here if you need context.',
  },
  links: [
    { label: 'Email', href: 'mailto:adityanprasad275@gmail.com', external: false, icon: 'mail' },
    { label: 'GitHub', href: 'https://github.com/AdityaPrasad275', external: true, icon: 'github' },
  ],
}
```

### Carousel

```js
{
  id: 'atlasdb-blog',
  kind: 'reel',
  archetype: 'carousel',
  canonicalUrl: '/reels/atlasdb-blog',
  content: {
    footerCaption: 'Read the full write-up.',
    slides: [
      {
        question: 'How does AtlasDB work?',
        kicker: 'Database Internals',
        title: 'I built a relational database from scratch.',
        summary: 'A short tour through storage, indexing, and durability.',
      },
      {
        question: 'What was hard?',
        kicker: 'Storage Engine',
        title: 'B+ trees are simple until they are not.',
        summary: 'Splits, page layout, and consistency become the real game.',
      },
      {
        question: 'Want the deep dive?',
        kicker: 'Write-up',
        title: 'Read the full post.',
        summary: 'The complete breakdown lives in the blog.',
        links: [{ label: 'Read post', href: '/blog/atlasdb', external: false }],
      },
    ],
  },
}
```

## Component Shape

`ReelContent.jsx` should become a dispatcher, not the whole template.

```jsx
function ReelContent({ reel, index, total }) {
  if (reel.archetype === 'carousel') {
    return <CarouselReelContent reel={reel} index={index} total={total} />
  }

  if (reel.archetype === 'contact') {
    return <ContactReelContent reel={reel} index={index} total={total} />
  }

  return <StatementReelContent reel={reel} index={index} total={total} />
}
```

Suggested files:

- `components/ReelContent.jsx`: archetype dispatcher.
- `components/archetypes/StatementReelContent.jsx`: normal text reel.
- `components/archetypes/ContactReelContent.jsx`: contact/link reel.
- `components/archetypes/CarouselReelContent.jsx`: slide-based reel.

## Responsibility Boundary

Keep reel navigation and carousel navigation separate.

- `ReelFeed` owns vertical reel navigation.
- `DesktopReelScroller` and `MobileReelScroller` own moving between reels.
- `CarouselReelContent` owns slide index, dots, next/previous buttons, and any horizontal gesture behavior.
- Link clicks should stop pointer propagation so they do not accidentally trigger reel or carousel gestures.

## Carousel Rollout

Build carousel behavior in stages.

1. Add archetype fields to data.
2. Split `ReelContent.jsx` into dispatcher plus archetype components.
3. Implement carousel with buttons and dots only.
4. Add keyboard support for carousel controls.
5. Add horizontal swipe after the data model and button behavior are stable.

This avoids mixing horizontal carousel swipe with vertical reel swipe too early.

## Schema Update

Update `content-schema.md` with an `archetype` section.

Recommended schema additions:

```md
## Archetype

- `archetype`: controls which renderer handles the item.
- Supported values:
  - `statement`: one-screen text reel
  - `contact`: contact/link reel
  - `carousel`: multi-slide reel

## Carousel Content

- `content.slides[]`: ordered slide list.
- Each slide may contain:
  - `question`
  - `kicker`
  - `title`
  - `summary`
  - `points[]`
  - `links[]`
- `content.footerCaption`: optional caption shared across the carousel.
```

## Design Rule

Prefer separate archetype components over a single component with many optional branches.

If two archetypes become identical later, merge them then. Do not prematurely make the default renderer handle every possible content shape.
