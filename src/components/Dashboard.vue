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
				<router-link to="/weekly">
					<button id="analyze"><i class="fa fa-bar-chart"></i></button>
				</router-link>
				
			</form>

		</div>
		<div class="item-added-container">
			<div class="item-added">
				<button @click="closeQuote" class="close-quote">&times;</button>
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
					//console.log('insert data')
				}
			
				this.amount = ''
				this.item = ''
			},

			shadow(event){
				event.target.style.boxShadow = '0 1px 9px rgba(0,0,0,0.6)'
			},

			removeShadow(event){
				event.target.style.boxShadow = 'none'
			},

			blur(){
				let allDoc = document.querySelector('.blur');
				let quoteContainer = document.querySelector('.item-added-container');
				let quote = document.querySelector('.item-added');
				allDoc.style.filter = 'blur(5px)'
				quoteContainer.style.visibility = 'visible'
				quoteContainer.style.opacity = '1'
			},

			closeQuote(){
				let quoteContainer = document.querySelector('.item-added-container');
				let quote = document.querySelector('.item-added');
				let allDoc = document.querySelector('.blur');
				quoteContainer.style.visibility = 'hidden'
				allDoc.style.filter = 'none'
				quoteContainer.style.opacity = '0'
				
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
		outline: none;
		font-size: 30px;
		margin-right: 10px;
	}
	
	#analyze{
		background: #f1a32f;
		margin-left: 10px;
	}
	.blur{
		height: 100vh;
		transition: filter 300ms ease;
	}

	.item-added-container{
		position: absolute;
		top: 0;
		width: 100%;
		height: 100vh;
		visibility: hidden;
		opacity: 0;
		transition: all 300ms ease;
		.item-added{
			position: absolute;
			width: 80%;
			height: 200px;
			background: #fff;
			top: 20%;
			left: 50%;
			transition: top 400ms ease;
			transform: translateX(-50%);
			border-radius: 10px;
			filter: drop-shadow(0px 2px 10px rgba(0,0,0,0.6));
			.close-quote{
				width: 50px;
				height: 50px;
				background: red;
				position: absolute;
				bottom: -25px;
				border-radius: 50%;
				left: 50%;
				transform: translateX(-50%);
				outline: none;
			}
		}
	}
	
</style>
