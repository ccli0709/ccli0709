var app = angular.module('app', [ 'uiGmapgoogle-maps' ]);

app.config(function(uiGmapGoogleMapApiProvider) {
	uiGmapGoogleMapApiProvider.configure({
		key : 'AIzaSyBo6BU4yVDV9LFq415ZFI2KFkx9UBsF0bs',
		v : '3', // defaults to latest 3.X anyhow
		libraries : 'weather,geometry,visualization'
	});
})