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
				<div class="item-green">item added</div>
				<p id="quote">{{quote}}</p>
				<p>- {{author}}</p>
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
				quote: '',
				author:'',
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
					//alert('insert both item & amount')
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
				this.quote = ''
				this.author = ''
				let allDoc = document.querySelector('.blur');
				let quoteContainer = document.querySelector('.item-added-container');
				let quote = document.querySelector('.item-added');
				allDoc.style.filter = 'blur(5px)'
				quoteContainer.style.visibility = 'visible'
				quoteContainer.style.opacity = '1'


				//fetch random quotes
				const myHeaders = new Headers();
				
				myHeaders.append('Content-Type', 'application/json');
				myHeaders.append('X-Mashape-Key', '6Efj1Yzy8kmshmgoVmBjLXHVDxMPp1LFPt2jsndHcRvmYvT78R');
				fetch('https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1',{
					method: 'GET',
					headers: myHeaders,
				})
				.then(response =>{
					return response.json()
				})
				.then(data => {
					//console.log(data) output = array containing 1 quote, hence data[0], it's fuckin array !
					this.quote = data[0].quote;
					this.author = data[0].author;
				})
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
				let retrieveItem = [];
				querySnapshot.forEach(doc=>{
					retrieveAmount.push(doc.data().amount)
					retrieveItem.push(doc.data().item);
				});
			
				
				let theChart = new Chart(mychart, {
						type: 'line',
						data: {
							labels: retrieveItem.slice(-10),
							datasets: [{
									label: 'amount',
									data: retrieveAmount.slice(-10)
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
	@mixin if-moreThan-768px{
		@media (min-width: 768px){
			@content;
		}
	}

	canvas{
		@include if-moreThan-768px{
			width: 700px !important;
			height: 300px !important;
		}
	}

	#dashboard{
		width: 100%;
		height: 100vh;
	/*	position: fixed;*/
		background-image: linear-gradient(to bottom, #59c799, #dd6aea);
		padding-top: 20px;
		@include if-moreThan-768px{
			padding-top: 60px;
		}
	}

	.main-chart{
		width: 90%;
		height: 170px;
		background: #fff;
		margin: 0 auto;
		@include if-moreThan-768px{
			width: 700px;
			height: 300px;
		}
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
		@include if-moreThan-768px{
			width: 14%;
		}
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
			@include if-moreThan-768px{
				width: 50%;
			}
			#quote{
				margin-top: 35px;
				font-size: 15px;
				padding: 0 7px;
			}
			.item-green{
				width: 50%;
				text-align: center;
				padding: 5px 3px;
				background: #3dc33d;
				position: absolute;
				top: 0;
				left: 50%;
				transform: translateX(-50%);
			}
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
