function mail(code) {
  return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mail L1000</title>
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.css" />
</head>

<body style="margin: 0; padding: 0">
    <div style="width: 100%">
        <div style="
          padding: 0px;
          justify-content: center;
          align-items: center;
          width: 100%;
          display: grid;
        ">
            <img src="./assets/icon.png" alt=" " style="
            width: 150px;
            align-items: center;
            cursor: pointer;
            margin: 20px auto;
            display: flex;
            justify-content: center;
            align-items: center;
            align-content: center;
          " />
            <div style="
            /* box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
              rgba(27, 31, 35, 0.15) 0px 0px 0px 1px; */
            border: solid 2px gray;
            padding: 10px;
            display: block;
            justify-content: space-between;
            align-items: center;
            margin: 10px auto;
            width: 100%;
          ">
                <h2 style="
              text-align: center;
              display: flex;
              justify-content: center;
              flex-direction: row;
              flex-wrap: wrap;
              align-items: center;
              margin-bottom: 20px;
              -webkit-margin-start: 0;
              -webkit-margin-end: 0;
              color: rgb(29, 29, 29);
              letter-spacing: -0.005em;
              line-height: 1.2;
              margin-inline-end: 0;
              margin-inline-start: 0;
              font-weight: 700;
            ">
                    voici votre code !
                </h2>
                <p style="
              text-align: center;
              display: flex;
              justify-content: center;
              flex-direction: row;
              flex-wrap: wrap;
              align-items: center;
              font-size: 14px;
              margin-bottom: 20px;
              -webkit-margin-start: 0;
              -webkit-margin-end: 0;
              color: rgb(29, 29, 29);
              letter-spacing: -0.005em;
              line-height: 1.2;
              margin-inline-end: 0;
              margin-inline-start: 0;
              font-weight: 500;
            ">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia, nulla, necessitatibus exercitationem eaque id, voluptas possimus officiis dignissimos magnam alias veritatis aut. Quam doloribus necessitatibus rem delectus nihil cupiditate dolore?
                </p>
                <div style="
              align-items: center;
              background-color: #f5f5f5;
              cursor: pointer;
              margin-top: 30px;
              display: flex;
              justify-content: center;
              align-items: center;
              align-content: center;
              padding: 10px;
              color: black;
              flex-direction: row;
              flex-wrap: wrap;
            ">
                    <p style="
                text-align: center;
                font-size: 14px;
                overflow-wrap: break-word;
                width: 100%;
              ">${code}</p>
                </div>
            </div>
            <div style="
            display: flex;
            margin: 0 auto;
            gap: 10px;
            text-align: center;
            margin-top: 30px;
            /* 
          justify-content: flex-start;
          width: 100%;
          flex-wrap: wrap;
          align-items: auto;
          align-self: center;
        
          gap: 5px;
          row-gap: 5px;
          */
          ">
                <a href="/index.html" target="_blank" style="
              padding: 5px;
              border: 0.5px solid gray;
              width: 30px;
              height: 30px;
              border-radius: 100%;
              display: flex;
              text-align: center;
              justify-content: center;
              margin: 0 auto;
              flex-wrap: wrap;
              align-items: center;
              align-self: center;
              text-decoration: none;
            " onmouseover="this.style.backgroundColor='blue' " onmouseout="this.style.backgroundColor=''"><i
              class="fa-brands fa-facebook-f"
              style="display: block; width: 15px; color: gray"
            ></i
          ></a>
                <a href="/index.html " target="_blank " style="
              padding: 5px;
              border: 0.5px solid gray;
              width: 30px;
              height: 30px;
              border-radius: 100%;
              display: flex;
              text-align: center;
              justify-content: center;
              margin: 0 auto;
              flex-wrap: wrap;
              align-items: center;
              align-self: center;
              text-decoration: none;
            " onmouseover="this.style.backgroundColor='blue' " onmouseout="this.style.backgroundColor=''"><i
              class="fa-brands fa-instagram"
              style="display: block; width: 15px; color: gray"
            ></i
          ></a>
                <a href="/index.html " target="_blank " style="
              padding: 5px;
              border: 0.5px solid gray;
              width: 30px;
              height: 30px;
              border-radius: 100%;
              display: flex;
              text-align: center;
              justify-content: center;
              margin: 0 auto;
              flex-wrap: wrap;
              align-items: center;
              align-self: center;
              text-decoration: none;
            " onmouseover="this.style.backgroundColor='blue' " onmouseout="this.style.backgroundColor=''"><i
              class="fa-brands fa-linkedin-in"
              style="display: block; width: 15px; color: gray"
            ></i
          ></a>
            </div>
            <div class="copy" style="
            display: block;
            text-align: center;
            justify-content: center;
            margin: 10px auto;
            width: 50%;
            flex-wrap: wrap;
            align-items: auto;
            align-self: center;
            font-size: 12px;
            color: gray;
            font-weight: 100;
          ">
                <p>@copyright2022</p>
                <p>l1000 tout droit reserver</p>
            </div>
        </div>
    </div>
</body>

</html>`
}




module.exports = mail