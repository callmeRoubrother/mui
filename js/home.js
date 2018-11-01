mui.init()

mui.plusReady(function () {
	mui('.mui-table-view').on('tap', '.mui-table-view-cell', function () {
		console.log('1111111')
		var name = this.getAttribute('name')
		var type = this.getAttribute('type')
		var imgs = this.getAttribute('imgs')
		console.log(name)
		console.log(type)
		mui.openWindow({
			url: 'detail.html',
			id: 'detail',
			styles: {
				top: "44px",
				bottom: '50px'
			},
			extras: {
				Name: name,
				Type: type,
				Imgs: imgs
			},
			show: {
				autoShow: true,
				aniShow:'slide-in-right',
      	duration:500
			},
			waiting: {
				title: '拼命加载中....'
			}
		})
	})
})

var vm = new Vue({
	el: '#app',
	data: {
		list: []
	},
	methods: {
		getList: function () {
			var that = this
			mui.get('http://route.showapi.com/126-2', {
				showapi_appid: 79073,
				showapi_sign: '1fbe0cb4957a45b5a40ce20d5be0a18e'
			}, function (res) {
				if (res.showapi_res_code === 0) {
					that.list = res.showapi_res_body.pagebean.contentlist
				} else {
					mui.toast('网络连接错误，请稍后重试');
				}
				console.log(JSON.stringify(res))
			})
		}
	},
	created: function () {
		this.getList();
	}
})

