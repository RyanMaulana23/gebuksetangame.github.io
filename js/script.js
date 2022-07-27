const tanah = document.querySelectorAll('.tanah');
const tikus = document.querySelectorAll('.tikus');
const papanSkor = document.querySelector('.papan-skor');
const pop = document.querySelector('#pop');
const soundtrack = document.querySelector('#soundtrack');


let tanahSebelumnya;
let selesai;
let highscore;
let skor;

window.onload = function()
{
  let scoreBrowser = localStorage.getItem("HighScore");
  if (scoreBrowser !== undefined) highscore = scoreBrowser;
  document.getElementById("HighScore").innerHTML = "HighScore: " + highscore;
}

function randomTanah(tanah) {
  const t = Math.floor(Math.random() * tanah.length);
  const tRandom = tanah[t];
  if (tRandom == tanahSebelumnya) {
    randomTanah(tanah);
  }
  tanahSebelumnya = tRandom;
  return tRandom;
}

function randomWaktu(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function munculkanTikus() {
  const tRandom = randomTanah(tanah);
  const wRandom = randomWaktu(300, 1000);
  tRandom.classList.add('muncul');

  setTimeout(() => {
    tRandom.classList.remove('muncul');
    if (!selesai) {
      munculkanTikus();
    }
  }, wRandom);
}

function mulai() {
  selesai = false;
  skor = 0;
  papanSkor.textContent = 0;
  var counter = 20;

setInterval( function(){
  counter--;

  if( counter >= 0 ){
    id = document.getElementById("count");
    id.innerHTML = counter;
  }
  if( counter === 0 ){
    id.innerHTML = "Waktu habis";
  }
  }, 1000);
  munculkanTikus();
  soundtrack.play();
  setTimeout(() => {
    selesai = true;
    skor = false;
    papanSkor.textContent = "waktu habis";
  }, 20000);
}

function pukul() {
  skor++;
  papanSkor.textContent = skor;
  this.parentNode.classList.remove('muncul');

  if(skor > highscore) highscore = skor;
  localStorage.setItem("HighScore", highscore);
  document.getElementById("HighScore").innerHTML = "HighScore: " + highscore;

  pop.play();
 
  setTimeout(() => {
    setTimeout(() => {
     if (selesai = true);
      skor = false;
      papanSkor.textContent = "waktu habis";
    }, 20000);
  })
}

tikus.forEach(t => {
  t.addEventListener('click', pukul);
});

