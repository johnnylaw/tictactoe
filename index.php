<!DOCTYPE html>
<html>

<head>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.7/angular.min.js"></script>
<script src="https://cdn.firebase.com/v0/firebase.js"></script>
<script src="https://cdn.firebase.com/libs/angularfire/0.6.0/angularfire.min.js"></script>

<script type="text/javascript" src="main.js"></script>
<style>
	.cell {width:55px; height:55px; background-color:orange;
		margin:1px; float:left;}
	.clear {clear:both;}
</style>

</head>

<body>

<div x-ng-app="TicTac" x-ng-controller="TicTacCtrl">
	<div x-ng-repeat="x in obj.board track by $index"
	  x-ng-class="{clear:$index % 4 == 0, cell:true}"
	  x-ng-click="makeMove($index);"
	  >{{x}}</div>
	</div>
</body>

</html>