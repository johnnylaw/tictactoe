angular.module("TicTac", ["firebase"])
 .controller("TicTacCtrl", function($scope, $firebase){

	var ticTacRef;
	var IDs;
	var mySymbol;
 	
 	ticTacRef = new Firebase("https://intense-fire-5636.firebaseio.com/");
 	$scope.fbRoot = $firebase(ticTacRef);

 	// Wait until everything really is loaded
 	$scope.fbRoot.$on("loaded", function() {
		IDs = $scope.fbRoot.$getIndex();
		if(IDs.length == 0)
		{
			// What???  No Board????  Let's build one.
	 		$scope.fbRoot.$add({ 
	 			board:['','','','','','','','','','','','','','','',''], // your board
 	 			xTurn:true,     // your turn-tracker
 	 		});
			$scope.fbRoot.$on("change", function() {
				IDs = $scope.fbRoot.$getIndex();
				$scope.obj = $scope.fbRoot.$child(IDs[0]);
			});
		}
		else
		{
			$scope.obj = $scope.fbRoot.$child(IDs[0]);
		}
	});

 	var isCellEmpty = function(i) {
		return $scope.obj.board[i] == '';
 	};

 	var itIsMyTurn = function() {
 		return currentSymbol() == mySymbol;
 	};

 	var currentSymbol = function() {
 	  return $scope.obj.xTurn ? 'X' : 'O';
 	}

 	var currentSymbolUnused = function() {
 		return !$scope.obj.board.join().match(currentSymbol());
 	};

 	var iDontHaveASymbol = function() {
 		return !mySymbol;
 	};
 	var symbolIsPlayableByThisBrowser = function() {
 		return itIsMyTurn() || (currentSymbolUnused() && iDontHaveASymbol());
 	} 

 	var isLegalMove = function(idx) {
 		return isCellEmpty(idx) && symbolIsPlayableByThisBrowser();
 	};

 	$scope.makeMove = function(idx) {
 		if(isLegalMove(idx)) {   
			mySymbol = $scope.obj.board[idx] = currentSymbol();
			$scope.obj.xTurn = !$scope.obj.xTurn;
			$scope.obj.$save();
 		}
 	};
});