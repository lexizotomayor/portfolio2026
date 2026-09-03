// Keeps "N minutes/hours/days ago" labels current after the page has loaded.
// The server renders a correct value at build time, but a static site can't
// update it after that — this mirrors the same bucket logic from the
// "timeAgo" Nunjucks filter in .eleventy.js and re-renders it in the browser.
(function () {
  function timeAgo(date) {
    var seconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));
    if (seconds < 60) return seconds === 1 ? "1 second ago" : seconds + " seconds ago";
    var minutes = Math.floor(seconds / 60);
    if (minutes < 60) return minutes === 1 ? "1 minute ago" : minutes + " minutes ago";
    var hours = Math.floor(minutes / 60);
    if (hours < 24) return hours === 1 ? "1 hour ago" : hours + " hours ago";
    var days = Math.floor(hours / 24);
    if (days < 7) return days === 1 ? "1 day ago" : days + " days ago";
    var weeks = Math.floor(days / 7);
    if (weeks < 5) return weeks === 1 ? "1 week ago" : weeks + " weeks ago";
    var months = Math.round(days / 30);
    if (months < 12) return months === 1 ? "1 month ago" : months + " months ago";
    var years = Math.round(days / 365);
    return years === 1 ? "1 year ago" : years + " years ago";
  }

  function tick() {
    var nodes = document.querySelectorAll(".postitem__when time, .article__ago");
    for (var i = 0; i < nodes.length; i++) {
      var iso = nodes[i].getAttribute("datetime");
      if (!iso) continue;
      var date = new Date(iso);
      if (isNaN(date.getTime())) continue;
      nodes[i].textContent = timeAgo(date);
    }
  }

  tick();
  setInterval(tick, 30000);
})();
