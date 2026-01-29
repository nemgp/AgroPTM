# Configuration Google Sheets pour AgroPTM

## Étape 1 : Créer le Google Sheet

1. Aller sur [Google Sheets](https://sheets.google.com)
2. Créer un nouveau tableur nommé **"AgroPTM - Database"**
3. Créer 2 feuilles :

### Feuille "Products"
Colonnes (ligne 1) :
```
id | nameKey | categoryKey | descriptionKey | image
```

### Feuille "Requests"
Colonnes (ligne 1) :
```
id | type | name | phone | email | message | date
```

## Étape 2 : Déployer le Google Apps Script

1. Dans votre Google Sheet, aller à **Extensions > Apps Script**
2. Supprimer le code par défaut
3. Copier le contenu de `google-apps-script/Code.gs`
4. **IMPORTANT** : Remplacer `VOTRE_SPREADSHEET_ID_ICI` par l'ID de votre Sheet
   - L'ID se trouve dans l'URL : `https://docs.google.com/spreadsheets/d/[ID_ICI]/edit`
5. Cliquer sur **Déployer > Nouvelle version**
6. Type : **Application Web**
7. Exécuter en tant que : **Moi**
8. Qui a accès : **Tout le monde**
9. Cliquer sur **Déployer**
10. **Copier l'URL du Web App** (elle ressemble à : `https://script.google.com/macros/s/...`)

## Étape 3 : Configurer l'URL dans le code

1. Ouvrir `src/api/googleSheetsAPI.ts`
2. Remplacer `VOTRE_WEB_APP_URL_ICI` par l'URL copiée à l'étape 2

## Étape 4 : Tester

1. Aller sur http://localhost:5173/AgroPTM/#/admin
2. Se connecter avec le mot de passe : `agroptm2026`
3. Tester l'ajout d'un produit
4. Vérifier que le produit apparaît dans le Google Sheet
5. Tester la modification et la suppression

## Notes Importantes

- Les images sont stockées comme URLs ou en base64
- Pour les images en base64, préférer des images < 500 KB
- Les demandes sont automatiquement horodatées
- Toutes les opérations sont asynchrones

## Dépannage

### Erreur CORS
Si vous rencontrez des erreurs CORS, vérifiez que :
- Le Web App est déployé avec "Qui a accès : Tout le monde"
- Vous avez autorisé les permissions lors du premier déploiement

### Erreur 404
- Vérifiez que l'URL du Web App est correcte
- Vérifiez que le script est bien déployé

### Données ne s'affichent pas
- Vérifiez que les noms des feuilles sont exactement "Products" et "Requests"
- Vérifiez que les colonnes sont dans le bon ordre
