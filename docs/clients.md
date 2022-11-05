# Documnentation API client L1000 service  

## 1. Grande ligne
Le client est une plateforme permettant aux `utilisateurs finaux` (`end users`) d'acceder aux differentes `ressources` de la plateforme. 

La platforme L1000 Services est un ecosystème qui est supceptible d'avoir au fil des année plusieurs clients et ressources, ce qui fait que chaque client devra avoir une identification unique dans la `plateforme` (entreprise). \
\
Pour s'assurer d'une bonne tracabilité et une bonne identifaction de nos clients, nous devons avoir toutes les informations jugées `nécessaires` en rapport avec le client qui accède dans notre système.A noter qu'un `client` peut etre une application mobile, web, desktop, une autre API; etc. et ce dernier peut etre interne ou externe. Ces informations sont les suivantes: \
1. owner: celui-ci contiendra toutes les informations sur la denomination du client et les caractéristiques qui en découlent telle que : \
   a. `name` : la desigantion du client (nom du projet ou de l'application),\
   b. `adminMail`: l'adresse mail de l'adminisatrateur de la plateforme, ce dernier peut etre un `développeur simple` ou le `CEO`, ou encore le `CTO` de cette entreprise.
   c. `enterprise` : le nom de l'entreprise\
   d. `isInterne` : `True` si ce dernier est un client interne de l'entreprise, `False` dans le cas contraire.\
   f. `isRessource` : `True` si ce dernier est une ressource et non un client. 

2. `description` : la description du projet 
3. `redirectUrl` : Cette url est unique et va permettre de rediriger l'utilisateur final vers la ressource demandée. 
4. key : ce dernier permet d'indetifier d'une manière unique les clients dans notre plateforme.

## 2. Comment identifier un client?
`Note: pour la première version de cette API, les client sont authentifiés via l'un des adminisatrateur de l'entreprise. Dans les versions qui suivront nous pourrons voir comment changer cette manière de faire les choses.`

### 2.1 Aunthentifier un client dans la plateforme
`Quid un client`: Un client est une plateforme (application par exemple) permettant à un utilisateur (dit utilisateur final ou end user) via son interface utilisateur, à pouvoir acceder à une ressource.

Un `client` peut etre une application mobile, web ou desktop ou soit un service tel qu'une API,etc. Dans ce `authorization server` les clients ne pourront accéder aux services que si ce dernier sont authorisés à le faire c'est à dire detiennent une clé ou identifant leur donnant accès dans la pateforme.

Pour authentifier un client dans la pateforme L1000 services, il faut seulement le super admin. Pour la premiere version. A `noter` que dans les versions qui suivent, les clients pourront passer par une plateforme tierse jugée sécurisée et digne de confiance pour pouvoir acceder à cette fonctionnalité `(c'est à dire)` etre autonome de pouvoir créer par lui-meme un compte client.

### 2.1.1 Procédure pour créer un compte client
Via une application client pour cette première version la plateforme `dasbord ou admin` de l'application l1000pay, le `super admin` seul à le privillege de `créer` un compte client, `visualiser` les clients et ressourse, `supprimer` et `modifier`.

Le client quelque soit interne ou externe doit fournier les informations en rapport avec sa plateforme, à savoir : 

1. owner : qui est un objet regroupant les information importantes en rapport avec le client telle que: `name`, `adminMail`, `enterprise`, `isInterne`, `isRessource`,
2. description
3. subscribeTo : une liste de ressourse auxquelles le clients à souscrit. vu que pour cette première version nous n'aurons qu'une seule ressourc et dont les clients ne pourront que souscrir à cette seule et unique ressouces. mais dans la suite les ressources peuvent etre nombreuse et une possibilté de pouvoir souscrir à plusieurs ressources peut etre. `Note` que si un client est une ressource, cette partie doit etre vide pour cette première version.
4. redirectUrl: l'url de redirection
5. key: ce dernier sera générée automatiquement apres voir fini de resseigner à l'authorization server ces infomation. 

Une fois le client enrégistré, un mail contenant la clé du client et les informations des/de la ressources souscrit sera envoyé à l'adresse mail de l'admin indiqué vers `adminMail`, et ce dernier sera utilisé pour permettre d'intentifier le client lorsque ce dernier voudrais accéder à une ressource. 

Methode: `POST`\
EndPoint : `auth/admin/super`\
Content-type: `application-json`\
Body: \
```
{
        owner: {
        name: String,
        adminMail: String, // the mail the admin/CTO, etc
        enterprise: String, // this section can be null if the client is an interne client
        isInterne: {
            type: Boolean,
            default: false
        },
        // in the scenario that the ressource is adding
        isRessource: {
            type: Boolean,
            default: false
        },
    },
    description: String,
    subscribeTo: [
        String, // those are keys of ressources the client is eligible to.
    ],
    redirectUrl: String, // the url to redirect after authentifiate the user
    key: String,
}
```
Responses payload: 
```
{
    "message": "Le compte a été bien enrégistré"
}
```

Status\
 `201` : Success\
 `409`: Conflit, `cela peut etre du a un email déjà enrégistré dans la platefom`\
 `500`: Internal server error\
 `403`: Unauthorized 

 ### 2.1.2 Utilisation du compte client

 Comme nous l'avions dit plus haut, un `client` est une platforme permettant aux utilisateurs finaux de pouvoir acceder aux ressources d'un `server de ressoures`. 

 Le client doit authentifier l'utilisateur final en disant `hey je voudrais bien authentifier mon utilisateur x pour lui permettre d'accèder à la ressource y`. et dans ce cas le serveur d'authorisation va l'authentifier et lui rediriger vers le serveur de ressource dont ce client voudrais accéder. 

 Une fois l'utilisateur final authentifié c'est à dire un compte crée si possible ou l'authentification reussie, ce dernier sera redirigé au serveur de ressource pointé par l'application cliente. Et de là le server de ressource pourra l'octroyer un jeton pour lui permettre d'acceder aux ressources qui lui sont authorisées.

 Pour cette première version vu que notre système n'est pas encore assez grand ce dernier ne sera pas un problème aux développeur d'implementer cette dernier car nous n'aurons qu'une seule ressource.

 ### 2.1.2.1 Implementation d'une application cliente

Le client dois passer sa clé d'authorisation et la ressource à laquelle l'utilisateur final voudrait accéder dans l'en-tete de sa requete pour permettre au server d'authorisation de l'indetifier comme étant un client approuvé par la plateforme. 

```
{
   ...
   "ressource": "String"// la clé de la ressource
   "Authorization" : "String" // this string is the authorization key of the client,
   ...
}
```






 
   
   
