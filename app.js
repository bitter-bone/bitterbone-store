async function checkServer() {

    const status = document.getElementById("status");

    try {

        const response = await fetch("./config.json?t=" + Date.now());

        if (!response.ok) {
            throw new Error("config.json not found");
        }

        const config = await response.json();

        if (config.online !== true) {

            status.innerHTML = `
<h2>🔴 Server Offline</h2>

<p>This is not your fault.</p>

<p>Albert's server is currently OFF.</p>

<p>Please contact Albert to turn it on.</p>

<button onclick="checkServer()">
Retry
</button>
`;

            return;
        }

        status.innerHTML = `
<h2>🟢 Server Online</h2>
<p>Redirecting...</p>
`;

        setTimeout(() => {

            window.location.href = config.server;

        }, 1000);

    }

    catch (error) {

        console.error(error);

        status.innerHTML = `
<h2>Configuration Error</h2>

<p>${error.message}</p>

<button onclick="checkServer()">
Retry
</button>
`;

    }

}

checkServer();