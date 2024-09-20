var express = require('express');

var router = express.Router();
const {connect} = require("mongoose");
const mongoose = require("mongoose");
// URL kết nối MongoDB, thay thế <username>, <password>, <cluster-url>, <dbname> với thông tin cụ thể của bạn
const mongoURI = 'mongodb+srv://huynh2:Hiu5YNq4W95YPKtd@cluster0.omclo.mongodb.net/?retryWrites=true&w=majority';
// Kết nối MongoDB
connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Kết nối MongoDB thành công');
    })
    .catch((err) => {
        console.error('Kết nối MongoDB thất bại:', err);
    });

/* GET home page. */
router.get('/', function (req, res, next) {
    // viet cac câu lệnh truy cấn tại đây !!!!!!
    User.find({}).then((users) => {
        res.render('index', {title: 'Express', name: "ABC", users: users});
    })
});


router.get('/category', function (req
    , res) {
    console.log("CATEGORY")
    res.render('category', {title: 'Category'});
})

router.get('/news', function (req
    , res) {
    console.log("news")
    res.render('news', {title: 'Category'});
})

router.get('/about', function (req
    , res) {
    console.log("about")
    res.render('about', {title: 'Category'});
})

router.get('/sighUpForm', function (req
    , res) {
    res.render('signupform', {title: 'Category'});
})
const userSchema
    = new mongoose.Schema({
    email: String,
    name: String,
    password: String
})
const User =
    mongoose.model("User", userSchema)

router.post('/signup', function (req
    , res) {
    const email = req.body.email; // email đằng sau body là tên của thuộc tinh name được định nghĩa trong thẻ input
    const name = req.body.name; //
    const password = req.body.password; //
    const newUser = new User({
        email: email,
        name: name,
        password: password
    })
    newUser.save().then(() => {
        res.send("Đăng ký thành công")
    }).catch((error => {
        res.send(error)
    }))
    //res.send(email + "--- " + name + " ---- " + password)
})

router.get('/getListStudent', function (req
    , res) {
    let listStudent = [
        {
            id: 1,
            name: "Nguyen Van A",
            age: 20
        },
        {
            id: 4,
            name: "Nguyen Van D",
            age: 23
        },
        {
            id: 5,
            name: "Nguyen Van E",
            age: 24
        },
    ]
    res.send(listStudent)
})

router.get('/getStudentById/:id', function (req
    , res) {
    const id = req.params.id;
    let student =
        {
            id: id,
            name: "Nguyen Van A",
            age: 20
        }
    res.send(student)
})

router.get('/deleteUser/:id', function (req, res) {
    const id = req.params.id;
    User.findByIdAndDelete(id).then(() => {
        res.send("Xóa thành công")
    }).catch((error) => {
        res.send(error)
    })
})

// hien thi form edit user co id = :id
router.get('/updateUser/:id', function (req, res) {
    const _id = req.params.id;
    // có thể viết câu lệnh truy vấn lấu thông tin user tại đây rồi
    // gửi vào edit để hiển thị
    res.render('edit', {_id: _id})
})

router.post('/editUser', function (req, res) {
    const _id = req.body._id;
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password
    User.findByIdAndUpdate({_id: _id}, {
        email: email,
        name: name,
        password: password
    }, {new : true}).then((user) => {
        res.send("Cập nhật thành công : " + user.name)
    }).catch((error) => {
        res.send(error)
    })
})
module.exports = router;
