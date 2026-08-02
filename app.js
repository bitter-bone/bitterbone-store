async function checkServer() {

    const status = document.getElementById("status");

    try {

        // Read the current Cloudflare URL
        const configResponse = await fetch("config.json");
        const config = await configResponse.json();

        status.innerHTML = "Checking server...";

        // Check the APK Store health endpoint
        const healthResponse = await fetch(
            config.server + "/health",
            {
                cache: "no-store"
            }
        );

        // Make sure we actually got JSON back
        const contentType =
            healthResponse.headers.get("content-type") || "";

        if (
            !healthResponse.ok ||
            !contentType.includes("application/json")
        ) {

            throw new Error("Server unavailable");

        }

        const health = await healthResponse.json();

        if (health.online !== true) {

            throw new Error("Server unavailable");

        }

        status.innerHTML = "🟢 Server online.<br>Redirecting...";

        setTimeout(() => {

            window.location.href = config.server;

        }, 1000);

    }

    catch (error) {

        console.error(error);

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

    }

}

checkServer();
