function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    callback(url);
  });
}

function renderURL(statusText) {
  document.getElementById('status').textContent = statusText;
}

function cleanURL(dirtyURL){
  var a = dirtyURL;
  a = a.split('/')[2];
  a = a
    .replace('https', '')
    .replace('http', '')
    .replace('www.', '')
    .replace('://', '')
    .replace(/\/$/, '')
  return a
}



// WHOIS SEARCH //////////////////////
//////////////////////////////////////
function whoisLookup(domain){
  var queryPrefix ='https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=';
  var key = 'at_bx6wZe4UmfnnzW8GItl9I5Z0z19O0';
  var a = domain;
  var queryString = queryPrefix + key + "&domainName=" + a + "&outputFormat=JSON";
  axios.get(queryString)
  .then(function (response){
    var created = JSON.stringify(response.data.WhoisRecord.createdDate);
    var updated = JSON.stringify(response.data.WhoisRecord.updatedDate);
    var registrantName = JSON.stringify(response.data.WhoisRecord.registrant.name);
    var registrantOrganization = JSON.stringify(response.data.WhoisRecord.registrant.organization);
    var registrantStreet = JSON.stringify(response.data.WhoisRecord.registrant.street1);
    var registrantCity = JSON.stringify(response.data.WhoisRecord.registrant.city);
    var registrantState = JSON.stringify(response.data.WhoisRecord.registrant.state);
    var registrantZip = JSON.stringify(response.data.WhoisRecord.registrant.postalCode);
    var registrantCountry = JSON.stringify(response.data.WhoisRecord.registrant.country);
    var registrantEmail = JSON.stringify(response.data.WhoisRecord.registrant.email);
    var registrantTel = JSON.stringify(response.data.WhoisRecord.registrant.telephone);
    var registrantFax = JSON.stringify(response.data.WhoisRecord.registrant.fax);


    // // ADMIN CONTACT /////////////
    var adminName = JSON.stringify(response.data.WhoisRecord.administrativeContact.name);
    var adminOrganization = JSON.stringify(response.data.WhoisRecord.administrativeContact.organization);
    var adminStreet = JSON.stringify(response.data.WhoisRecord.administrativeContact.street1);
    var adminCity = JSON.stringify(response.data.WhoisRecord.administrativeContact.city);
    var adminState = JSON.stringify(response.data.WhoisRecord.administrativeContact.state);
    var adminZip = JSON.stringify(response.data.WhoisRecord.administrativeContact.postalCode);
    var adminCountry = JSON.stringify(response.data.WhoisRecord.administrativeContact.country);
    var adminEmail = JSON.stringify(response.data.WhoisRecord.administrativeContact.email);
    var adminTel = JSON.stringify(response.data.WhoisRecord.administrativeContact.telephone);
    var adminFax =  JSON.stringify(response.data.WhoisRecord.administrativeContact.fax);
    // // TECHNICAL CONTACT ////////////
    var techName = JSON.stringify(response.data.WhoisRecord.technicalContact.name);
    var techOrganization = JSON.stringify(response.data.WhoisRecord.technicalContact.organization);
    var techStreet = JSON.stringify(response.data.WhoisRecord.technicalContact.street1);
    var techCity = JSON.stringify(response.data.WhoisRecord.technicalContact.city);
    var techState = JSON.stringify(response.data.WhoisRecord.technicalContact.state);
    var techZip = JSON.stringify(response.data.WhoisRecord.technicalContact.postalCode);
    var techCountry = JSON.stringify(response.data.WhoisRecord.technicalContact.country);
    var techEmail = JSON.stringify(response.data.WhoisRecord.technicalContact.email);
    var techTel = JSON.stringify(response.data.WhoisRecord.technicalContact.telephone);
    var techFax =  JSON.stringify(response.data.WhoisRecord.technicalContact.fax);

    var status = JSON.stringify(response.data.WhoisRecord.status);
    var registrar = JSON.stringify(response.data.WhoisRecord.registrarName);
    var registrarId = JSON.stringify(response.data.WhoisRecord.registrarIANAID)
    var estimatedDomainAge = JSON.stringify(response.data.WhoisRecord.estimatedDomainAge);

    displayWhoIs(created, updated, registrantName, registrantOrganization, registrantStreet,
                  registrantCity, registrantState, registrantZip, registrantCountry, registrantEmail,
                  registrantTel, registrantFax, adminName, adminOrganization, adminStreet,
                  adminCity, adminState, adminZip, adminCountry, adminEmail, adminTel,
                  adminFax, techName, techOrganization, techStreet, techCity, techState,
                  techZip, techCountry, techEmail, techTel, techFax, status, registrar,
                  registrarId);
  })
  .catch(function (error){
    console.log(error);
  })
}

function displayWhoIs(_created, _updated, _registrantName, _registrantOrganization, _registrantStreet,
              _registrantCity, _registrantState, _registrantZip, _registrantCountry, _registrantEmail,
              _registrantTel, _registrantFax, _adminName, _adminOrganization, _adminStreet,
              _adminCity, _adminState, _adminZip, _adminCountry, _adminEmail, _adminTel,
              _adminFax, _techName, _techOrganization, _techStreet, _techCity, _techState,
              _techZip, _techCountry, _techEmail, _techTel, _techFax, _status, _registrar,
              _registrarId){
                var generalValues = [_created, _updated];
                var registrantValues = [_registrantName, _registrantOrganization, _registrantStreet,
                              _registrantCity, _registrantState, _registrantZip, _registrantCountry, _registrantEmail,
                              _registrantTel, _registrantFax];
                var adminValues = [_adminName, _adminOrganization, _adminStreet,
                              _adminCity, _adminState, _adminZip, _adminCountry, _adminEmail, _adminTel,
                              _adminFax];
                var techValues = [_techName, _techOrganization, _techStreet, _techCity, _techState,
                              _techZip, _techCountry, _techEmail, _techTel, _techFax];

                var miscValues = [_status, _registrar, _registrarId];

                // FIND THE DIVS IN THE HTML
                var general = document.getElementById("general");
                var registrant = document.getElementById("registrant");
                var admin = document.getElementById("admin");
                var tech = document.getElementById("tech");
                var misc = document.getElementById("misc")

                var genValPrefix = ["Created: ", "Updated: "];
                var regValPrefix = ["Name: ", "Organization: ", "Address: ", "City: ", "State: ",
                "Postal Code: ", "Country: ", "Telephone: ", "Fax: "];
                var miscValPrefix =["Status: ", "Registrar: ", "Registrar iD: "]

                // POPULATE THE GENERAL INFO DIV
                for(var i = 0; i < generalValues.length; i++){
                  var nodeCreated = document.createElement("p");
                  var textCreatedNode = document.createTextNode(genValPrefix[i] + generalValues[i]);
                  nodeCreated.appendChild(textCreatedNode);
                  general.appendChild(nodeCreated);
                }

                // POPULATE THE REGISTANT DIV
                for(var i = 0; i < registrantValues.length; i++){
                  var nodeCreated = document.createElement("p");
                  var textCreatedNode = document.createTextNode(regValPrefix[i] + registrantValues[i]);
                  nodeCreated.appendChild(textCreatedNode);
                  registrant.appendChild(nodeCreated);
                }

                // POPULATE THE ADMIN FIELD
                for(var i = 0; i < adminValues.length; i++){
                  var nodeCreated = document.createElement("p");
                  var textCreatedNode = document.createTextNode(regValPrefix[i] + adminValues[i]);
                  nodeCreated.appendChild(textCreatedNode);
                  admin.appendChild(nodeCreated);
                }

                // POPULATE THE TECH DIV
                for(var i = 0; i < techValues.length; i++){
                  var nodeCreated = document.createElement("p");
                  var textCreatedNode = document.createTextNode(regValPrefix[i] + techValues[i]);
                  nodeCreated.appendChild(textCreatedNode);
                  tech.appendChild(nodeCreated);
                }

                // POPULATE THE MISC DIV
                for(var i = 0; i < miscValues.length; i++){
                  var nodeCreated = document.createElement("p");
                  var textCreatedNode = document.createTextNode(miscValPrefix[i] + miscValues[i]);
                  nodeCreated.appendChild(textCreatedNode);
                  misc.appendChild(nodeCreated);
                }

              }

document.addEventListener('DOMContentLoaded', function() {
  // document.getElementById("feedback-button").addEventListener("click", function(){
  //   alert("Contact form coming soon, email me at steven@stevenanton.io until then")
  // });
  getCurrentTabUrl(function(url) {
    var _cleanURL = cleanURL(url);
    renderURL(_cleanURL);
    whoisLookup(_cleanURL);
  });
});
