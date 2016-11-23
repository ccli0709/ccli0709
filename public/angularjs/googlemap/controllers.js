app
		.controller(
				'controller',
				function($scope, uiGmapGoogleMapApi) {

					$scope.map = {
						center : {
							latitude : 22.5532615,
							longitude : 120.3594661
						},
						zoom : 14,
						bounds : {
							northeast : {
								latitude : 45.1451,
								longitude : -80.6680
							},
							southwest : {
								latitude : 30.000,
								longitude : -120.6680
							}
						}
					};

					var createRandomMarker = function(i, bounds, idKey) {
						var lat_min = bounds.southwest.latitude, lat_range = bounds.northeast.latitude
								- lat_min, lng_min = bounds.southwest.longitude, lng_range = bounds.northeast.longitude
								- lng_min;

						if (idKey == null) {
							idKey = "id";
						}

						var latitude = lat_min + (Math.random() * lat_range);
						var longitude = lng_min + (Math.random() * lng_range);
						var ret = {
							latitude : latitude,
							longitude : longitude,
							title : 'm' + i
						};
						ret[idKey] = i;
						return ret;
					};

					$scope.markers = [];
					$scope.marker = {};
					// $scope.marker.options = {
					// icon :
					// '//developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
					// };
					for (var i = 0; i < 5; i++) {
						// markers.push(createRandomMarker(i,
						// $scope.map.bounds))

						var ret = {
							latitude : $scope.map.center.latitude - 0.05 * i,
							longitude : $scope.map.center.longitude - 0.05 * i,

							id : i

						};

						if (i === 0) {
							ret.options = {
								icon : '//maps.gstatic.com/mapfiles/ms2/micons/sailing.png',
								title : '2016/11/01 - 抵達高雄港'
							}
						} else {
							ret.options = {
								icon : '//maps.gstatic.com/mapfiles/ms2/micons/ltblu-pushpin.png',
								title : '2016/10/XX - 航行中，前往高雄港'
							}
						}

						$scope.markers.push(ret);

					}

					$scope.addMarker = function() {
						var ret = {
							latitude : $scope.map.center.latitude + 0.01
									* Math.random(),
							longitude : $scope.map.center.longitude + 0.01
									* Math.random(),
							title : 'm' + i,
							id : $scope.markers.length
						};

						$scope.markers.push(ret);

					}

					$scope.go = function(door) {
						if (door == 'east') {
							$scope.map = {
								center : {
									latitude : 22.5523103,
									longitude : 120.3602171
								},
								zoom : 16
							};
						} else if (door == 'main') {
							$scope.map = {
								center : {
									latitude : 22.5544459,
									longitude : 120.3463564
								},
								zoom : 16
							};
						}

					};

					uiGmapGoogleMapApi.then(function(maps) {

					});
				});