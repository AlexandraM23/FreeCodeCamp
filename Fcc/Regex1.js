function sumFibs(num) {
    var total = 2;
    var f1 = 1;
    var f2 = 1;  
    var next = f1 + f2;
    
    if(num < 3) {
       return num;
    }
   
    do {
        if(next % 2 != 0) {
            total += next;
        } 
      
        f2 = f1;
        f1 = next;
        next = f1 + f2;
    } while(next <= num);
    
    return total;
  }
  
  sumFibs(75023);
  