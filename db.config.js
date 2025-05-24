var Sequelize = require("sequelize");
var dbName = 'garden_guardian'; //database name
var dbUser = 'root';
var dbPassword = 'mohammad';

var sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
});

var db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/* MODELS */
//admin
db.admin=require('./models/admin')(sequelize,Sequelize);
//category
db.category=require('./models/category')(sequelize,Sequelize);
//plant
db.plant=require('./models/plant')(sequelize,Sequelize);
db.category.hasMany(db.plant,{foreignKey:'categoryId'});
db.plant.belongsTo(db.category);

//care_instructions
db.care_instruction=require('./models/care_instruction')(sequelize,Sequelize);
db.plant.hasMany(db.care_instruction,{foreignKey:'plantId'});
db.care_instruction.belongsTo(db.plant);

//problems
db.problem=require('./models/problem')(sequelize,Sequelize);
db.plant.hasMany(db.problem,{foreignKey:'plantId'});
db.problem.belongsTo(db.plant);




//user
db.user=require('./models/user')(sequelize,Sequelize);

//seed
db.seed=require('./models/seed')(sequelize,Sequelize);
db.plant.hasMany(db.seed,{foreignKey:'plantId'});
db.seed.belongsTo(db.plant);

//cart
db.cart=require('./models/cart')(sequelize,Sequelize);
db.user.hasMany(db.cart,{foreignKey:'userId'});
db.cart.belongsTo(db.user);
db.plant.hasMany(db.cart,{foreignKey:'plantId'});
db.cart.belongsTo(db.plant);


//order table
db.order=require('./models/order')(sequelize,Sequelize);
db.user.hasMany(db.order, {foreignKey: 'userId'});
db.order.belongsTo(db.user);

//order details
db.order_details=require('./models/order_details')(sequelize,Sequelize);
db.order.hasMany(db.order_details, {foreignKey: 'orderId'});
db.order_details.belongsTo(db.order);
db.plant.hasMany(db.order_details, {foreignKey: 'plantId'});
db.order_details.belongsTo(db.plant);

module.exports = db;