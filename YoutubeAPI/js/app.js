var apiKey = "AIzaSyAe1AZIJt4jBHfIXax24gRnHkMjbtDNTcs";
//var apiKey=  "AIzaSyDhZSYN5EwyGGca3gowKcuTVtbRkRG4jNE";
//var apiKey = "AIzaSyAvfQsfzyQxamlQGV8FMoCVNDDBvN21ytI";
//var apiKey ="AIzaSyD_m3dXgu6v3shueP5hhJ96goFfK_IBLMw"
//  var apiKey = "AIzaSyDl47TLwMV9xNBcGnJ80v4Q_HRvXYhawQk";
//var apiKey = "AIzaSyBVSUFitg7i2VqxZOy9L5 - IVeYR9CCK2Kg"
//var apiKey = "AIzaSyAn-8pHlSteiYY3WlIbau9DZTLQMVV34dI";
var arrQueue = [];
var isPlay = false;
var player;
var countStateUnstarted = 0;
var doubleNext = false;

$(document).ready(function () {

    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
        part: 'snippet,id',
        maxResults: 10,
        type: 'video',
        key: apiKey
    },
        function (data) {
            // clear list search
            $('#result-search').html("");

            // console.log("test: " + JSON.stringify(data));

            var content = "";
            if (data.items.length > 0) {
                addVideoToPlay(data.items[0].id.videoId, false);
            }

            for (var i = 0; i < data.items.length; i++) {
                if (data.items.length > 0) {
                    //   ADDVideo(data.items[i]);

                    var videoID = data.items[i].id.videoId;
                    var url = "https://www.googleapis.com/youtube/v3/videos?id=" + videoID + "&key=" + apiKey + "&part=snippet,statistics,contentDetails";
                    //  var url = "https://www.googleapis.com/youtube/v3/videos?id=l82mnKawq8Y&key=AIzaSyD6AqcuoREP5DnIdd6_Bv_LgfgFuEnwLYI&part=snippet,statistics,contentDetails";
                    $.ajax({
                        async: false,
                        type: 'GET',
                        url: url,
                        success: function (data) {
                            if (data.items.length > 0) {

                                content = content + getResults(data.items[0], videoID);
                            }
                        }
                    });


                }

            }
            $('#load').hide();
            // show list video search
            $('#result-search').append(content);


        });

})

function init() {
    gapi.client.setApiKey(apiKey);
    gapi.client.load("youtube", "v3", function () {
        console.log('Youtube API already');
    });
}

// event enter input tag
$('#keyword').keypress(function (e) {
    if (e.which == 13) {
        search($("#keyword").val());
        // $("#keyword").val("");
    }
});

$('#btntimkiem').click(function () {
    var keyword = $('#keyword').val();
    if (keyword != null) {
        search(keyword);
    }
})
function search(keyword) {
    $("#frm-search").submit(function (event) {
        event.preventDefault();
        $('#load').show();
        $.get(
            "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet,id',
            q: keyword,
            maxResults: 10,
            type: 'video',
            key: apiKey
        },
            function (data) {
                // clear list search
                $('#result-search').html("");

                // console.log("test: " + JSON.stringify(data));
                var content = "";
                if (data.items.length > 0) {
                    addVideoToPlay(data.items[0].id.videoId, false);
                }

                for (var i = 0; i < data.items.length; i++) {
                    if (data.items.length > 0) {
                        //   ADDVideo(data.items[i]);
                        var videoID = data.items[i].id.videoId;
                        var url = "https://www.googleapis.com/youtube/v3/videos?id=" + videoID + "&key=" + apiKey + "&part=snippet,statistics,contentDetails";

                        $.ajax({
                            async: false,
                            type: 'GET',
                            url: url,
                            success: function (data) {
                                if (data.items.length > 0) {
                                    content = content + getResults(data.items[0], videoID);
                                }
                            }
                        });


                    }

                }
                $('#load').hide();
                // show list video search
                $('#result-search').append(content);

            });
    });
}


// return item search
function getResults(item, videoID) {
    // get properties of item
    var title = item.snippet.title;
    var kenh = item.snippet.channelId;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var view = item.statistics.viewCount;


    var output =
        "<div class='row' onclick='phat(id)'id= '" + videoID + "'>" +
        "<div class='item-video'>" +
        "<img class='thumb' src='" + thumb + "'>" +

        "<h6 >" + title + "</h6>" +
        "<a href='https://www.youtube.com/channel/" + kenh + "' class='channelTitle'>" + channelTitle + "</a> </br>" +
        "<span>" + view + " Lượt Xem </span>" +

        "</div>" +
        "</div>"
        ;


    // call when click play button



    return output;

}
function phat(ID) {

    addVideoToPlay(ID, true);
    var scrollTrigger = 100, // px
        backToTop = function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {
                $('#back-to-top').addClass('show');
            } else {
                $('#back-to-top').removeClass('show');
            }
        };
    // backToTop();
    $(window).on('scroll', function () {
        backToTop();
    });


    $('html,body').animate({
        scrollTop: 0
    }, 10);

}
function addVideoToPlay(videoID, check) {
    play(videoID);
    var url = "https://www.googleapis.com/youtube/v3/videos?id=" + videoID + "&key=" + apiKey + "&part=snippet,statistics,contentDetails";

    $.ajax({
        async: false,
        type: 'GET',
        url: url,
        success: function (data) {
            if (data.items.length > 0) {
                $("#mota").html("");
                $("#title").text("");
                $("#thongtin").text("");
                $("#link").text("")
                var title = data.items[0].snippet.title;
                var modta = data.items[0].snippet.description
                var kenh = data.items[0].snippet.channelId;
                var view = data.items[0].statistics.viewCount;
                var ngay = data.items[0].snippet.publishedAt;
                var view = data.items[0].statistics.viewCount;
                var likeCount = data.items[0].statistics.likeCount;
                var dislikeCount = data.items[0].statistics.dislikeCount;
                var favoriteCount = data.items[0].statistics.favoriteCount;
                var commentCount = data.items[0].statistics.commentCount;
                $("#title").text(title);
                //for (var i = 0; i < modta.length; i++) {
                //    alert(modta[i]);
                //}
                var channelTitle = data.items[0].snippet.channelTitle;
                $('#thongtin').append(view + " Lượt xem   Đã công chiếu ngày " + ngay + "  Lượt Like " + likeCount + " Dislike " + dislikeCount + " Yêu thích " + favoriteCount);
                $('#link').append("<a href='https://www.youtube.com/channel/" + kenh + "'class='channelTitle'>" + channelTitle + "</a>")
                var conten = "";
                var link;
                var mota = "";
                for (var i = 0; i < modta.length; i++) {

                    if (modta[i] == "#") {
                        link = "";
                        link = "<a href='https://www.youtube.com/hashtag/";
                        var ten = "";
                        for (var J = i + 1; J < modta.length; J++) {
                            //  alert(modta[J]);

                            if (modta[J] == " ") {
                                i++;
                                break;
                            }
                            else {
                                ten += modta[J];
                                link += modta[J];
                                i++;
                            }
                        }
                        link = link + "'>#" + ten + "</a>";

                        mota += link + "  ";

                    }
                    if (modta[i] == "/" && modta[i + 1] == "/") {
                        link = "";
                        link = "<a href='https://";
                        var ten = "https://";
                        for (var J = i + 2; J < modta.length; J++) {
                            //  alert(modta[J]);

                            if (modta[J] == " ") {
                                break;
                            }
                            else {
                                ten += modta[J];
                                link += modta[J];
                                i++;
                            }
                        }
                        link = link + "'>" + ten + "</a>";

                        mota += link + "  ";
                    }
                    else {

                        mota += modta[i];
                    }
                }

                $("#mota").append(mota);
                if (check == true) {

                    $.get(
                        "https://www.googleapis.com/youtube/v3/search", {
                        part: 'snippet,id',
                        q: title,
                        maxResults: 10,
                        type: 'video',
                        key: apiKey
                    },
                        function (data) {
                            // clear list search
                            $('#result-search').html("");

                            // console.log("test: " + JSON.stringify(data));
                            var content = "";
                            for (var i = 0; i < data.items.length; i++) {
                                if (data.items.length > 0) {
                                    //   ADDVideo(data.items[i]);

                                    var videoID = data.items[i].id.videoId;
                                    var url = "https://www.googleapis.com/youtube/v3/videos?id=" + videoID + "&key=" + apiKey + "&part=snippet,statistics,contentDetails";

                                    $.ajax({
                                        async: false,
                                        type: 'GET',
                                        url: url,
                                        success: function (data) {
                                            if (data.items.length > 0) {

                                                content = content + getResults(data.items[0], videoID);
                                            }
                                        }
                                    });


                                }

                            }

                            // show list video search
                            $('#result-search').append(content);


                        });
                }


            }
        }
    });

}


function addVideoToLocalStorage(videoID) {
    var value = localStorage.getItem("LOCAL");
    var queue = JSON.parse(value);
    queue.push(videoID);
    localStorage.setItem("LOCAL", JSON.stringify(queue));
}

// play video width video id
function play(videoID) {
    // console.log(videoID);

    if (player != null) {
        player.loadVideoById({
            'videoId': videoID,
            'startSeconds': 0,
            'suggestedQuality': 'large'
        });

    } else {

        player = new YT.Player('video', {
            height: '600',
            width: '980',
            videoId: videoID,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });

    }
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    // console.log(event.data);
    if (event.data == YT.PlayerState.ENDED) {
        nextVideo();
    }
}

function stopVideo() {
    player.stopVideo();
}

function nextVideo() {
    // load list id video from local storage and convert json to array
    var value = localStorage.getItem("LOCAL");
    var queue = JSON.parse(value);


    // get id video at first queue and remove it from queue
    var videoID = queue.shift();

    // save queue back to local storage
    localStorage.setItem("LOCAL", JSON.stringify(queue));

    play(videoID);


}

// remove videoID from queue at index


function convert_time(duration) {
    var a = duration.match(/\d+/g);

    if (duration.indexOf('M') >= 0 && duration.indexOf('H') == -1 && duration.indexOf('S') == -1) {
        a = [0, a[0], 0];
    }
    if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1) {
        a = [a[0], 0, a[1]];
    }
    if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1 && duration.indexOf('S') == -1) {
        a = [a[0], 0, 0];
    }

    duration = 0;

    if (a.length == 3) {
        duration = duration + parseInt(a[0]) * 3600;
        duration = duration + parseInt(a[1]) * 60;
        duration = duration + parseInt(a[2]);
    }
    if (a.length == 2) {
        duration = duration + parseInt(a[0]) * 60;
        duration = duration + parseInt(a[1]);
    }
    if (a.length == 1) {
        duration = duration + parseInt(a[0]);
    }
    var h = Math.floor(duration / 3600);
    var m = Math.floor(duration % 3600 / 60);
    var s = Math.floor(duration % 3600 % 60);
    return [h, m, s];
}

function convertT(x) {
    var h = x[0];
    var m = x[1];
    var s = x[2];
    return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
}
