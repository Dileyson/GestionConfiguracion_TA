const {app} = require('./app');

app.listen(app.get('port'));

console.log('listen on port: ', app.get('port'));