function Person(name) {
    this.name = name;
    this.age = 20;
}

function Student(name) {
    // 继承Person的属性
    Person.call(this, name);
    this.grade = 'Senior';
}

function Worker(name) {
    // 继承Person的属性
    Person.call(this, name);
    this.job = 'Architect';
}
//Student.prototype = new Person();
//Student.prototype.constructor = Student;

/**
 * 继承方法，实现子类与父类的继承关系
 * @param  {function} SuperType 父类的构造函数
 * @param  {functino} SubType   子类的构造函数
 * @return {}
 */
function inherit(superType, subType) {
    subType.prototype = new superType();
    subType.prototype.constructor = subType;
}

    // 建立继承关系
inherit(Person, Student);
inherit(Person, Worker);


/**
 * 多态方法，绑定相同方法名的方法到不同的类上
 * @param  {String} funName [通用的方法名]
 * @param  {Object} {claName, fun} [一个对象，claName为类名,fun为方法体]
 * ......  此处可以追加多个上述参数对象
 * @return {[type]}         [description]
 */
function diffState (funName) {
    for (var i = 1; i < arguments.length; i++) {
        arguments[i].claName.prototype[funName] = arguments[i].fun;
    }
}

    // 往需要表现多态的多个对象原型中添加相同方法名但实现不同的方法
diffState('sayName',
{
    claName : Person,
    fun : function () {
    console.log('I am a person, my name is ' + this.name + '.');
    }
},
{
    claName : Student,
    fun : function () {
    console.log('I am a student, my name is ' + this.name +
                ', my grade is ' + this.grade + '.');
    }
},
{
    claName : Worker,
    fun : function () {
    console.log('I am a worker, my name is ' + this.name +
                ', my job is ' + this.job + '.');
    }
}
);

/*
Person.prototype.sayName = function () {
    console.log('I am a person, my name is ' + this.name + '.');
};
Student.prototype.sayName = function () {
    console.log('I am a student, my name is ' + this.name +
                ', My grade is ' + this.grade + '.');
};
Worker.prototype.sayName = function () {
    console.log('I am a worker, my name is ' + this.name +
                ', My job is ' + this.job + '.');
};*/

/**
 * 通用方法
 * @param  {people} people 一个原型为Person的对象
 * @return {[type]}        [description]
 */
function sayHello(people) {
    people.sayName();
}

    // 此处为测试数据
var people1 = new Person('Nicolas');
var people2 = new Student('Tom');
var people3 = new Worker('John');
console.log(people3);
sayHello(people1);
sayHello(people2);
sayHello(people3);
