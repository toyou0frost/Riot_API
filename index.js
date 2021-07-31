const tierWeights = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27"];
let inputName = "";
let summoner_list = new Array(10);
let count = 0;
let tier_list = new Array(10);
let rank_list = new Array(10);
let name_list = new Array(10);
let score_list = new Array(10);
const API_KEY = "RGAPI-524c914e-2306-481c-9078-c300c41343da";
let tiergap = 5;
let guessTier = "";

for(let i = 0; i < 10; i++){
    score_list[i] = {name: "", score: 0}; 
}

function shuffleArray(score_list){
    for(let i = 0; i < 10; i++){
        let j = Math.floor(Math.random() * (i + 1));
        [score_list[i], score_list[j]] = [score_list[j], score_list[i]];
    }
    return score_list;
}

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
    fetch(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner_name}?api_key=${API_KEY}`)
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
    let inputCheck = false;
    fetch(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner_id}?api_key=${API_KEY}`)
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
                    score_list[count].name = summoner_name;
                }
                else if(data[1] === undefined){
                    summoner_list[count] = summoner_name + " " + data[0].tier + " " + data[0].rank + " 자";
                    name_list[count] = summoner_name;
                    tier_list[count] = data[0].tier;
                    rank_list[count] = data[0].rank;
                    score_list[count].name = summoner_name;
                }
                else{
                    summoner_list[count] = summoner_name + " " + data[1].tier + " " + data[1].rank + " 솔";
                    name_list[count] = summoner_name;
                    tier_list[count] = data[1].tier;
                    rank_list[count] = data[1].rank;
                    score_list[count].name = summoner_name;
                }
                console.log(summoner_list);
                count++;
            }
            else if(data[0] === undefined){
                console.log("undefined Tier");
                while(true){
                    guessTier = prompt("예상 티어를 적어주세요. EX) 다이아몬드 1 띄어쓰기 필수!!");
                    if(guessTier === "0"){
                        inputCheck = false;
                        break
                    }
                    guessTierDivide(guessTier, count);
                    if(guessTierDivide(guessTier, count)){
                        inputCheck = true;
                        break
                    }
                    alert("다시 정확하게 입력해 주세요.\n소환사명을 다시 입력하고 싶다면 0을 입력해 주세요.");
                }
                if(inputCheck){
                    name_list[count] = summoner_name;
                    score_list[count].name = summoner_name;
                    summoner_list[count] = summoner_name + " " + tier_list[count] + " " + rank_list[count] + " 언";
                    count++;
                    console.log(summoner_list);
                }
            }
            let table_class = `sec_2_table_td_${count}`
            document.getElementsByClassName(table_class)[0].innerHTML = summoner_list[count - 1];
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
                score_list[i].score = 4;
                score_list[i].score = rankConvert(rank_list[i], score_list[i].score);
                break;
            case "BRONZE":
                score_list[i].score = 8;
                score_list[i].score = rankConvert(rank_list[i], score_list[i].score);
                break;
            case "SILVER":
                score_list[i].score = 12;
                score_list[i].score = rankConvert(rank_list[i], score_list[i].score);
                break;
            case "GOLD":
                score_list[i].score = 16;
                score_list[i].score = rankConvert(rank_list[i], score_list[i].score);
                break;
            case "PLATINUM":
                score_list[i].score = 20;
                score_list[i].score = rankConvert(rank_list[i], score_list[i].score);
                break;
            case "DIAMOND":
                score_list[i].score = 24;
                score_list[i].score = rankConvert(rank_list[i], score_list[i].score);
                break;
            case "MASTER":
                score_list[i].score = 25;
                break;
            case "GRANDMASTER":
                score_list[i].score = 26;
                break;
            case "CHALLENGER":
                score_list[i].score = 27;
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

function suffleTeam(){
    if(score_list[9].name === ""){
        console.log("팀원이 부족합니다");
        return 
    }
    let teamA = score_list[0].score + score_list[1].score + score_list[2].score + score_list[3].score + score_list[4].score;
    let teamB = score_list[5].score + score_list[6].score + score_list[7].score + score_list[8].score + score_list[9].score;
    while(true){
        shuffleArray(score_list);
        teamA = score_list[0].score + score_list[1].score + score_list[2].score + score_list[3].score + score_list[4].score;
        teamB = score_list[5].score + score_list[6].score + score_list[7].score + score_list[8].score + score_list[9].score;
        if(teamA > teamB){
            if((teamA - teamB) > tiergap){
                continue
            }
            else{
                console.log("teamA : ",teamA," teamB : ",teamB);
                break
            }
        }
        else{
            if((teamB - teamA) > tiergap){
                continue
            }
            else{
                console.log("teamA : ",teamA," teamB : ",teamB);
                break
            }
        }
    }
    console.log(score_list);
}

function inputTierGap(){
    tiergap = document.getElementById("tierWeights").value;
    if(tiergap < 1){
        tiergap = 5;
        return
    }
}

function guessTierDivide(guessTier, count){
    let quessTier = guessTier.split(" ")[0];
    let quessRank = guessTier.split(" ")[1];
    let tierCheck = false;

    switch(quessTier){
        case "아이언":
            tierCheck = true;
            tier_list[count] = "IRON";
            break
        case "브론즈":
            tierCheck = true;
            tier_list[count] = "BRONZE";
            break
        case "실버":
            tierCheck = true;
            tier_list[count] = "SILVER";
            break
        case "골드":
            tierCheck = true;
            tier_list[count] = "GOLD";
            break
        case "플레티넘":
            tierCheck = true;
            tier_list[count] = "PLATINUM";
            break
        case "다이아몬드":
            tierCheck = true;
            tier_list[count] = "DIAMOND";
            break
        case "마스터":
            tierCheck = false;
            tier_list[count] = "MASTER";
            break
        case "그랜드마스터":
            tierCheck = false;
            tier_list[count] = "GRANDMASTER";
            break
        case "첼린저":
            tierCheck = false;
            tier_list[count] = "CHALLENGER";
            break
        default:
            return false
    }
    if(tierCheck){    
        switch(quessRank){
            case "1":
                rank_list[count] = "I";
                break
            case "2":
                rank_list[count] = "II";
                break
            case "3":
                rank_list[count] = "II";
                break
            case "4":
                rank_list[count] = "IV";
                break
            default:
                return false
        }
    }
    return true
}
onload = () => {
    input = document.getElementById("inputName");
    if(input === null){
        return;
    }
    else{
        input.focus();
        input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("inputNameBtn").click();
        }
    });
    }
}
