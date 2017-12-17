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
		'maxResults': 30,
		'key': "AIzaSyCjpmqpOwcOf--_qJ4Ks08ZEc-PosxUxTg"
	};
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
	// Thumbnail
	const thumbnail = item.snippet.thumbnails.default.url;
	// Url to a video
	const videoUrl = `http://www.youtube.com/watch?v=${item.id.videoId}`;
	// Title
	const vidTitle = item.snippet.title; 
	// Description
	const description = item.snippet.description;
	// ChannelTitle
	const channelTitle = item.snippet.channelTitle;
	const channelID = item.snippet.channelId;
	const channelUrl = `https://www.youtube.com/channel/${channelID}`; 
	// Pub date
	const fullDate = item.snippet.publishedAt;
	let re = /^(\d+)\-/;
	let year = fullDate.match(re)[1];

	// build the result Html-String
	let s = `<div class="result-box">
					<table>
						<tr>
							<td><a class="thumbnail" href="${videoUrl}"><img src="${thumbnail}" alt=""/></a></td><td class="title">\"${vidTitle}\"</a></td>
						</tr>
						<td class="center">${year}</td><td><p class="description">${description}</p></td>

					</table>
					<p> </p>
					View Channel: <a href="${channelUrl}">${channelTitle}</a>
		</div>`;

	return s;
//	return `<div class="result-box">
//					<p>INDEX= ${index}</p>
//					<p class="description-box">DESCRIPTION= ${item.snippet.description}</p>
//					<a class="thumbnail" href="${videoUrl}"><img src="${thumbnail}" alt=""/></a>
//		</div>`;
}


//  displayResults();
function displayResults(data) {
	say(data);
	//say(data.items);
	const resultsList = data.items.map( (item, index) => renderResultsList(item,index) );
	//$('.js-search-results').text( JSON.stringify(data) );
	$('.js-search-results').html(resultsList);
}


// event Listeners
function watchSubmit() {
	// Search Button + Form Submit
	$('.js-search-form').on("click",".search-button", event => {
		event.preventDefault();
		let s = $(this).find('.js-query').val();
		// API Call
		getDataFromAPI(s, displayResults);	
	});

	// Clear Button
	$('.js-search-form').on("click",".clear-button", event => {
		event.preventDefault();
		$(this).find('.js-query').val("");
	});

}

$(watchSubmit);


