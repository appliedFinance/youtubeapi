// Learning to use YouTube's API

function say(s) { console.log(s); }


// Get it:  getDataFromAPI( searchTerm, callback )
//
// $.ajax()
//
// www.googleapis.com/youtube/v3/search?q=surfing&maxResults=25&part=snippet&key={YOUR_API_KEY}
//
const YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/search";

function getDataFromAPI( searchTerm, callback ) {
	// build the parameters object
	const s = {
		'q': searchTerm,
		'part': "snippet",
		'maxResults': 25,
		'key': "AIzaSyCjpmqpOwcOf--_qJ4Ks08ZEc-PosxUxTg"
	};
	say(s);
	const settings = {
		'url': YOUTUBE_URL,
		'data': s,
		'dataType': 'json',
		'type': 'GET',
		'success': callback
	};
	$.ajax(settings);
	//$.getJSON( URL, query, callback );
}

function renderResultsList(item,index) {
	const thumbnail = item.snippet.thumbnails.default.url;
	const videoUrl = "http://www.youtube.com";
	return `<div class="result-box">
<p>INDEX= ${index}</p>
<p class="description-box">DESCRIPTION= ${item.snippet.description}</p>
<a class="thumbnail" href="${videoUrl}"><img src="${thumbnail}" alt=""/></a>
		</div>`;
}

//  displayResults();
function displayResults(data) {
	say(data.items);
	const resultsList = data.items.map( (item, index) => renderResultsList(item,index) );
	//$('.js-search-results').text( JSON.stringify(data) );
	$('.js-search-results').html(resultsList);
}



// event Listeners
//   .js-search
//   1.  build my "search json object"
//   2.  Get it.
//          getDataFromAPI(query, displayResults); 

function watchSubmit() {
	$('.js-search-form').submit( event => {
		event.preventDefault();
		let s = $(this).find('.js-query').val();
		getDataFromAPI(s, displayResults);	
	});

}

$(watchSubmit);


