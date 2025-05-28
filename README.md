# E-commerce Backend

Backend API pour une application e-commerce construite avec Node.js, TypeScript et Express.

## Prérequis

- Node.js (v18 ou supérieur)
- PostgreSQL
- pnpm (package manager recommandé)

## Installation

1. Cloner le repository :
```bash
git clone [URL_DU_REPO]
cd ecommerce-backend
```

2. Installer les dépendances :
```bash
pnpm install
```

3. Configurer les variables d'environnement :
Créer un fichier `.env` à la racine du projet avec les variables suivantes :
```
PORT=3000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ecommerce"
WHATSAPP_PHONE="votre-numero-whatsapp"
```

4. Initialiser la base de données :
```bash
# Créer la base de données PostgreSQL
sudo -u postgres psql -c "CREATE DATABASE ecommerce;"

# Appliquer les migrations
pnpm prisma db push
```

5. Démarrer le serveur :
```bash
pnpm dev
```

Le serveur devrait démarrer sur `http://localhost:3000`

## Structure du projet

```
src/
├── controllers/     # Logique métier
├── middleware/      # Middleware Express
├── services/        # Services utilitaires
├── types/          # Types TypeScript
└── scripts/        # Scripts utilitaires
```

## Technologies utilisées

- Node.js
- TypeScript
- Express
- Prisma (ORM)
- PostgreSQL
- pnpm

## Documentation des routes

Voir le fichier [documentation.md](documentation.md) pour la documentation complète des routes.
