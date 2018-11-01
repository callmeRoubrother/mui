mui.init()

mui.plusReady(function () {
	mui('.mui-table-view').on('tap', '.mui-table-view-cell', function () {
		console.log(this.childNodes[0].textContent.trim())
		var searchType = this.childNodes[0].textContent.trim()
		mui.get('http://route.showapi.com/126-2', {
			showapi_appid: 79073,
			showapi_sign: '1fbe0cb4957a45b5a40ce20d5be0a18e',
			type: searchType
		}, function (res) {
			vm.newList = res.showapi_res_body.pagebean.contentlist
			console.log(JSON.stringify(vm.newList))
		})
	})
})


var vm = new Vue({
	el: '#app',
	data: {
		list: [],
		newList: []
	},
	methods: {
		getList: function () {
			var that = this;
			mui.get('http://route.showapi.com/126-1', {
				showapi_appid: 79073,
				showapi_sign: '1fbe0cb4957a45b5a40ce20d5be0a18e'
			}, function (res) {
				that.list = res.showapi_res_body.allTypeList
			})
		}
	},
	created: function () {
		this.getList()
	}
})
