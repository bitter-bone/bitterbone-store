async function checkServer() {

    const status = document.getElementById("status");

    try {

        // Read the current Cloudflare URL
        const configResponse = await fetch("config.json");
        const config = await configResponse.json();

        status.innerHTML = "Checking server...";

        // Ask the APKStore if it is alive
        const healthResponse = await fetch(
            config.server + "/health"
        );

        if (!healthResponse.ok) {
            throw new Error("Server unavailable");
        }

        const health = await healthResponse.json();

        if (health.online === true) {

            status.innerHTML = "Server online.<br>Redirecting...";

            setTimeout(() => {

                window.location.href = config.server;

            }, 1000);

        } else {

            throw new Error("Server offline");

        }

    }

    catch (error) {

        status.innerHTML = `

<h2>Server Offline</h2>

<p>
This is not your fault.
</p>

<p>
Albert's server is currently OFF.
</p>

<p>
Please contact Albert to turn it on.
</p>

<button onclick="location.reload()">
Retry
</button>

`;

    }

}

checkServer();
