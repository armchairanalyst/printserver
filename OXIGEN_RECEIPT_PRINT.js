javascript:(function(e,a,g,h,f,c,b,d){if(!(f=e.jQuery)||g>f.fn.jquery||h(f)){c=a.createElement("script");c.type="text/javascript";c.src="http://ajax.googleapis.com/ajax/libs/jquery/"+g+"/jquery.min.js";c.onload=c.onreadystatechange=function(){if(!b&&(!(d=this.readyState)||d=="loaded"||d=="complete")){h((f=e.jQuery).noConflict(1),b=1);f(c).remove()}};a.documentElement.childNodes[0].appendChild(c)}})(window,document,"1.3.2",function($,L){$(document).ready(function()
    {
        var provider = $('#MainContent_lblDescription').text();
        var number = $('#MainContent_lblMobileNo').text();
        var txnref = $('#MainContent_lbltransactionNo').text();
        var date = $('#MainContent_lbl_date').text();
        var url = "http://localhost:8081/print";
        var r = url.concat("?provider=",provider,"&number=",number,"&txnref=",txnref,"&date=",date);
        $.post(r);
});});