
chrome.tabs.getSelected(null,function(tab) {
    var tablink = tab.url;
    // $(".url").html(tablink);
});

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var tab = tabs[0];
  var url = new URL(tab.url)
  var domain = url.hostname
  // $(".domain").html(domain);
 
 url = domain.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];

 $.getJSON("https://web.archive.org/cdx/search/cdx?url=*."+url+"/*&output=json&fl=original" ,function(linkzz){


    let l = "";
    // for (let i = 1; i < linkzz.length  ; i++
    for (let i = 1; i < 20  ; i++) {

        l += `<b><a style="color:orange" href="${linkzz[i]}">${linkzz[i]}</a></b><br>`
        
        }



    $(".linkzs").html(l);



});

 $.getJSON("https://whatcms.org/API/Tech?key=7921c9be1b3dc0931a327fe395ae85082850f5cea62a373eed14e99e376725d25746fb&url="+url ,function(cms){
    
    var cmss = `${cms.results[0]["name"]}`;
    var cmss_version = `${cms.results[0]["version"]}`;
    var cmss_language = `${cms.results[1]["name"]}`;
    var cmss_db = `${cms.results[2]["name"]}`;
    
    $(".cms").html(cmss);
    $(".cmss_version").html(cmss_version);
    $(".cmss_language").html(cmss_language);
    $(".cmss_db").html(cmss_db);



});

$.getJSON("https://web.archive.org/cdx/search/cdx?url="+url+"&fl=timestamp&output=json" ,function(available){
   

    let availables = "";
    // for (let i = 1; i < available.length; i++)
    for (let i = 1; i < 20; i++) {
      availables += "<a style='color:orange' href='" + "http://web.archive.org/web/" + available[i] + "/" + url + "'>"+  "http://web.archive.org/web/" + available[i] + "/" + url +"</a>" +"<br> ";
    }
    let availabless = `<b><a style="color:orange" href="${availables}">${availables}</a></b>`
    $(".available").html(availabless);



});

$.getJSON("https://api.n45ht.or.id/v1/subdomain-enumeration?domain="+url ,function(subdomain){
    
    // var subdomains = `<b>${subdomain.subdomains}</b>`
    let subdomains = "";

    // for (let i = 0; i < subdomain.subdomains.length; i++)
    for (let i = 0; i < 20; i++) {
        subdomains += `<b><a style="color:orange" href='https://${subdomain.subdomains[i]}'>https://${subdomain.subdomains[i]}</a></b><br>`;
    }    


    $(".subdomain").html(subdomains);

});

$.getJSON("https://psbdmp.ws/api/search/domain/"+domain ,function(domain_out){
    
    var count = `${domain_out.count}`

    var domain_links = "";
    for (var i = 0; i < count; i++) {
          domain_links += `<b><a style="color:orange" href='https://pastebin.com/${domain_out.data[i]["id"]}'>https://pastebin.com/${domain_out.data[i]["id"]}</a></b><br>`;
          
    }
    $(".pastebin_domain").html(domain_links);



})
});

// document.querySelector('#btnConver').addEventListener('click', function(e) {
//                     var formats = document.querySelector('input[type="text"]');


// $.getJSON("https://psbdmp.ws/api/search/email/"+formats.value ,function(email_out){
    
//     var counts = `${email_out.count}`
//     var email_links = "";
//     for (var j = 0; j < counts; j++) {
//           email_links += `<b><a style="color:orange" href='https://pastebin.com/${email_out.data[j]["id"]}'>https://pastebin.com/${email_out.data[j]["id"]}</a></b><br>`; 
//     }
//     $(".pastebin_email").html(email_links);



// });
// }, false);

document.querySelector('#btnConvert').addEventListener('click', function(e) {
                    var format = document.querySelector('input[type="text"]');
                    // alert( format.value);
                  

$.getJSON("https://psbdmp.ws/api/search/"+format.value ,function(search_out){
    
    var countsss = `${search_out.count}`
    var search_links = "";
    for (var k = 0; k < countsss; k++) {
          search_links += `<b><a style="color:orange" href='https://pastebin.com/${search_out.data[k]["id"]}'>https://pastebin.com/${search_out.data[k]["id"]}</a></b><br>`; 
    }
    $(".pastebin_search").html(search_links);



});

}, false);

document.querySelector('#btnbucket').addEventListener('click', function(f) {
                    var bucket = document.querySelector('input[name="bucket"]');

$.getJSON("https://buckets.grayhatwarfare.com/api/v1/files/"+bucket.value+"?access_token=2714357cbaab331a4a0f841cac2bd76a" ,function(buckets){
    
    var results = `${buckets.results}`
    var resultz = `<b>Results</b>:${buckets.results}`
    var bucketss = "";
    for (var b = 0; b < 20; b++) {
          bucketss += `<b><a style="color:orange;word-break:break-all;" href="${buckets.files[b]["url"]}">${buckets.files[b]["url"]}</a></b><br>`
    }
    $(".buckets_results").html(resultz);
    $(".buckets").html(bucketss);

});                    
                    


});




// $.getJSON("https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=at_8yZNk8iKZRmxRXqaC1np3J7qqNscJ&domainName=katmoviehd.us&outputFormat=JSON" ,function(dns){
    
//     var ip = `${dns.WhoisRecord}`
//     var dns = "";
//     for (var k = 0; k < countsss; k++) {
//           search_links += `<b><a style="color:orange" href='https://pastebin.com/${search_out.data[k]["id"]}'>https://pastebin.com/${search_out.data[k]["id"]}</a></b><br>`; 
//     }
//     $(".ip").html(ip);



// });

