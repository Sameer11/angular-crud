const express = require('express');
const app = express();
const employeeRoute = express.Router();
const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: (req, file, callBack) => {
//       callBack(null, 'uploads')
//   },
//   filename: (req, file, callBack) => {
//       callBack(null, `${new Date().getTime()}${file.originalname}`)
//   }
// })
  
// const upload = multer({ storage: storage })

// Employee model
let Employee = require('../models/Employee');

// Add Employee
employeeRoute.route('/create').post(  (req, res, next) => {
  // const file = req.file;
  // console.log(file.filename);
  Employee.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Employees
employeeRoute.route('/').get((req, res) => {
  Employee.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single employee
employeeRoute.route('/read/:id').get((req, res) => {
  Employee.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update employee
employeeRoute.route('/update/:id').put((req, res, next) => {
  Employee.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete employee
employeeRoute.route('/delete/:id').delete((req, res, next) => {
  Employee.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = employeeRoute;