const tierWeights = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27"];
let inputName = "";
let summoner_list = new Array(10);
let count = 0;

function getSummoner_name(){
    inputName = document.getElementById("inputName").value;
    inputName = inputName.replace(/(\s*)/g, "");
    if(NameOverlapCheck(inputName)){
        getSummoner_id(inputName);
    }
    else{
        console.log("NameOverlap Error");
        return
    }
}

function getSummoner_id(summoner_name){
    fetch(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner_name}?api_key=RGAPI-eda3e77d-ddca-4826-92a4-2e1e01c70c0d`)
        .then((res) => {
            console.log(res);
            return res.json();
        }).then(data => {
            console.log(data.id);
            getSummoner_tier(data.id, data.name);
        }).catch(err => {
            console.log("summoner_id_API Error", err);
        })    
}

function getSummoner_tier(summoner_id, summoner_name){
    fetch(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner_id}?api_key=RGAPI-eda3e77d-ddca-4826-92a4-2e1e01c70c0d`)
        .then((res) => { 
            console.log(res);  
            return res.json();
        }).then(data => {
            console.log(data);   
            if(count < 10){
                if(data[0].queueType === "RANKED_SOLO_5x5"){
                    summoner_list[count] = summoner_name + " " + data[0].tier + data[0].rank + " 솔";
                }
                else if(data[1] === undefined){
                    summoner_list[count] = summoner_name + " " + data[0].tier + data[0].rank + " 자";
                }
                else{
                    summoner_list[count] = summoner_name + " " + data[1].tier + data[1].rank + " 솔";
                }
                console.log(summoner_list);
                count++;
            }
            document.getElementById("tempdiv").innerHTML = summoner_list;
        }).catch(err => {
            console.log('Tier_API Error', err);
    });
}

function NameOverlapCheck(inputName){
    let summoner_name_check = "";
    for(let i = 0; i < 10; i++){
        if(summoner_list[i] === undefined){
            break
        }
        summoner_name_check = summoner_list[i];
        summoner_name_check = summoner_name_check.split(' ')[0];
        console.log("summoner_name_check : ",summoner_name_check)
        if(inputName === summoner_name_check){
            return false;
        }   
    }
    return true;
}