 export default class words{
    
    constructor(){
       
            this.getWord="";
    }
    
    async randomWord(getWord=this.getWord){

    
    try{
        const response = await fetch("https://random-word-api.vercel.app/api?words=1&length=5");
         const data = await response.json();
         this.getWord = data[0];
        return this.getWord.toUpperCase();
    }
        catch(error){
        console.error("Error fetching random word:", error);    

    }
   return this.getWord.toUpperCase();
}
}
 
