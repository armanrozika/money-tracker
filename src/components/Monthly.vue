<template>
	<div id="monthly">
		<h3>Monthly Chart</h3>
		<div class="main-chart">
			<canvas id="mychart"> </canvas>
		</div>
		<p>Bulan: {{bulan}}</p>
		<div class="options">
			
		
		<select name="" id="" v-model="bulan">
			<option disabled value="">Bulan</option>
			<option>Januari</option>
			<option>Februari</option>
			<option>Maret</option>
			<option>April</option>
			<option>Mei</option>
			<option>Juni</option>
			<option>Juli</option>
			<option>Agustus</option>
			<option>September</option>
			<option>Oktober</option>
			<option>November</option>
			<option>Desember</option>
		</select>

		<select name="" id="" v-model="tahun">
			<option disabled value="">Tahun</option>
			<option>2018</option>
			<option>2019</option>
			<option>2020</option>
		</select>
		</div>

		<div class="weekly-switch">
			<router-link to="/weekly">
				<button>switch to weekly</button>
			</router-link>
		</div>

		<div class="home">
			<router-link to="/">
				<button><i class="fa fa-home"></i></button>
				<p>home</p>
			</router-link>
		</div>
		
	</div>
</template>

<script>
	import db from './firebaseInit'
	import chart from 'chart.js'

	export default{
		name: 'monthly',
		data(){
			return {
				bulan: '',
				data: '',
				tahun: 2018
			}
		},
		methods:{
			test(){
			},

			drawChart(){
				let bulanData = []
				this.data.forEach((el, index, arr)=>{
					if(el.year == this.tahun){
						if(el.month == this.bulan){
							bulanData.push(el);
						}
					}
				});
				//console.log(bulanData)

				let week1d = []
				let week1am = []
				let objw1 = {}
				let wfd1 = []
				let wfd1am = []

				let week2d = []
				let week2am = []
				let objw2 = {}
				let wfd2 = []
				let wfd2am = []

				let week3d = []
				let week3am = []
				let objw3 = {}
				let wfd3 = []
				let wfd3am = []

				let week4d = []
				let week4am = []
				let objw4 = {}
				let wfd4 = []
				let wfd4am = []

				bulanData.forEach((el, index, arr)=>{
					if(el.week == 1){
						week1d.push(el.day)
						week1am.push(el.amount)
						//console.log(el.day)
					}else if(el.week == 2){
						week2d.push(el.day)
						week2am.push(el.amount)
					}else if(el.week == 3){
						week3d.push(el.day)
						week3am.push(el.amount)
					}else{
						week4d.push(el.day)
						week4am.push(el.amount)
					}
				});
				// console.log(week1d)

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

				calcDataPerWeek(week1d, objw1, week1am, wfd1, wfd1am)
				calcDataPerWeek(week2d, objw2, week2am, wfd2, wfd2am)
				calcDataPerWeek(week3d, objw3, week3am, wfd3, wfd3am)
				calcDataPerWeek(week4d, objw4, week4am, wfd4, wfd4am)

				let monthAmount = wfd1am.concat(wfd2am,wfd3am,wfd4am)
				let labels = []
				for(let i=0; i<monthAmount.length; i++){
					labels.push('.')
				}


				let theChart = new Chart(mychart, {
					type: 'line',
					data: {
						labels: labels,
						datasets: [{
								label: 'amount',
								data: monthAmount
							}
						]
					},
					options:{}
				});
			}
		},

		watch: {
			bulan: function(){
				this.drawChart()
			}
		},

		mounted(){
			// let date = new Date();
			// let year = date.getFullYear();

			let dataFromDb = [];
			this.data = dataFromDb;
			db.collection('moneys').orderBy('timestamp', 'asc').get()
			.then(querySnapshot=>{
				querySnapshot.forEach(doc=>{
					dataFromDb.push(doc.data())
				})
			});


			//console.log(dataFromDb)

			//default chart, empty
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

<style lang="scss">
	a{
		color: #000;
	}
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

	#monthly{
		width: 100%;
		height: 100vh;
	/*	position: fixed;*/
		background-image: linear-gradient(to bottom, #59c799, #dd6aea);
		padding-top: 20px;
		h3{
			text-align: center;
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
		p{
			text-align: center;
		}
		.options{
			text-align: center;
			select{
				padding: 5px 10px;
				border: none;
				background: #ab5ee0;
				outline: none;
			}
			select:nth-child(1){
				width: 150px;
			}
		}
		.weekly-switch{
			text-align: center;
			margin-top: 20px;
			button{
				padding: 10px 15px;
				border: none;
				border-radius: 30px;
				background: #3abfd8;
			}
		}
		.home{
			margin-top: 30px;
			text-align: center;
			button{
				font-size: 40px;
				border: none;
				background: none;
				margin-bottom: 0;
				color: #e6d334;
			}
			p{
				margin-top: -7px;
			}
		}
	}
</style>