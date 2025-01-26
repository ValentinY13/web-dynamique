## 1\. Prérequis :

- Node.js (version 18.20.5 ou supérieur)
- Yarn comme gestionnaire de paquets Nuxt
- NPM pour l'installation de Directus
- Un serveur local ( WAMP, MAMP, ...)
- Git
- Fichier SQL contenant la base de données

Yarn est préféré à NPM pour la gestion des paquets pour sa meilleure compatibilté avec NUXT. Il est installable directement via NPM avec cette commande :

```Bash
npm install --global yarn
```

## 2\. Setup de la base de données

3.1 Lancez votre serveur local et créez une base de données en `utf8mb3_general_ci`.
3.2 Importer le fichier SQL via l'onglet `importer` de phpmyadmin

## 3\. Copie du projet :

3.1 Ouvrez un terminal dans le dossier `www` puis effectuez la commande :

```Bash
git clone https://github.com/ValentinY13/web-dynamique.git
```

## 4\. Setup Directus

4.1 Toujours dans le terminal, allez dans le projet cloné ( `cd web-dynamique` ) puis dans le dossier api ( `cd api` ) et effectuez la commande suivante pour installer les dépendances :

```Bash
npm install
```

4.2 Dans votre IDE, renommer le `.env.example` en `.env` et changez les variables suivantes par les votre :

```.env
DB_CLIENT="mysql"
DB_HOST="127.0.0.1"
DB_PORT="3306"
DB_DATABASE="YOUR_DATABASE"
DB_USER="YOUR_USER"
DB_PASSWORD="YOUR_PASSWORD"

SECRET="YOUR_SECRET"

```

Pour générer votre SECRET, exécutez cette commande dans votre terminal :

```Bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

4.3 Lancez le serveur via la commande :

```Npm
npx directus start
```

Le serveur se lancer sur le port `http://localhost:8055` et connectez vous en tant qu'admin ou cliente (identifiant en dessous).

## 5\. Setup de Nuxt

5.1 Ouvrez un terminal sur le dossier `app` et exécutez la commande :

```Bash
yarn install
```

5.2 Dans votre IDE, renommer le `.env.example` en `.env` .
5.3 Lancez le serveur via à la commande :

```Bash
yarn run dev
```

Le serveur se lancera sur le port `http://localhost:3000`

## 6\. Serveur mail

Ouvir le dossier tools et ouvrir une console de commande sur le dossier mailpit. Effectuez la commande :

```Bash
.\mailpit.exe
```
Le serveur se lancera sur le port `http://localhost:8025`

## Identifiant pour Directus
### Admin 
- Adresse mail : admin@example.com
- Mot de passe : 0000

### Cliente 
- Adresse mail : cliente@example.com
- Mot de passe : azerty123
