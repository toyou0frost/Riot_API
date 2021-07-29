const tierWeights = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27"];
let inputName = "";
let summoner_list = new Array(10);
let count = 0;

function getSummoner_name(){
    inputName = document.getElementById("inputName").value;
    getSummoner_id(inputName);
}

function getSummoner_id(summoner_name){
    fetch(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner_name}?api_key=RGAPI-eda3e77d-ddca-4826-92a4-2e1e01c70c0d`)
        .then((res) => {
            console.log(res);
            return res.json();
        }).then(data => {
            console.log(data.id);
            getSummoner_tier(data.id);
        }).catch(err => {
            console.log("summoner_id_API Error", err);
        })    
}

function getSummoner_tier(summoner_id){
    fetch(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner_id}?api_key=RGAPI-eda3e77d-ddca-4826-92a4-2e1e01c70c0d`)
        .then((res) => { 
            console.log(res);  
            return res.json();
        }).then(data => {
            console.log(data);   
            summoner_list[count] = data[0].tier + data[0].rank;
            console.log(summoner_list[count]);
            count++;
        }).catch(err => {
            console.log('Tier_API Error', err);
    });
}