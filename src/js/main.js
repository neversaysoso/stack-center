var mhIndex = {
	logo: {
		imgSrc: '../images/mh-logo.png'
	},
	gnlist: [{
		imgSrc: '../images/mh-list1.png',
		cimgSrc: '../images/mh-list1c.png',
		text: '公司官网'
	}, {
		imgSrc: '../images/mh-list2.png',
		cimgSrc: '../images/mh-list2c.png',
		text: '公司OA'
	}, {
		imgSrc: '../images/mh-list3.png',
		cimgSrc: '../images/mh-list3c.png',
		text: '企业邮箱'
	}, {
		imgSrc: '../images/mh-list4.png',
		cimgSrc: '../images/mh-list4c.png',
		text: '公司SVN'
	}, {
		imgSrc: '../images/mh-list5.png',
		cimgSrc: '../images/mh-list5c.png',
		text: '公司管理平台'
	}, {
		imgSrc: '../images/mh-list11.png',
		cimgSrc: '../images/mh-list11c.png',
		text: '全栈中心'
	}, {
		imgSrc: '../images/mh-list16.png',
		cimgSrc: '../images/mh-list16c.png',
		text: 'Mock平台'
	}, {
		imgSrc: '../images/mh-list6.png',
		cimgSrc: '../images/mh-list6c.png',
		text: '吐槽系统'
	},
	{
		imgSrc: '../images/mh-list7.png',
		cimgSrc: '../images/mh-list7c.png',
		text: '日志平台'
	}, {
		imgSrc: '../images/mh-list8.png',
		cimgSrc: '../images/mh-list8c.png',
		text: '运营平台'
	}, {
		imgSrc: '../images/mh-list9.png',
		cimgSrc: '../images/mh-list9c.png',
		text: '帮助文档'
	}, {
		imgSrc: '../images/mh-list10.png',
		cimgSrc: '../images/mh-list10c.png',
		text: '公司软件下载'
	}, {
		imgSrc: '../images/mh-list12.png',
		cimgSrc: '../images/mh-list12c.png',
		text: 'GitLab'
	}, {
		imgSrc: '../images/mh-list13.png',
		cimgSrc: '../images/mh-list13c.png',
		text: 'Tesla'
	}, {
		imgSrc: '../images/mh-list15.png',
		cimgSrc: '../images/mh-list15c.png',
		text: 'testlink'
	}, {
		imgSrc: '../images/mh-list14.png',
		cimgSrc: '../images/mh-list14c.png',
		text: '公司npm仓库',
		href: ''
	}]
}
var getstar = function () {
	const [WINDOW_WIDTH, WINDOW_HEIGHT, num] = [document.body.offsetWidth, document.body.offsetHeight, 200]
	var canvas, context
	var stars = []
	var mouseX = WINDOW_WIDTH / 2
	var mouseY = WINDOW_HEIGHT / 2
	var rnd

	window.onload = function () {
		canvas = document.getElementById('canvas');
		canvas.width = WINDOW_WIDTH;
		canvas.height = WINDOW_HEIGHT;

		context = canvas.getContext('2d');

		addStar();
		setInterval(render, 33);
		liuxing();
		$(window).resize(function () {
			var WINDOW_WIDTH = document.body.offsetWidth;
			var WINDOW_HEIGHT = document.body.offsetHeight;
			canvas.width = WINDOW_WIDTH;
			canvas.height = WINDOW_HEIGHT;
			context.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
		})
		document.body.addEventListener('mousemove', mouseMove);
	}

	function liuxing() {
		var time = Math.round(Math.random() * 3000 + 33);
		setTimeout(function () {
			rnd = Math.ceil(Math.random() * stars.length)
			liuxing();
		}, time)
	}

	function mouseMove(e) {
		//因为是整屏背景，这里不做坐标转换
		mouseX = e.clientX;
		mouseY = e.clientY;
	}

	function render() {
		context.fillStyle = 'rgba(0,0,0,0.1)';
		context.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
		for (var i = 0; i < num; i++) {
			var star = stars[i];
			if (i == rnd) {
				star.vx = -15;
				star.vy = 20;
				context.beginPath();
				context.strokeStyle = 'rgba(255,255,255,' + star.alpha + ')';
				context.lineWidth = star.r;
				context.moveTo(star.x, star.y);
				context.lineTo(star.x + star.vx, star.y + star.vy);
				context.stroke();
				context.closePath();
			}
			star.alpha += star.ra;
			if (star.alpha <= 0) {
				star.alpha = 0;
				star.ra = -star.ra;
				star.vx = Math.random() * 0.2 - 0.1;
				star.vy = Math.random() * 0.2 - 0.1;
			} else if (star.alpha > 1) {
				star.alpha = 1;
				star.ra = -star.ra
			}
			star.x += star.vx;
			if (star.x >= WINDOW_WIDTH) {
				star.x = 0;
			} else if (star.x < 0) {
				star.x = WINDOW_WIDTH;
				star.vx = Math.random() * 0.2 - 0.1;
				star.vy = Math.random() * 0.2 - 0.1;
			}
			star.y += star.vy;
			if (star.y >= WINDOW_HEIGHT) {
				star.y = 0;
				star.vy = Math.random() * 0.2 - 0.1;
				star.vx = Math.random() * 0.2 - 0.1;
			} else if (star.y < 0) {
				star.y = WINDOW_HEIGHT;
			}
			context.beginPath();
			var bg = context.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.r);
			bg.addColorStop(0, 'rgba(255,255,255,' + star.alpha + ')')
			bg.addColorStop(1, 'rgba(255,255,255,0)')
			context.fillStyle = bg;
			context.arc(star.x, star.y, star.r, 0, Math.PI * 2, true);
			context.fill();
			context.closePath();
		}
	}

	function addStar() {
		for (var i = 0; i < num; i++) {
			var aStar = {
				x: Math.round(Math.random() * WINDOW_WIDTH),
				y: Math.round(Math.random() * WINDOW_HEIGHT),
				r: Math.random() * 3,
				ra: Math.random() * 0.05,
				alpha: Math.random(),
				vx: Math.random() * 0.2 - 0.1,
				vy: Math.random() * 0.2 - 0.1
			}
			stars.push(aStar);
		}
	}
}
var bindHover = function () {
	let [h, w] = [$(window).height(), $(window).width()]
	if (h / w > 1.608) {
		$('.mh-body').css('background-image', 'url(../images/mh-bg-phone.jpg)')
	} else {
		$('.mh-body').css('background-image', 'url(../images/mh-bg1.jpg)')
	}
	if (navigator.userAgent.match(/Android/i) || (navigator.userAgent.indexOf('iPhone') != -1) || (navigator.userAgent.indexOf('iPod') != -1) || (navigator.userAgent.indexOf('iPad') != -1)) {
		$('.mh-items').addClass('inPhone')
		$('.mh-items').on('touchstart', function () {
			$(this).addClass('active')
		})
		$('.mh-items').on('touchend', function () {
			$(this).removeClass('active')
		})
		$('.mh-items').on('touchmove', function () {
			$(this).removeClass('active')
		})
	} else {
		$('.mh-items').removeClass('inPhone')
		$('.mh-items').mousedown(function () {
			$(this).addClass('active')
		})
		$('.mh-items').mouseup(function () {
			$(this).removeClass('active')
		})
		$('.mh-items').mouseleave(function () {
			$(this).removeClass('active')
		})
		getstar()
	}
}

{
	new Vue({
		el: '#mh-index',
		data: {
			logo: mhIndex.logo,
			gnlist: mhIndex.gnlist
		},
		computed: {
			newgnlist: {
				get() {
					let s = []
					let count = 0
					for (let b in this.gnlist) {
						count++
						s[b] = this.gnlist[b]
						s[b].type = `type_${Math.floor(Math.random() * 6 + 1)}`
					}
					let w = $(window).width();
					if (w < 650) {
						if (count % 4 != 0) {
							const SIZE = 4 - count % 4;
							for (let i = 0; i < SIZE; i++) {
								s.push({
									isBuilding: true
								})
							}
						} else {
							for (let i = 0; i < 4; i++) {
								s.push({
									isBuilding: true
								})
							}
						}
					} else {
						if (count % 5 != 0) {
							const SIZE = 5 - count % 5;
							for (let i = 0; i < SIZE; i++) {
								s.push({
									isBuilding: true
								})
							}
						}
					}

					return s;
				}
			},
		},
		methods: {
			openPage(href) {
				if (typeof (href) != "undefined")
					window.open(href)
			},
			hoverTips(i) {
				console.log(i)
			}
		}
	})

	let h = $(window).height()
	$('.mh-body').css('min-height', h)
	$(window).resize(function () {
		let h = $(window).height()
		$('.mh-body').css('min-height', h)
		bindHover()
	})
	bindHover()
}