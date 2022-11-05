# Documnentation API Utilisateur L1000 service  

## 1. Grande ligne
Les usitilisateurs de la plateforme L1000 service sont considerés comme `end user` ou en français `utilisteur final`, et pour le cas du service `l1000pay` par exemple, nous avons les different type d'utilisateur selon leur niveau d'accès dans la plateforme à savoir, un admin, un client (customer), un chauffeur, agent. 

## 2. Autentification
Comme le dit plus haut, nous avons différent type d'utilisateur et chacun se caractérise selon sont niveau d'accès c'est à dire role dans la plateforme. Pour cette première version nous avons pris pour super admin, un admin crée à la console, et ce dernier a `le privillège le plus élévé` dans la plateforme l1000 service. En plus chaque plateforme (`Ressource`) doit se donner un admin qui va gerer l'entierete de tout le traffics s'effectuant dans ladite plateforme. Nous prennons l'exemple de notre premier service `l1000pay`, cette plateforme aura son/ses admins qui pourront gerer l'ensemble de traffic de l1000pay selon les regles de gestions qui sera annocée par l'entreprise.

### 2.1 Le super admin
Le super admin est l'administrateur principale dans la plateforme, ce dernier a le privillege de `supprimer les autres admins et tout autre utilisateur`, il peut `supprimer un service`, et aussi `supprimer une application cliente de la plateforme`. Nous conseillons grandemment que les identifiant de ce dernier soit jalousement gardées et ne tombent pas entre les mains des personnes malveillantes.\
\
Le super admin est crée dans la platforme via un console et sera crée lors du premier deploiement, et ne sera jamais supprimé par la suite ni aucune possibilité de modifier ses identifiants par la suite. Seul son jeton d'accès sera modifié et cela par le server lui-meme.\\

`Note: une fois le super admin est crée il ne peut plus l'etre`

\
Pour authentifier un super admin, il suffit juste de passer l'`addresse mail` du super admin, un mot de passe de `64 caractères` lui sera envoyé dans sa boite `mail`, ce qui lui permettra de s'authentifier dans la suite. \
\
1. Creation du compte
 
Methode: `POST`\
EndPoint : `auth/admin/super`\
Content-type: `application-json`\
Body: \
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
3. obtention du token\
\
Methode: `POST`\
EndPoint : `auth/token/`\
Content-type: `application-json`\
Body: 
```
{
    "credId": "id",
    "value": "code"
}
```
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
 `409`: Conflit, `cela peut etre du a un email déjà enrégistré dans la platefom`\
 `500`: Internal server error\
 `403`: Unauthorized\
 


