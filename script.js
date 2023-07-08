//saves text and the hour in local storage
$(document).ready(function () {
  $(".saveBtn").click(function () {
    var eventText = $(this).siblings('textarea').val();
    var eventTime = $(this).parent().attr("id");
    
    localStorage.setItem(eventTime, eventText);
    //disabled save button when nothing is input, or is already input
    $(this).prop("disabled", true);
  });

  //when text is input, save button is enabled
  $("textarea").on('input', function () {
    $(this).siblings('.saveBtn').prop("disabled", false);
  })

  //populates schedule, colors, and date
  getEventInfo()
  hourColor()
  displayDate()
  //recolor and date every sec
  setInterval(function () {
    hourColor()
    displayDate()
  }, 1000);
});

//gets info from localstorage 
function getEventInfo() {
  $('.time-block').each(function () {
    var textareaValue = localStorage.getItem($(this).attr('id'));

    var textarea = $(this).children('textarea');

    textarea.val(textareaValue);
  })
}

//display todays day and date
function displayDate() {
  var currentDayEl = $('#currentDay');
  var rightNow = dayjs().format('dddd, MMMM DD, YYYY');
  currentDayEl.text(rightNow);
}

//color time function
function hourColor() {
  var currentHour = dayjs().hour();
  $('.time-block').each(function () {
    var blockHour = parseInt($(this).attr('id').replace("hour-", ""));

    if (blockHour < currentHour) {
      $(this).addClass('past');
      $(this).removeClass('present');
      $(this).removeClass('future');
    } else if (blockHour === currentHour) {
      $(this).addClass('present');
      $(this).removeClass('past');
      $(this).removeClass('future');
    } else {
      $(this).addClass('future');
      $(this).removeClass('past');
      $(this).removeClass('present');
    }
  });
}