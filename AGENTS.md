# AGENTS.md

## Project

This is a React + Vite + TypeScript + Tailwind CSS v4 portfolio project for Pedro Coelho.

The goal is to turn a UI Design AV2 portfolio concept into a working responsive website.

This is a static portfolio. Do not add a backend, database, authentication, CMS, state manager, or unnecessary architecture.

## Stack

Use:

- React
- Vite
- TypeScript
- Tailwind CSS v4
- React Router

Avoid unless explicitly requested:

- Next.js
- Astro
- Redux
- Zustand
- Context providers
- shadcn/ui
- complex animation libraries
- unnecessary utility folders
- unnecessary abstractions

## Main design direction

The site should feel:

- dark
- minimal
- imagetic
- technical
- academic
- cybersecurity-oriented
- slightly nerdy, but serious

It should not feel:

- corporate SaaS
- generic startup landing page
- colorful dashboard
- childish
- overdecorated
- text-heavy
- blue/cyan cyberpunk

## Visual identity

Use a dark red/amber system.

Main colors:

- background: #080807
- surface: #11100e
- elevated: #181512
- soft: #211a13
- border: #302820
- primary text: #ece6d8
- body text: #a89f91
- muted text: #6f665b
- red: #e5484d
- amber: #f5b84b

Rules:

- No blue accent system.
- Red is for active state, selected nav, security signal, important action.
- Amber is for metadata, lab references, small highlights, solar motif.
- Keep contrast readable.
- Use accents sparingly.

## Typography

Use a serious nerdy type system.

Preferred:

- JetBrains Mono for headings, nav, metadata, labels.
- IBM Plex Sans or system sans for longer body text.

Do not use playful fonts.

## Poster / solar influence

There is a subtle visual influence from the poster language of “Black God, White Devil” / “Deus e o Diabo na Terra do Sol”.

Do not copy the poster.

Abstractly borrow:

- red and amber intensity
- sunburst / solar rays
- off-white disk
- rough print feeling
- strong graphic contrast
- asymmetrical composition

Use this only as a controlled motif in large visual areas:

- home atmospheric block
- GLHF detail hero
- Let’s talk background

Do not place body text directly over bright rays.

## Information architecture

Routes:

- `/` home
- `/project`
- `/code`
- `/text`
- `/project/glhf`

There is no `whoami` page.

The personal/about information should be minimal and folded into the home page intro or footer, not a separate route.

Navigation labels:

- home
- project
- code
- text

Do not use slash labels such as `/project` in the nav.

## Content sections

Home should include:

- minimal hero
- project section
- code section
- text section
- let's talk
- footer

Project page:

- security labs, vulnerable apps, tooling experiments
- large visual cards
- GLHF should be the strongest project

Code page:

- small experiments, scripts, data pipelines, applied ML prototypes
- use the same card system as Project

Text page:

- reports, notes, technical writeups
- make reports feel like artifacts/documents, not blog posts

GLHF detail page:

- title: GLHF
- subtitle: Deliberately vulnerable Flask lab for practicing web exploitation.
- metadata: Flask, Python, Docker, vulnerable lab, v0.1-beta
- challenge map: Lobby → User → Direct → Board → Root
- vulnerability classes: enumeration, brute-force weakness, session/cookie flaws, IDOR, unrestricted upload, XSS, CSRF, SQL injection
- present as a portfolio artifact, not a step-by-step exploit tutorial

## Component rules

Keep the component set minimal.

Use only:

- Header
- Footer
- LetsTalk
- VisualCard
- SolarBackground
- Tag

Do not create extra components unless something is repeated at least 3 times.

Use one main card family: `VisualCard`.

`VisualCard` can support project, code, and text entries through props and content. Do not create unrelated card styles.

## Styling rules

Use Tailwind CSS v4.

Keep global CSS minimal.

Use `src/styles/index.css` for:

- Tailwind import
- theme tokens
- base body styles
- a few reusable layout classes if necessary

Prefer mobile-first layouts.

Avoid huge class strings when a reusable class is clearer.

## Code style

Keep files small and obvious.

Avoid overengineering.

Prefer readable React components over clever abstractions.

Do not create:

- hooks folder
- services folder
- providers folder
- store folder
- lib folder
- utils folder

Unless explicitly requested later.

## Current goal

Create a clean baseline.

Remove Vite starter files and unused assets.

Build a minimal responsive version of the site with placeholder visual blocks and real content structure.

The first version should be simple, clean, and easy to iterate.