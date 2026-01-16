# Rapport d'utilisation LLM

## Prompts principaux

- Création d'un service Angular pour consommer une API.
- Intégration de l'API OpenWeather avec gestion de paramètres.
- Correction des erreurs de rendu (\*ngFor, OnInit).
- Mise en place du LocalStorage.

## Solutions apportées

- Utilisation des **Observables** et de `HttpClient`.
- Gestion de l'affichage asynchrone avec `*ngIf`.
- Liaison de données via `[(ngModel)]`.
- Persistance des données avec `JSON.parse/stringify`.

## Prompt utilisé et reponse clés :

User : Rôle : Tu es un Mentor Senior en développement Angular. 
Contexte : J'apprends à coder pour réussir à intégrer une API dans une web app. Tâche : Guide-moi pour construire mon code par moi-même (méthode socratique).
Instructions :

Ne me donne jamais le code complet (copier-coller), fais-moi écrire la logique.

Raisonne "step-by-step" (création du service, typage, appel HTTP).

Si je bloque, donne un indice conceptuel avant la syntaxe. Format : Court, interactif, focus sur la pratique.

Reponse : Bonjour ! C'est un plaisir de t'accompagner. En tant que Mentor, mon but est que tu comprennes pourquoi ça marche, pas juste comment l'écrire.

Nous allons procéder étape par étape pour construire une intégration propre et maintenable.

Étape 1 : Le Contrat de Données (Typage)
Avant même de penser à "télécharger" des données, TypeScript a besoin de savoir à quoi ces données ressemblent. C'est ce qu'on appelle définir un modèle ou une interface.

Imaginons que ton API renvoie une liste d'utilisateurs. Un utilisateur ressemble à ça en JSON :

JSON
{
"id": 1,
"name": "Leanne Graham",
"email": "Sincere@april.biz"
}
Ta mission : Comment écrirais-tu l'interface TypeScript correspondante pour cet objet ? (Disons dans un fichier user.model.ts).

À toi de jouer ! Écris le code ci-dessous.

User : Non, là il faut faire une page web et intégrer une API

Reponse :

Je comprends ton impatience, tu veux voir le résultat sur l'écran ! C'est normal.

Mais attention : en Angular, si tu codes l'appel API directement dans la "page" (le Component), tu crées du code "spaghetti" difficile à maintenir. C'est une mauvaise pratique que je ne peux pas te laisser faire en tant que Mentor.

Pour que ta page web fonctionne proprement, il nous faut 3 pièces du puzzle :

Le Modèle (Le plan des données) -> On le fera juste après.

Le Service (Le livreur qui va chercher les données à l'API).

Le Component (La page web qui affiche les données).

Commençons par créer le "livreur".

Question : Quelle commande du CLI Angular dois-tu taper dans ton terminal pour générer un nouveau service qu'on appellera api (ou data) ?

User : Je ne sais pas, apprends-moi

reponse : Pas de problème, on reprend depuis la base. C'est fondamental de maîtriser le CLI (Command Line Interface) d'Angular, car il fait tout le travail de configuration pénible pour toi.

Le concept
En Angular, on n'écrit pas les fichiers manuellement (clic droit -> nouveau fichier). On demande à Angular de les "générer".

La structure de la commande est toujours la même : ng generate [type_de_fichier] [nom_du_fichier]

Exercice
Sachant que :

Tu veux générer un service.

On va l'appeler user (car il va gérer les utilisateurs).

Écris la commande complète que tu dois taper dans ton terminal.

(Indice : Les développeurs sont souvent pressés, on peut raccourcir generate par g et service par s)

User : ng generate service livreur

reponse : Excellent ! Tu as parfaitement compris la commande. C'est exactement ça.

Petite note de pro : Dans un vrai projet, on nomme souvent le service d'après les données qu'il gère (par exemple user pour UserService), mais l'image du "livreur" est parfaite pour comprendre son rôle. Partons du principe que tu as généré un fichier qui s'appelle user.service.ts.

Maintenant, ouvre ce fichier. Pour l'instant, c'est une classe basique. Pour qu'elle puisse discuter avec Internet, elle a besoin d'un outil natif d'Angular : le HttpClient.

En Angular, on utilise l'Injection de Dépendance. On ne crée pas l'outil avec new, on le "réclame" simplement dans le constructeur.

À ton tour : Saurais-tu écrire le constructor de ta classe pour qu'il reçoive (injecte) une variable privée nommée http de type HttpClient ?

Essaie d'écrire juste les 3 lignes du constructeur.

User : Ok en fait il fallait faire la commande ng new <project-name> et ça a créé un truc complet

reponse : Ah, tu es remonté à la source ! Bien joué.

Effectivement, ng new construit "la maison" (l'architecture du projet, les fichiers de config, le premier composant, etc.). Mais cette maison est vide pour l'instant : elle ne sait pas encore communiquer avec l'extérieur.

Reprenons notre plan. Nous devons créer notre "livreur" (le Service) à l'intérieur de ce nouveau projet.

Ton défi immédiat :

Assure-toi d'être dans le dossier du projet via ton terminal (avec la commande cd nom-de-ton-projet).

Lance la commande que tu as trouvée tout à l'heure (ng generate service ...).

Une fois fait, regarde dans le dossier src/app. Quels sont les deux nouveaux fichiers qui sont apparus ?

User : Ok c'est bon

reponse : Super. Maintenant, le vrai travail de code commence.

Ouvre le fichier .service.ts que tu viens de générer. Tu devrais voir une classe vide avec export class ....

Pour que ce service puisse discuter avec l'extérieur, il a besoin de l'outil HttpClient. En Angular, on ne crée pas cet outil nous-mêmes, on le demande poliment au "constructeur" (c'est l'Injection de Dépendance).

Le défi : Essaie d'écrire le constructor de ta classe pour qu'il récupère cet outil.

Voici la structure à suivre (complète les pointillés) :

TypeScript
export class LivreurService {

// Indice : on veut une variable 'private' nommée 'http' de type 'HttpClient'
constructor( ... ) { }

}
Dis-moi ce que tu as écrit entre les parenthèses !

User : Tu expliques trop mal, il ne faut pas que tu donnes les réponses mais que tu orientes bien sur la chose à faire, car là tu me dis de faire le constructeur mais je mets quoi dedans ?

reponse : Tu as raison, j'ai manqué de clarté. Désolé. On reprend la logique pure de la syntaxe.

En TypeScript, à l'intérieur des parenthèses du constructor, tu dois déclarer 3 choses dans un ordre précis pour obtenir un outil :

La portée (pour dire que c'est une variable privée à cette classe) -> mot clé : private

Le nom que tu veux donner à ta variable -> disons : http

Le type de l'outil (ce que c'est réellement) -> c'est le : HttpClient

La syntaxe s'écrit toujours comme ça : portée nom: Type

Exercice : Assemble ces 3 éléments (private, http, HttpClient) dans cet ordre précis, séparés par des espaces et les deux-points, à l'intérieur des parenthèses.

Ça donne quoi ?

User : constructor(private http httpclient)

reponse : C'est presque ça ! Tu as les bons mots, il manque juste la ponctuation de TypeScript.

Deux petites corrections :

Le séparateur : En TypeScript, on sépare le nom de la variable de son type par deux points (:).

La casse : Le type est une classe, donc il commence par une majuscule et suit le PascalCase -> HttpClient.

Le format est : private nom: Type

Réessaie en ajoutant les deux points et en corrigeant la majuscule.

User : constructor(private http: HttpClient) {}

reponse : C'est validé ! ✅

Juste une petite convention de pro : on met généralement une minuscule au nom de la variable (http) et une majuscule au type (HttpClient). Donc : constructor(private http: HttpClient) {}.

Étape 2 : L'appel à l'API
Maintenant que ton "livreur" (this.http) est prêt, on va lui donner une mission.

Nous allons utiliser une fausse API gratuite pour tester : https://jsonplaceholder.typicode.com/users

Le défi : Sous le constructeur, crée une nouvelle méthode (fonction) appelée getUsers. Cette méthode doit retourner (return) l'appel get de ton outil http avec l'URL ci-dessus.

La structure ressemble à ça :

TypeScript
getUsers() {
return this.http. ... ( ... );
}
À toi de remplir les pointillés !

User : return this.http.get('https://jsonplaceholder.typicode.com/users');

reponse : Parfait ! Ton code est correct. Le service est prêt à aller chercher les données.

Maintenant, il faut utiliser ce service dans ta page web. Ouvre le fichier app.component.ts.

Pour utiliser le LivreurService dans ce composant, on doit faire exactement la même chose que tout à l'heure : l'injecter dans le constructeur.

Exercice : En te basant sur ce que tu as fait pour http, écris le constructeur du composant AppComponent qui injecte une variable private nommée livreur de type LivreurService.

À toi !

User : Faut-il faire un nouveau constructeur ?

reponse : Non, un seul constructeur par classe suffit ! Si tu en as déjà un, on ajoute simplement le service à l'intérieur, entre les parenthèses.

Si tu n'en as pas, on le crée.

Voici à quoi cela doit ressembler dans ton fichier app.ts (ou app.component.ts) :

TypeScript
export class App { // ou AppComponent
// ... tes autres variables ici (comme title)

constructor(private livreur: LivreurService) {
// Le service est maintenant disponible via "this.livreur"
}
}
Étape suivante : Déclencher l'appel
Maintenant que le "livreur" est dans la place, on veut qu'il travaille dès que la page s'affiche. En Angular, on utilise une fonction spéciale pour ça : ngOnInit().

Ta mission :

Ajoute une méthode ngOnInit() juste après ton constructeur.

À l'intérieur, appelle la fonction getUsers() de ton service.

Indice : Pour atteindre ton service, utilise this.livreur.getUsers().

Écris-moi le bloc ngOnInit() que tu as préparé.

User : Donc constructor (private middleware: http) et fais step by step

reponse : Tu as raison, restons concentrés. On ne fait que la première étape.

Étape 1 : Créer la variable de stockage
Pour afficher des données dans ta page (le HTML), elles doivent d'abord exister dans ton code (le fichier .ts). On doit créer une variable "boîte" qui va recevoir la liste des utilisateurs.

Dans ta classe App, juste au-dessus du constructor, on va créer cette variable.

Ta mission : Comment créerais-tu une variable nommée listeUsers ? Comme on ne sait pas encore ce qu'il y a dedans au début, on peut dire qu'elle est de type "n'importe quoi" pour l'instant : any.

Indice : La syntaxe est nomDeLaVariable: type;

Écris-moi juste cette ligne de déclaration.

User : listeuser: any;

reponse : C'est exactement ça ! Ta "boîte" est prête.

Étape 2 : Lier l'API à cette variable
Maintenant, on doit faire en sorte que lorsque l'API répond, les données aillent directement dans ta variable listeuser.

On va utiliser le fameux .subscribe(). C'est un peu comme un écouteur qui attend que les données arrivent. À l'intérieur du subscribe, on va faire une affectation (dire que A = B).

Ta mission : Complète la logique dans ton ngOnInit :

TypeScript
ngOnInit() {
this.middleware.getUsers().subscribe(donnees => {
// ICI : comment dis-tu que 'this.listeuser' doit prendre la valeur de 'donnees' ?
});
}
Quelle ligne de code écris-tu à l'intérieur du bloc pour remplir ta boîte ?

User : this.listuser = donnees

reponse : Exactement ! C'est la ligne clé. Maintenant, les données ne sont plus "dans les airs", elles sont bien rangées dans ton composant.

Étape 3 : L'affichage dans la page (HTML)
C'est là que la "magie" opère. On va passer dans ton fichier HTML (ou dans la partie template de ton fichier app.ts).

Comme listeuser contient une liste (plusieurs utilisateurs), on ne peut pas l'afficher d'un coup. On doit demander à Angular de faire une boucle pour créer un élément pour chaque utilisateur.

En Angular, pour faire une boucle sur une liste dans le HTML, on utilise une directive qui s'écrit avec une étoile : \*ngFor.

La syntaxe ressemble à ça : "let unUtilisateur of listeuser"

Ton défi : Imagine que tu as une balise <ul> (une liste). À l'intérieur, tu veux créer un <li> pour chaque personne.

Comment écrirais-tu la balise <li> en utilisant le \*ngFor pour boucler sur ta variable listeuser ?

User : Ok on met du coup let individu of listeusers

reponse : C'est exactement ça ! Tu as compris la logique de la boucle.

Maintenant, il ne reste plus qu'un tout petit détail pour que l'utilisateur voie quelque chose sur son écran.

L'affichage final : "Le Moustache"
Actuellement, ta boucle crée bien un élément HTML pour chaque utilisateur, mais il est vide. En Angular, pour afficher la valeur d'une variable à l'intérieur du texte, on utilise une syntaxe qu'on appelle familièrement les "moustaches" : {{ ... }}.

Ton ultime mission :
À l'intérieur de ta balise (là où tu as fait ton \*ngFor), tu veux afficher le nom de l'individu.

Sachant que :

Ta variable temporaire s'appelle individu.

L'API donne un champ qui s'appelle name.

Comment écris-tu la commande entre "moustaches" pour afficher le nom de cet individu ?

User : Ah donc individu.name

reposne : Exactement ! Mais attention : si tu écris juste individu.name dans ton HTML, le navigateur va afficher le texte "individu.name" tel quel.

Pour qu'il comprenne que c'est une variable et qu'il doit aller chercher le "vrai" nom (comme "Leanne Graham"), tu dois l'entourer des fameuses doubles accolades.

On récapitule ton code HTML final
Essaie d'assembler les deux concepts que tu as trouvés :

La boucle : \*ngFor="let individu of listeuser"

L'affichage : {{ individu.name }}

À quoi ressemble ta balise <li> au complet maintenant ?

User : Je ne vais pas tout l'écrire, t'inquiète, il est bien

reponse : Je te fais confiance ! Si tu as bien ta boucle \*ngFor sur la balise et tes {{ }} à l'intérieur, ton interface va s'animer dès que l'API répondra.

Tu as maintenant la chaîne complète :

Le Service (Middleware) qui fait le get.

Le Composant (App) qui subscribe et stocke dans une variable.

Le HTML qui boucle et affiche avec les doubles accolades.

Une dernière petite astuce de Mentor : Parfois, l'API est plus rapide que l'affichage, ou l'inverse. Si tu vois une erreur "cannot read property of undefined", c'est souvent parce qu'on essaie d'afficher la liste avant qu'elle ne soit arrivée.

Sais-tu quel petit symbole (un point d'interrogation) on peut ajouter dans les moustaches pour éviter que l'app ne plante si la donnée est encore en train de charger ?

User : Pour lancer et tester on fait comment ?

reponse : Pour voir ton travail en direct, on retourne dans le terminal. C'est le moment où on compile tout ton code pour que le navigateur puisse le lire.

1. La commande de lancement
   Il existe une commande unique qui fait trois choses : elle démarre un serveur local, surveille tes modifications et rafraîchit la page automatiquement.

Quelle commande du CLI Angular utilises-tu pour "servir" ton projet ? (Indice : ça commence par ng et le deuxième mot veut dire "servir" en anglais).

2. Où regarder ?
   Une fois la commande lancée, le terminal va te donner une adresse locale (souvent http://localhost:4200).

3. Le débogage (Très important !)
   Si ta page est blanche ou vide :

Fais un clic droit sur la page dans ton navigateur.

Choisis "Inspecter".

Va dans l'onglet "Console".

C'est là que tu verras si l'API a bloqué l'accès ou si tu as une erreur de syntaxe.

Dis-moi, est-ce que tu as réussi à lancer le serveur ?

Étape suivante : Si ça ne s'affiche pas, on pourra vérifier ensemble un fichier de configuration crucial qu'on a oublié : le provideHttpClient(). Veux-tu qu'on vérifie ça ?

User : ng serve

reponse : C'est presque ça ! La commande exacte est ng serve.

Une fois que tu l'as tapée, attends que le terminal affiche "Compiled successfully". Ensuite, ouvre ton navigateur à l'adresse http://localhost:4200.

Le dernier obstacle (Le "Check-up")
Si tu ne vois rien s'afficher ou si tu as une erreur rouge dans la console, c'est sûrement parce que ton application n'a pas encore la "permission" d'utiliser Internet.

Depuis les versions récentes d'Angular, il faut déclarer explicitement qu'on veut utiliser l'outil de communication HTTP.

Sais-tu dans quel fichier on configure les outils globaux de l'application ? (C'est un fichier qui s'appelle souvent app.config.ts ou main.ts selon ta version).

Veux-tu que je t'aide à vérifier si l'accès HTTP est bien activé là-bas ?

User : can't bind ngForOf, ng0303

reponse : L'erreur NG0303 avec le message can't bind to 'ngForOf' est très classique en Angular moderne. Elle signifie que ton composant essaie d'utiliser une boucle, mais qu'il n'a pas importé l'outil nécessaire pour le faire.

Voici comment régler ça en 2 secondes :

La solution : Importer le CommonModule
Comme tu es probablement dans un composant Standalone (le nouveau format d'Angular), tu dois déclarer les outils que tu utilises directement dans le fichier app.ts.

Dans ton fichier app.ts, modifie ton décorateur @Component comme ceci :

TypeScript
import { CommonModule } from '@angular/common'; // 1. Ajoute cet import en haut

@Component({
selector: 'app-root',
standalone: true,
imports: [CommonModule], // 2. Ajoute CommonModule ici
templateUrl: './app.component.html'
})
export class App { ... }
Pourquoi cette erreur arrive ?
Angular est devenu "modulaire à la carte". Par défaut, un composant ne connaît rien (ni le *ngFor, ni le *ngIf). Le CommonModule est le pack qui contient toutes ces directives de base.

Une fois que tu as ajouté CommonModule dans la liste imports: [...], l'erreur devrait disparaître et ta liste devrait s'afficher.

Est-ce que l'erreur a disparu de ton terminal ?

User : Ok on a l'affichage. Maintenant on va intégrer l'API OpenWeatherMap

reponse : Top ! Si l'affichage fonctionne, c'est que toute ta structure (Service -> Composant -> HTML) est solide.

Passer sur OpenWeather, c'est exactement la même logique, mais avec deux petites nouveautés : une clé API (API Key) et des paramètres dans l'URL (comme la ville).

1. Prépare ton URL
   L'URL d'OpenWeather ressemble à ceci : https://api.openweathermap.org/data/2.5/weather?q={ville}&appid={ta_clé}&units=metric

2. Modifie ton Service (middleware.ts)

Veux-tu que je t'aide à adapter ton Service pour qu'il utilise OpenWeather ?

User : Oui

Reponse : Modification du service middleware.ts pour intégrer la clé API et la méthode getWeather (requête GET). Adaptation du composant app.ts pour stocker un objet unique (any) au lieu d'un tableau (any[]). Mise à jour du template HTML pour supprimer la boucle \*ngFor et accéder directement aux propriétés de l'objet JSON.

Attention : l'objet d'OpenWeather est "nichée". La température est dans main.temp.
As-tu déjà ta clé API OpenWeather ou veux-tu que je t'explique comment la récupérer ?

User : Nickel ça marche, maintenant je veux stocker les résultats sur le localStorage

reponse : C'est une excellente idée ! Cela permet de garder la météo affichée même si l'utilisateur rafraîchit la page.

Le LocalStorage ne peut stocker que du texte (des chaînes de caractères). Comme nos données météo sont un objet, on va devoir les transformer en texte pour les ranger, puis les retransformer en objet pour les lire.

1. Sauvegarder dans le LocalStorage
   Implémentation de la persistance des données via le LocalStorage pour conserver la météo après rechargement.

Modification de la méthode rechercherMeteo (app.ts) pour stocker la réponse API immédiatement après sa réception. Utilisation des méthodes natives du navigateur :

setItem : Sérialisation et écriture des données.

getItem : Lecture et récupération des données.

removeItem : Suppression des données (nettoyage).

User : Nickel merci, dans <div *ngIf="resultatMeteo" class="carte-meteo"> c'est quoi l'inverse de *ngIf ?

Reponse : Gestion de l'affichage conditionnel (Absence de données)

Pour gérer l'état où aucune donnée météo n'est encore chargée, deux approches ont été identifiées :

L'approche moderne (Control Flow) : Depuis Angular 17, l'utilisation de la nouvelle syntaxe de flux de contrôle permet de créer des blocs logiques (@if suivi d'un @else). Cette méthode offre une structure plus lisible, proche du langage naturel, et garantit que les deux états (données présentes vs absence de données) sont mutuellement exclusifs.

L'approche classique (\*ngIf) : Elle consiste à utiliser la directive structurelle standard sur deux éléments distincts. Le premier vérifie la présence de la variable, tandis que le second utilise l'opérateur de négation logique (le point d'exclamation) pour vérifier son absence. Cette méthode est utile si les deux blocs d'affichage doivent être placés à des endroits différents de la page.

User : Nickel, on a fait des tests et là il faut appuyer 2 fois sur le bouton rechercher pour qu'il affiche le résultat bien que le JSON soit chargé

Reponse : Résolution du problème de mise à jour de l'interface (Change Detection)

Un dysfonctionnement a été identifié où l'interface graphique ne se mettait pas à jour immédiatement après la réception des données API, nécessitant une seconde interaction utilisateur. Ce comportement est lié au cycle de détection des changements d'Angular.

Deux solutions techniques ont été explorées pour corriger ce délai :

Vérification de la stratégie de détection : Contrôle de la configuration du composant pour s'assurer que la stratégie stricte (OnPush) n'était pas activée par erreur, ce qui bloquerait les mises à jour automatiques standard.

Déclenchement manuel du rafraîchissement : Utilisation du service natif ChangeDetectorRef. Cette méthode consiste à injecter ce service et à invoquer sa fonction de détection (detectChanges) directement après la réception des données asynchrones. Cela force Angular à prendre en compte les modifications de données survenues hors de son cycle d'exécution habituel et à redessiner la vue instantanément.

Note complémentaire : Vérification du typage explicite des boutons d'action (type="button") pour éviter tout rechargement de page intempestif lié aux comportements par défaut des formulaires HTML.

User : Nickel, dans le JSON reçu il y a l'icône de la condition. Comment l'afficher sur le HTML ?

reponse : Intégration dynamique des ressources graphiques (Icônes)

L'API renvoyant un identifiant de ressource (code alphanumérique type "01d") plutôt qu'un fichier image direct, une logique de construction d'URL dynamique a été implémentée dans le template HTML.

Le processus se décompose en trois points techniques :

Utilisation du Property Binding : Exploitation de la syntaxe Angular ([src]) sur la balise image. Cela permet d'évaluer une expression JavaScript directement dans l'attribut HTML plutôt que d'assigner une chaîne de caractères statique.

Concaténation de l'URL : Construction programmatique du lien vers le CDN (Content Delivery Network) d'OpenWeather en insérant dynamiquement le code récupéré dans la réponse JSON (weather[0].icon).

Optimisation du rendu : Sélection explicite du suffixe haute résolution (@2x.png) dans l'URL générée pour garantir une qualité d'affichage optimale sur les écrans modernes.

User : Merci, est-ce que tous ces bouts de code et le code entier sont asynchrones ?

reponse: Oui, absolument ! Tout ce que tu viens d'écrire est fondamentalement asynchrone.

En programmation, le code synchrone bloque tout : on attend que l'API réponde avant de pouvoir faire quoi que ce soit d'autre (la page se fige). Le code asynchrone, lui, lance la commande et dit : "Continue ton travail, préviens-moi quand les données sont arrivées".

Voici les 3 éléments qui prouvent que ton code est asynchrone :

1. L'Observable (Le flux)
   Dans ton service, la fonction getMeteo ne renvoie pas directement des données, elle renvoie un Observable<any>. C'est comme un abonnement à un magazine : tu ne reçois pas le magazine à l'instant où tu t'abonnes, tu le recevras plus tard quand il sera prêt.

2. Le .subscribe() (L'attente)
   Dans ton fichier app.ts, tu utilises .subscribe().

Le code à l'intérieur du subscribe ne s'exécute que lorsque l'API répond (cela peut prendre 10ms ou 2 secondes).

Pendant ce temps, le reste de ton application reste fluide, l'utilisateur peut toujours cliquer ailleurs.

3. Le cycle de vie "Non-bloquant"
   Regarde cet exemple de ce qui se passe dans ton code :

TypeScript
rechercherMeteo() {
console.log("1. Je lance la recherche"); // S'affiche de suite

this.service.getMeteo(this.ville).subscribe(donnees => {
console.log("3. Les données sont arrivées !"); // S'affiche plus tard
});

console.log("2. J'ai fini de lire la fonction"); // S'affiche AVANT le point 3
}
Le piège de l'asynchrone (Le *ngIf)
C'est précisément parce que c'est asynchrone que tu as besoin du *ngIf="resultatMeteo" dans ton HTML. Au premier millième de seconde, la variable est vide (null). Si tu n'avais pas le \*ngIf, Angular essaierait d'afficher la température avant même que l'API n'ait répondu, et ton application crasherait.

C'est clair pour toi cette différence, ou tu veux que je te montre comment gérer une erreur (si l'API ne répond jamais par exemple) ?

User : Nickel, petit problème, tu vois on avait le change detector. Quand on met une ville valide ça marche, on doit appuyer qu'une fois, mais quand il y a une erreur faut appuyer 2 fois pour qu'il y ait le message ville non trouvée qui s'affiche. Dis-le sans mentionner de code.
