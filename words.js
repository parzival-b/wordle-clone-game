 export default class words{
    
    constructor(){
       // this.wordlist=["ulcer","jerky","juicy","enure","quack","ryhme","query","saute","cameo","siege","usurp","kiosk"
           // ,"niche","wreak","fable","humor"];
            this.getWord="";
    }
    
    async randomWord(getWord=this.getWord){
   
   // let Random = this.wordlist[Math.floor(Math.random()*(wordlist.length))].toUpperCase();
   // const index = this.wordlist.indexOf(Random.toLowerCase());
   // console.log(index);
    
    try{
        const response = await fetch("https://random-word-api.vercel.app/api?words=1&length=5");
         const data = await response.json();
         this.getWord = data[0];
       // console.log(this.wordlist);
        return this.getWord.toUpperCase();
    }
        catch(error){
        console.error("Error fetching random word:", error);    

    }
   return this.getWord.toUpperCase();
}
}
 
