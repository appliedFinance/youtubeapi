// Learning to use YouTube's API

function say(s) { console.log(s); }


// Get it:  getDataFromAPI( searchTerm, callback )
//
// $.ajax()
//
// www.googleapis.com/youtube/v3/search?q=surfing&maxResults=25&part=snippet&key={YOUR_API_KEY}
//
const YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/search";
const videos = [];

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
	videos[index] = videoUrl;
	// Video Title
	const vidTitle = item.snippet.title; 
	// Description
	const description = item.snippet.description;
	// Channel Info
	const channelTitle = item.snippet.channelTitle;
	const channelID = item.snippet.channelId;
	const channelUrl = `https://www.youtube.com/channel/${channelID}`; 
	// Pub date
	const year = item.snippet.publishedAt.match(/^(\d+)\-/)[1];
	
	// build the result Html-String
	let s = `
		<div class="result-box">
			<table>
				<tr>
					<td><div class="thumbnail" data-num="${index}"><img src="${thumbnail}" alt="missing..."/>
					</div></td><td class="title">"${vidTitle}"</a></td>
				</tr>
				<td class="center">${year}</td><td><p class="description">${description}</p></td>
			</table>
			View Channel: <a href="${channelUrl}">${channelTitle}</a>
		</div>
		`;

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
	$('.js-search-form').on("submit", event => {
		event.preventDefault();
		let s = $(event.currentTarget).find('.js-query').val();
		// API Call
		getDataFromAPI(s, displayResults);	
		say("Searching for: " + s);
	});

	// Clear Button
	$('.js-search-form').on("click",".clear-button", event => {
		event.preventDefault();
		//$(event.currentTarget).find('.js-query').val("");
		say("Clear.");
	});

	// Light Box 
	$('.js-search-results').on("click", ".thumbnail", event => {
		$('#lightbox').removeClass('no-display');
		say("SHOW LIGHTBOX");
	});

	$('.js-search-results').on("click", ".lightbox", event => {
		$(event.currentTarget).addClass('no-display');
		say("HIDE LIGHTBOX");
	});
}

$(watchSubmit);


		//<iframe width="560" height="315" src="https://www.youtube.com/embed/0g9SlVdv1PY" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
		//	<video width="420" height="240" controls>
		//		<source src="${videoUrl}" type="video/mp4">
		//		Your browser does not support the video tag.
		//	</video>
