$(function(){
	ymaps.ready(initMap);
});
/**
* Функция инициализации карты
*/
function initMap()
{
  //инициализируем карту как обычно
  map = new ymaps.Map ("map", {
            center: [59.9, 30.5],
            zoom: 8
        });
  //Навешиваем на карту инструменты
  map.controls.add('zoomControl');
  map.controls.add('typeSelector');
  map.behaviors.enable('scrollZoom');

  //Навешиваем обработчик щелчка, чтобы по клику выводил нам регион
  map.events.add('click', clickOnMap);

  //Пустой массив для регионов 
  window.regions=[]; 
  
  //Запрашиваем с сервера регионы России 
  var regionsResult = ymaps.geoQuery(ymaps.regions.load('Ru'));

  //При получении ответа:
  regionsResult.then(function(){
    //Пройдёмся по коллекции гео-объектов
    regionsResult.each(function(obj){
	//Созраняем геометрию объекта в переменную
        var geom = obj.geometry;
        //привяжем геометрию к карте, без этого она не сможет выполнять свои функции
        geom.options.setParent(map.options);
	geom.setMap(map);
	//Добавляем в массив элемент содержащий в себе геометрию, а также название и osmID региона
	regions.push( { geom:geom,
			id:obj.properties.get('osmId'),
			name:obj.properties.get('name') });
	});
  });
};

/**
* Функция определяющая регион по координатам
*/
function getRegionByCoords(coordinates)
{
  //проверим в каком регионе лежит данная точка
  var regionId=0;
  var regionName="Неизвестный";
  for(i in regions)
  {
    if (regions[i].geom.contains(coordinates))
    {
      var regionId = regions[i].id;
      var regionName = regions[i].name;
      break;
    }
  }
  //alert("Region:" + regionName + ":" + regionId);
  return {id:regionId, name:regionName};
}

/**
* Обработчик щелчка
*/
function clickOnMap(event)
{
  var position = event.get('coordPosition');
  var region = getRegionByCoords(position);
  alert('Вы кликнули на регионе:' + region.name + ", его osmId=" + region.id);
}







 





 



 


 
