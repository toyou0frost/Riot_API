let summoner_id = "CLl2xwUmy0fKRB4Fj8gd8MyIlmHFNF0guU65RIEN0vRMvY8";

// fetch(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner_id}?api_key=RGAPI-eda3e77d-ddca-4826-92a4-2e1e01c70c0d`, {mode: 'no-cors'}).then((response) => 
//     console.log(response)
// );

// fetch("https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/CLl2xwUmy0fKRB4Fj8gd8MyIlmHFNF0guU65RIEN0vRMvY8?api_key=RGAPI-eda3e77d-ddca-4826-92a4-2e1e01c70c0d", {mode: 'no-cors'})
//     .then((res) => { 
//         console.log(res);  
//         return res.json(); 
//     }).then(data => {
//         console.log(data);   
//     }).catch(err => {
//         console.log('Fatch Error', err);
// });

// fetch('https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/CLl2xwUmy0fKRB4Fj8gd8MyIlmHFNF0guU65RIEN0vRMvY8?api_key=RGAPI-eda3e77d-ddca-4826-92a4-2e1e01c70c0d',{mode:"no-cors"})
//     .then(res => {
//     // response 처리
//     console.log(res);
//     // 응답을 JSON 형태로 파싱
//     return res.json();
// })
// .then(data => {
//     // json 출력
//     console.log(data)
// })
// .catch(err => {
//     // error 처리
//     console.log('Fetch Error', err);
// });

// var api_key = 'RGAPI-eda3e77d-ddca-4826-92a4-2e1e01c70c0d';
// var sohwan = "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +'벗돌이' +'?api_key=' + api_key;
// console.log(sohwan);
// var r = fetch(sohwan, {mode: "no-cors"}).then(res => {
//     console.log(res);
// })

fetch('https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/CLl2xwUmy0fKRB4Fj8gd8MyIlmHFNF0guU65RIEN0vRMvY8?api_key=RGAPI-eda3e77d-ddca-4826-92a4-2e1e01c70c0d')
    .then((response) => console.log("response:", response))
    .catch((error) => console.log("error:", error));

fetch("https://jsonplaceholder.typicode.com/posts/1",{mode:"no-cors"})
.then((response) => console.log("response:", response))
.catch((error) => console.log("error:", error));
    
fetch("https://jsonplaceholder.typicode.com/posts/1",{mode:"no-cors"})
.then((response) => console.log("response:", response))
.catch((error) => console.log("error:", error));