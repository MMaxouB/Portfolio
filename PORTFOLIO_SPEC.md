# PORTFOLIO — CAHIER DES CHARGES COMPLET

> Document de référence destiné au développeur chargé de concevoir et développer le portfolio.
> Le site doit être traité comme un vrai produit logiciel, pas comme une simple page CV.

---

# 0. VISION GÉNÉRALE

## 0.1 Objectif

Construire un portfolio personnel haut de gamme centré principalement sur le développement logiciel, avec une spécialisation secondaire mais clairement identifiable en cybersécurité.

Le portfolio doit produire trois impressions simultanées :

1. **Visuellement exceptionnel** : interface premium, sombre, moderne, futuriste, maîtrisée.
2. **Techniquement crédible** : le site lui-même doit démontrer de la qualité frontend, de l’architecture, de l’UX, de la performance et de l’attention au détail.
3. **Professionnel** : les projets personnels, open source, commerciaux et sous NDA doivent être présentés de façon cohérente sans donner l’impression d’un site étudiant ou d’un catalogue artificiel.

Le visiteur doit pouvoir comprendre le profil en quelques secondes, puis approfondir s’il le souhaite.

## 0.2 Positionnement

Positionnement recommandé :

> **Software Engineer / Developer with a security mindset**

Le portfolio n’est pas principalement un portfolio de pentester. La partie développement doit dominer. La cybersécurité reste une spécialisation forte et différenciante.

Le site doit mettre en avant :

- développement logiciel ;
- architecture ;
- backend ;
- automatisation ;
- IA / systèmes agents ;
- SaaS ;
- développement web ;
- Linux ;
- cybersécurité ;
- capacité à concevoir des systèmes complets.

## 0.3 Ce que le site ne doit PAS être

Interdictions de direction artistique :

- esthétique « hacker » cliché ;
- Matrix rain ;
- cadenas partout ;
- crânes ;
- terminal vert fluo comme identité principale ;
- glitch permanents ;
- animations gratuites ;
- musique automatique ;
- surcharge de particules ;
- arrière-plans de réseau cyber clichés ;
- liste interminable de technologies sans preuve ;
- auto-évaluation prétentieuse du type « expert de tout ».

Le terminal est uniquement un easter egg / élément secondaire.

---

# 1. DIRECTION ARTISTIQUE

## 1.1 Référence visuelle

Direction générale :

> **Premium dark futuristic developer product — inspiré des interfaces SaaS modernes, de Linear/Vercel/Raycast, avec une légère dimension cyber mais sans cliché.**

La référence visuelle principale doit évoquer :

- produit logiciel premium ;
- sophistication ;
- précision ;
- calme visuel ;
- profondeur ;
- futur proche ;
- interface conçue par un ingénieur / designer produit.

## 1.2 Palette

Base sombre :

```text
Background primary     #08090B
Background secondary   #0B0D10
Surface / card         #101216
Surface hover          #14171C
Border subtle          rgba(255,255,255,0.06)
Border hover           rgba(255,255,255,0.12)
Text primary           #F5F7FA
Text secondary         #A1A7B0
Text muted             #6F7681
```

Accent : une seule famille dominante, froide et discrète.

Préférence : bleu électrique / bleu-violet froid / cyan très désaturé.

L’accent doit être réservé à :

- CTA principaux ;
- liens actifs ;
- états interactifs ;
- détails graphiques ;
- petits halos ;
- éléments sélectionnés.

Éviter un système arc-en-ciel.

## 1.3 Profondeur

Le fond peut utiliser :

- gradients radiaux très subtils ;
- halos lumineux localisés ;
- grain très léger si performant ;
- superpositions de surfaces ;
- transparences légères.

Le visiteur doit percevoir la profondeur sans identifier immédiatement un « effet ».

## 1.4 Typographie

Direction : sans-serif moderne, géométrique, très lisible.

Choix prioritaires :

1. Geist ;
2. Inter ;
3. Manrope ;
4. Satoshi / équivalent si licence et performance appropriées.

Les titres doivent avoir une échelle très grande.

Hiérarchie :

```text
PETIT LABEL / EYEBROW
↓
TRÈS GRAND TITRE
↓
DESCRIPTION COURTE
↓
CTA / MÉTADONNÉES
```

Ne pas utiliser plus de deux familles typographiques au total.

## 1.5 Coins et formes

- cartes : radius moyen à grand ;
- boutons : radius cohérent avec les cartes, mais plus compact ;
- éviter les coins excessivement arrondis façon application mobile enfantine ;
- éviter les rectangles strictement plats partout ;
- conserver une géométrie cohérente sur tout le site.

## 1.6 Bordures

Les bordures doivent être très fines et presque invisibles au repos.

Au hover : légère augmentation de contraste + lumière très subtile.

Pas de bordures néon épaisses.

---

# 2. PRINCIPES UX

## 2.1 Temps d’attention

Hypothèse principale : le visiteur passe peu de temps sur la première visite.

Le site doit donc fonctionner à trois profondeurs :

### Niveau 1 — 5 à 15 secondes

Le visiteur comprend :

- qui est la personne ;
- ce qu’elle construit ;
- qu’elle est orientée software ;
- qu’elle possède une spécialisation cyber ;
- où trouver les projets.

### Niveau 2 — 30 à 90 secondes

Le visiteur voit :

- quelques projets sélectionnés ;
- compétences principales ;
- timeline ;
- quelques preuves techniques.

### Niveau 3 — lecture approfondie

Le visiteur explore :

- case studies ;
- projets privés ;
- projets NDA ;
- architecture ;
- GitHub ;
- write-ups cyber ;
- détails techniques.

## 2.2 Règle de densité

Ne jamais remplir artificiellement les pages.

Un petit nombre de très bons projets doit paraître plus fort qu’un grand nombre de projets moyens.

---

# 3. ARCHITECTURE DU SITE

Navigation principale :

```text
Home
Projects
Expertise
Timeline
About
Contact
```

Éventuellement une action secondaire `⌘K / Ctrl+K` pour ouvrir la commande/recherche globale.

Pages :

```text
/
/projects
/projects/[slug]
/expertise
/timeline
/about
/contact
/cyber
```

`/cyber` est une page spécialisée, mais la navigation principale reste orientée software.

Possibilité d’avoir `/lab` à la place ou en plus de `/cyber` si des projets expérimentaux apparaissent plus tard.

---

# 4. PAGE HOME

## 4.1 Structure

```text
HOME
│
├── Hero
├── Selected Projects
├── Expertise Preview
├── Timeline Preview
├── Cyber / Lab Preview
├── Contact CTA
└── Footer + Terminal Easter Egg
```

## 4.2 Hero

Le hero doit être immédiatement lisible.

Structure :

```text
SMALL EYEBROW
SOFTWARE / ENGINEERING / SECURITY

BUILDING SOFTWARE
THAT MATTERS.

[ 1–2 phrases très courtes décrivant le profil ]

[ Explore projects ]   [ About me ]
```

Le wording exact sera défini dans le contenu final ; la structure est prioritaire.

## 4.3 Élément visuel principal

Un élément abstrait derrière ou à côté du texte :

- géométrie ;
- système de nœuds ;
- architecture ;
- objet 3D abstrait ;
- réseau de formes minimal ;
- gradient animé.

Il doit renforcer l’univers logiciel / engineering.

Il ne doit pas représenter littéralement un hacker, un cadenas ou un ordinateur.

## 4.4 Animations du hero

Entrée :

- eyebrow : fade + légère translation ;
- headline : apparition par bloc / ligne ;
- description : fade ;
- CTA : fade + translation ;
- visual : apparition lente et subtile.

Durées approximatives : 400–900 ms selon l’élément.

Éviter les animations de texte trop lentes.

---

# 5. SYSTÈME DE PROJETS

## 5.1 Principe fondamental

Le portfolio ne doit PAS être organisé en multiples pages par type de projet avec trois cartes dans chaque catégorie.

Tous les projets vivent dans un système global.

La page `/projects` sert de galerie éditoriale.

## 5.2 Vue Selected / All

En haut :

```text
[ Selected ]   [ All ]
```

### Selected

4 à 6 projets maximum.

Ce sont les projets qui doivent être vus par presque tous les visiteurs.

### All

Vue plus dense listant tous les projets pertinents.

Les petits projets peu significatifs peuvent exister dans All sans être mis en avant.

## 5.3 Composition visuelle

Utiliser une grille éditoriale asymétrique.

Exemple :

```text
┌─────────────────────────────────────────────┐
│                                             │
│                 FEATURED PROJECT            │
│                                             │
│                 large visual                │
│                                             │
└─────────────────────────────────────────────┘

┌──────────────────────┐  ┌───────────────────┐
│ project              │  │ project           │
│ medium               │  │ medium            │
└──────────────────────┘  └───────────────────┘

┌─────────────────────────────────────────────┐
│ another project                            │
└─────────────────────────────────────────────┘
```

Le layout ne doit pas sembler algorithmique ou répétitif.

## 5.4 Cartes de projets

Chaque carte doit avoir sa propre identité visuelle.

Une carte peut utiliser :

- screenshot produit ;
- mini UI ;
- diagramme d’architecture ;
- graphe ;
- animation ;
- illustration abstraite ;
- visualisation de flux.

Exemples :

### AI Video Editor

Visualisation possible : mini interface du produit vidéo.

### Agent Orchestrator

Visualisation possible :

```text
Input
  ↓
Dispatcher
 ├── Agent A
 ├── Agent B
 └── Agent C
  ↓
Comparison / Selection
```

### Obsidian System

Visualisation possible :

```text
Discord
   ↓
Bot
   ↓
Obsidian
   ↓
Projects / Tasks / Docs
```

### Cyber Tool

Visualisation possible :

- terminal stylisé ;
- réseau ;
- dashboard ;
- résultat de scan ;
- architecture.

## 5.5 Hover project card

Au hover :

- translation Y de quelques pixels ;
- légère variation de scale de l’image ;
- bordure plus visible ;
- gradient local ;
- apparition douce des informations secondaires ;
- CTA `View project`.

Ne pas exagérer.

## 5.6 Tags

Les tags représentent la nature du projet, pas toutes les technologies.

Tags autorisés :

```text
SaaS
AI
WEB
AUTOMATION
SECURITY
OPEN SOURCE
PRIVATE
NDA
RESEARCH
```

Les technologies apparaissent dans la fiche projet.

---

# 6. TYPES DE PROJETS

Tous les projets sont présentés dans le même système, mais leur confidentialité et leurs liens diffèrent.

## 6.1 Open Source

Peut afficher :

- GitHub ;
- code ;
- README ;
- architecture ;
- demo ;
- documentation ;
- screenshots ;
- contributions.

CTA possible :

```text
View project
View GitHub
Live demo
```

## 6.2 Projet public propriétaire

Peut afficher :

- site public ;
- screenshots ;
- vidéo ;
- architecture simplifiée ;
- case study ;
- rôle ;
- technologies ;
- contribution ;
- résultats autorisés.

GitHub n’est pas obligatoire.

## 6.3 Projet privé / commercial

Afficher :

```text
PRIVATE PROJECT

Role
Technologies
Contribution
Technical challenges
Architecture summary
Results if publishable
```

Ne jamais donner l’impression qu’un projet est absent simplement parce qu’il n’est pas open source.

## 6.4 Projet sous NDA

Afficher explicitement :

```text
NDA PROJECT
```

Puis uniquement les informations autorisées :

- rôle ;
- contexte général ;
- domaine ;
- technologies si autorisées ;
- contribution ;
- architecture abstraite ;
- métriques autorisées.

Exemple de message :

> Detailed implementation and proprietary information are restricted under NDA.

Ne jamais publier une information simplement parce qu’elle semble techniquement intéressante.

---

# 7. FICHE PROJET INDIVIDUELLE

Route :

```text
/projects/[slug]
```

## Structure

```text
Project header
↓
Hero visual
↓
Overview
↓
Role / Status / Type / Year
↓
Tech stack
↓
Contribution
↓
Technical challenges
↓
Architecture
↓
Results
↓
Screenshots / Demo
↓
Links
↓
Related projects
```

## Header

Doit immédiatement afficher :

```text
PROJECT TYPE
PROJECT TITLE
1-line description
Year
Status
Role
```

## Métadonnées

Format conseillé :

```text
ROLE              Technical Advisor
TYPE              SaaS
STATUS            In Development
YEAR              2026
```

## Stack

Exemple :

```text
TypeScript · Next.js · Python · FastAPI · PostgreSQL · Docker
```

Ne mettre que les technologies réellement utilisées.

## Contribution

C’est une section obligatoire pour les projets collaboratifs.

Ne pas dire uniquement « worked on project ».

Décrire précisément :

- architecture ;
- développement ;
- backend ;
- automatisation ;
- intégration ;
- sécurité ;
- design technique ;
- décisions techniques ;
- coordination technique ;
- etc.

---

# 8. COMPÉTENCES / EXPERTISE

## 8.1 Objectif

La section doit donner une lecture rapide du niveau technique sans devenir une liste de buzzwords.

## 8.2 Principe des pourcentages

Les pourcentages sont des **indicateurs de maîtrise personnels**, pas une mesure scientifique.

Éviter toute formulation laissant croire à une précision objective.

Présentation préférable :

```text
Python
██████████████████████░░
Advanced / 92
```

Les scores doivent rester crédibles et ne doivent jamais être gonflés artificiellement.

## 8.3 Catégories

### Languages

Exemples :

- Python
- TypeScript
- JavaScript
- HTML / CSS

### Engineering

Exemples :

- Backend Engineering
- API Design
- Software Architecture
- Automation
- Git / Version Control
- Testing

### AI / Systems

Exemples :

- AI Integration
- LLM Applications
- Agent Systems
- Browser Automation

### Security

Exemples :

- Web Security
- Pentesting
- OSINT
- Linux
- Network Fundamentals

## 8.4 Nombre visible

Ne pas afficher 30 compétences sur la homepage.

Homepage : environ 6–8 compétences importantes.

Page `/expertise` : liste complète.

## 8.5 Barres interactives

Au hover ou focus d’une compétence :

```text
Python
92%

Primary language
Used in X projects

Projects:
- Agent Orchestrator
- Obsidian Bot
- Security Tool
```

La compétence doit être reliée aux projets réels.

Cela transforme une affirmation en preuve.

## 8.6 Filtrage par compétence

Cliquer sur une compétence doit pouvoir faire apparaître les projets liés.

Exemple :

```text
Python → projects using Python
Backend Engineering → backend projects
Security → cyber projects
```

---

# 9. TIMELINE

## 9.1 Objectif

Montrer une progression réelle :

```text
Learning
→ experimentation
→ projects
→ increasing responsibility
→ specialization
```

## 9.2 Style

Timeline verticale élégante.

Exemple :

```text
2024
│
├── Python
└── First projects

2025
│
├── Linux
├── Web development
├── CTFs
└── Cybersecurity

2026
│
├── AI systems
├── Automation
├── Software architecture
└── SaaS projects
```

## 9.3 Interactions

Chaque événement important peut être cliquable.

Cliquer peut révéler :

- projet lié ;
- technologie ;
- contexte ;
- petite description.

Ne pas transformer la timeline en CV scolaire.

---

# 10. PAGE CYBER / LAB

## Objectif

Conserver une partie cybersécurité forte sans transformer toute l’identité du site.

Contenu possible :

```text
CTFs
Writeups
Security Research
Tools
Web Security
OSINT
Linux
```

Style légèrement différent du reste du portfolio mais utilisant le même design system.

Possibilité d’utiliser plus d’éléments techniques :

- mini terminal ;
- graphiques ;
- logs ;
- graphes de réseau ;
- cartes de vulnérabilités ;
- snippets ;
- commandes fictives / démonstratives.

Mais sans esthétique hacker cliché.

---

# 11. PAGE ABOUT

## Structure

```text
Short introduction
↓
Current focus
↓
What I build
↓
What I am learning
↓
Selected timeline
↓
Contact
```

Le texte doit rester court.

Éviter les paragraphes autobiographiques génériques.

L’about doit expliquer l’identité professionnelle, pas raconter toute la vie.

---

# 12. CONTACT

Doit être extrêmement simple.

Objectifs :

- email ;
- GitHub ;
- LinkedIn si pertinent ;
- autres profils professionnels nécessaires.

CTA principal :

```text
Let's build something.
```

Le formulaire de contact n’est pas obligatoire pour la V1.

Si un formulaire est ajouté :

- validation ;
- protection anti-spam ;
- rate limit ;
- aucune donnée sensible stockée inutilement.

---

# 13. TERMINAL EASTER EGG

## 13.1 Principe

Le terminal ne doit pas être une fonctionnalité cachée impossible à découvrir.

Il doit avoir plusieurs points d’accès.

## 13.2 Footer

Le footer contient une invitation subtile :

```text
$ type "help" to explore
```

Exemple :

```text
MAXIME
Software / Engineering / Security

GitHub · LinkedIn · Email

$ type "help" to explore
```

## 13.3 Raccourci clavier

Desktop :

```text
Ctrl + K
Cmd + K
```

ouvre la command palette.

La palette peut permettre :

```text
projects
about
timeline
skills
cyber
contact
github
terminal
```

## 13.4 Terminal

Commandes possibles :

```text
help
projects
about
skills
timeline
cyber
contact
github
clear
```

Le terminal peut aussi avoir quelques commandes amusantes mais sobres.

Aucune nécessité de simuler un vrai shell Linux dangereux.

---

# 14. COMMAND PALETTE

La command palette est un composant important de l’UX premium.

Déclenchement :

```text
Cmd/Ctrl + K
```

Présentation :

```text
┌──────────────────────────────────────────┐
│ Search anything...                       │
├──────────────────────────────────────────┤
│ Projects                                 │
│ Expertise                                │
│ Timeline                                 │
│ Cyber Lab                                │
│ About                                    │
│ Contact                                  │
│ Terminal                                 │
└──────────────────────────────────────────┘
```

Le moteur doit permettre une recherche simple dans :

- projets ;
- technologies ;
- catégories ;
- pages.

V1 : recherche locale côté client, sans backend.

---

# 15. ANIMATION SYSTEM

## 15.1 Bibliothèque

Utiliser **Motion for React** pour les interactions et transitions avancées. La documentation actuelle recommande l’installation via `motion` et l’import depuis `motion/react`; la librairie propose notamment les animations de layout, gestes, scroll et transitions. citeturn379311search2turn379311search9

Ne pas utiliser l’ancien package `framer-motion` si le projet peut partir directement sur l’API actuelle `motion`. citeturn379311search2turn379311search0

## 15.2 Animation philosophy

Les animations doivent :

- renforcer la hiérarchie ;
- montrer les relations ;
- améliorer le feedback ;
- donner une sensation de fluidité.

Elles ne doivent pas :

- ralentir la lecture ;
- provoquer une fatigue visuelle ;
- bloquer l’interaction ;
- augmenter inutilement le bundle.

## 15.3 Entrées de sections

Pattern :

```text
opacity 0 → 1
translateY 16–24px → 0
```

avec stagger très léger pour les éléments internes.

## 15.4 Hover

Utiliser surtout :

- opacity ;
- transform ;
- border brightness ;
- subtle shadow / glow ;
- image transform.

## 15.5 Shared transitions

Les changements entre une carte de projet et sa page détaillée peuvent utiliser des transitions de layout / shared element lorsque cela améliore réellement la sensation de continuité. Motion fournit des primitives `layout` / `layoutId` pour ces transitions. citeturn379311search10

## 15.6 Reduced motion

Respect obligatoire de `prefers-reduced-motion`.

Les animations complexes doivent pouvoir être désactivées ou fortement réduites.

---

# 16. 3D / WEBGL

## 16.1 Usage

Three.js / React Three Fiber est autorisé uniquement pour quelques éléments visuels précis.

Pas de WebGL lourd sur toutes les pages.

## 16.2 Principes

- desktop : expérience complète ;
- mobile : version simplifiée ;
- low-power device : fallback ;
- reduced-motion : fallback ;
- faible réseau : ne pas bloquer le contenu principal.

## 16.3 Rôle du 3D

Le 3D doit représenter :

- architecture ;
- systèmes ;
- objets abstraits ;
- données ;
- flux.

Pas de décorations gratuites.

---

# 17. STACK TECHNIQUE

## 17.1 Framework principal

```text
Next.js
React
TypeScript
```

Next.js reste un framework React adapté à la construction de pages rapides, interactives et pouvant mélanger contenu statique et fonctionnalités dynamiques. La documentation officielle actuelle couvre l’App Router et les mécanismes de performance intégrés. citeturn379311search12

À la date de spécification, la branche Next.js 16.x est active ; le projet doit utiliser la version stable recommandée par la documentation au moment de l’initialisation et pinner les dépendances dans le lockfile. citeturn379311search1

## 17.2 Styling

```text
Tailwind CSS
```

Possibilité d’utiliser CSS Modules ou CSS global pour certains effets très spécifiques, mais Tailwind doit rester la base du design system.

Ne pas créer 500 classes utilitaires dispersées sans système.

## 17.3 Animations

```text
motion
```

Installation cible :

```bash
npm install motion
```

Import React :

```ts
import { motion } from "motion/react"
```

Source officielle : documentation Motion for React. citeturn379311search2turn379311search9

## 17.4 3D

```text
three
@react-three/fiber
@react-three/drei
```

Usage limité et lazy-loaded.

## 17.5 Contenu

Approche recommandée : MDX pour les descriptions riches et les case studies.

Le contenu des projets ne doit pas être hardcodé dans les composants React.

## 17.6 Icônes

Utiliser une bibliothèque cohérente, par exemple Lucide.

Éviter de mélanger 4 bibliothèques d’icônes.

## 17.7 Gestion des données

V1 : aucune base de données nécessaire.

Les données peuvent être stockées localement dans :

```text
content/
  projects/
  skills/
  timeline/
```

ou via des fichiers TypeScript / JSON / MDX suivant le besoin.

---

# 18. ARCHITECTURE DU CODE

Structure cible :

```text
portfolio/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   │
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── expertise/
│   │   └── page.tsx
│   │
│   ├── timeline/
│   │   └── page.tsx
│   │
│   ├── about/
│   │   └── page.tsx
│   │
│   ├── contact/
│   │   └── page.tsx
│   │
│   └── cyber/
│       └── page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── PageTransition.tsx
│   │
│   ├── hero/
│   │   ├── Hero.tsx
│   │   └── HeroVisual.tsx
│   │
│   ├── projects/
│   │   ├── ProjectCard.tsx
│   │   ├── FeaturedProject.tsx
│   │   ├── ProjectGrid.tsx
│   │   ├── ProjectFilters.tsx
│   │   └── ProjectMeta.tsx
│   │
│   ├── expertise/
│   │   ├── SkillBar.tsx
│   │   ├── SkillGroup.tsx
│   │   └── SkillProjectLinks.tsx
│   │
│   ├── timeline/
│   │   ├── Timeline.tsx
│   │   └── TimelineItem.tsx
│   │
│   ├── terminal/
│   │   ├── Terminal.tsx
│   │   ├── TerminalInput.tsx
│   │   └── TerminalCommands.ts
│   │
│   ├── command-palette/
│   │   └── CommandPalette.tsx
│   │
│   └── ui/
│       ├── Button.tsx
│       ├── Badge.tsx
│       ├── Card.tsx
│       └── SectionHeading.tsx
│
├── content/
│   ├── projects/
│   │   ├── ai-video-editor.mdx
│   │   ├── agent-orchestrator.mdx
│   │   └── ...
│   ├── skills/
│   │   └── skills.ts
│   └── timeline/
│       └── timeline.ts
│
├── lib/
│   ├── projects.ts
│   ├── skills.ts
│   ├── search.ts
│   └── utils.ts
│
├── public/
│   ├── images/
│   ├── projects/
│   ├── icons/
│   └── og/
│
├── tests/
│
├── README.md
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── ...
```

Les noms exacts peuvent être adaptés, mais la séparation `content / components / lib / app` doit être conservée.

---

# 19. MODÈLE DE DONNÉES DES PROJETS

Chaque projet doit posséder un modèle structuré.

Exemple conceptuel :

```ts
interface Project {
  slug: string
  title: string
  shortDescription: string
  description?: string

  year: number
  status: "completed" | "in-progress" | "archived"

  type:
    | "open-source"
    | "public"
    | "private"
    | "nda"

  category: string[]

  role: string
  contribution: string[]

  technologies: string[]

  featured: boolean
  order: number

  githubUrl?: string
  liveUrl?: string

  image?: string
  gallery?: string[]

  confidentialityNote?: string

  relatedSkills?: string[]
}
```

## Important

Les champs `githubUrl` et `liveUrl` doivent être optionnels.

Un projet sans GitHub ne doit jamais paraître incomplet.

---

# 20. MODÈLE DE DONNÉES DES COMPÉTENCES

Exemple :

```ts
interface Skill {
  slug: string
  name: string
  category: "language" | "engineering" | "ai" | "security"
  score: number
  levelLabel: string
  description?: string
  projectSlugs: string[]
}
```

Le score doit être affiché avec une justification contextuelle si nécessaire.

Ne pas représenter les scores comme une vérité objective.

---

# 21. MODÈLE DE DONNÉES DE LA TIMELINE

```ts
interface TimelineItem {
  year: string
  title: string
  description: string
  projectSlugs?: string[]
  technologies?: string[]
}
```

---

# 22. RESPONSIVE DESIGN

Le site doit être conçu desktop-first visuellement mais parfaitement responsive.

Breakpoints à définir selon le design system, pas à copier mécaniquement.

## Desktop

Expérience complète :

- animations ;
- project cards avancées ;
- 3D si présente ;
- command palette ;
- terminal ;
- grille asymétrique.

## Tablet

Réduction :

- densité ;
- taille des titres ;
- nombre de colonnes.

## Mobile

Le mobile doit rester un produit à part entière.

Important :

- hero lisible en une vue ;
- pas de débordement horizontal ;
- cartes empilées ;
- animations plus courtes ;
- 3D potentiellement supprimée ;
- command palette adaptée au tactile ;
- terminal tactile utilisable mais non essentiel.

Hover-only interactions ne doivent jamais être nécessaires pour comprendre le contenu.

---

# 23. ACCESSIBILITÉ

Obligatoire :

- HTML sémantique ;
- navigation clavier ;
- focus visible ;
- contrastes suffisants ;
- `aria-label` lorsque nécessaire ;
- alt text pour les images pertinentes ;
- respect de `prefers-reduced-motion` ;
- aucune information essentielle transmise uniquement par la couleur.

La command palette doit être navigable au clavier.

Le terminal doit aussi pouvoir être utilisé sans souris.

---

# 24. PERFORMANCE

Le design spectaculaire ne doit pas sacrifier la performance.

Objectif : site très rapide au premier chargement.

Principes :

- contenu principal rendu rapidement ;
- images optimisées ;
- formats modernes ;
- lazy loading ;
- 3D chargée uniquement lorsque nécessaire ;
- animations client uniquement quand utiles ;
- éviter les bibliothèques inutilisées ;
- éviter les composants client globaux quand un Server Component suffit.

Utiliser les capacités natives de Next.js autant que possible.

---

# 25. SEO

Chaque page doit avoir :

- title ;
- description ;
- Open Graph ;
- Twitter/X card si pertinent ;
- canonical URL ;
- metadata cohérente.

Créer :

```text
/sitemap.xml
/robots.txt
```

Ajouter des données structurées adaptées si cela apporte réellement quelque chose.

---

# 26. IMAGES / ASSETS

Toutes les images doivent être :

- compressées ;
- adaptées au format ;
- lazy-loaded si non critiques ;
- accompagnées d’un texte alternatif pertinent si elles portent une information.

Ne pas utiliser de simples images stock sans raison.

Les screenshots des vrais projets sont fortement préférés.

---

# 27. OPEN GRAPH

Chaque projet important doit pouvoir générer une image Open Graph dédiée.

Exemple :

```text
MAXIME

AI VIDEO EDITOR

AI / SaaS / SOFTWARE
```

Même design system que le portfolio.

---

# 28. GESTION DES SECRETS ET CONFIDENTIALITÉ

Aucune clé secrète dans le repository.

Aucune information privée dans :

- Git ;
- client bundle ;
- metadata publiques ;
- screenshots ;
- logs.

Pour les projets NDA :

- vérifier l’autorisation de chaque information ;
- anonymiser les noms lorsque nécessaire ;
- ne pas publier les détails propriétaires ;
- ne pas exposer de code confidentiel.

Le site est public par défaut.

---

# 29. GITHUB

Le repository du portfolio peut être public, car le portfolio lui-même est un projet démonstratif.

Le code doit être propre et montrable.

README recommandé :

```text
Project overview
Stack
Architecture
Development
Deployment
Design philosophy
```

Commits :

- petits ;
- cohérents ;
- messages explicites.

Pas de repository rempli de `fix`, `test`, `aaa`, `lol`, etc.

---

# 30. CI / QUALITÉ CODE

Configurer au minimum :

```text
lint
build
typecheck
```

Optionnel mais recommandé :

```text
test
format check
Lighthouse / performance checks
```

Pipeline conceptuel :

```text
Pull Request
    ↓
lint
    ↓
typecheck
    ↓
build
    ↓
preview deployment
```

---

# 31. HÉBERGEMENT

## 31.1 Choix

Hébergement cible : **Vercel**.

Vercel est la plateforme des créateurs de Next.js et fournit un déploiement Next.js avec intégration Git et preview deployments. citeturn379311search3turn379311search4

## 31.2 Flux de déploiement

```text
Local development
      ↓
git push
      ↓
GitHub
      ↓
Vercel
      ↓
Build
      ↓
Production
```

Chaque push peut générer une preview permettant de vérifier le rendu avant production. citeturn379311search4

## 31.3 Coût cible

Architecture visée :

```text
Code hosting       0 €
Deployment         0 € au départ
HTTPS              inclus
CDN                inclus
Preview deploys    inclus selon offre

Custom domain      seul coût potentiel
```

Le portfolio doit être conçu pour rester compatible avec un hébergement gratuit de départ.

Ne pas introduire de backend payant ou de service externe obligatoire sans nécessité.

## 31.4 Domaine

Une fois le site finalisé, connecter un domaine personnalisé court et professionnel si disponible.

Le sous-domaine de plateforme est acceptable pendant le développement.

---

# 32. BACKEND

V1 : **aucun backend persistant nécessaire**.

La majorité du portfolio est statique.

Un backend ne doit être ajouté que si une fonctionnalité le justifie :

- formulaire de contact ;
- analytics spécifiques ;
- recherche serveur ;
- contenu dynamique ;
- dashboard privé.

Ne pas créer un backend simplement parce que « les vrais projets ont un backend ».

---

# 33. ANALYTICS

V1 : rester minimal.

Si analytics nécessaire : choisir une solution légère, respectueuse de la vie privée et compatible avec les contraintes européennes.

Ne pas transformer un portfolio personnel en système de tracking lourd.

---

# 34. VERSIONNAGE

Le portfolio doit être évolutif.

Concept :

```text
V1 — initial portfolio
V2 — major design / content evolution
V3 — future redesign
```

Le contenu doit pouvoir être modifié sans refaire les composants visuels.

Ajouter un nouveau projet doit idéalement demander :

1. créer le contenu ;
2. ajouter les métadonnées ;
3. ajouter les assets ;
4. définir `featured` et `order`.

Pas modifier cinq composants React différents.

---

# 35. CMS

Pas de CMS externe en V1.

MDX / fichiers de contenu dans le repository sont suffisants.

Un CMS ne doit être ajouté que lorsqu’il devient réellement nécessaire.

---

# 36. DESIGN SYSTEM

Créer des tokens centralisés :

```text
colors
spacing
radius
shadows
motion durations
font sizes
max widths
breakpoints
```

Exemple :

```text
--color-bg
--color-surface
--color-border
--color-text
--color-muted
--color-accent

--radius-sm
--radius-md
--radius-lg

--motion-fast
--motion-base
--motion-slow
```

Ne pas répéter des valeurs arbitraires dans tous les composants.

---

# 37. LAYOUT GLOBAL

Largeur du contenu : relativement généreuse mais limitée pour garder une excellente lisibilité.

Principe :

```text
Viewport
│
├── breathing room
│
└── max-width container
       │
       ├── content
       └── content
```

Les sections doivent avoir suffisamment d’espace vertical.

Ne pas tasser le contenu pour éviter le scroll.

Le site doit donner une impression d’espace.

---

# 38. NAVIGATION

Desktop :

barre légère, éventuellement sticky.

Contenu :

```text
MAXIME

Projects
Expertise
Timeline
About

[ Contact ]
```

La navigation doit rester compacte.

Mobile :

menu simplifié.

La command palette reste un accès secondaire puissant.

---

# 39. FOOTER

Le footer doit être assez travaillé pour terminer le site proprement.

Structure :

```text
MAXIME
Software / Engineering / Security

Projects
Expertise
About
Contact

GitHub
LinkedIn
Email

$ type "help" to explore

© YEAR
```

Le terminal easter egg se trouve ici.

---

# 40. ÉTATS INTERACTIFS

Chaque élément cliquable doit avoir :

- état normal ;
- hover ;
- active ;
- focus ;
- disabled si applicable.

Ne pas utiliser uniquement un changement de couleur.

---

# 41. LOADING / ERROR

Pages dynamiques : prévoir :

- loading state ;
- error state ;
- not-found page.

Le design de `/404` peut être légèrement expérimental.

Exemple possible :

```text
404

This route doesn't exist.

$ help
```

Mais rester cohérent avec l’esthétique globale.

---

# 42. CONTENU DES PROJETS : RÈGLE DE RÉDACTION

Chaque projet doit répondre rapidement à :

1. Qu’est-ce que c’est ?
2. Pourquoi ça existe ?
3. Quel était mon rôle ?
4. Qu’est-ce que j’ai réellement construit ?
5. Quels problèmes techniques ai-je rencontrés ?
6. Quelles décisions ai-je prises ?
7. Quel a été le résultat ?
8. Qu’est-ce qui peut être montré publiquement ?

Pour les projets confidentiels, répondre uniquement avec les éléments autorisés.

---

# 43. RÈGLE DE CRÉDIBILITÉ

Ne jamais gonfler artificiellement :

- nombre de projets ;
- niveau de compétences ;
- technologies ;
- responsabilités ;
- résultats ;
- importance d’un projet.

Une petite liste de réalisations réelles est plus crédible qu’un catalogue massif.

---

# 44. RÈGLE DE PROGRESSION

Le portfolio doit pouvoir évoluer avec le niveau du développeur.

Les scores de compétences doivent pouvoir changer.

La liste des projets peut changer.

La timeline doit pouvoir accueillir de nouveaux événements.

Le design system doit rester stable malgré l’évolution du contenu.

---

# 45. CE QUE LE DÉVELOPPEUR DOIT ÉVITER

- hardcoder les projets dans JSX ;
- multiplier les composants inutiles ;
- ajouter Three.js partout ;
- rendre chaque composant client sans raison ;
- utiliser des animations lourdes ;
- mettre du texte important dans des images ;
- faire dépendre l’UX du hover ;
- publier des informations NDA ;
- installer dix bibliothèques pour une fonctionnalité simple ;
- faire un design différent sur chaque page ;
- utiliser des couleurs aléatoires ;
- créer un système de design incohérent ;
- sacrifier la vitesse au profit d’un effet spectaculaire.

---

# 46. PRIORITÉS DE DÉVELOPPEMENT

## Phase 1 — Foundation

```text
Next.js
TypeScript
Tailwind
Design tokens
Global layout
Fonts
Navbar
Footer
Routing
```

## Phase 2 — Core pages

```text
Home
Projects
Project detail
Expertise
Timeline
About
Contact
```

## Phase 3 — Interactions

```text
Motion
Project hover
Section reveals
Command palette
Terminal
Page transitions
```

## Phase 4 — Visual depth

```text
Hero visual
Selective 3D
Advanced project visualizations
```

## Phase 5 — Production

```text
SEO
Open Graph
Accessibility
Performance
Analytics if necessary
Error states
404
```

## Phase 6 — Deployment

```text
GitHub
Vercel
Custom domain
Production verification
```

---

# 47. CRITÈRES D’ACCEPTATION VISUELS

Le site est considéré comme réussi si :

- il paraît premium dès la première seconde ;
- il ne ressemble pas à un template générique ;
- il ne ressemble pas à un portfolio « hacker » ;
- le développement domine clairement la cybersécurité ;
- les projets principaux sont compréhensibles rapidement ;
- un visiteur ne doit pas parcourir quinze pages pour comprendre le profil ;
- les projets privés paraissent aussi sérieux que les projets open source ;
- les projets NDA peuvent être présentés sans exposer d’informations confidentielles ;
- la section compétences est lisible en quelques secondes ;
- les barres sont visuellement élégantes et non prétentieuses ;
- la timeline est facile à parcourir ;
- le terminal est découvrable mais reste un easter egg ;
- le site fonctionne parfaitement au clavier ;
- le mobile reste excellent ;
- le temps de chargement reste faible ;
- les animations ne gênent jamais la lecture.

---

# 48. CRITÈRES D’ACCEPTATION TECHNIQUES

Le projet doit au minimum respecter :

```text
TypeScript strict
ESLint configuré
Build production fonctionnel
No obvious console errors
Responsive
Accessible keyboard navigation
Reduced motion support
SEO metadata
Sitemap
Robots
Optimized images
No exposed secrets
No confidential project data
```

Tester au minimum :

```text
Chrome / Chromium
Firefox
Desktop
Mobile viewport
Keyboard-only navigation
Reduced motion
Slow network
```

---

# 49. STACK FINALE — RÉSUMÉ

```text
Framework
→ Next.js

UI
→ React

Language
→ TypeScript

Styling
→ Tailwind CSS

Animation
→ Motion for React

3D
→ Three.js + React Three Fiber + Drei

Content
→ MDX / typed content

Icons
→ Lucide (ou bibliothèque unique équivalente)

Version Control
→ Git + GitHub

CI
→ GitHub Actions ou pipeline équivalent

Hosting
→ Vercel

Domain
→ Custom domain plus tard

Backend
→ Aucun en V1

Database
→ Aucune en V1

CMS
→ Aucun en V1
```

Les versions exactes de dépendances doivent être déterminées au moment de l’installation puis verrouillées dans le lockfile. Ne pas recopier des versions figées trouvées dans ce document plusieurs mois plus tard.

Next.js dispose d’une intégration native avec Vercel et Vercel fournit le déploiement Next.js avec previews et CDN ; cette association est donc le choix de référence pour ce projet. citeturn379311search3turn379311search4

---

# 50. ARCHITECTURE FONCTIONNELLE FINALE

```text
                                PORTFOLIO
                                    │
           ┌────────────────────────┼────────────────────────┐
           │                        │                        │
          HOME                  PROJECTS                EXPERTISE
           │                        │                        │
   ┌───────┼────────┐        ┌──────┴──────┐          ┌─────┴─────┐
   │       │        │        │             │          │           │
 Hero   Featured  Preview   Selected       All      Skills      Evidence
   │       │        │        │             │          │           │
   │       │        │        │             │          └─────┬─────┘
   │       │        │        │             │                │
   │       │        │        │             │          Linked Projects
   │       │        │        │             │
   │       │        │        │             │
   │       │        │        └─────────────┘
   │       │        │
   │       │        └──────── Timeline Preview
   │       │
   │       └──────── Project Card System
   │
   └───────────────────────────────┐
                                   │
                              PROJECT DETAIL
                                   │
                  ┌────────────────┼────────────────┐
                  │                │                │
               OPEN SOURCE      PRIVATE           NDA
                  │                │                │
               GitHub           Demo/Case        Restricted
               Code              Study             Info


                   OTHER PRIMARY AREAS

            ┌───────────────┬───────────────┐
            │               │               │
          TIMELINE         ABOUT         CYBER/LAB
            │               │               │
         Evolution       Identity       CTF / Research


                         GLOBAL UX
                            │
              ┌─────────────┴─────────────┐
              │                           │
         Cmd/Ctrl + K                  Footer
              │                           │
       Command Palette               Terminal
```

---

# 51. PHILOSOPHIE FINALE

Le portfolio doit suivre quatre principes :

## 1. Show, don't claim

Les compétences doivent être reliées aux projets.

## 2. Quality over quantity

Quelques projets forts valent mieux qu’un catalogue vide.

## 3. Product before decoration

Les animations servent l’expérience. Elles ne sont jamais le produit.

## 4. The portfolio is itself a project

Le portfolio doit être suffisamment bien conçu et développé pour constituer une démonstration directe du niveau technique.

---

# 52. RÉSULTAT ATTENDU

À la fin, le visiteur doit pouvoir suivre ce chemin mental :

```text
« Qui est cette personne ? »
        ↓
« Elle développe des logiciels et construit des systèmes. »
        ↓
« Elle a de vrais projets. »
        ↓
« Certains sont open source, d’autres professionnels / privés. »
        ↓
« Elle sait expliquer ce qu’elle a réellement fait. »
        ↓
« Son niveau de développement est visible. »
        ↓
« Elle possède aussi une spécialisation cybersécurité. »
        ↓
« Et même le portfolio est techniquement travaillé. »
```

Le résultat final doit être **visuellement impressionnant, techniquement crédible, rapide à parcourir, profond lorsqu’on veut enquêter et suffisamment professionnel pour être utilisé dans des candidatures, projets commerciaux, collaborations et opportunités futures.**

---

# 53. SOURCES TECHNIQUES ACTUELLES

- Next.js documentation : https://nextjs.org/docs
- Next.js current releases / blog : https://nextjs.org/blog
- Motion for React documentation : https://motion.dev/docs/react
- Motion installation : https://motion.dev/docs/react-installation
- Vercel + Next.js : https://vercel.com/frameworks/nextjs

Dernière vérification web de la stack : août 2026.
