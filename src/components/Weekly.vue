<template>
	<div id="weekly">
		<h3 @click="test">weekly</h3>
		<div class="main-chart">
			<canvas id="mychart"> </canvas>
		</div>
		<button id="week1">week1</button>
		<button id="week2">week2</button>
		<button id="week3">week3</button>
		<button id="week4">week4</button>
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
			let date = new Date();
			const monthName = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
			db.collection('moneys').orderBy('timestamp', 'asc').get()
			.then(querySnapshot =>{
				
				
				querySnapshot.forEach(doc=>{
					//console.log(doc.data().week)
					if(doc.data().month == monthName[date.getMonth()]){
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
				week1Day.forEach((el, index, arr)=>{
				  if(!objw1.hasOwnProperty(el)){
				    objw1[el] = week1Amount[index]
				  }else{
				    objw1[el]+=week1Amount[index]
				  }
				 
				});

				for(let key in objw1){
					w1finishDay.push(key);
				}

				for(let key in objw1){
				  w1finishAmount.push(objw1[key]);
				}


				week2Day.forEach((el, index, arr)=>{
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


				week3Day.forEach((el, index, arr)=>{
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



				week4Day.forEach((el, index, arr)=>{
					console.log('mama')
				  if(!objw4.hasOwnProperty(el)){
				    objw4[el] = week4Amount[index]
				  }else{
				    objw4[el]+=week4Amount[index]
				  }
				 
				});

				for(let key in objw4){
					w4finishDay.push(key);
				}

				for(let key in objw4){
				  w4finishAmount.push(objw4[key]);
				}
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
				options:{}
			});
		}
	}
</script>