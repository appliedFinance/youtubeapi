// Learning to use YouTube's API

// To Do:
//   Make thumbnails tab-able
//	  Add Prev-Next buttons
//

const YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/search";

function say(s) { console.log(s); }

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
					<td><a href="#" class="thumbnail" data-num="${index}" data-vid="${item.id.videoId}"><img src="${thumbnail}" alt="Watch ${vidTitle}"/></a>
					</div></td><td class="title">"${vidTitle}"</a></td>
				</tr>
				<td class="center">${year}</td><td><p class="description">${description}</p></td>
			</table>
			<label id="channel-${index}">View Channel: </label> <a aria-labeled-by="channel-${index}" href="${channelUrl}">${channelTitle}</a>
		</div>
		`;

	return s;
	//INDEX= ${index}
}


//  displayResults();
function displayResults(data) {
	say(data);
	//say(data.items);
	const resultsList = data.items.map( (item, index) => renderResultsList(item,index) );
	//$('.js-search-results').text( JSON.stringify(data) );
	$('.js-search-results').html(resultsList);
}

function showLightbox(vid) {
		say("SHOW LIGHTBOX: " + vid);

		let s = "<p>Click to close</p><div class='video-box'><iframe width='560' height='315' src='https://www.youtube.com/embed/" + vid + "' frameborder='0' gesture='media' allow='encrypted-media' allowfullscreen></iframe></div>";
	$('#lightbox').html(s);
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
		const myVidId = $(event.currentTarget).attr('data-vid');
		say("myVidId = " + myVidId);
		showLightbox(myVidId);
	});

	$('#lightbox').on("click", event => {
		$(event.currentTarget).addClass('no-display');
		say("HIDE LIGHTBOX");
		$(event.currentTarget).html(""); // stop the player
	});
}

$(watchSubmit);


