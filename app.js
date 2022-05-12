var jet = document.getElementById("jet");
var board = document.getElementById("board");

window.addEventListener("keydown", (e) => {
  var left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
  if (e.key == "ArrowLeft" && left > 0) {
    jet.style.left = left - 30 + "px";
  }
  else if (e.key == "ArrowRight" && left <= 460) {
    jet.style.left = left + 30 + "px";
  }

  if (e.key == "w" || e.keyCode == 32) {
    //32 este pentru 'Space'
    var bullet = document.createElement("div");
    bullet.classList.add("bullets");
    board.appendChild(bullet);

    var movebullet = setInterval(() => {
      var rocks = document.getElementsByClassName("rocks");

      for (var i = 0; i < rocks.length; i++) {
        var rock = rocks[i];
        if (rock != undefined) {
          var rockbound = rock.getBoundingClientRect();
          var bulletbound = bullet.getBoundingClientRect();

          //Conditie ce verifica daca glontul a lovit Putin

          if (
            bulletbound.left >= rockbound.left &&
            bulletbound.right <= rockbound.right &&
            bulletbound.top <= rockbound.top &&
            bulletbound.bottom <= rockbound.bottom
          ) {
            rock.parentElement.removeChild(rock); //Stregerea Putinului daca e impuscat
            //Scoreboard
            document.getElementById("points").innerHTML =
              parseInt(document.getElementById("points").innerHTML) + 1;
          }
        }
      }
      var bulletbottom = parseInt(
        window.getComputedStyle(bullet).getPropertyValue("bottom")
      );

      //spreste glontul de a iesi din interfata
      if (bulletbottom >= 600) {
        clearInterval(movebullet);
      }

      bullet.style.left = left + "px"; //glontul porneste mereu de la capul rachetei
      bullet.style.bottom = bulletbottom + 3 + "px";
    });
  }
});

var generaterocks = setInterval(() => {
  var rock = document.createElement("div");
  rock.classList.add("rocks");
  //generare Putini aleatorie
  var rockleft = parseInt(
    window.getComputedStyle(rock).getPropertyValue("left")
  );
  //generare valoare intre 0-450
  rock.style.left = Math.floor(Math.random() * 450) + "px";

  board.appendChild(rock);
}, 1500);

var moverocks = setInterval(() => {
  var rocks = document.getElementsByClassName("rocks");

  if (rocks != undefined) {
    for (var i = 0; i < rocks.length; i++) {
      //miscarea Putinilor in jos
      var rock = rocks[i];
      var rocktop = parseInt(
        window.getComputedStyle(rock).getPropertyValue("top")
      );
      //475 => boardheight - rockheight + 25
      if (rocktop >= 475) {
        alert("Game Over");
        clearInterval(moverocks);
        window.location.reload();
      }

      rock.style.top = rocktop + 25 + "px";
    }
  }
}, 450);
