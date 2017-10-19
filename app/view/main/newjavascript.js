//$scope.OpenBooster = function()
//	{
//		for(var i = 0; i < $scope.Database.All.length; i++)
//			$scope.Database.All[i].Selected = false;
//		$scope.Booster.Cards = [];
//		$scope.Booster.Visible = false;
//		for(var i = 0; i < 8; i++){
//                    
//			var choice = LRF.Random.NextInt(0,100);
//			switch(i)
//			{
//				case 0:
//				if(choice < 20)
//					$scope.Booster.Cards.push($scope.Database.GetRandom("UR"));
//				else
//					$scope.Booster.Cards.push($scope.Database.GetRandom("R"));
//				break;
//				case 1:
//				if(choice < 20)
//					$scope.Booster.Cards.push($scope.Database.GetRandom("R"));
//				else
//					$scope.Booster.Cards.push($scope.Database.GetRandom("U"));
//				break;
//				case 2:
//				if(choice < 25)
//					$scope.Booster.Cards.push($scope.Database.GetRandom("U"));
//				else
//					$scope.Booster.Cards.push($scope.Database.GetRandom("C"));
//				break;
//				case 3:
//				$scope.Booster.Cards.push($scope.Database.GetRandom("U"));
//				break;
//				default:
//				$scope.Booster.Cards.push($scope.Database.GetRandom("C"));
//				break;
//			}
//		}
//		
//		$scope.Booster.Visible = true;
//		
//	};

//$scope.Database = 
//	{
//		All: [],
//		Promo: [],
//		UltraRare: [],
//		Rare: [],
//		Uncommon: [],
//		Common: [],
//		
//		GetRandom: function(type){
//			var index = 0;
//			switch(type)
//			{
//				case "P":
//				return $scope.Database.Promo[
//					LRF.Random.NextInt(0,$scope.Database.Promo.length)];
//				break;
//				case "C":
//				return $scope.Database.Common[
//					LRF.Random.NextInt(0,$scope.Database.Common.length)];
//				break;
//				case "U":
//				return $scope.Database.Uncommon[
//					LRF.Random.NextInt(0,$scope.Database.Uncommon.length)];
//				break;
//				case "R":
//				return $scope.Database.Rare[
//					LRF.Random.NextInt(0,$scope.Database.Rare.length)];
//				break;
//				case "UR":
//				return $scope.Database.UltraRare[
//					LRF.Random.NextInt(0,$scope.Database.UltraRare.length)];
//				break;
//			}
//			return undefined;
//		}
//	};
//NextInt: function(min, max){
//            return Math.floor((Math.random() * max) + min);
//        }