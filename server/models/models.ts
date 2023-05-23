import {DataTypes} from "sequelize";
const sequelize = require('../db')

const School = sequelize.define('school',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    name:{type:DataTypes.STRING,allowNull:false}
})

const Class = sequelize.define('class',{
    id:{type:DataTypes.INTEGER,primaryKey:true, autoIncrement:true},
    word_class:{type:DataTypes.STRING}
})
const User = sequelize.define('user',{
    id:{type:DataTypes.INTEGER,primaryKey: true, autoIncrement: true},
    first_name:{type:DataTypes.STRING},
    last_name:{type:DataTypes.STRING},
    email:{type:DataTypes.STRING,unique:true},
    password:{type:DataTypes.STRING,allowNull:false},
    role:{type:DataTypes.STRING,allowNull:false}
})
const Block_tasks = sequelize.define('block_tasks',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    name:{type:DataTypes.STRING,allowNull:false},
})
const Task = sequelize.define('task',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    name:{type:DataTypes.STRING,allowNull:false}
})
const Answer = sequelize.define('answer',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    points:{type:DataTypes.INTEGER},
    answer:{type:DataTypes.STRING},
    comment:{type:DataTypes.STRING(192)}
})
const Block_Answer = sequelize.define('block_answer',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    points:{type:DataTypes.INTEGER}
})

const School_Lesson = sequelize.define('school_lesson',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    name:{type:DataTypes.STRING,allowNull:false}
})

School.hasMany(Class)
Class.belongsTo(School)

School_Lesson.hasMany(Block_tasks)
Block_tasks.belongsTo(School_Lesson)

School.hasMany(User)
User.belongsTo(School)

Class.hasMany(User)
User.belongsTo(Class)

Class.hasMany(Block_tasks)
Block_tasks.belongsTo(Class)

Block_tasks.hasMany(Task)
Task.belongsTo(Block_tasks)

User.hasMany(Block_Answer)
Block_Answer.belongsTo(User)

Task.hasOne(Answer)
Answer.belongsTo(Task)

Block_Answer.hasMany(Answer)
Answer.belongsTo(Block_Answer)

Block_tasks.hasMany(Block_Answer)
Block_Answer.belongsTo(Block_tasks)

module.exports = {
    School,
    Class,
    User,
    Block_tasks,
    Task,
    School_Lesson,
    Block_Answer,
    Answer
}