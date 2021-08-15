const tierWeights = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27"];
let inputName = "";
let summoner_list = new Array(10);
let count = 0;
let tier_list = new Array(10);
let rank_list = new Array(10);
let name_list = new Array(10);
let score_list = new Array(10);
const API_KEY = "RGAPI-7d4c699f-7ab0-4d8e-a258-129ff608a333";
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
            let table_class = `sec_3_table_td_${count}`
            document.getElementsByClassName(table_class)[0].innerHTML = summoner_list[count - 1];
            // document.getElementById("inputName").value = "";
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
    let sort_name = scoreListSort(score_list);
    let teamA_sort;
    let teamB_sort;
    let teamA = score_list[0].score + score_list[1].score + score_list[2].score + score_list[3].score + score_list[4].score;
    let teamB = score_list[5].score + score_list[6].score + score_list[7].score + score_list[8].score + score_list[9].score;
    let teamA_name = new Array(5);
    let teamB_name = new Array(5);
    let overlapCheck = 0;
    let overlapCheckbool= false;
    while(true){
        shuffleArray(score_list);
        teamA = score_list[0].score + score_list[1].score + score_list[2].score + score_list[3].score + score_list[4].score;
        teamB = score_list[5].score + score_list[6].score + score_list[7].score + score_list[8].score + score_list[9].score;
        for(let i = 0; i < 10; i++){
            if(i < 5){
                teamA_name[i] = score_list[i].name;
            }
            else{
                teamB_name[i] = score_list[i].name;
            }
        }
        sort_name = scoreListSort(score_list);
        teamA_sort = teamSort(teamA_name);
        teamB_sort = teamSort(teamB_name);
        for(let i = 0; i < 2; i++){
            for(let j = 0; j < 2; j++){
                overlapCheck = 0;
                for(let k = 0; k < 5; k++){
                    if(j === 0){
                        if(sort_name[i][k] === teamA_sort[k]){
                            overlapCheck++;
                        }
                    }
                    else{
                        if(sort_name[i][k] === teamB_sort[k]){
                            overlapCheck++
                            
                        }
                    }
                    if(overlapCheck === 5){
                        overlapCheckbool = false;
                    }
                    else{
                        overlapCheckbool = true;
                    }
                }
            }
        }
        if(overlapCheckbool){
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
    }
    console.log(score_list);
    scoreSummonerSynchronize();
    showTeam();
}

function inputTierGap(){
    tiergap = document.getElementById("tierWeights").value;
    if(tiergap < 1){
        tiergap = 5;
        return
    }
}

function guessTierDivide(guessTier, count, modiCheck = false){
    let quessTier = guessTier.split(" ")[0];
    let quessRank = guessTier.split(" ")[1];
    let tierCheck = false;

    if(modiCheck){
        let tier = "";
        let rank = "";
        switch(quessTier){
            case "아이언":
                tierCheck = true;
                tier = "IRON";
                break
            case "브론즈":
                tierCheck = true;
                tier = "BRONZE";
                break
            case "실버":
                tierCheck = true;
                tier = "SILVER";
                break
            case "골드":
                tierCheck = true;
                tier = "GOLD";
                break
            case "플레티넘":
                tierCheck = true;
                tier = "PLATINUM";
                break
            case "다이아몬드":
                tierCheck = true;
                tier = "DIAMOND";
                break
            case "마스터":
                tierCheck = false;
                tier = "MASTER";
                break
            case "그랜드마스터":
                tierCheck = false;
                tier = "GRANDMASTER";
                break
            case "첼린저":
                tierCheck = false;
                tier = "CHALLENGER";
                break
            default:
                return false
        }
        if(tierCheck){    
            switch(quessRank){
                case "1":
                    rank = "I";
                    break
                case "2":
                    rank = "II";
                    break
                case "3":
                    rank = "III";
                    break
                case "4":
                    rank = "IV";
                    break
                default:
                    return false
            }
        }
        else{
            rank = "I";
        }
        return [tier, rank]
    }

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
                rank_list[count] = "III";
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
            document.getElementById("inputName").value = ""; // 디버깅용
        }
    });
    }
}

function scoreListSort(score_list_sort){
    let index0_4 = new Array(5);
    let index5_9 = new Array(5);

    for(let i = 0; i < 10; i++){
        if(i < 5){
            index0_4[i] = score_list_sort[i].name;
        }
        else{
            index5_9[i] = score_list_sort[i].name;
        }
    }
    index0_4 = index0_4.sort();
    index5_9 = index5_9.sort();
    return [index0_4, index5_9];
}

function teamSort(team){
    return team.sort(); 
}

function showTeam(){
    for(let i = 0; i < 10; i++){
        if(summoner_list[i] === undefined){
            break
        }
        let table_class = `sec_3_table_td_${i + 1}`
        document.getElementsByClassName(table_class)[0].innerHTML = summoner_list[i];
    }
}

function scoreSummonerSynchronize(){
    let namelegth = 0;
    let namecheck = false;
    let tmp = "";
    for(let i = 0; i < 10; i++){
        namelegth = score_list[i].name.length;
        for(let j = 0; j < 10; j++){
            for(let k = 0; k < namelegth; k++){
                if(summoner_list[j][k] === score_list[i].name[k]){
                    namecheck = true;
                }
                else{
                    namecheck = false;
                    break;
                }
            }
            if(namecheck){
                tmp = summoner_list[i];
                summoner_list[i] = summoner_list[j];
                summoner_list[j] = tmp;
            }
        }
    }
}

function showOption(num){ 
    let classname = `sec_3_table_td_${num}`;
    let td = document.getElementsByClassName(classname)[0];
    let tdCheck;
    for(let i = 1; i <= 10; i++){
        if(i == num){
            continue
        }
        classname = `sec_3_table_td_${i}`;
        tdCheck = document.getElementsByClassName(classname)[0];
        if(tdCheck.style.backgroundColor === "rgb(89, 89, 89)"){
            tdCheck.style.backgroundColor = "white";
        }
    }
    if(td.style.backgroundColor === "rgb(89, 89, 89)"){
        td.style.backgroundColor = "white";    
    }
    else{
        td.style.backgroundColor = "#595959";
    }
}

function getInputValue(){
    let classname;
    let td;
    let inputValue = "";
    for(let i = 1; i <= 10; i++){
        classname = `sec_3_table_td_${i}`;
        td = document.getElementsByClassName(classname)[0];
        if(td.style.backgroundColor === "rgb(89, 89, 89)"){
            inputValue = td.innerHTML;
            return inputValue
        }
    }
}

function deleteSummoner(){
    let inputValue = getInputValue();

    if(inputValue === undefined || inputValue === ""){
        console.log("삭제하실 소환사를 선택하세요.");
        return
    }
    count--;
    for(let i = 0; i < 10; i++){
        if(summoner_list[i] === inputValue){
            summoner_list[i] = "";
            score_list[i] = {name : "", score: 0};
            name_list[i] = "";
            changeArray(i);
            showTeam();
            return
        }
    }
}

function modifyTier(){
    let inputValue = getInputValue();   
    if(inputValue === undefined || inputValue === ""){
        console.log("소환사를 선택해 주십시오.");
        return
    }
    let guessTier = "";
    let inputCheck = false;
    let inputValue_array = inputValue.split(" ");
    let tier_rank = new Array(2);
    inputValue_array[2]
    for(let i = 0; i < 10; i++){
        if(summoner_list[i] === inputValue){                
            while(true){
                guessTier = document.getElementsByClassName("modifyInput")[0].value;
                tier_rank = guessTierDivide(guessTier, i, true);
                console.log(tier_rank);
                guessTierDivide(guessTier, i);
                if(guessTierDivide(guessTier, i, true) && guessTierDivide(guessTier, i)){
                    inputCheck = true;
                    break
                }
                alert("다시 정확하게 입력해 주세요. EX) 다이아몬드 4");
                return
            }
            if(inputCheck){
                for(let i = 1; i < 3; i++){
                    inputValue_array[i] = tier_rank[i - 1] + " ";
                }
                inputValue_array[0] += " ";
                inputValue = "";
                for(let i = 0; i < 4; i++){
                    inputValue += inputValue_array[i];
                }
                summoner_list[i] = inputValue;
                score_list[i].score = 0;
                convertScore();
                showTeam();
                console.log(summoner_list);
            }
            return
        }
    }
}

function changeArray(index){
    for(let i = 9; i > index; i--){
        if(summoner_list[i] === undefined || summoner_list[i] === ""){
            continue
        }
        else{
            summoner_list[index] = summoner_list[i];
            summoner_list[i] = "";
            score_list[index] = score_list[i];
            score_list[i] = {name : "", score: 0};
            name_list[index] = name_list[i];
            name_list[i] = "";
            return
        }
    }
}