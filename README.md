# 🌦️ MeteoApp

Application météo développée avec **Angular** permettant de rechercher une ville et d’afficher les conditions météorologiques en temps réel.

---

## 🚀 Fonctionnalités

- 🔍 Recherche météo par ville
- 🌡️ Température actuelle
- 😎 Température ressentie
- 💧 Humidité
- 🌤️ Icône de la condition météo
- ⚡ Données en temps réel via API
- 🔄 Gestion asynchrone avec Observables
- 💾 Sauvegarde de la dernière recherche dans le LocalStorage
- 🧠 Affichage dynamique avec `*ngIf` et `ngOnInit`

---

## 🌐 API

- **Source** : [OpenWeatherMap](https://www.weatherapi.com/)
- **Format** : JSON
- **Communication** : Asynchrone via `HttpClient`

---

## 🛠️ Technologies utilisées

- Angular
- TypeScript
- HTML / CSS
- OpenWeatherMap API
- RxJS
- Git & GitHub

---

## 🔐 Configuration de la clé API

Pour utiliser l’application, tu dois fournir ta propre clé API météo.

### 1️⃣ Créer le fichier d’environnement

Crée le fichier suivant :

```
src/environments/environment.ts
```

Et ajoute :

```ts
export const environment = {
  production: false,
  weatherApiKey: 'TA_CLE_API_ICI',
};
```

### 2️⃣ Utilisation dans le service

La clé est ensuite utilisée dans le service via :

```ts
import { environment } from '../environments/environment';
```

---

## 📦 Installation

1. Cloner le projet :

```bash
git clone https://github.com/Riad8321/MeteoApp.git
```

2. Installer les dépendances :

```bash
npm install
```

3. Lancer l’application :

```bash
ng serve
```

4. Ouvrir dans le navigateur :

```
http://localhost:4200
```

---

## 🧠 Fonctionnement

- L’utilisateur saisit une ville
- L’application interroge l’API météo
- Les données sont récupérées de manière asynchrone
- Les résultats sont affichés dynamiquement
- La dernière recherche est sauvegardée dans le LocalStorage

---

## 👨‍💻 Auteur

Développé par **Raphael & Riad**
📍 Projet Angular

---

## 📄 Licence

Ce projet est open-source et libre d’utilisation.
