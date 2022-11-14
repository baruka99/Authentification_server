# Documnentation API Utilisateur L1000 service  

## 1. Grande ligne
Les usitilisateurs de la plateforme L1000 service sont considerés comme `end user` ou en français `utilisteur final`, et pour le cas du service `l1000pay` par exemple, nous avons les different type d'utilisateur selon leur niveau d'accès dans la plateforme à savoir, un admin, un client (customer), un chauffeur, agent. 

## 2. Autentification
Comme le dit plus haut, nous avons différent type d'utilisateur et chacun se caractérise selon sont niveau d'accès c'est à dire role dans la plateforme. Pour cette première version nous avons pris pour super admin, un admin crée à la console, et ce dernier a `le privillège le plus élévé` dans la plateforme l1000 service. En plus chaque plateforme (`Ressource`) doit se donner un admin qui va gerer l'entierete de tout le traffics s'effectuant dans ladite plateforme. Nous prennons l'exemple de notre premier service `l1000pay`, cette plateforme aura son/ses admins qui pourront gerer l'ensemble de traffic de l1000pay selon les regles de gestions qui sera annocée par l'entreprise.

### 2.1 Le super admin
Le super admin est l'administrateur principale dans la plateforme, ce dernier a le privillege de `supprimer les autres admins et tout autre utilisateur`, il peut `supprimer un service`, et aussi `supprimer une application cliente de la plateforme`. Nous conseillons grandemment que les identifiant de ce dernier soit jalousement gardées et ne tombent pas entre les mains des personnes malveillantes.

Le super admin est crée dans la platforme via un console et sera crée lors du premier deploiement, et ne sera jamais supprimé par la suite ni aucune possibilité de modifier ses identifiants par la suite. Seul son jeton d'accès sera modifié et cela par le server lui-meme.

`Note: une fois le super admin est crée il ne peut plus l'etre`

\
Pour authentifier un super admin, il suffit juste de passer l'`addresse mail` du super admin, un mot de passe de `64 caractères` lui sera envoyé dans sa boite `mail`, ce qui lui permettra de s'authentifier dans la suite. 

1. Creation du compte
 
Methode: `POST`\
EndPoint : `auth/admin/super`\
Content-type: `application-json`\
Body: 
```
{
    "email": "exemple@domain.com"
}
```
Responses payload: 
```
{
    "message": "L'administrateur a été bien enrégistré"
}
```

Status\
 `201` : Success\
 `409`: Conflit, `cela peut etre du a un email déjà enrégistré dans la platefom`\
 `500`: Internal server error\
 `403`: Unauthorized 

 2. Authentification/ Login\
le login se fait comme tout autre compte utilisateur, l'admin doit passer le nom d'utilisateur et le mot de passe et si les indentifiants sont correctes, le serveur lui renvera son `credential Id` (qui est un id hashé) qui lui permettra d'effectuer une requete de type `GET` pour obtenir son jeton d'authentification.

Methode: `POST`\
EndPoint : `login/admin/super`\
Content-type: `application-json`\
Body: 
```
{
    "username": "exemple@domain.com",
    "password": 1234
}
```
Responses payload: 
```
{
    "message": "Vous avez été bien connecté",
    "cred": {
        "cred" : id,
        "value" : code
    },
    
}
```

Status\
 `200` : Success\
 `409`: Conflit, `cela peut etre du a un email déjà enrégistré dans la platefom`\
 `500`: Internal server error\
 `403`: Unauthorized\
 \
Apres avoir recu ce code, ce dernier vous permettra d'optenir le token pour permettre d'effectuer les differente operations tel que la creation d'une application client dans la plateforme, les ressources, etc.\
\
3. obtention du token

Methode: `GET`\
EndPoint : `auth/token/cred`\
Content-type: `application-json`

Responses payload: 
```
{
    "token": "token",
    "user": {
        "email": "email",
        "phone": {
            "code": "code",
            "number": "number"
        },
        "createdAt": "Date"
    }
}
```

Status\
 `200` : Success\
 `409`: Conflit,\
 `500`: Internal server error\
 `403`: Unauthorized
 

## 2.2 Utilisateur final (End user)

### 2.2.1 Creation du compte

Nous avons pour cette première version une seule ressource avec différent client. Ces clients sont `Application mobile cliente, driver et agent L1000pay`. Ces clients permettrons aux utilistateurs finaux de pouvoir se connecter ou s'authentifier pour avoir accès aux ressoures demandées.

```
La clé du client et de la ressourse seront envoyées pour permettre au serveur d'authentification de pouvoir authentifer l'application cliente et de savoir s'il s'agit de la ressource de quel serveur de ressource que l'utilisateur final voudrait consulter.
```
Les roles sont important lors de la créaction du compte des utilisateurs final.

Prendre pour roles ces derniers: 

1. Basic : pour les utilisateurs finaux
2. Autres role: selon la configuration de votre serveur de ressource, 

`Le role de as super admin` ne doit pas etre choisi car l'utilisateur final ne sera jamais crée s'il utiliseur ce role.

L'application cliente doit fournir au serveur d'authentification les `informations` de l'utilisateur final pour s'authentifier à la plateforme.

Le serveur d'authentification une fois crée le compte de l'utilisateur final, il envera la réponse selon le role de l'utilisateur final. Tout les utilisateurs ayant un role `BASIC` c'est-à-dire les utilisateurs simples seront juste enrégistré d'une manière normale, il passeront via le body leurs informations suivis du mot de passe. Tandisque les autres utilisateurs finaux d'un autre role, n'enverons que leurs informations et le serveur d'authentification leur générera un mot de passe qui leur sera envoyé via l'addresse mail indiqué dans le formulaire.

`A noter que` tout les autres utilisateurs autres que ceux ayant le role `BASIC` seront authentifié (avoir pour `username`) via leur addresse mail et les utilisateurs finaux ayant pour role `BASIC` utiliserons leur numéro de téléphone pour s'authentifier.

Methode: `POST`\
EndPoint : `user/signup/clientKey/ressourceKey`\
Content-type: `application-json`\
Body (exemple): 
```
{   
    "firstName": String,
    "lastName": String,
    "email": String,
    "phone": {
        "code": String,
        "number": String
    },
    "password": String,
    "role": "driver"
    }
```
Responses payload: 
```
{
    "message":  "L'utilisateur a été enrégistré avec succès"
}
```

Status\
 `201` : Success\
 `409`: Conflit,\
 `500`: Internal server error\
 `403`: Unauthorized 

 ### 2.2.2 Login

L'authentification (login) dans notre plateforme se fais d'une manière classique, à la seule différence est qu'après l'authentification l'utilisateur final ne poura pas recevoir les informations tel que : `le token` et les informations de son compte. Une fous le serveur d'authorisation aura validé que les informations en rapport avec l'authentificaton de l'utilistateur final (y compris celles de l'application cliente) sont vrais alors le serveur d'authorisation lui envera une clé, cette clé sera envoyé au serveur de ressource et c'est le serveur de ressource qui l'octroyera un jeton d'accès (access token) et les inforation en rapport avec son compte. 

Methode: `POST`\
EndPoint : `user/login/clientKey/ressourceKey`\
Content-type: `application-json`\
Body: 
```
{
    "username": String,
    "password": String
}
```
Responses payload: 
```
{
    "cred":  String
}
```

`cred` est bien la clé qui sera envoyé vers le serveur de ressource à partir de la quelle le serveur de ressource pourra auhentifier l'utilisateur final pour lui donner ses informations.

Status\
 `201` : Success\
 `409`: Conflit, \
 `500`: Internal server error\
 `403`: Unauthorized 

 ### 2.2.3 Get user informations

Chacun de serveur de ressource aura sa manière de formater leur requete pour l'obtention de jeton d'accès et des autres informations. D'une idée globale la requette poura avoir cette form.

Methode: `GET`\
EndPoint : `auth/token/cred`\
Content-type: `application-json`\

Responses payload: 
```
{
    "token": "token",
    "user": {
        "email": "email",
        "phone": {
            "code": "code",
            "number": "number"
        },
        "createdAt": "Date"
    }
}
```

Status\
 `200` : Success\
 `409`: Conflit,\
 `500`: Internal server error\
 `403`: Unauthorized


