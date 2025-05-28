# Documentation des Routes

## Routes Authentification

### Inscription

- **Méthode** : POST
- **URL** : `/api/auth/register`
- **Description** : Inscription d'un nouvel utilisateur
- **Body** :
```json
{
  "email": "string",
  "password": "string"
}
```
- **Réponse** :
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "string",
    "email": "string",
    "role": "CLIENT"
  }
}
```

### Connexion

- **Méthode** : POST
- **URL** : `/api/auth/login`
- **Description** : Connexion d'un utilisateur existant
- **Body** :
```json
{
  "email": "string",
  "password": "string"
}
```
- **Réponse** :
```json
{
  "token": "string",
  "user": {
    "email": "string",
    "uid": "string"
  }
}
```

## Routes de Test

### Test API

- **Méthode** : GET
- **URL** : `/api/test`
- **Description** : Route de test pour vérifier si l'API est en cours d'exécution
- **Réponse** :
```json
{
  "message": "API is running"
}
```

## Routes de Produits

### Création de produit de test

- **Méthode** : POST
- **URL** : `/api/products/test`
- **Description** : Création d'un produit de test avec une catégorie
- **Réponse** :
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "price": number,
  "imageUrl": "string",
  "categoryId": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```

## Routes de Commande

### Création de commande

- **Méthode** : POST
- **URL** : `/api/orders`
- **Description** : Création d'une nouvelle commande
- **Headers** : `Authorization: Bearer <token>`
- **Body** :
```json
{
  "items": [
    {
      "productId": "string",
      "quantity": number,
      "price": number
    }
  ]
}
```
- **Réponse** :
```json
{
  "id": "string",
  "userId": "string",
  "total": number,
  "paymentStatus": "PENDING",
  "createdAt": "string",
  "updatedAt": "string"
}
```

### Récupération des commandes

- **Méthode** : GET
- **URL** : `/api/orders/:userId`
- **Description** : Récupération des commandes d'un utilisateur
- **Headers** : `Authorization: Bearer <token>`
- **Paramètres** :
  - `userId` : ID de l'utilisateur
- **Réponse** :
```json
[
  {
    "id": "string",
    "userId": "string",
    "total": number,
    "paymentStatus": "PENDING",
    "createdAt": "string",
    "updatedAt": "string"
  }
]
```

## Notes

- Toutes les routes nécessitant une authentification doivent inclure un token JWT dans les headers
- Les erreurs sont retournées avec le format suivant :
```json
{
  "error": "message d'erreur"
}
```
