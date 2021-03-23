module.exports = (client, ready) => {
    console.log("Akane esta prendida!");

    setInterval(async () => {
        client.user.setActivity(`el Pyschopass de ${client.users.cache.size} usuarios!`, { type: "WATCHING" });
    }, 5000);

}
