var denom = [
    { name: 'ONE HUNDRED', val: 10000},
    { name: 'TWENTY', val: 2000},
    { name: 'TEN', val: 1000},
    { name: 'FIVE', val: 500},
    { name: 'ONE', val: 100},
    { name: 'QUARTER', val: 25},
    { name: 'DIME', val: 10},
    { name: 'NICKEL', val: 5},
    { name: 'PENNY', val: 1}
  ];
  
  var denoms = {
    'ONE HUNDRED': 10000,
    'TWENTY': 2000,
    'TEN': 1000,
    'FIVE': 500,
    'ONE': 100,
    'QUARTER': 25,
    'DIME': 10,
    'NICKEL': 5,
    'PENNY': 1
  };
  
  function checkCashRegister(price, cash, cid) {
    price = price * 100;
    cash = cash * 100;
    var change = cash - price;
    
    var cidSum = cid.reduce(function(all, current,index){
      return all + (cid[index][1] * 100);
    }, 0);
    
    if(change == cidSum){
        return "Closed";
    } else if(change > cidSum) {
        return "Insufficient Funds";
    }
    
    var calculateHowManyOfEach = function(arr){
      var newObj = {};
      for(var i = 0; i < arr.length; i++){
          var currency = arr[i][0];
          newObj[currency] = Math.floor((arr[i][1]*100)/denoms[currency]);
        
      }
      return newObj;
    };
    
    var howManyOfEach = calculateHowManyOfEach(cid);
    
    var whatNext = function(change){
      for( var i = 0; i < denom.length; i++){
        if(change >= denom[i].val && howManyOfEach[denom[i].name] > 0){
          return denom[i].name; 
        } 
      }
      return null;
    };
    
    var arrChange = [];
    
    while(change > 0){
      var curr = whatNext(change);
      if(curr == null) {
        return "Insufficient Funds";
      } else {
        var howManyIWouldLike = Math.floor(change/denoms[curr]);
        var howMany = Math.min(howManyIWouldLike, howManyOfEach[curr]);
        var howMuch = howMany * denoms[curr];
        arrChange.push([curr, howMuch/100]);
        change -= howMuch;
        howManyOfEach[curr] -= howMany;
      }  
    }
  
    return arrChange;
   
  }
  
  // Example cash-in-drawer array:
  // [["PENNY", 1.01],
  // ["NICKEL", 2.05],
  // ["DIME", 3.10],
  // ["QUARTER", 4.25],
  // ["ONE", 90.00],
  // ["FIVE", 55.00],
  // ["TEN  20.00],
  // ["TWENTY", 60.00],
  // ["ONE HUNDRED", 100.00]]
  
 var result =  checkCashRegister(3.26, 100.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]])
 console.log(result);