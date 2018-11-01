function pullfreshUp () {
	vm.list = []
	mui.get('http://route.showapi.com/126-2', {
		showapi_appid: 79073,
		showapi_sign: '1fbe0cb4957a45b5a40ce20d5be0a18e'
	}, function (res) {
		if (res.showapi_res_code === 0) {
			vm.list = res.showapi_res_body.pagebean.contentlist
		} else {
			mui.toast('网络连接错误，请稍后重试');
		}
	})
	mui('#refreshContainer').pullRefresh().endPulldown();
}

function pullfreshDown () {
	console.log('111111111')
	vm.page++;
	mui.get('http://route.showapi.com/126-2', {
		showapi_appid: 79073,
		showapi_sign: '1fbe0cb4957a45b5a40ce20d5be0a18e',
		page: vm.page
	}, function (res) {
		if (res.showapi_res_code === 0) {
			var arr = res.showapi_res_body.pagebean.contentlist
			if(arr.length > 0){
				arr.map(function(item){
					vm.list.push(item)
				})
			} else {
				this.endPullupToRefresh(true);
			}
		} else {
			mui.toast('网络连接错误，请稍后重试');
		}
	})
}

mui.init({
	preloadPages:[
    {
      url:'detail.html',
      id:'detail',
      styles:{},
      extras:{},
      subpages:[{},{}]
    }
  ],
  preloadLimit:5,
	pullRefresh : {
    container:"#refreshContainer",
    down : {
      style:'circle',
      color:'#2BD009',
      height:'50px',
      range:'100px',
      offset:'0px',
      auto: true,
      callback :pullfreshUp
    },
    up : {
      height:50,
      auto:false,
      contentrefresh : "正在加载...",
      contentnomore:'没有更多数据了',
      callback :pullfreshDown
    }
  }
})

mui.plusReady(function () {
	mui('.mui-table-view').on('tap', '.mui-table-view-cell', function () {
		var name = this.getAttribute('name')
		var type = this.getAttribute('type')
		var imgs = this.getAttribute('imgs')
		console.log(name)
		console.log(type)
		
		var target = plus.webview.getWebviewById('detail');
		mui.fire(target, 'sendMessage', {
			name: name,
			type: type,
			imgs: imgs
		})
		
		mui.openWindow({
			url: 'detail.html',
			id: 'detail',
			styles: {
				top: "44px",
				bottom: '50px'
			},
			extras: {
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
		list: [],
		page: '1'
	},
	methods: {
		getList: function () {
			var that = this
			mui.get('http://route.showapi.com/126-2', {
				showapi_appid: 79073,
				showapi_sign: '1fbe0cb4957a45b5a40ce20d5be0a18e',
				page: that.page
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
//		this.getList();
	}
})

