# Documnentation API client L1000 service  

## 1. Grande ligne
Le client est une plateforme permettant aux `utilisateurs finaux` (`end user`) d'acceder aux differentes `ressources` de la plateforme. 

La platforme L1000 Services est un ecosystème qui est supceptible d'avoir au fil des année plusieurs clients et ressources, ce qui fait que chaque client devra avoir une identification unique dans la `plateforme` (entreprise). \
\
Pour s'assurer d'une bonne tracabilité et une bonne identifaction de nos clients, nous devons avoir toutes les informations jugées `nécessaires` en rapport avec le client qui accède dans notre système.A noter qu'un `client` peut etre une application mobile, web, desktop, une autre API et ce dernier peut etre interne ou externe.Ces information sont les suivantes: \
1. owner: celui-ci contiendra toutes les informations sur la denomination du client et les caractéristiques qui en découlent telle que : \
   a. `name` : sa desigantion du client (nom du projet ou de l'application),\
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
   
   
