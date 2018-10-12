<template>
	<div id="dashboard">
		<h3>Dashboard</h3>
		<form @submit.prevent="reportMoney">
			<input type="text" v-model="item" placeholder="item">
			<input type="text" v-model="amount" placeholder="amount">
			<input type="hidden" v-model="day">
			<input type="hidden" v-model="week">
			<input type="hidden" v-model="month">
			<input type="hidden" v-model="year">

			<button type="submit">Submit</button>
		</form>
	</div>
</template>

<script>
	import db from './firebaseInit'
	export default{
		name: 'dashboard',
		data(){
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
			}
		},

		created(){
			db.collection('moneys').get()
			.then(querySnapshot =>{
				querySnapshot.forEach(doc=>{
					console.log(doc.data());
				})
			})
		}
	
	}
</script>

<style scoped>

</style>
