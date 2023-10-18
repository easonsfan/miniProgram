<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
  page{
    height: 100%;
  }
	::-webkit-scrollbar {
		display: none;
		width: 0 ;
		height: 0 ;
		// -webkit-appearance: none;
		// background: transparent;
		// color: transparent;
	}
</style>
