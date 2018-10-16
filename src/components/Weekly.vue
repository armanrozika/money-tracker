<template>
	<div id="weekly">
		<h3 @click="test">weekly</h3>
		<div class="main-chart">
			<canvas id="mychart"> </canvas>
		</div>

		<button id="week2">week2</button>
		<button id="week3">week3</button>
	</div>
</template>

<script>
	import db from './firebaseInit'
	import chart from 'chart.js'

	export default{
		name: 'weekly',
		data(){
			return {
				
			}
		},

		methods:{
			test(){
				console.log('test')
			}
		},

		mounted(){
			db.collection('moneys').orderBy('timestamp', 'asc').get()
			.then(querySnapshot =>{
				
				
				querySnapshot.forEach(doc=>{
					//console.log(doc.data().week)
					
					if(doc.data().week == 2){
						week2Amount.push(doc.data().amount)
						week2Day.push(doc.data().day)
					}else if(doc.data().week == 3){
						let key = doc.data().day;
						obj[key] = doc.data().amount;
						week3Amount.push(doc.data().amount)
						week3Day.push(doc.data().day)
					}
					// retrieveAmount.push(doc.data().amount)
					// retrieveDay.push(doc.data().day.slice(0,1));
				});

				
				//change week
				
			});


			let myChart = document.querySelector('#mychart').getContext('2d');
			let week2btn = document.querySelector('#week2');
			let week3btn = document.querySelector('#week3');
			//Events.on('test', this.test);
			
		
			let week2Day = [];
			let week2Amount = [];
			
			let objw2 = {};

			let w2finishDay = [];
			let w2finishAmount = [];

			


			

			let week3Day = [];
			let week3Amount = [];
			
			let objw3 = {};

			let w3finishDay = [];
			let w3finishAmount = [];

			

			week2btn.addEventListener('click', function(){
				console.log(week2Day)
				console.log(week2Amount)
				console.log(objw2);

				week2Day.forEach((el, index, arr)=>{
					console.log('mama')
				  if(!objw2.hasOwnProperty(el)){
				    objw2[el] = week2Amount[index]
				  }else{
				    objw2[el]+=week2Amount[index]
				  }
				 
				});

				for(let key in objw2){
					w2finishDay .push(key);
				}

				for(let key in objw2){
				  w2finishAmount.push(objw2[key]);
				}
				let theChart = new Chart(mychart, {
					type: 'line',
					data: {
						labels: w2finishDay,
						datasets: [{
								label: 'amount',
								data: w2finishAmount
							}
						]
					},
					options:{}
				});
			});

			week3btn.addEventListener('click', function(){
				week3Day.forEach((el, index, arr)=>{
					console.log('mama')
				  if(!objw3.hasOwnProperty(el)){
				    objw3[el] = week3Amount[index]
				  }else{
				    objw3[el]+=week3Amount[index]
				  }
				 
				});

				for(let key in objw3){
					w3finishDay.push(key);
				}

				for(let key in objw3){
				  w3finishAmount.push(objw3[key]);
				}

				let theChart = new Chart(mychart, {
					type: 'line',
					data: {
						labels: w3finishDay,
						datasets: [{
								label: 'amount',
								data: w3finishAmount
							}
						]
					},
					options:{}
				});
				console.log(w3finishAmount)
			});

			let obj = {}

			

			// let theChart = new Chart(mychart, {
			// 	type: 'line',
			// 	data: {
			// 		labels: day,
			// 		datasets: [{
			// 				label: 'amount',
			// 				data: amount
			// 			}
			// 		]
			// 	},
			// 	options:{}
			// });
		}
	}
</script>