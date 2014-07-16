module.exports = {
	//START: Mongoose
  mongoose: {
    uri: 'mongodb://localhost/test',
    options: {
      db: {
      	native_parser: true
      },
      server: {
      	poolSize: 25, 
      	socketOptions: {
      		keepAlive: 1
      	}
      },
      safe: { 
      	j: 1, 
      	w: 2, 
      	wtimeout: 10000 
      }
      //replset: {rs_name: 'myReplicaSetName', socketOptions: {keepAlive: 1}},
      //user: '',
      //pass: ''
    }
  }//END: Mongoose
}
