function main() {
  const connpassApiUrl = "https://connpass.com/api/v1/";
  const keyword_or = ["java", "php"];
  const order = 2;
  const count = 100;

  var date = new Date();
  var ymd = [];
  for (let i = 0; i <= 7; i++) {
    date.setDate(date.getDate() + 1);
    ymd.push(Utilities.formatDate(date, "Asia/Tokyo", "yyyyMMdd"));
  }

  var eventApiUrl = connpassApiUrl + "event/?keyword_or=" + keyword_or + "&ymd=" + ymd + "&order=" + order + "&count=" + count;
  // https://connpass.com/about/api/
  var apiResponse = UrlFetchApp.fetch(eventApiUrl);
  var responseField = JSON.parse(apiResponse.getContentText());

  var headerText = "<" + eventApiUrl + "|実行URL> 総件数: " + responseField.results_returned + "\n";
  var eventStr = responseField.events
    .map(event => ({
      time: Utilities.formatDate(new Date(event.started_at), "Asia/Tokyo", "MM/dd HH:mm"),
      str: "<" + event.event_url + "|" + event.title + ">",
      count: event.accepted + "/" + event.limit,// limitがnullの場合がある
    }))
    .map(s => "> " + s.time + " " + s.str + " " + s.count + "\n")
    .reverse()
    .reduce((acc, cur) => acc + cur);

  // send message text
  var strBody = headerText + eventStr;

  // Slackに投稿
  post(strBody);
}