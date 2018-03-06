(function () {
   "use strict";

   var normalm = L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
       maxZoom: 18,
       minZoom: 5,
       attribution: 'GIS System Used for Airport of Shenzhen. &copy;ecidi'
   });
   var imgm = L.tileLayer.chinaProvider('GaoDe.Satellite.Map', {
       maxZoom: 18,
       minZoom: 5,
       attribution: 'GIS System Used for Airport of Shenzhen. &copy;ecidi'
   });
   var imga = L.tileLayer.chinaProvider('GaoDe.Satellite.Annotion', {
       maxZoom: 18,
       minZoom: 5,
       attribution: 'GIS System Used for Airport of Shenzhen. &copy;ecidi'
   });

   var normal = L.layerGroup([normalm]),
       image = L.layerGroup([imgm, imga]);

   var baseLayers = {
      "影像": image,
      "地图": normal
   }

   // 初始化地图
   var map = L.map("map", {
       center: [22.632866726168892, 113.81655693054198],
       zoom: 14,
       layers: [normal],
       zoomControl: false,
       doubleClickZoom: false
   });

   L.control.layers(baseLayers, null).addTo(map);
   L.control.zoom({
       zoomInTitle: '放大',
       zoomOutTitle: '缩小'
   }).addTo(map);

   L.control.scale().addTo(map);

   // 定义图标icon
   var commonIcon = L.Icon.extend({
      options: {
        iconSize: [22, 27],
        iconAnchor: [11, 27],
        popupAnchor: [10, 10]
      }
   });

   var PersonIcon = new commonIcon({iconUrl: 'lib/images/person.png', className: 'PersonIcon'});
   var secureIcon = new commonIcon({iconUrl: 'lib/images/SecureIcon.png', className: 'SecureIcon'});
   var cameraIcon = new commonIcon({iconUrl: 'lib/images/camera.png', className: 'cameraIcon'});

   // 函数区域

   function onMapClick(e) {
       var popup = L.popup();
       console.log(e.latlng);
   }

   function personBind(marker, name, org, phone, job, latlng) {
     marker.on('click', function (e) {
       var popup = L.popup();
       popup.setLatLng(latlng)
           .setContent(
'        <h2><span>姓名:</span>' + name + '</h2>'+
'        <h2><span>所属单位:</span>' + org + '</h2>'+
'        <h2><span>联系方式:</span>' + phone + '</h2>'+
'        <h2><span>职务:</span>' + job + '</h2>'+
'        <h2 class="btnRow"><a href="javascript:void(0);" class="btnViewTrack">查看详情</a></h2>'+
'    </div>').openOn(map);
   });
   }

   function secureBind(marker, content, level, state, method, org, latlng) {
      marker.on('click', function (e) {
        var popup = L.popup();
        popup.setLatLng(latlng)
             .setContent(
'    <h2><span>隐患内容：</span>' + content + '</h2>'+
'    <h2><span>风险级别：</span>' + level + '</h2>'+
'    <h2><span>整改状态：</span>' + state + '</h2>'+
'    <h2><span>整改措施：</span>' + method + '</h2>'+
'    <h2><span>责任单位：</span>' + org + '</h2>'+
'    <a href="javascript:void(0);" class="btnViewRisk">查看详情</a>').openOn(map);
      });
   }

   function openWindow(href) {
      window.open(href, "_blank", "width=1000, height=700");
   }

   function cameraBind(marker, type, location, href, latlng) {
      marker.on('click', function (e) {
        var popup = L.popup();
        popup.setLatLng(latlng)
             .setContent('<h2><span>摄像头型号：</span>' + type + '</h2>'+
'    <h2><span>部位：</span>' + location + '</h2>' +
'        <h2 class="btnRow"><a href="javascript:void(0);" class="btnViewCamera" data-href="'+href+'">查看详情</a></h2>').openOn(map);
      });
      $('.leaflet-objects-pane').on('click', function () {
         if (event.target.className == 'btnViewCamera') {
           openWindow($(event.target).data('href'));
         }
      });
   }

   function toggleIcon(marker, group) {
      if (marker.hasLayer(group[0])) {
        marker.clearLayers();
      } else {
        for (var i = 0; i < group.length; i++) {
           marker.addLayer(group[i]);
        }
      }
   }

   function initPerson(data) {
      var personGroup = [];
      for (var i = 0; i < data.persons.length; i++) {
         var person = new L.marker(data.persons[i].latlng, {icon: PersonIcon, name: data.persons[i].name});
         personBind(person, data.persons[i].name, data.persons[i].org, data.persons[i].phone, data.persons[i].job, data.persons[i].latlng);
         personGroup.push(person);
      }

      return personGroup;
   }

   function initSecure(data) {
      var secureGroup = [];
      for (var i = 0; i < data.secure.length; i++) {
          var secure = new L.marker(data.secure[i].latlng, {icon: secureIcon});
          secureBind(secure, data.secure[i].content, data.secure[i].level, data.secure[i].state, data.secure[i].method, data.secure[i].org, data.secure[i].latlng);
          secureGroup.push(secure);
      }

      return secureGroup;
   }

   function initCamera(data) {
    var cameraGroup = [];
      for (var i = 0; i < data.camera.length; i++) {
         var camera = new L.marker(data.camera[i].latlng, {icon: cameraIcon});
         cameraBind(camera, data.camera[i].type, data.camera[i].location, data.camera[i].href, data.camera[i].latlng);
         cameraGroup.push(camera);
      }

      return cameraGroup;
   }

   function initArea(data) {
    var areaGroup = [];
      for (var i = 0; i < data.area.length; i++) {
        var area = new L.polygon(data.area[i].polyLagLng, {bubblingMouseEvents: true, color: data.area[i].color});
        var centerLatLng = area.getBounds().getCenter();
        var label = L.marker([centerLatLng.lat, centerLatLng.lng], {
           icon: L.divIcon({
             className: 'label-text',
             html: data.area[i].text,
             iconSize: [48, 20]
           })
        });
        areaGroup.push(area);
        areaGroup.push(label);
      }

      return areaGroup;
   }

   function getPersonId(group, name) {
      for (var i = 0; i < group.length; i++) {
        if (name == group[i].options.name) {
          return i;
        }
      }
      return -1;
   }

   function getCameraId(group, name) {
      for (var i = 0; i < group.length; i++) {
        if (name == group[i].options.id) {
          return i;
        }
      }
      return -1;
   }

   function toggleShow(group, groupTemp, marker, name) {
      var id = getPersonId(group, name);
      var origin = getPersonId(groupTemp, name);
      if (id !== -1) {
        group.splice(id, 1);
        marker.clearLayers();
        for (var i = 0; i < group.length; i++) {
           marker.addLayer(group[i]);
        }
      } else {
        marker.addLayer(groupTemp[origin]);
        group.push(groupTemp[origin]);
      }
   }

   map.on('click', onMapClick);

   // 数据区域
   var data = {
      persons: [
          {
            latlng: [22.63247062142493, 113.81526947021484],
            name: '胡龙',
            org: '工程部',
            phone: '18258283437',
            job: '工程部'
          },
          {
            latlng: [22.64490776538838, 113.79432678222656],
            name: '朱志文',
            org: '数字公司',
            phone: '18843568975',
            job: '开发人员'
          },
          {
            latlng: [22.64617518180373, 113.81741523742676],
            name: '宋艳超',
            org: '数字公司',
            phone: '18841564975',
            job: '开发人员'
          },
          {
            latlng: [22.62724193180938, 113.82762908935547],
            name: '杨阳',
            org: '数字公司',
            phone: '18843556275',
            job: '开发人员'
          },
          {
            latlng: [22.62304299161176, 113.80660057067871],
            name: '宝安',
            org: '数字公司',
            phone: '18843515896',
            job: '开发人员'
          }
      ],
      secure: [
          {
            latlng: [22.62676658652664, 113.81539821624756],
            id: 11,
            content: '基坑上下行人通道梯笼一踏步未安装到位，存在安全隐患',
            level: 'Ⅲ级',
            state: '未整改',
            method: '要求对上下行人通道梯笼重新安装，经监理验收合格后，方可使用',
            org: '工程部'
          },
          {
            latlng: [22.63853089910064, 113.82174968719482],
            id: 12,
            content: 'L2K0+290-L2K0+277段第三层土方开挖挂网喷锚不及时，存在安全隐患',
            level: 'Ⅲ级',
            state: '未整改',
            method: '要求暂停该断里程的土方开挖，待已开挖段处理完，验收合格后，再进行土方开挖。',
            org: '工程部'
          }
      ],
      camera: [
        {
          latlng: [22.613297787219015, 113.82402420043945],
          id: 16,
          type: 'K3562',
          location: '南正门',
          href: 'http://720yun.com/t/16fjzOmksu8?from=singlemessage&isappinstalled=0&pano_id=6700576'
        },
        {
          latlng: [22.63674849223704, 113.80213737487793],
          id: 14,
          type: 'K3562',
          location: '北偏门',
          href: 'http://720yun.com/t/16fjzOmksu8?from=singlemessage&isappinstalled=0&pano_id=6700576'
        },
        {
          latlng: [22.634847232762453, 113.82925987243652],
          id: 15,
          type: 'K3558',
          location: '东二楼',
          href: 'http://720yun.com/t/16fjzOmksu8?from=singlemessage&isappinstalled=0&pano_id=6700576'
        }
      ],
      area: [
        // {
        //   polyLagLng: [
        //      [22.615199344740617, 113.80737304687499],
        //      [22.616070883152187, 113.80943298339844],
        //      [22.617576254673043, 113.80866050720213],
        //      [22.617893172893584, 113.80986213684082],
        //      [22.61662549562953, 113.81072044372559],
        //      [22.61718010587036, 113.8117504119873],
        //      [22.616070883152187, 113.81243705749512],
        //      [22.617100875972888, 113.8139820098877],
        //      [22.619160838472396, 113.81278038024902],
        //      [22.62122077011424, 113.81775856018066],
        //      [22.619398524467492, 113.8172435760498],
        //      [22.611396203409836, 113.82213592529295],
        //      [22.61306009068043, 113.82574081420897],
        //      [22.618764694234304, 113.82308006286621],
        //      [22.621299997638037, 113.83011817932129],
        //      [22.616783955926568, 113.83303642272949],
        //      [22.6174177952889, 113.83423805236816],
        //      [22.618764694234304, 113.83406639099121],
        //      [22.619794666879677, 113.83758544921874],
        //      [22.623676802123843, 113.83698463439941],
        //      [22.652195250035355, 113.81861686706543],
        //      [22.649502094242195, 113.81278038024902],
        //      [22.650214993563665, 113.81217956542969],
        //      [22.649898149877757, 113.81123542785645],
        //      [22.653383390208585, 113.80908966064453],
        //      [22.651561571071895, 113.80574226379395],
        //      [22.65013578271073, 113.8062572479248],
        //      [22.649502094242195, 113.80462646484375],
        //      [22.639917199562856, 113.80960464477539],
        //      [22.63666927361752, 113.80248069763184],
        //      [22.638412072695797, 113.80127906799316],
        //      [22.63817441957783, 113.80033493041992],
        //      [22.64744258652244, 113.79518508911131],
        //      [22.64966051663351, 113.79544258117676],
        //      [22.654729936640774, 113.7923526763916],
        //      [22.653858643398724, 113.78969192504883],
        //      [22.65544280881641, 113.78883361816406],
        //      [22.65488835299973, 113.7879753112793],
        //      [22.656314092003544, 113.78737449645996],
        //      [22.65536360097971, 113.78565788269042]
        //  ],
        //  text: '<div style="width: 100px; font-weight: bold; font-size: 18px;">施工中区域</div>',
        //  url: 'http://720yun.com/t/16fjzOmksu8?from=singlemessage&isappinstalled=0&pano_id=6700576'
        // },
        {
          polyLagLng: [
             [22.6495813054607, 113.80462646484375],
             [22.65037341513245, 113.8059139251709],
             [22.651799201025934, 113.80565643310547],
             [22.653383390208585, 113.80891799926758],
             [22.65045262584829, 113.81226539611815],
             [22.649818938842042, 113.8125228881836],
             [22.65195762076679, 113.818359375],
             [22.6455414750581, 113.8227367401123],
             [22.640313282839713, 113.80926132202148]
         ],
         color: 'blue',
         text: '<div style="width: 100px; font-weight: bold; font-size: 18px;">第一期区域</div>',
         url: 'http://720yun.com/t/16fjzOmksu8?from=singlemessage&isappinstalled=0&pano_id=6700576'
        }, {
          polyLagLng: [
             [22.640333086973577, 113.80923986434937],
             [22.618923152066476, 113.82265090942383],
             [22.621379225116186, 113.82977485656738],
             [22.623914480312582, 113.83621215820312],
             [22.645491966595465, 113.82277429103851]
         ],
         color: 'green',
         text: '<div style="width: 100px; font-weight: bold; font-size: 18px;">第二期区域</div>',
         url: 'http://720yun.com/t/16fjzOmksu8?from=singlemessage&isappinstalled=0&pano_id=6700576'
        }, {
          polyLagLng: [
             [22.6402340662757, 113.80917549133301],
             [22.636233570393713, 113.80226612091064],
             [22.627519215798554, 113.8063859939575],
             [22.631480354570073, 113.81449699401855]
         ],
         color: 'yellow',
         text: '<div style="width: 100px; font-weight: bold; font-size: 18px;">第三期区域</div>',
         url: 'http://720yun.com/t/16fjzOmksu8?from=singlemessage&isappinstalled=0&pano_id=6700576'
        }, {
          polyLagLng: [
            [22.63136152206798, 113.81455063819885],
            [22.62747960383435, 113.80642890930176],
            [22.617100875972888, 113.80951881408691],
            [22.619794666879677, 113.81612777709961],
            [22.61171313587015, 113.82205009460449],
            [22.61306009068043, 113.82608413696288]
          ],
          color: 'red',
          text: '<div style="width: 100px; font-weight: bold; font-size: 18px;">第四期区域</div>',
          url: 'http://720yun.com/t/16fjzOmksu8?from=singlemessage&isappinstalled=0&pano_id=6700576'
        }
      ]
   };


   var personGroup = initPerson(data);
   var personGroupTemp = personGroup.slice(0);
   var persons = L.layerGroup(personGroup).addTo(map);

   var secureGroup = initSecure(data);
   var secureGroupTemp = secureGroup.slice(0);
   var secures = L.layerGroup(secureGroup).addTo(map);

   var cameraGroup = initCamera(data);
   var cameraGroupTemp = cameraGroup.slice(0);
   var cameras = L.layerGroup(cameraGroup).addTo(map);

   var areaGroup = initArea(data);
   var areaGroupTemp = areaGroup.slice(0);
   var areas = L.layerGroup(areaGroup).addTo(map);

})();
