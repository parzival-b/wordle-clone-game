
import random from "./words.js"
let words = new random();

let wordleWord= await words.randomWord();
let letterPos=1;
let nb=1;
let guesses=0;
let found=false;
let stats=document.getElementById("stats");
const blurOverlay = document.createElement('div');
let word="";
let last_guessed;

const auth = document.querySelector(".authentication");
const  mainPage = document.querySelector(".mainPage");
const email = document.getElementById("email");
const password = document.getElementById("password")
const message= document.getElementById("errors");
const changeAuth= document.getElementById("changeAuth")
const prompt = document.getElementById("prompt")
const promptChange = document.getElementById("promptChange")
let register=true;
let apiBase="/"
let token = localStorage.getItem('token')


function change(event){

event.preventDefault()
        if(register){
            register=!register
            prompt.textContent="Login to your account"
            promptChange.textContent="To Create an Account Press "
           return;
        }
        else{
            register=!register
            prompt.textContent="Create Your Account"
              promptChange.textContent="Existing users sign in, "
              return;
        }

        



    }







async function authentication(){
    let emailVal=email.value
        let passwordVal=password.value
    if(emailVal==null || passwordVal==null || !emailVal.includes("@")){
        message.innerHTML="You Have something missing";
        return;
    }

    else{
        
        let data
        try{
        if(register){
            const response = await fetch(apiBase, "auth/register",{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username: emailVal, password: passwordVal})

                


            });
            data = await response.json()

            
        }
 else{
    const response = await fetch(apiBase, "auth/login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({username: emailVal, password: passwordVal})
    })
    data = await response.json()
    }

    if(data.token){
        token = data.token
        localStorage.setItem("token:",token)
    }




    }
    catch(err){
        console.log(error)
        }


    

    
}
}

function keyboard(letter){
        if(word.length<5 && found===false){
            if(letter!=="enter" && letter!=="erase"){
            document.getElementById("letter"+letterPos).textContent=letter;
            word+=letter;
            letterPos++;
        }
    }
            if(letter==="enter"){
                if(word.length==5){
            for(let i =0;i<word.length;i++){
                for(let j=0;j<wordleWord.length;j++){
                    
                if(word.charAt(i)===wordleWord.charAt(i)  ){ // i want to make it grey if the same letter is found already
                   // document.getElementById("letter"+i).style.animation;
                    document.getElementById("letter"+nb).style.backgroundColor="rgba(0,255,0,0.5)";
                    document.getElementById(word.charAt(i)).style.backgroundColor="rgba(0,255,0,0.5)";
                    break;

                }
                else if(word.charAt(i)===wordleWord.charAt(j)   ){
                    document.getElementById("letter"+nb).style.backgroundColor="rgba(255,255,0,0.9)";
                    document.getElementById(word.charAt(i)).style.backgroundColor="rgba(255,255,0,0.9)";
                    
                    break;
                }
                else{

                    document.getElementById("letter"+nb).style.backgroundColor="grey";   
                    document.getElementById(word.charAt(i)).style.backgroundColor="grey";
                }
            }
                nb++;
            }
            guesses++;
                last_guessed=word;
                word="";
                
                if (last_guessed === wordleWord) {
                   
                     document.getElementById("status").textContent="YOU HAVE WON!!";
                     document.getElementById("wordleword").textContent="The word was "+ wordleWord+"";
                     
                     document.getElementById("score").textContent="It took you "+guesses+" guesses";
                     blurOverlay.style.position = 'fixed';
                     blurOverlay.style.top = '0';
                     blurOverlay.style.left = '0';
                     blurOverlay.style.width = '100%';
                     blurOverlay.style.height = '100%';
                     blurOverlay.style.backdropFilter = 'blur(15px)';
                     blurOverlay.style.zIndex = '50';
                     document.body.appendChild(blurOverlay);

                     stats.style.position = 'absolute';
                     stats.style.zIndex = '100';
                     stats.classList.add("open-stats");
             
                     found=true;
                } 
                else if (nb >= 30) { 
                    document.getElementById("status").textContent="You have lost :(";
                    document.getElementById("wordleword").textContent="The word was "+ wordleWord+"";
                     document.getElementById("score").textContent="It took you "+guesses+" guesses";
                     
                     blurOverlay.style.position = 'fixed';
                     blurOverlay.style.top = '0';
                     blurOverlay.style.left = '0';
                     blurOverlay.style.width = '100%';
                     blurOverlay.style.height = '100%';
                     blurOverlay.style.backdropFilter = 'blur(15px)';
                     blurOverlay.style.zIndex = '50';
                     document.body.appendChild(blurOverlay);

                     stats.style.position = 'absolute';
                     stats.style.zIndex = '100';
                     stats.classList.add("open-stats"); 
                }
            }
            }
            if(letter==="erase" && found===false && word!==""){
                
                document.getElementById("letter"+(letterPos-1)).textContent="";
                word=word.slice(0,-1);
                letterPos-=1;
                return;
            }}
function lightmode(){
                document.body.classList.toggle("lightmode");
                if(document.getElementById("mode").textContent==="Dark Mode"){

                   document.getElementById("reopen").style.backgroundColor=" rgba(0,0,0,0.01)";
                   document.getElementById("reopen").style.color="white";
                   document.getElementById("reopen").style.border="1px  rgba(0, 0, 0, 0.1)";
              document.getElementById("mode").textContent="Light Mode";
              document.getElementById("title").style.color="white";
            }
                else{
                    document.getElementById("reopen").style.backgroundColor="white";
                    document.getElementById("reopen").style.color="black";
                  document.getElementById("reopen").style.border="1px  white";
                  document.getElementById("mode").textContent="Dark Mode";
                  document.getElementById("title").style.color="black";
                }
            }
            
 async function playagain(){
    document.getElementById("reopen").style.visibility="hidden";
    const key = document.querySelectorAll(".keys");
    
       for(let i=1; i<31;i++){
        document.getElementById("letter"+i).textContent="";
        document.getElementById("letter"+i).style.backgroundColor="black";
        if((i-1)<28 && key.length>0 ){
            
        key[i-1].style.backgroundColor="white";
        key[i-1].style.border="1px solid black";
        key[i-1].style.color="black";
        }
       
  }
  
      nb=1;
      letterPos=1;
      word="";
      guesses=0;
      found=false;

      wordleWord= await words.randomWord();

    
      key.forEach(key => {
        
key.addEventListener("mouseover", event=> {
    event.target.style.backgroundColor = " rgba(0,0,0,0.1)"; 
    event.target.style.color="white";   
});

key.addEventListener("mouseout", event=> {
    event.target.style.backgroundColor = "white"; 
    event.target.style.color="black";
});
      });
                stats.classList.remove("open-stats");
                blurOverlay.remove();
               return; 
            }
    

            
function closedd(){
                document.getElementById("reopen").style.visibility="visible";
                stats.classList.remove("open-stats");
                blurOverlay.remove();
                console.log(words.wordlist);
            }
            
 function reopen(){
    if(found==true){
        document.getElementById("reopen").style.visibility="visible";

                     document.getElementById("status").textContent="YOU HAVE WON!!";
                     document.getElementById("wordleword").textContent="The word was "+ wordleWord+"";
                     
                     document.getElementById("score").textContent="It took you "+guesses+" guesses";
                     blurOverlay.style.position = 'fixed';
                     blurOverlay.style.top = '0';
                     blurOverlay.style.left = '0';
                     blurOverlay.style.width = '100%';
                     blurOverlay.style.height = '100%';
                     blurOverlay.style.backdropFilter = 'blur(15px)';
                     blurOverlay.style.zIndex = '50';
                     document.body.appendChild(blurOverlay);

                     stats.style.position = 'absolute';
                     stats.style.zIndex = '100';
                     stats.classList.add("open-stats");
                    
                    }
            }
                window.keyboard =keyboard;
                window.closedd = closedd;
                window.lightmode = lightmode;
                window.playagain = playagain;
                window.reopen = reopen;
               window.change=change;