const screens=document.querySelectorAll(".screen");
const EMBEDDED_SONG="assets/song.mp3";

function go(id){
  screens.forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  if(id==="suspense") startCountdown();
}

function checkPassword(){
  const v=document.getElementById("pass").value.trim();
  const msg=document.getElementById("passMsg");

  if(v.toLowerCase()==="praneetha"){
    msg.textContent="Unlocked 💗";

    const song=document.getElementById("birthdaySong");
    song.src=EMBEDDED_SONG;
    song.load();
    song.volume=1;
    song.muted=false;

    // This is executed by the actual Unlock button click.
    song.play().then(()=>{
      console.log("Birthday song is playing");
    }).catch(err=>{
      console.error("Playback failed:",err);
    });

    setTimeout(()=>go("suspense"),500);
  }else{
    msg.textContent="Hmm... try the hint again 👀";
  }
}

function skipPassword(){ go("suspense"); }

let countdownStarted=false;
function startCountdown(){
  if(countdownStarted)return;
  countdownStarted=true;
  let n=3;
  const el=document.getElementById("count");
  el.textContent=n;
  const t=setInterval(()=>{
    n--;
    el.textContent=n;
    if(n<=0){
      clearInterval(t);
      setTimeout(()=>{
        go("darkRoom");
        countdownStarted=false;
      },500);
    }
  },900);
}

let cuts=0;
function cutCake(){
  if(cuts>=5)return;
  cuts++;
  document.getElementById("cakeProgress").style.width=(cuts*20)+"%";
  document.getElementById("cakeText").textContent =
    cuts<5 ? `Almost there... ${cuts}/5 ✨` : "Cake cut! Make your wish 💗";
  if(cuts===5) document.getElementById("wishBtn").classList.remove("hidden");
}

function restart(){
  const song=document.getElementById("birthdaySong");
  if(song){ song.pause(); song.currentTime=0; }
  cuts=0;
  document.getElementById("cakeProgress").style.width="0%";
  document.getElementById("wishBtn").classList.add("hidden");
  document.getElementById("cakeText").textContent="Click the cake 5 times to cut it ✨";
  document.querySelectorAll(".flip").forEach(x=>x.classList.remove("flipped"));
  document.getElementById("pass").value="";
  go("welcome");
}

function startMemories(){ go("memoriesRoom"); }
