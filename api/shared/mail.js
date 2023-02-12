function mail(code, to) {
  return `
    <html lang="en">
      <head>
        <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">

              <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200&display=swap" rel="stylesheet">


                  </head>
                  <body style="width: 100%;">
                    <div style="margin:10%;text-align: center;">
                      <div style="width:100%;">
                        <header style="background-color: #156BE7;padding: 20px;font-size: 20px;color: white; font-weight: bold;border-radius: 10px  10px 0px 0px">
                          Mot de passe admin
                        </header>

                        <section style="background-color: #f5f5f5;padding: 5px; text-align: left; font-size: 14px;">
                          <p style="width:70%;padding-left: 15%;padding-right: 15%;  ">Cher  utilisateur<br /><br />
                            Nous avons reçu votre demande de validation de l'adresse e-mail ${to}. votre mot de passe est :<br> <br />
                              <strong style='color:black;font-size: 20px; '>${code}</strong> <br /><br />
                
                              Si vous n'êtes  pas a l'origine de cette  demande,il est posssible qu'une tierce personne essaie d'effectuer une opération d'authentifaction avec votre compte;
                              ne lui partagez pas ce code pour votre securité.   <br />  <br />
                              Cordiallement <br /><br />
                              L'equipe Upperz
                          </p>
                        </section>

                        <footer style="background-color: #f5f5f5;padding: 20px;font-size: 16px; border-radius: 0px  0px 10px 10px">
                          <hr>
                            <p style="padding-top:10px;margin-bottom:4px;font-size: 12px">
                              Powered by <a href="https://upper-z.com">Upperz</a>
                            </p>
                        </footer>
                      </div>
                    </div>
                  </body>
                </html>
           `
}


let clientMail = (clientKey, subscribeTo) => `<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200&display=swap" rel="stylesheet">


    </head>
<body style="width: 100%;">
    <div style="margin:10%;text-align: center;">
  <div style="width:100%;">
    <header style="background-color: #156BE7;padding: 20px;font-size: 20px;color: white; font-weight: bold;border-radius: 10px  10px 0px 0px">
       Compte client
    </header>

    <section style="background-color: #f5f5f5;padding: 5px; text-align: left; font-size: 14px;">
        <p style="width:70%;padding-left: 15%;padding-right: 15%;  ">Cher  utilisateur  <b style="color: black;">Upperz community</b><br/><br/>
            votrec compte client  a été crée avec succès. votre clé client est :<br> <br/>
            <strong style='color:black;font-size: 20px; '>${clientKey}</strong> <br/><br/>
             Clé ressource souscrit:${subscribeTo}<br/><br/>
              Si vous n'êtes  pas a l'origine de cette  demande,il est posssible qu'une tierce personne essaie d'effectuer une opération d'authentifaction avec votre compte;
              ne lui partagez pas ce code pour votre securité.   <br/>  <br/>
              Cordiallement <br/><br/>
              L'equipe Upperz
            </p>
    </section>
    
    <footer style="background-color: #f5f5f5;padding: 20px;font-size: 16px; border-radius: 0px  0px 10px 10px">
        <hr>
        <p style="padding-top:10px;margin-bottom:4px;font-size: 12px">
       Powered by <a href="https://upper-z.com">Upperz</a>
    </p>
    </footer>
     </div>
   </div>
</body>
</html>`

module.exports = {
  mail,
  clientMail
}