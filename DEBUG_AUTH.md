# Guide de Débogage - Authentication Product Manager

## Problème
"Authentication failed. Please log in as admin first." lors de l'ajout/modification/suppression de produits.

## Étapes de Débogage

### 1. Vérifier la Console du Navigateur

Ouvrez la console (F12) et cherchez:
```
=== ProductManager Auth Debug ===
Is Authenticated: true/false
Is Admin: true/false
Token exists: true/false
User: {...}
================================
```

### 2. Scénarios Possibles

**Scénario A: Pas Connecté**
```
Is Authenticated: false
Is Admin: false
Token exists: false
```
**Solution**: Connectez-vous avec un compte admin

**Scénario B: Connecté mais pas Admin**
```
Is Authenticated: true
Is Admin: false
Token exists: true
```
**Solution**: Connectez-vous avec un compte qui a `isAdmin: true`

**Scénario C: Token Expiré**
```
Is Authenticated: true
Is Admin: true
Token exists: true
Erreur 401 lors de la requête
```
**Solution**: Déconnectez-vous et reconnectez-vous

### 3. Vérifier les Credentials Admin

**Dans le Backend**, exécutez ce script pour vérifier:
```bash
cd BackEnd
node Scripts/resetAdminPassword.js
```

Ou créez un admin manuellement dans MongoDB:
```javascript
{
  email: "admin@voltplay.com",
  password: "hashedPassword", // hashé avec bcrypt
  isAdmin: true,
  firstName: "Admin",
  lastName: "VoltPlay"
}
```

### 4. Vérifier localStorage

Dans la console navigateur:
```javascript
// Vérifier le token
console.log(localStorage.getItem('voltplay_token'));

// Vérifier l'utilisateur
console.log(localStorage.getItem('voltplay_user'));

// Vérifier isAdmin
console.log(localStorage.getItem('voltplay_isAdmin'));
```

### 5. Solution Rapide - Reset Auth

Si rien ne fonctionne:
```javascript
// Dans la console navigateur
localStorage.clear();
// Puis reconnectez-vous
```

## Vérification Backend

Vérifiez que le middleware auth fonctionne:

**File**: `BackEnd/Middleware/authMiddleware.js`

Le token doit être validé avec JWT_SECRET défini dans `.env`

## Résolution Typique

1. **Ouvrez** http://localhost:5173
2. **Cliquez** sur Logout (si connecté)
3. **Allez** à `/login`
4. **Connectez-vous** avec:
   - Email admin (ex: admin@voltplay.com)
   - Mot de passe admin
5. **Vérifiez** que vous êtes redirigé vers `/admin`
6. **Allez** à `/admin/products`
7. **Essayez** d'ajouter/modifier un produit

## Contact Support

Si le problème persiste, vérifiez:
- ✅ Backend est lancé (port 6969)
- ✅ Frontend est lancé (port 5173)
- ✅ MongoDB est connecté
- ✅ JWT_SECRET existe dans .env
- ✅ Un admin existe dans la DB
