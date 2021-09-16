function main() {
  const openweatherApiUrl = "http://api.openweathermap.org/data/2.5/";
  const cityId = "{cityID}"; // 知りたい都市IDを入力する
  const apiKey = "{apiKey}"; // 取得したApiKeyを入力する
  const units = "metric";
  const lang = "ja";
  const millisecond = 1000;

  // https://openweathermap.org/forecast5#cityid5
  var futureResponse = UrlFetchApp.fetch(openweatherApiUrl + "forecast?id=" + cityId + "&appid=" + apiKey + "&units=" + units + "&lang=" + lang);
  var futureData = JSON.parse(futureResponse.getContentText());

  // send message text
  var strBody = "";

  if (futureData.cod == 200) {
    var date = new Date();

    var theme = "【" + futureData.city.name + "の天気】" + "\n"

    // today data
    var todayStr = futureData.list
      .filter(s => new Date(s.dt * millisecond).getDate() == date.getDate())
      .filter(s => new Date(s.dt * millisecond).getHours() % 3 == 0)
      .map(s => ({
        time: Utilities.formatDate(new Date(s.dt * millisecond), "Asia/Tokyo", "MM/dd HH") + "時",
        temp: String(Math.floor(s.main.temp)) + "℃",
        description: getEmoji(s.weather[0].main) + s.weather[0].description,
      }))
      .map(s => "> " + s.time + " " + s.temp + " " + s.description + "\n")
      .reduce((acc, cur) => acc + cur);

    // 1日加えて、翌日にする.
    date.setDate(date.getDate() + 1);

    // tomorrow data
    var tommorowStr = futureData.list
      .filter(s => new Date(s.dt * millisecond).getDate() == date.getDate())
      .filter(s => new Date(s.dt * millisecond).getHours() % 3 == 0)
      .map(s => ({
        time: Utilities.formatDate(new Date(s.dt * millisecond), "Asia/Tokyo", "MM/dd HH") + "時",
        temp: String(Math.floor(s.main.temp)) + "℃",
        description: getEmoji(s.weather[0].main) + s.weather[0].description,
      }))
      .map(s => "> " + s.time + " " + s.temp + " " + s.description + "\n")
      .reduce((acc, cur) => acc + cur);

    // 文字列を組み立てる
    strBody = theme + todayStr + tommorowStr;
  } else {
    strBody = "データを取得できません。ご確認ください。";
  }

  // Slackに投稿
  post(strBody);
}