//sw.js
self.addEventListener('push', event => {
  const data = event.data.json();
  console.log(JSON.stringify(data));
  self.registration.showNotification(data.title, {
		body: data.msg,
		sender: data.username
  });
});