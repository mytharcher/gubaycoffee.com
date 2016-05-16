var ui = {
	// 初始化
	setup: function () {
		// 首页轮播
		// http://nivo.dev7studios.com
		// http://docs.dev7studios.com/jquery-plugins/nivo-slider
		if ($.fn.nivoSlider) {
			$('.nivo-slider').each(function (i) {
				var slider = $(this);
				slider.nivoSlider(slider.data());
			});
		}

		// 瀑布流
		// http://dfcreative.github.io/projects/waterfall/
		if ($.fn.waterfall) {
			$(window).scroll(function () {
				var win = $(this);
				var container = $('.cnl-container');
				if (container.position().top + container.height() < win.scrollTop() + win.height()) {
					$('.waterfall').each(function (i) {
						ui.waterfall.loadMore.apply(this);
					});
				}
			});
		}

		// 问题搜索提示
		// http://www.devbridge.com/projects/autocomplete/jquery/
		if ($.fn.autocomplete) {
			$('input.autocomplete').each(function (i) {
				var options = ui.autocomplete[this.id];
				if (this.name) {
					options.paramName = this.name;
				}
				$(this).autocomplete(options);
			});
		}

		// 单页相册+点击显示
		// http://adgallery.codeplex.com/documentation
		if ($.fn.adGallery) {
			$('.ad-gallery').adGallery({
				display_back_and_forward: false,
				width: 680,
				height: 385,
				loader_image: 'css/gallery/loader.gif'
			});

			// https://github.com/defunkt/facebox
			if ($.facebox) {
				$('.ad-gallery').delegate('div.ad-image-wrapper div.ad-image img', 'click', function (ev) {
					$.facebox({ image: this.src });
				});
			}
		}

		// http://rhinoslider.com/
		if ($.fn.rhinoslider) {
			$('.rhino-slider').rhinoslider({
				controlsMousewheel: false,
				controlsKeyboard: false,
				controlsPrevNext: false,
				controlsPlayPause: false,
				autoPlay: true,
				showTime: 5000,
				showBullets: 'always',
				slideNextDirection: 'toLeft',
				slidePrevDirection: 'toLeft'
			});
		}

		function sticky() {
			$('.sticky-column').stick_in_parent();
		}
		// http://leafo.net/sticky-kit/
		if ($.fn.stick_in_parent) {
			var cfgs = ui.sticky.config;
			var scrH = screen.height;
			for (var i = cfgs.length - 1; i >= 0; i--) {
				var cfg = cfgs[i];
				if (scrH >= cfg.minHeight) {
					var prev = $(cfg.stickyStartId).prev();
					var newContainer = $('<div class="sticky-column"></div>');
					prev.after(newContainer);
					// console.log(scrH, cfg.minHeight);
					newContainer.append(prev.nextAll());
					setTimeout(sticky, 0);
					break;
				}
			}
			// $('.sticky-column').each(function (i) {
			// 	var block = $(this);
			// 	var data = block.data();
			// 	var winHeight = $(window).height();
			// 	if (data.stickyMin < winHeight && winHeight <= data.stickyMax) {
			// 		block.stick_in_parent();
			// 	}
			// });
		}

		$(window).resize(ui.floatNav.toggle);
	},

	waterfall: {
		loadMore: function () {
			var me = $(this);
			var opt = me.data();

			if (opt.fetchUrl && !opt.loading && !opt.nomore) {
				me.data('loading', 1);
				$.ajax(opt.fetchUrl, {
					dataType: 'json',
					data: {
						timeline: opt.earliestTimeline,
						id: opt.earliestId
					},
					success: function (data) {
						if (data.length) {
							var timeline = 0, id=0;
							var html = data.map(function (item) {
								timeline = item.timeline;
								id = item.id;
								var tpl = $(opt.template).html().replace(/>\s+</g, '><');
								return js.text.Template.format($.trim(tpl), item);
							}).join('');

							timeline && me.data('earliestTimeline', timeline);
							id && me.data('earliestId', id);

							me.append(html);

							setTimeout(function () {
								$(window).resize();
								me.removeData('loading');
							}, 500);
						} else {
							me.data('nomore', 1);
							$('div.cnl-loading').hide();
						}
					},
					complete: function () {
						$(window).resize();
					}
				});
			}
		}
	},

	autocomplete: {
		questionSuggestion: {
			serviceUrl: 'question.php',
			minChars: 2,
			dataType: 'json',

			itemTemplate: '#{countText}#{value}',
			countTemplate: '<span class="count"><b>#{count}</b>个回答</span>',

			transformResult: function (response, query) {
				var result = {query: query};
				result.suggestions = $.map(response, function (item) {
					return {value: item.title, data: item.id, count: item.count};
				});

				return result;
			},

			formatResult: function (suggestion, value) {
				var options = ui.autocomplete.questionSuggestion;
				var tpl = options.itemTemplate;
				var data = $.extend({}, suggestion);
				data.value = $.Autocomplete.formatResult(suggestion, value);
				if (parseInt(data.count, 10)) {
					data.countText = js.text.Template.format(options.countTemplate, data);
				}
				return js.text.Template.format(tpl, data);
			},

			onSelect: function (suggestion) {
				
			}
		}
	},

	slideShow: {
		init: function (root, options) {
			$('div.game-scre s', root).click(function (ev) {
				var R = $(root)
				var curIndex = parseInt(R.data('currentIndex'), 10);
				var next = curIndex + parseInt(({l: -1, r: 1})[this.className], 10);

			});
		}
	},

	floatNav: {
		toggle: function () {
			var floatNav = $('.fting');
			if (($(window).width() - $('.cnl-main').width()) / 2 <=
				floatNav.width() + parseInt(floatNav.css('right'), 10)) {
				floatNav.hide();
			} else {
				floatNav.show();
			}
		}
	},

	sticky: {}
};







// console.log($('#waterfall-template').html());

$(ui.setup);
