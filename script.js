let username = "not logged in";

function init() {
    for (let index = 0; index < games.length; index++) {
        document.getElementById("game-gallery").innerHTML += `<div id="single-game-cover${index}" class="single-game-cover">hi ${index}</div>`
    }
    writeGameCard();
    showComments();
}

function writeGameCard() {
    for (let index = 0; index < games.length; index++) {
        document.getElementById("single-game-cover" + index).innerHTML = writeNameContainer(index);
        document.getElementById("single-game-cover" + index).innerHTML += writeImageContainer(index);
        document.getElementById("single-game-cover" + index).innerHTML += writeInfoContainer(index);
        document.getElementById("single-game-cover" + index).innerHTML += writeCommentContainer(index);
        checkLikes(index);
    }
}

function checkLikes(index) {
    if (games[index].liked == true) {
        document.getElementById("like-button" + index).classList.add('bg-red');
    } else {
        document.getElementById("like-button" + index).classList.remove('bg-red');
    }
}

function giveLike(index) {
    document.getElementById("like-button" + index).classList.toggle('bg-red');
    if (games[index].liked == true) {
        games[index].likes -= 1;
        games[index].liked = false;
    } else {
        games[index].likes += 1;
        games[index].liked = true;
    }
    document.getElementById("like-count" + index).innerHTML = games[index].likes;
}

function showComments() {
    for (let i = 0; i < games.length; i++) {
        for (let j = 0; j < games[i].comments.length; j++) {
            document.getElementById("comment-box"+ i).innerHTML += writecomments(i,j);
        }
    }
}

function writeOwnComment(index) {
    if (document.getElementById("comment-input" + index) != "") {
        let comment = document.getElementById("comment-input"+index);
        games[index].comments.push({"name": username,"comment": comment.value})
        comment.value = "";
        showCommentBox(index);
    }
}

function showCommentBox(index) {
    document.getElementById("comment-box" + index).innerHTML = "";
    for (let j = 0; index < games[index].comments.length; j++) {
        document.getElementById("comment-box" + index).innerHTML += writecomments(index, j)
    }
}

function showLoginWIndow() {
    document.getElementById('login-nav').classList.toggle('login-nav-closed');
}

function changeUserName() {
    username = document.getElementById('username-input').value;
    document.getElementById('login-nav').classList.add('login-nav-closed');
    document.getElementById('login-name').innerHTML = `Name: ${username}`
    document.getElementById('username-input').value = "";
}