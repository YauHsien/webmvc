
function Address(idCity, idDist, idZip, idZip1, idAddress) {
    var me_addressObj = this;
    var DISTRICT_JSON = getAddressJSON();
    var citySelect,
        distSelect,
        zipText,
        zip1Text,
        addressText;
    this.setEventListener = function(el, e, f){ ael(el, e, f) };

    /** Model */
    var modelCity_int;
    var modelDist_int;

    /** View and Control */
    citySelect = document.getElementById(idCity);
    distSelect = document.getElementById(idDist);
    zipText = document.getElementById(idZip);
    zip1Text = document.getElementById(idZip1);
    addressText = document.getElementById(idAddress);

    setAddress(DISTRICT_JSON, citySelect);

    /** Notification sent to view when model is changed */
    this.notify = function(){
	sendNotification(DISTRICT_JSON, modelCity_int, modelDist_int, citySelect, distSelect, zipText);
    };

    /** Events that Controls send update via them */
    this.setEventListener(citySelect, 'change', function(){
        modelCity_int = citySelect.selectedIndex;
	modelDist_int = 0;
	me_addressObj.notify();
    });
    this.setEventListener(distSelect, 'change', function(){
        modelDist_int = distSelect.selectedIndex;
	me_addressObj.notify();
    });

    modelCity_int = 0;
    modelDist_int = 0;
    this.notify();
    return this;
}

function ael(x, evn, f) {
    if (x.addEventListener) {
	x.removeEventListener(evn, f);
	x.addEventListener(evn, f);
    } else if (x.attachEvent) {
	x.detachEvent('on' + evn, f);
	x.attachEvent('on' + evn, f);
    }
}

function sendNotification(DISTRICT_JSON, modelCity_int, modelDist_int, citySelect, distSelect, zipText) {
    citySelect.selectedIndex = modelCity_int;
    setDist(distSelect, DISTRICT_JSON, citySelect.value);
    distSelect.selectedIndex = modelDist_int;
    setZip(zipText, DISTRICT_JSON, citySelect.value, distSelect.value);
}

function setAddress(jsonObj, citySelect) {
    var selectObj = citySelect;
    for (key in jsonObj) {
	selectObj.length += 1;
	var obj = selectObj.options[selectObj.length - 1];
	obj.value = key;
	obj.text = key;
    }
    return jsonObj;
}

function setDist(distSelect, jsonObject, city) {
    var selectObj = distSelect;
    selectObj.length = 0;
    for (key in jsonObject[city]) {
	selectObj.length += 1;
	var obj = selectObj.options[selectObj.length - 1];
	obj.value = key;
	obj.text = key;
    }
}

function setZip(zipText, jsonObj, city, dist) {
    var textObj = zipText;
    if (undefined != jsonObj[city][dist])
        textObj.value = jsonObj[city][dist];
    else
        textObj.value = '';
}

function getAddressJSON() {
    var plain_address =
        '{ "基隆市": { "仁愛區": 1, \
                      "信義區": 2, \
                      "中正區": 3, \
                      "中山區": 4, \
                      "安樂區": 5 \
                    }, \
           "台北市": { "中正區": 100 }, \
           "新北市": { "三重區": 241,   \
                      "中和區": 247 }, \
           "桃園市": {}, \
           "新竹市": { }, \
           "新竹縣": {}, \
           "苗栗縣": {}, \
           "台中市": {}, \
           "彰化縣": {}, \
           "南投縣": {}, \
           "雲林縣": {}, \
           "嘉義市": {}, \
           "嘉義縣": {}, \
           "台南市": {}, \
           "高雄市": {}, \
           "屏東縣": {}, \
           "台東縣": {}, \
           "花蓮縣": {}, \
           "宜蘭縣": {}, \
           "澎湖縣": {}, \
           "金門縣": {}, \
           "連江縣": {} \
        }';
    return JSON.parse(plain_address);
}
