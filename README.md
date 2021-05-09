# SOS Mediterranée Dashboard

## Présentation du projet
**TODO**

## Lancer le projet en local

Afin de lancer le projet en local, il est nécessaire d'avoir différents outils installés :
- [NodeJS](https://nodejs.org/download/release/v15.11.0/) (version 15.11.0)
- [Git](https://git-scm.com/downloads)
- un EDI, par exemple [VSCode](https://code.visualstudio.com/Download)

Ensuite, il faut [cloner](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) ce répertoire sur son ordinateur afin de travailler dessus en local.

Voici quelques conseils:
- EDI =>
  - Remplacer les tabulations par des espaces
  - Faire en sorte qu'une tabulation équivaut à deux espaces
Ces paramètres se règlent dans les EDI facilement (n'hésitez pas à demander en précisant votre EDI si besoin), et ils permettent d'avoir la même forme peu importe qui a contributé et quand. (Après on peut discuter sur le nombre d'espace, deux me parait bien et suffisant)
- CSS =>
  - Utiliser TailWindCSS (au maximum) pour créer la mise en page, ce sont des classes à ajouter aux éléments HTML afin de créer les styles souhaités
  - Penser l'interface pour les mobiles en premier (mobile-first), et adapter aux écrans plus grands
- VueJS =>
  - La version utilisée est la 3, ce qui amène des nouveautés (notamment l'API composition)
  - Utilisation de SFC (Fichier unique pour le composant), ce qui signie que les fichiers '.vue' regroupent l'HTML (template), le TypeScript et le CSS (préféré utilisé TailWindCSS)

Règles de nommage:
- Fichier '.vue', nom des classes = *PascalCase*
- Classes CSS, nom des évènements dans l'HTML = *kebab-case*
- Nom des fonctions en TS et dans l'HTML = *camelCase*

N'oublier pas de vérifier les erreurs et avertissements grâce à l'analyse statique (lint) du code source, ce sont des règles standards d'écriture du TypeScript.

### Installation des dépendances du projet:
```bash
npm install
```

### Compilation et rechargement à la volée pour le développement
```bash
npm run serve
```

### Compilation et minification pour la production
```bash
npm run build
```

### Analyse statique et correction du code source
```bash
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Convention de codage
**TODO**

## Contribution
**TODO**

# English part ?

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


TODO =>
- [x] écrire une convention de codage
- [x] recommandation pour les EDI => espaces au lieu de tabulation et nombre d'espaces pour une tabulation
- [ ] code de conduite/recommandation pour PR
- [x] configuration de git
- [x] mettre en place une base (vue-cli, tailwindcss, typescript, autres ?)
- [x] écrire les différentes commandes afin de lancer le projet
- [x] créer une autre branche develop
- [x] s'amuser !
