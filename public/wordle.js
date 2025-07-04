
import random from "./words.js"
let words = new random();

let wordleWord= await words.randomWord();
let letterPos=0;
let nb=1;
let trys=1;
let found=false;
let wins;
let losses;
let NbOfgames;
let results=document.getElementById("stats");
const blurOverlay = document.createElement('div');
let word="";
let last_guessed;
let outcomeVal;
const displaywins=document.getElementById("wins")
const displaylosses=document.getElementById("losses")
const displayGamesPlayed=document.getElementById("gamesPlayed")
const auth = document.querySelector(".authentication");
const  mainPage = document.querySelector(".mainpage");
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
            const response = await fetch(apiBase+ "auth/register",{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username: emailVal, password: passwordVal})

                


            });
            data = await response.json()

            
        }
 else{
    const response = await fetch(apiBase+ "auth/login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({username: emailVal, password: passwordVal})
    })
    data = await response.json()
    }

    if(data.token){
        token = data.token
        localStorage.setItem("token",token)

        await fetchStats()
        auth.style.display="none"
        mainPage.style.display="block"
        
    }
    }
    catch(err){
        console.log(err.message)
        }

}
}
//console.log(token)


async function fetchStats(){
    try{
        const response = await fetch(apiBase+'stats',{
            method:'GET',
            headers:{'Authorization':token}

        })

         const statsData = await response.json()
         
if(statsData.length>0){
         displaywins.innerHTML= statsData[0].wins;
         displaylosses.innerHTML=statsData[0].losses
         displayGamesPlayed.innerHTML=statsData[0].gamesPlayed
    }


        
    }catch(err){
        console.log(err.message)


    }
}



console.log(wordleWord)
 async function keyboard(letter){

        if(word.length<5 && found===false ){
            if(letter!=="enter" && letter!=="erase"){
            document.querySelector(`#try${trys} #letter${letterPos}`).textContent=letter;
            
            word+=letter;
           
            letterPos++;
        }
         
        
        }

        let matched= Array(5).fill(false);

            if(letter==="enter" && word.length==5){
               
                    console.log(word)
                    let wordArr=word.split("")
                    let wordleWordArr = wordleWord.split("")
                    
                    //FOR GREEN
            for(let i =0;i<word.length;i++){
                if(wordArr[i]===wordleWordArr[i] ){ 
                   // document.getElementById("letter"+i).style.animation;
                   
                    document.querySelector(`#try${trys} #letter${i}`).style.backgroundColor="rgba(0,255,0,0.5)";
                    document.getElementById(wordArr[i]).style.backgroundColor="rgba(0,255,0,0.5)";
                    matched[i]=true;
                }
            
            }
            console.log(matched)
         
            
            //FOR YELLOW

                for(let j=0;j<word.length;j++){
                      if (matched[j]) continue;
                    
                let index=wordleWord.indexOf(wordArr[j])
                 if(wordleWordArr.includes(wordArr[j]) && matched[index]!=true){
                     document.querySelector(`#try${trys} #letter${j}`).style.backgroundColor="rgba(255,255,0,0.9)";
                    document.getElementById(wordArr[j]).style.backgroundColor="rgba(255,255,0,0.9)";
              
                }
                else{

                     document.querySelector(`#try${trys} #letter${j}`).style.backgroundColor="grey";   
                     document.getElementById(wordArr[j]).style.backgroundColor="grey";
                    
                }
                  
            }
            
            
                trys++; 
             letterPos=0;
             
            
            console.log(letterPos)
           
          
                last_guessed=word;
                word="";
                
                if (last_guessed === wordleWord) {
                   document.querySelector(".again").style.visibility="visible";
                   outcomeVal = 1;
                   await updateStats()
                   displaywins.innerHTML=wins;
                   console.log(wordleWord)

            


                   
                    // document.getElementById("status").textContent="YOU HAVE WON!!";
                     //document.getElementById("wordleword").textContent="The word was "+ wordleWord+"";
                     
                     
                     //document.getElementById("score").textContent="It took you "+guesses+" guesses";
                     blurOverlay.style.position = 'fixed';
                     blurOverlay.style.top = '0';
                     blurOverlay.style.left = '0';
                     blurOverlay.style.width = '100%';
                     blurOverlay.style.height = '100%';
                     blurOverlay.style.backdropFilter = 'blur(15px)';
                     blurOverlay.style.zIndex = '50';
                     document.body.appendChild(blurOverlay);

                     results.style.position = 'absolute';
                     results.style.zIndex = '100';
                     results.classList.add("open-stats");
             
                     found=true;
                } 
                else if (trys == 7) { 
                document.querySelector(".again").style.visibility="visible";

           
                    outcomeVal=0;
                    await updateStats()
                    displaylosses.innerHTML=losses;
console.log(wordleWord)
                    // document.getElementById("status").textContent="You have lost :(";
                     //document.getElementById("wordleword").textContent="The word was "+ wordleWord+"";
                     //document.getElementById("score").textContent="It took you "+guesses+" guesses";
                

                     blurOverlay.style.position = 'fixed';
                     blurOverlay.style.top = '0';
                     blurOverlay.style.left = '0';
                     blurOverlay.style.width = '100%';
                     blurOverlay.style.height = '100%';
                     blurOverlay.style.backdropFilter = 'blur(15px)';
                     blurOverlay.style.zIndex = '50';
                     document.body.appendChild(blurOverlay);

                     results.style.position = 'absolute';
                     results.style.zIndex = '100';
                     results.classList.add("open-stats"); 
                }
                
            }


            if(letter==="erase" && found===false && word!==""){
         
           
                document.querySelector(`#try${trys} #letter${letterPos-1}`).textContent="";
                word=word.slice(0,-1);
            
                letterPos-=1;
                return;
            }
            
        }

async function updateStats(){
    const response = await fetch(apiBase+'stats',{
        method:'PUT',
        headers:{'Content-Type': 'application/json','Authorization':token},

        body:JSON.stringify({outcome:outcomeVal})


    })
    const result = await response.json()
    wins = result[0].wins;
    losses= result[0].losses
    NbOfgames=result[0].gamesPlayed

   // console.log(result)
}







function logout(){
    localStorage.removeItem('token')
      mainPage.style.display="none"
      auth.style.display="flex";
      


}


function lightmode(){
                document.body.classList.toggle("lightmode");
                if(document.getElementById("mode").textContent==="Dark Mode"){

                   document.getElementById("reopen").style.backgroundColor="rgba(0,0,0,0.01)";
                   document.getElementById("reopen").style.color="white";
                   document.getElementById("reopen").style.border="1px  rgba(0, 0, 0, 0.1)";

                   document.querySelector(".logout").style.backgroundColor="white";
                   document.querySelector(".logout").style.color="black";
                     document.getElementById("reopen").style.border="1px  rgba(0, 0, 0, 0.1)";

                   document.getElementById("mode").textContent="Light Mode";
                      document.getElementById("mode").style.color="black";
                    document.getElementById("mode").style.backgroundColor="white";

                   document.getElementById("title").style.color="white";
            }
                else{
                    document.getElementById("reopen").style.backgroundColor="white";
                    document.getElementById("reopen").style.color="black";

                    document.querySelector(".logout").style.backgroundColor="black";
                    document.querySelector(".logout").style.color="white";

                    document.getElementById("reopen").style.border="1px  white";
                    
                    document.getElementById("mode").textContent="Dark Mode";
                    document.getElementById("mode").style.color="white";
                    document.getElementById("mode").style.backgroundColor="black";
                    
                    document.getElementById("title").style.color="black";
                }
            }
            

        
             
 async function playagain(){
    if(trys==7 || last_guessed==wordleWord){
        
        displayGamesPlayed.innerHTML=NbOfgames
        document.querySelector(".again").style.visibility="hidden";

  
      const key = document.querySelectorAll(".keys");
       document.querySelectorAll(".letters").forEach((letter) => {
    letter.textContent = ""; 
    letter.style.backgroundColor = "black"; 
});

       for(let i=1; i<31;i++){
      
        if((i-1)<28 && key.length>0 ){
            
        key[i-1].style.backgroundColor="white";
        key[i-1].style.border="1px solid black";
        key[i-1].style.color="black";
        }
       
  }
  
      trys=1;
      letterPos=0;
      word="";
    
      found=false;

      wordleWord= await words.randomWord();
console.log(wordleWord)
    
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
                results.classList.remove("open-stats");
                blurOverlay.remove();
               return;
            }
                
            }
        
        
        
function closedd(){
                document.getElementById("reopen").style.visibility="visible";
                results.classList.remove("open-stats");
                blurOverlay.remove();
             
            }
            
 async function reopen(){
                      
   // if(found==true){
      //  document.getElementById("reopen").style.visibility="visible";

                    // document.getElementById("status").textContent="YOU HAVE WON!!";
                  //   document.getElementById("wordleword").textContent="The word was "+ wordleWord+"";
                     
                   //  document.getElementById("score").textContent="It took you "+guesses+" guesses";
                     blurOverlay.style.position = 'fixed';
                     blurOverlay.style.top = '0';
                     blurOverlay.style.left = '0';
                     blurOverlay.style.width = '100%';
                     blurOverlay.style.height = '100%';
                     blurOverlay.style.backdropFilter = 'blur(15px)';
                     blurOverlay.style.zIndex = '50';
                     document.body.appendChild(blurOverlay);

                     results.style.position = 'absolute';
                     results.style.zIndex = '100';
                     results.classList.add("open-stats");
                    
                    }


                   /* if(token){
                         
                        mainPage.style.display="block"
                         fetchStats()
                    }
                    else{
                        auth.style.display="flex";
                    }*/
                  
if(token && token!=null){
      mainPage.style.display="block"
      auth.style.display="none";
     await fetchStats()

}


                       
               window.keyboard =keyboard;
               window.closedd = closedd;
               window.lightmode = lightmode;
               window.playagain=playagain
               window.reopen = reopen;
               window.change=change;
               window.authentication=authentication;
               window.updateStats=updateStats
               window.logout=logout