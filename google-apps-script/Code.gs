/**
 * Google Apps Script pour AgroPTM - Version avec gestion du mot de passe
 * À déployer comme Web App dans Google Sheets
 * 
 * CONFIGURATION REQUISE :
 * 1. Créer un Google Sheet avec 3 feuilles :
 *    - "Products" : colonnes [id, nameKey, categoryKey, descriptionKey, image]
 *    - "Requests" : colonnes [id, type, name, phone, email, message, date]
 *    - "Settings" : colonnes [key, value]
 * 
 * 2. Dans la feuille "Settings", ajouter une ligne :
 *    - key: "adminPassword"
 *    - value: "agroptm2026" (mot de passe par défaut)
 * 
 * 3. Déployer ce script :
 *    - Extensions > Apps Script
 *    - Coller ce code
 *    - Déployer > Nouvelle version > Web App
 *    - Qui a accès : "Tout le monde"
 *    - Copier l'URL du Web App
 */

// ID de votre Google Sheet (à remplacer)
const SPREADSHEET_ID = 'VOTRE_SPREADSHEET_ID_ICI';

function doGet(e) {
  const action = e.parameter.action;
  
  try {
    switch(action) {
      case 'getProducts':
        return getProducts();
      case 'getRequests':
        return getRequests();
      case 'verifyPassword':
        return verifyPassword(e.parameter.password);
      default:
        return createResponse({ error: 'Action non reconnue' }, 400);
    }
  } catch (error) {
    return createResponse({ error: error.toString() }, 500);
  }
}

function doPost(e) {
  const action = e.parameter.action;
  const data = JSON.parse(e.postData.contents);
  
  try {
    switch(action) {
      case 'addProduct':
        return addProduct(data);
      case 'updateProduct':
        return updateProduct(data);
      case 'deleteProduct':
        return deleteProduct(data);
      case 'addRequest':
        return addRequest(data);
      case 'changePassword':
        return changePassword(data);
      default:
        return createResponse({ error: 'Action non reconnue' }, 400);
    }
  } catch (error) {
    return createResponse({ error: error.toString() }, 500);
  }
}

// ============ PRODUCTS ============

function getProducts() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Products');
  const data = sheet.getDataRange().getValues();
  
  // Ignorer la première ligne (en-têtes)
  const products = data.slice(1).map(row => ({
    id: row[0],
    nameKey: row[1],
    categoryKey: row[2],
    descriptionKey: row[3],
    image: row[4]
  }));
  
  return createResponse({ products });
}

function addProduct(data) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Products');
  const id = data.id || new Date().getTime().toString();
  
  sheet.appendRow([
    id,
    data.nameKey,
    data.categoryKey,
    data.descriptionKey,
    data.image
  ]);
  
  return createResponse({ success: true, id });
}

function updateProduct(data) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Products');
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  // Trouver la ligne du produit
  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === data.id) {
      sheet.getRange(i + 1, 1, 1, 5).setValues([[
        data.id,
        data.nameKey,
        data.categoryKey,
        data.descriptionKey,
        data.image
      ]]);
      return createResponse({ success: true });
    }
  }
  
  return createResponse({ error: 'Produit non trouvé' }, 404);
}

function deleteProduct(data) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Products');
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  // Trouver et supprimer la ligne
  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === data.id) {
      sheet.deleteRow(i + 1);
      return createResponse({ success: true });
    }
  }
  
  return createResponse({ error: 'Produit non trouvé' }, 404);
}

// ============ REQUESTS ============

function getRequests() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Requests');
  const data = sheet.getDataRange().getValues();
  
  // Ignorer la première ligne (en-têtes)
  const requests = data.slice(1).map(row => ({
    id: row[0],
    type: row[1],
    name: row[2],
    phone: row[3],
    email: row[4],
    message: row[5],
    date: row[6]
  }));
  
  return createResponse({ requests });
}

function addRequest(data) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Requests');
  const id = data.id || new Date().getTime().toString();
  const date = data.date || new Date().toISOString();
  
  sheet.appendRow([
    id,
    data.type,
    data.name,
    data.phone,
    data.email || '',
    data.message,
    date
  ]);
  
  return createResponse({ success: true, id });
}

// ============ AUTHENTICATION ============

function verifyPassword(password) {
  const storedPassword = getSetting('adminPassword');
  const isValid = password === storedPassword;
  
  return createResponse({ 
    valid: isValid,
    username: 'Kazor'
  });
}

function changePassword(data) {
  const currentPassword = getSetting('adminPassword');
  
  // Vérifier l'ancien mot de passe
  if (data.currentPassword !== currentPassword) {
    return createResponse({ error: 'Mot de passe actuel incorrect' }, 401);
  }
  
  // Mettre à jour le mot de passe
  setSetting('adminPassword', data.newPassword);
  
  return createResponse({ success: true });
}

// ============ SETTINGS ============

function getSetting(key) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Settings');
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === key) {
      return data[i][1];
    }
  }
  
  // Si le paramètre n'existe pas, retourner le mot de passe par défaut
  if (key === 'adminPassword') {
    return 'agroptm2026';
  }
  
  return null;
}

function setSetting(key, value) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Settings');
  const data = sheet.getDataRange().getValues();
  
  // Chercher si le paramètre existe déjà
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === key) {
      sheet.getRange(i + 1, 2).setValue(value);
      return;
    }
  }
  
  // Si le paramètre n'existe pas, l'ajouter
  sheet.appendRow([key, value]);
}

// ============ HELPER ============

function createResponse(data, status = 200) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
