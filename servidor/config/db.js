const mongoose = require('mongoose');

 const URI='mongodb://localhost/merntask';
 mongoose.set('useCreateIndex', true);

 mongoose.connect(URI,{
                 useNewUrlParser: true,
            useUnifiedTopology: true,
             useFindAndModify: false
 })

 const conecttion= mongoose.connection;
 conecttion.once('open',()=>{
     console.log('DB is conectada');
 });

//  const conectarDB = async () => {
//      try {
//          await mongoose.connect(process.env.DB_MONGO, {
//              useNewUrlParser: true,
//              useUnifiedTopology: true,
//              useFindAndModify: false
//          });
//          console.log('DB Conectada');
//      } catch (error) {
//          console.log('hubo un error')
//          console.log(error);
//          process.exit(1); // Detener la app
//      }
//  };
//  module.exports = conectarDB;