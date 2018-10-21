<template>
	<div id="weekly">
		<h3>Weekly Chart</h3>
		<div class="main-chart">
			<canvas id="mychart"> </canvas>
		</div>
		<p>weeks:</p>
		<div class="btn-wrap" @click="changeBg">
			<button id="week1">1</button>
			<button id="week2">2</button>
			<button id="week3">3</button>
			<button id="week4">4</button>
		</div>
		
		<br><br>
		<router-link to="/monthly">
			<button>switch to monthly</button>
		</router-link>
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
			},

			changeBg(e){
				let color = document.querySelectorAll('.btn-wrap button');
				for(let i=0; i<color.length; i++){
					color[i].style.background = '#45BCE2'
				}
				e.target.style.background = '#33C3BA';
			}
		},

		mounted(){
			let date = new Date();
			const monthName = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
			db.collection('moneys').orderBy('timestamp', 'asc').get()
			.then(querySnapshot =>{
				querySnapshot.forEach(doc=>{
					//console.log(doc.data().week)
					if(doc.data().month == monthName[date.getMonth()] && doc.data().year == date.getFullYear()){
						if(doc.data().week == 1){
							week1Amount.push(doc.data().amount)
							week1Day.push(doc.data().day)
						}else if(doc.data().week == 2){
							week2Amount.push(doc.data().amount)
							week2Day.push(doc.data().day)
						}else if(doc.data().week == 3){
							week3Amount.push(doc.data().amount)
							week3Day.push(doc.data().day)
						}else{
							week4Amount.push(doc.data().amount)
							week4Day.push(doc.data().day)
						}
					}
					
				});
			}).then(()=>{
				function calcDataPerWeek(week, obj, amount, finishday, finishamount){
					week.forEach((el, index, arr)=>{
						if(!obj.hasOwnProperty(el)){
						obj[el] = amount[index];
						}else{
							obj[el]+= amount[index];
						};
					})

					for(let k in obj){
						finishday.push(k)
					}

					for(let k in obj){
						finishamount.push(obj[k]);
					}
				};

				calcDataPerWeek(week1Day, objw1, week1Amount, w1finishDay, w1finishAmount)
				calcDataPerWeek(week2Day, objw2, week2Amount, w2finishDay, w2finishAmount)
				calcDataPerWeek(week3Day, objw3, week3Amount, w3finishDay, w3finishAmount)
				calcDataPerWeek(week4Day, objw4, week4Amount, w4finishDay, w4finishAmount)

				//just in case i dont know what my function does

				// week1Day.forEach((el, index, arr)=>{
				//   if(!objw1.hasOwnProperty(el)){
				//     objw1[el] = week1Amount[index]
				//   }else{
				//     objw1[el]+=week1Amount[index]
				//   }
				 
				// });

				// for(let key in objw1){
				// 	w1finishDay.push(key);
				// }

				// for(let key in objw1){
				//   w1finishAmount.push(objw1[key]);
				// }

			});


			let myChart = document.querySelector('#mychart').getContext('2d');
			let week1btn = document.querySelector('#week1');
			let week2btn = document.querySelector('#week2');
			let week3btn = document.querySelector('#week3');
			let week4btn = document.querySelector('#week4');
			
			//weeks data holder
			let week1Day = [];
			let week1Amount = [];
			let objw1 = {};
			let w1finishDay = [];
			let w1finishAmount = [];

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

			let week4Day = [];
			let week4Amount = [];
			let objw4 = {};
			let w4finishDay = [];
			let w4finishAmount = [];

			
			week1btn.addEventListener('click', function(){
				let theChart = new Chart(mychart, {
					type: 'line',
					data: {
						labels: w1finishDay,
						datasets: [{
								label: 'amount',
								data: w1finishAmount
							}
						]
					},
					options:{}
				});
			});


			week2btn.addEventListener('click', function(){
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
				
			});

			week4btn.addEventListener('click', function(){	
				let theChart = new Chart(mychart, {
					type: 'line',
					data: {
						labels: w4finishDay,
						datasets: [{
								label: 'amount',
								data: w4finishAmount
							}
						]
					},
					options:{}
				});
			});

			//default chart, draw empty chart

			let theChart = new Chart(mychart, {
				type: 'line',
				data: {
					labels: '',
					datasets: [{
							label: 'amount',
							data: ''
						}
					]
				},
				options:{
					// responsive: true,
    	// 			maintainAspectRatio: true
				}
			});
		}
	}
</script>

<style scoped lang="scss">
	#weekly{
		width: 100%;
		height: 100vh;
	/*	position: fixed;*/
		background-image: linear-gradient(to bottom, #59c799, #dd6aea);
		padding-top: 20px;
		p{
			text-align: center;
		}
	}
	.main-chart{
		width: 90%;
		height: 170px;
		background: #fff;
		margin: 0 auto;
	}
	h3{
		text-align: center;
	}

	.btn-wrap{
		width: 80%;
		display: flex;
		margin: 0 auto;
		justify-content: space-between;
		margin-top: 20px;
		button{
			width: 50px; 
			height: 50px;
			border-radius: 50%;
			background: #45BCE2;
			border: none;
			outline: none;
		}

	}
</style>
