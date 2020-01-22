let urlJson = 'https://api.myjson.com/bins/t8ucu';


function ajax_get(url, callback) {

	var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

			//console.log('responseText:' + xmlhttp.responseText);

            try {

				var data = JSON.parse(xmlhttp.responseText);

            } catch(err) {

                console.log(err.message + " in " + xmlhttp.responseText);
                return;
			}

            callback(data);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

ajax_get( urlJson, function(data) {

	const titleHtml = document.querySelector('#title');
	const textHtml = document.querySelector('#text')

	const menu = data.map(({ title,	groups	}) => {

		const groupTitle =  `<div class='title-list'><h4>${title}</h4></div>`;

		const newGroups = groups.map( (list) => {

			const subTitles = list.map(({title: desc, url} ) => {

				const listTitle = `<p><a href="${url}" class='link'>${desc}</a></p>`;

				return listTitle;
			})

			return `<div class='sub'>${subTitles.join('')}</div>` ;

		 })


		return `<div class='tabs-li'>${groupTitle}</div><div class='newGroup'>${newGroups.join('')}</div></div>` ;

	}).join('');

	titleHtml.innerHTML = menu;

	$('.tabs-li').wrapAll('<div class="column"></div>');
	$('.newGroup').wrapAll('<div class="absolute"></div>');

	let tabs = document.querySelectorAll('.title-list');
	let newGroup = document.querySelectorAll('.newGroup');

	tabs.forEach( (element, index) => {

		element.addEventListener('mouseover', function () {

			tabs.forEach( (element, i) => {

				newGroup[i].classList.remove('newGroup-active');
			});

			newGroup[index].classList.add('newGroup-active');
		})
	})

});
