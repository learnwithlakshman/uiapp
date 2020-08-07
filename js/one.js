function addToken(token){
	localStorage.setItem("token",token);
}

function logout(){
	localStorage.removeItem("token");
}

function getToken(){
	return localStorage.getItem("token");
}

function login(username,password){
	fetch('https://indipl2020.herokuapp.com/authenticate',
		{
			  "method": 'POST',
			  "headers": {
    				'Content-Type': 'application/json',
  			},
  			"body": JSON.stringify({"username":username,"password":password})
		}
        ).then(resp=>resp.json())
		 .then(
			 data=>{
				 addToken(data["token"])
			 }
		 )
		 .catch(error=>{
			 console.log(error);
		 })
}

function getAllTeams(){
	let token = getToken();
	console.log(token);
	fetch('https://indipl2020.herokuapp.com/ipl2020/team/all',
		{
			  "method": 'GET',
			  "headers": {
				
					'Authorization': `Bearer ${token}`
  			   },
  			
		}
        ).then(resp=>resp.json())
		 .then(data=>{
			teamData = document.querySelector("#teamData");
			let str = "<ul>";
			for(let team of data){
				str += `<li>${team.label}</li>`
			}
			str +="</ul>"
			teamData.innerHTML = str; 
			
			console.log(data)})
		 .catch(error=>{
			 console.log(error);
		 })
}


function getTeamAmount(){
	let token = getToken();
	console.log(token);
	fetch('https://indipl2020.herokuapp.com/ipl2020/team/totalamount',
		{
			  "method": 'GET',
			  "headers": {
				   'Authorization': `Bearer ${token}`
  			   },
  			
		}
        ).then(resp=>resp.json())
		 .then(data=>{
			 let arr = [["Team","Amount"]];
			 for(let r of data){
				 arr.push([r['teamName'],r['amount']]);
			 }
			 drawAmountSpentByTeamChart(arr);
		})
		 .catch(error=>{
			 console.log(error);
		 })
}



getAllTeams();
//login('admin@gmail.com','admin');
getTeamAmount();



function drawAmountSpentByTeamChart(inputData){
	google.charts.load('current', {packages: ['corechart', 'bar']});
	google.charts.setOnLoadCallback(drawMultSeries);
	function drawMultSeries (){
	  	data = google.visualization.arrayToDataTable(inputData);
     	  var options = {
			title: 'Motivation and Energy Level Throughout the Day'
		  };
	
		  var chart = new google.visualization.ColumnChart(
		   document.getElementById('chart_div'));
	
		  chart.draw(data, options);
		}
	}
	