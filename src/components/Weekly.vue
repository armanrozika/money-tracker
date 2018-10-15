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
			let myChart = document.querySelector('#mychart').getContext('2d');
			let week2btn = document.querySelector('#week2');
			let week3btn = document.querySelector('#week3');
			//Events.on('test', this.test);
			let day = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']
			let dayMoney = {
				senin:'', selasa: '', rabu: '', kamis: '', jumat: '', sabtu: '', minggu: ''
			}
			//let day = []
			let amount = [200, 300, 500]
			
			let week2Amount = [];
			let week2Day = [];

			let week3Amount = [];
			let week3Day = [];

			

			week2btn.addEventListener('click', function(){
				let theChart = new Chart(mychart, {
					type: 'line',
					data: {
						labels: week2Day,
						datasets: [{
								label: 'amount',
								data: week2Amount
							}
						]
					},
					options:{}
				});
			});

			week3btn.addEventListener('click', function(){
				let theChart = new Chart(mychart, {
					type: 'line',
					data: {
						labels: day,
						datasets: [{
								label: 'amount',
								data: amount
							}
						]
					},
					options:{}
				});
				console.log(obj)
			});

			let obj = {}

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

			let theChart = new Chart(mychart, {
				type: 'line',
				data: {
					labels: day,
					datasets: [{
							label: 'amount',
							data: amount
						}
					]
				},
				options:{}
			});
		}
	}
</script>