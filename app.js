async function checkServer() {

    const status = document.getElementById("status");

    try {

        const response = await fetch("config.json");

        const config = await response.json();

        if (!config.online) {

            status.innerHTML = `

<h2>🔴 Server Offline</h2>

<p>
This is not your fault.
</p>

<p>
Albert's server is currently OFF.
</p>

<p>
Please contact Albert to turn it on.
</p>

<button onclick="checkServer()">

Retry

</button>

`;

            return;

        }

        status.innerHTML =
        "🟢 Server online.<br>Redirecting...";

        setTimeout(() => {

            window.location.href =
            config.server;

        }, 1000);

    }

    catch (error) {

        status.innerHTML = `

<h2>Configuration Error</h2>

<p>

Unable to read server configuration.

</p>

`;

    }

}

checkServer();
