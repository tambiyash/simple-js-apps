document.getElementById("send-notif").addEventListener("click", async () => {
    // Request permission
    const perm = await Notification.requestPermission();
    console.log("PERM>>", perm);
    if (perm === "granted") {
        setTimeout(() => {
            new Notification("Hello!");
        }, 5000);
    }
});