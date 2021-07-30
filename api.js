const tierWeights = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27"];
let inputName = "";
let summoner_list = new Array(10);
let count = 0;
let tier_list = new Array(10);
let rank_list = new Array(10);
let name_list = new Array(10);
let score_list = new Array(10);

function getSummoner_name(){
    let tempChar = "";
    inputName = document.getElementById("inputName").value;
    if(inputName.length === 2){
        inputName = inputName[0] + " " + inputName[1];
        console.log(inputName);
    }
    if(nameOverlapCheck(inputName)){
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
            if(data.id === undefined){
                return
            }
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
            if(count < 10 && data[0] !== undefined){
                if(data[0].queueType === "RANKED_SOLO_5x5"){
                    summoner_list[count] = summoner_name + " " + data[0].tier + " " + data[0].rank + " 솔";
                    name_list[count] = summoner_name;
                    tier_list[count] = data[0].tier;
                    rank_list[count] = data[0].rank;
                }
                else if(data[1] === undefined){
                    summoner_list[count] = summoner_name + " " + data[0].tier + " " + data[0].rank + " 자";
                    name_list[count] = summoner_name;
                    tier_list[count] = data[0].tier;
                    rank_list[count] = data[0].rank;
                }
                else{
                    summoner_list[count] = summoner_name + " " + data[1].tier + " " + data[1].rank + " 솔";
                    name_list[count] = summoner_name;
                    tier_list[count] = data[1].tier;
                    rank_list[count] = data[1].rank;
                }
                console.log(summoner_list);
                count++;
            }
            else if(data[0] === undefined){
                console.log("undefined Tier");
            }
            document.getElementById("tempdiv").innerHTML = summoner_list;
            convertScore();
        }).catch(err => {
            console.log('Tier_API Error', err);
    });
}

function nameOverlapCheck(inputName){
    let summoner_name_check = "";
    let input_name_check = inputName.replace(/(\s*)/g, "");
    for(let i = 0; i < 10; i++){
        if(summoner_list[i] === undefined){
            break
        }
        summoner_name_check = name_list[i].replace(/(\s*)/g, "");
        console.log("summoner_name_check : ",summoner_name_check)
        if(input_name_check === summoner_name_check){
            return false
        }   
    }
    return true
}

function convertScore(){
    console.log(tier_list);
    for(let i = 0; i < 10; i++){
        switch(tier_list[i]){
            case "IRON": 
                score_list[i] = 4;
                score_list[i] = rankConvert(rank_list[i], score_list[i]);
                break;
            case "BRONZE":
                score_list[i] = 8;
                score_list[i] = rankConvert(rank_list[i], score_list[i]);
                break;
            case "SILVER":
                score_list[i] = 12;
                score_list[i] = rankConvert(rank_list[i], score_list[i]);
                break;
            case "GOLD":
                score_list[i] = 16;
                score_list[i] = rankConvert(rank_list[i], score_list[i]);
                break;
            case "PLATINUM":
                score_list[i] = 20;
                score_list[i] = rankConvert(rank_list[i], score_list[i]);
                break;
            case "DIAMOND":
                score_list[i] = 24;
                score_list[i] = rankConvert(rank_list[i], score_list[i]);
                break;
            case "MASTER":
                score_list[i] = 25;
                break;
            case "GRANDMASTER":
                score_list[i] = 26;
                break;
            case "CHALLENGER":
                score_list[i] = 27;
                break;
        }
    }
    console.log(score_list);
}

function rankConvert(current_rank_list, current_score_list){
    switch(current_rank_list){
        case "IV":
            return current_score_list - 3;
        case "III":
            return current_score_list - 2;
        case "II":
            return current_score_list - 1;
        case "I":
            return current_score_list - 0;
    }
}