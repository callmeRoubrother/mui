mui.init()
    	var vm = new Vue({
    		el: '#app',
    		data: {
    			name: '',
    			type: '',
    			imgs: ''
    		}
    	})
    	
    	mui.plusReady(function () {
    		// 获取摄像头对象
    		var cmr = plus.camera.getCamera(1);
    		
    		mui('.mui-content').on('tap', '#btn', function () {
    			mui.back()
    		})
    		window.addEventListener('sendMessage', function (event) {
    			console.log(event.detail.name)
    			console.log(event.detail.type)
    			console.log(event.detail.imgs)
    			var name = event.detail.name
	    		var type = event.detail.type
	    		var imgs = event.detail.imgs
	    		vm.name = name
	    		vm.type = type
	    		vm.imgs = imgs
    		})
    		
    		// 摇一摇功能实现
    		mui('.mui-content').on('tap', '#shake', function () {
    			// 摇一摇配置参数对象，frequency为频率
		    	var shakeOption = {
		    		frequency: 2000
		    	}
		    	// 摇一摇成功回调
					function shakeSuccess (acceleration) {
		    		var num = Math.abs(acceleration.xAxis) + Math.abs(acceleration.yAxis) + Math.abs(acceleration.zAxis)
		    		if( num >= 20 ) {
		    			console.log(acceleration.xAxis)
			    		console.log(acceleration.yAxis)
			    		console.log(acceleration.zAxis)
			    		document.getElementsByClassName('shckeInfo')[0].innerHTML = "x = " + acceleration.xAxis + " y = " + acceleration.yAxis + " z = " + acceleration.zAxis
		    		}
		    	}
		    	// 摇一摇失败回调
		    	function shakeError (err) {
		    		console.log(err.message)
		    	}
    			void plus.accelerometer.watchAcceleration( shakeSuccess, shakeError, shakeOption);
    		})
    		
    		//扫一扫功能实现
    		mui('.mui-content').on('tap', '#saoyisao', function () {
    			// 扫一扫文件路径参数
    			var saoPath = ''
    			// 扫一扫成功回调
		    	function saoSuccess (type, code, file) {
		    		console.log('1111111')
		    	}
    			void plus.barcode.scan(saoPath, saoSuccess);
    		})
    		
    		// 拍照功能实现
    		mui('.mui-content').on('tap', '#pic', function () {
    			// 拍照配置参数对象，可以配置拍照后的图片路径等
		    	var picOptions = {
		    		
		    	}
    			// 拍照成功回调
		    	function picSuccess (capturedFile) {
		    		console.log('拍照成功')
		    	}
		    	// 拍照失败回调
		    	function picError (error) {
		    		console.log(error)
		    	}
    			cmr.captureImage(picSuccess, picError, picOptions);
    		})
    	})