<template>
	<div id="dashboard">
		<div class="main-chart">
			<canvas id="mychart"> </canvas>
		</div>
		<form @submit.prevent="reportMoney">
		
			<p>what have you bought?</p>
			<input @focus="shadow" type="text" v-model="item" placeholder="item">
			<input @focus="shadow" type="text" v-model="amount" placeholder="amount">
			<input type="hidden" v-model="day">
			<input type="hidden" v-model="week">
			<input type="hidden" v-model="month">
			<input type="hidden" v-model="year">
			<br>
			<button type="submit">&plus;</button>
			<button id="analyze" type="submit"><i class="fa fa-bar-chart"></i></button>
		</form>
	</div>
</template>

<script>
	import db from './firebaseInit'
	import chart from 'chart.js'


	export default{
		name: 'dashboard',
		data(){
			
			const clientHeight = window.innerHeight;
			const date = new Date();
			const dayName = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
			const monthName = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

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
				//style binding
				clientHeight: null,
				amount: null,
				item: null,
				day: dayName[date.getDay()],
				week: calcWeek(date.getDate()),
				month: monthName[date.getMonth()],
				year: date.getFullYear()
			}
		},

		methods: {
			reportMoney(){
				db.collection('moneys').add({
					amount: parseInt(this.amount),
					item: this.item,
					day: this.day,
					week: this.week,
					month: this.month,
					year: this.year

				})
				.then(docRef =>{
					this.$router.push('/')
				});
				this.amount = ''
				this.item = ''
			},

			shadow(){
				let input = document.querySelectorAll('input')
				input[0].style.boxShadow = '2px 2px 3px black'
				// dashboard.style.height = `${this.clientHeight}px`;
				
			}
		},

		created(){
			db.collection('moneys').get()
			.then(querySnapshot =>{
				querySnapshot.forEach(doc=>{
					//console.log(doc.data()); oputput: >object containing all db
				})
			});
			
		},

		mounted(){
			let myChart = document.querySelector('#mychart').getContext('2d');
			let theChart = new Chart(mychart, {
				type: 'bar',
				data: {
					labels: ['aaa', 'bbb', 'ccc', 'ddd', 'eee'],
					datasets: [{
							label: 'population',
							data: [29000, 70000, 80000, 39500, 100000]
						}
					]
				},
				options:{}
			})
		}
	
	}
</script>

<style scoped>
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
</style>
