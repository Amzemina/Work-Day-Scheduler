//saves text and the hour in local storage
$(document).ready(function () {
  $(".saveBtn").click(function () {
    var eventText = $(this).siblings('textarea').val();
    var eventTime = $(this).parent().attr("id");

    localStorage.setItem(eventTime, eventText);
  });
  getEventInfo()
//calls color function every min
  hourColor()
  displayDate()
  setInterval(function() {
    hourColor()
    displayDate()
  }, 60000);
});

//gets info from localstorage 
function getEventInfo() {
$('.time-block').each(function() {
  var textareaValue = localStorage.getItem($(this).attr('id'));

  var textarea = $(this).children('textarea');

  textarea.val(textareaValue);
})
}

//display todays day and date
var currentDayEl = $('#currentDay');

function displayDate() {
  var rightNow = dayjs().format('dddd, MMMM DD, YYYY');
  currentDayEl.text(rightNow);
  }

//color time function
function hourColor() {
  var currentHour = dayjs().hour();
  $('.time-block').each(function() {
    var blockHour = parseInt($(this).attr('id').replace("hour-", "")); 

    if (blockHour < currentHour) {
    $(this).addClass('past');
    } else if (blockHour === currentHour) {
      $(this).addClass('present');
    } else {
      $(this).addClass('future');
    }
  });
}