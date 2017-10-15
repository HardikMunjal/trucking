xlsxj = require("xlsx-to-json");
  xlsxj({
    input: "abc.xlsx", 
    output: "output.json",
    sheet: "ESTATUS ALCON",
    lowerCaseHeaders:true //converts excel header rows into lowercase as json keys
  }, function(err, result) {
    if(err) {
      console.error(err);
    }else {
      console.log(result);
    }
  }); 





  herbaite
  herballife


  qnt :1

  client name