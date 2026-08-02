async function checkServer(){

    const status =
    document.getElementById("status");

    try{

        const config =
        await fetch("config.json");

        const data =
        await config.json();

        status.innerHTML =
        "Checking server...";

        const response =
        await fetch(

            data.server,

            {

                mode:"no-cors"

            }

        );

        window.location.href =
        data.server;

    }

    catch{

        status.innerHTML=

        `

<h2>

Server Offline

</h2>

<p>

This is not your fault.

</p>

<p>

Albert's server is currently OFF.

</p>

<p>

Please contact Albert and try again later.

</p>

<button onclick="location.reload()">

Retry

</button>

`;

    }

}

checkServer();