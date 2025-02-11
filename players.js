function startGame() {
    let player1 = document.getElementById("name1").value.trim();
    let player2 = document.getElementById("name2").value.trim();

    if (player1 === "") player1 = "Игрок 1";
    if (player2 === "") player2 = "Игрок 2";

    document.getElementById("player1Name").textContent = player1;
    document.getElementById("player2Name").textContent = player2;
    document.getElementById("currentPlayer").textContent = player1;

    // Можно скрыть ввод имен после старта
    document.querySelector(".player-input").style.display = "none";
}
