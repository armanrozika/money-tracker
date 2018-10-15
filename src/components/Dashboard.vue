<template>
	<div id="dashboard">
		<div class="blur">
			<div class="main-chart">
				<canvas id="mychart"> </canvas>
			</div>
		
			<form @submit.prevent="reportMoney">
		
				<p>what have you bought?</p>
				<input @focus="shadow" @blur="removeShadow" type="text" v-model="item" placeholder="item">
				<input @focus="shadow" @blur="removeShadow" type="text" v-model="amount" placeholder="amount">
				<input type="hidden" v-model="day">
				<input type="hidden" v-model="week">
				<input type="hidden" v-model="month">
				<input type="hidden" v-model="year">
				<br>
				<button type="submit" @click="blur">&plus;</button>
				<button id="analyze"><i class="fa fa-bar-chart"></i></button>
			</form>

		</div>
	
		<div class="item-added">
			<div class="close-quote">

			</div>
		</div>
	</div>
</template>

<script>
	import db from './firebaseInit'
	import chart from 'chart.js'


	export default{
		name: 'dashboard',
		data(){
			const date = new Date();
			const dayName = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
			const monthName = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
			
			//transform day (number) to day string name
			function calcWeek(thisdate){
				if(thisdate<=7){
					return '1';
				}else if(thisdate<=14){
					return '2';
				}else if(thisdate<=21){
					return '3';
				}else{
					return '4';
				}
			}
			
			return {
				amount: '',
				item: '',

				//automatically get day, week, month and year
				day: dayName[date.getDay()],
				week: calcWeek(date.getDate()),
				month: monthName[date.getMonth()],
				year: date.getFullYear()
			}
		},

		methods: {
			reportMoney(){
				if(this.item!='' && this.amount!=''){
					db.collection('moneys').add({
						amount: parseInt(this.amount),
						item: this.item,
						day: this.day,
						week: this.week,
						month: this.month,
						year: this.year,
						timestamp: new Date()
					})
					.then(docRef =>{
					this.$router.push('/')
					});
				}else{
					console.log('insert data')
				}
			
				this.amount = ''
				this.item = ''
			},

			shadow(event){
				event.target.style.boxShadow = '0 1px 4px black'
				// dashboard.style.height = `${this.clientHeight}px`;
			},

			removeShadow(event){
				event.target.style.boxShadow = 'none'
			},

			blur(){
				let allDoc = document.querySelector('.blur');

				allDoc.style.filter = 'blur(5px)'
			}
		},

		created(){
		},

		mounted(){
			let myChart = document.querySelector('#mychart').getContext('2d');
			db.collection('moneys').orderBy('timestamp', 'asc').get()
			.then(querySnapshot =>{
				let retrieveAmount = [];
				let retrieveDay = [];
				querySnapshot.forEach(doc=>{
					retrieveAmount.push(doc.data().amount)
					retrieveDay.push(doc.data().day.slice(0,1));
				});
				
				let theChart = new Chart(mychart, {
						type: 'line',
						data: {
							labels: retrieveDay,
							datasets: [{
									label: 'amount',
									data: retrieveAmount
								}
							]
						},
						options:{}
					});
			});
		}
	}
</script>

<style scoped lang="scss">
	#dashboard{
		width: 100%;
		height: 100vh;
	/*	position: fixed;*/
		background-image: linear-gradient(to bottom, #59c799, #dd6aea);
		padding-top: 20px;
	}

	.main-chart{
		width: 90%;
		height: 170px;
		background: #fff;
		margin: 0 auto;
	}

	form{
		margin-top: 20px;
		text-align: center;
	}

	p{
		text-align: center;
		font-size: 20px;
		color: #484848;
	}

	input{
		box-sizing: border-box;
		width: 70%;
		height: 40px;
		font-size: 18px;
		padding-left: 20px;
		margin-bottom: 20px;
		border: none;
		border-radius: 25px;
		outline: none;
		transition: box-shadow 300ms ease;
	}

	button{
		width: 50px;
		height: 50px;
		border: none;
		border-radius: 50%;
		background: #2fb53f;
		font-size: 30px;
		margin-right: 10px;
	}
	
	#analyze{
		background: #f1a32f;
		margin-left: 10px;
	}
	.blur{
		transition: filter 300ms ease;
	}

	.item-added{
		position: absolute;
		width: 80%;
		height: 200px;
		background: #ddd;
		top: 20%;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 10px;
	}
</style>
