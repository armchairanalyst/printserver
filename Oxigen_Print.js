// ==UserScript==
// @name        Oxigen_Print
// @namespace   bhargavi
// @description Prints Oxigen Receipts to local Receipt Printer
// @match *://*
// @include file:///*
// @version     1
// @grant       GM_xmlhttpRequest
// @require     https://code.jquery.com/jquery-3.1.1.slim.min.js
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);
var url = window.location.href
var mode = 'default';
//alert("Into the page");
var dthdivname = '#divDTHPrint';
var mobiledivname = '#divTopupPrint';
var receipttablename = '#Pnlcnf';
if(url.includes("oximall") || url.includes("Oxigen"))
  {
    //alert("An Oxigen Page");
    //* Code for printing receipt goes here....    *//
    var $inputButton = $(`
                        <input 
                        type="button" 
                        value="Print Receipt" 
                        id="printreceiptbutton" 
                        class = "submitButton"
                        style="
                            width:200px;
                            text-decoration:underline;
                            text-decoration-color:red;
                            font-size:105%;
                        "/>`);
    
    
    if($(dthdivname).length)
      {
        // DTH specific code
        mode = 'dth';
        $inputButton.appendTo($("div#divPrint table tbody tr td:last-child"));
      }
    else if($(mobiledivname).length)
      {
        // Mobile recharge specific code.
        //alert('Oxigen Mobile Page');
        mode = 'mobile';
        $inputButton.appendTo($("div#divPrint table tbody tr td:last-child"));
      }
    else if ($(receipttablename).length)
      {
        mode='receipt';
        $inputButton.appendTo($("div#Pnlcnf table tbody tr:last-child"));
      }
    else {
      // default code.
    }
    
    $("#printreceiptbutton").click(PrintHandler);
  }

    function PrintHandler()
    {
      if(mode == 'dth')
        {
          //alert(GetData(dthdivname));
          var data = GetData(dthdivname);
          SendData(data);
          //alert(data);
        }
      else if(mode == 'mobile')
        {
          // Gather information for a Mobile Receipt..
          var data = GetData(mobiledivname);
          SendData(data);
          //alert(data);
        }
      else if(mode == 'receipt')
        {
          // Gather information for a Mobile Receipt..
          var data = GetData(receipttablename);
          SendData(data);
          //alert(data);
        }
    }

    function GetData(divname)
    {
       var arr = [];
       var indrow="";
          $(divname+" table tr:gt(0)").each(function() {
            $(this).find("td").each(function(){
              indrow += (addslashes($(this).text().trim())).replace("&","AND");
            });
            arr.push(indrow);
            indrow="";
          });
          //alert(arr);
         return (JSON.stringify(arr));
    }

function SendData(data){
  //alert("Sending data");
    GM_xmlhttpRequest({
      method: "GET",
      url: "http://127.0.0.1:5000/print?data="+data,
      onload: function(response) {
        alert(response.responseText);
      }
    });
}

function addslashes( str ) {
    return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}













