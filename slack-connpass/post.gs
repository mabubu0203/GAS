function post(text) {
  // *Slack Webhook URL*
  var url = '{url}';// SlackのWebhook URLを入力する
  var params = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({ text: text }),
  };
  UrlFetchApp.fetch(url, params);
}