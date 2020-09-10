// 引入mongoose模块
const mongoose = require('mongoose');
// 创建任务集合规则
const taskSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true //设置required: true 规定创建文档(document)时name 必须设置。
	},
	completed: {
		type: Boolean,
		default: false //  completed  会被映射为 Boolean 的 Schema 类型，如没设置默认为 default 的值。
	}
}, { versionKey: false });//不显示默认字段"__v"
// 创建todo集合
const Task = mongoose.model('task', taskSchema);
// 将集合构造函数作为模块成员进行导出
module.exports = Task;