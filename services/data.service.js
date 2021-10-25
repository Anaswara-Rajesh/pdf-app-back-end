const db = require('./db')
users = {
  1000: { userid: 1000, username: "Aahil", password: "userone", filename: "abab", file: "abab", pdf: [] },
  1001: { userid: 1001, username: "Bahit", password: "usertwo", filename: "abab", file: "abab", pdf: [] },
  1002: { userid: 1002, username: "Cahit", password: "userthree", filename: "abab", file: "abab", pdf: [] },
  1003: { userid: 1003, username: "Dahit", password: "userfour", filename: "abab", file: "abab", pdf: [] }
}

admins = {
  1000: { adminid: 1000, adminname: "Aahil", password: "userone", filename: "abab", file: "abab", pdf: [] },
  1001: { adminid: 1001, adminname: "Bahit", password: "usertwo", filename: "abab", file: "abab", pdf: [] },
  1002: { adminid: 1002, adminname: "Cahit", password: "userthree", filename: "abab", file: "abab", pdf: [] },
  1003: { adminid: 1003, adminname: "Dahit", password: "userfour", filename: "abab", file: "abab", pdf: [] }
}

const uregister = (userid, username, password) => {

  return db.User.findOne({ userid })
    .then(user => {

      if (user) {
        return {
          statusCode: 422,
          status: false,
          message: "User already exist... Please Log In"
        }
      }
      else {
        const newUser = new db.User({
          userid,
          username,
          password,
          filename:0,
          file:0,
          pdf: []
        })
        newUser.save()
        return {
          statusCode: 200,
          status: true,
          message: "Sucessfully Registered"
        }
      }
    })
}

const ulogin = (req, userid, pswd) => {

  return db.User.findOne({
    userid: userid,
    password: pswd
  })
    .then(user => {
      if (user) {
        req.session.currentAcc = userid
        return {
          statusCode: 200,
          status: true,
          message: "sucessfully login",
          userName: user.username,
          currentAcc: user.userid

        }
      }
      return {
        statusCode: 422,
        status: false,
        message: "invalid Account details"
      }
    })
}

const aregister = (adminid, adminname, password) => {

  return db.Admin.findOne({ adminid })
    .then(admin => {

      if (admin) {
        return {
          statusCode: 422,
          status: false,
          message: "admin already exist... Please Log In"
        }
      }
      else {
        const newAdmin = new db.Admin({
          adminid,
          adminname,
          password,
          filename:0,
          file:0,
          pdf: []
        })
        newAdmin.save()
        return {
          statusCode: 200,
          status: true,
          message: "Sucessfully Registered"
        }
      }
    })
}

const alogin = (req, adminid, pswd) => {

  return db.Admin.findOne({
    adminid: adminid,
    password: pswd
  })
    .then(admin => {
      if (admin) {
        req.session.currentAdAcc = adminid
        return {
          statusCode: 200,
          status: true,
          message: "sucessfully login",
          adminName: admin.adminname,
          currentAdAcc: admin.adminid

        }
      }
      return {
        statusCode: 422,
        status: false,
        message: "invalid Account details"
      }
    })
}

const upload = (userid, pswd, filename, file) => {

  var f1 = filename
  var f2 = file
  return db.User.findOne({
    userid: userid,
    password: pswd
  })
    .then(user => {
      if (!user) {
        return {
          statusCode: 422,
          status: false,
          message: "invalid user"
        }
      }
      user.filename =  f1
      user.file =  f2
      user.pdf.push({
        filename: f1,
        file: f2
      })
      user.save()
      return {
        statusCode: 200,
        status: true,
        message: f1 + "succesfully uploaded"
      }
    })
}
const getPdf = (userid) => {
  return db.User.findOne({
    userid
  })
    .then(user => {
      if (user) {
        return {
          statusCode: 200,
          status: true,
          pdf: user.pdf
        }
      }
      else {
        return {
          statusCode: 422,
          status: false,
          message: "invalid operation"
        }
      }
    })
}

module.exports = {
  uregister,
  ulogin,
  aregister,
  alogin,
  upload,
  getPdf
}