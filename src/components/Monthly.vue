<template>
	<div id="monthly">
		<h3>monthly</h3>
		<div class="main-chart">
			<canvas id="mychart"> </canvas>
		</div>
		<p>test: {{bulan}}</p>
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

		<router-link to="/weekly">
			<button>switch to weekly</button>
		</router-link>
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
			}
		},

		mounted(){
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