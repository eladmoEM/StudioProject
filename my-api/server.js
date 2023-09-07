const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

<<<<<<< HEAD


=======
>>>>>>> origin/master
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'mydancingstudio',
});

app.use(express.json());
app.use(cors());

<<<<<<< HEAD


app.get('/api/courses/list', (req, res) => {
  const sql = 'SELECT * FROM courses WHERE status = "active"';
  connection.query(sql, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching courses' });
    } else {
      res.json(results);
    }
  });
});



app.post('/api/register', (req, res) => {
  const formData = req.body;
  
  if (!formData.phoneNumber || !formData.parentNames || !formData.email || !formData.password || !formData.cpassword || !formData.numberOfChildren) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  connection.beginTransaction(async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error starting transaction', error: err });
    }
  
    try {
      const sql = 'INSERT INTO register (phoneNumber, parentNames, email, password, cpassword, numberOfChildren) VALUES (?, ?, ?, ?, ?, ?)';
      const values = [formData.phoneNumber, formData.parentNames, formData.email, formData.password, formData.cpassword, formData.numberOfChildren];
  
      await new Promise((resolve, reject) => {
        connection.query(sql, values, (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        });
      });

      const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Pink', 'Purple', 'Brown', 'Black', 'White', 'Gray', 'Violet', 'Indigo', 'Gold', 'Silver', 'Bronze', 'Teal', 'Cyan', 'Magenta', 'Lime'];
      let colorIndex = 0;
      const children = formData.children.map(child => {
        const assignedColor = colors[colorIndex % colors.length];
        colorIndex++;
        return [child.childName, child.birthdate, child.gender, child.courseType, formData.phoneNumber, child.childID, assignedColor];
      });
  
      if (children.length > 0) {
        const sql2 = 'INSERT INTO children (childName, birthdate, gender, courseType, phoneNumber, childID, Color) VALUES ?';
  
        await new Promise((resolve, reject) => {
          connection.query(sql2, [children], (error) => {
            if (error) {
              return reject(error);
            }
            resolve();
          });
        });

        for (const child of formData.children) {
          const { courseType, childID } = child;
          let courseId;
  
          const checkSql = 'SELECT id FROM courses WHERE courseType = ?';
          const results = await new Promise((resolve, reject) => {
            connection.query(checkSql, [courseType], (error, results) => {
              if (error) {
                return reject(error);
              }
              resolve(results);
            });
          });
  
          if (results.length > 0) {
            courseId = results[0].id;
          } else {
            await new Promise((resolve, reject) => {
              const insertSql = 'INSERT INTO courses (courseType) VALUES (?)';
              connection.query(insertSql, [courseType], (error, results) => {
                if (error) {
                  return reject(error);
                }
                resolve(results);
              });
            });
            courseId = results.insertId;
          }
  
          const mapSql = 'INSERT INTO child_course_mapping (child_id, course_id) VALUES (?, ?)';
          await new Promise((resolve, reject) => {
            connection.query(mapSql, [childID, courseId], (error) => {
              if (error) {
                return reject(error);
              }
              resolve();
            });
          });
        }
      }
  
      connection.commit((err) => {
        if (err) {
          connection.rollback(() => {
            res.status(500).json({ message: 'Error committing transaction', error: err });
          });
          return;
        }
        res.json({ message: 'Form data received and saved successfully!' });
      });
  
    } catch (error) {
      connection.rollback(() => {
        res.status(500).json({ message: 'Transaction failed', error: error });
      });
=======
app.post('/api/register', (req, res) => {
  const formData = req.body;

  formData.birthdate = new Date(formData.birthdate);

  const sql = 'INSERT INTO register (phoneNumber, parentNames, username, password, cpassword, email, numberOfChildren) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [formData.phoneNumber, formData.parentNames, formData.username, formData.password, formData.cpassword, formData.email, formData.numberOfChildren];

  connection.query(sql, values, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error saving form data' });
    } else {
      const children = formData.children.map(child => {
        return [child.childName, child.birthdate, child.gender, child.courseType, formData.phoneNumber, child.childID];
      });

      if (children.length > 0) {
        const sql2 = 'INSERT INTO children (childName, birthdate, gender, courseType, phoneNumber, childID) VALUES ?';
        connection.query(sql2, [children], (error) => {
          if (error) {
            console.error(error);
            res.status(500).json({ message: 'Error saving children data' }); 
          } else {
            res.json({ message: 'Form data received and saved successfully!' }); 
          }
        });
      } else {
        res.json({ message: 'Form data received and saved successfully!' });
      }
>>>>>>> origin/master
    }
  });
});


<<<<<<< HEAD

app.post('/api/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;


  const sql = 'SELECT * FROM register WHERE email = ?';
  const values = [email];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Database error:', error);
      res.status(500).json({ message: 'Error logging in' });
    } else {

      if (results.length > 0) {
        const user = results[0]; 
        res.json({ 
            message: 'Login successful!',
            phoneNumber: user.phoneNumber
        });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
=======
app.post('/api/login', (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const password = req.body.password;

  const sql = 'SELECT * FROM register WHERE phoneNumber = ? AND password = ?';
  const values = [phoneNumber, password];

  connection.query(sql, values, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error logging in' });
    } else {
      if (result.length > 0) {
        res.json({ message: 'Login successful!' });
      } else {
        res.status(401).json({ message: 'Invalid phoneNumber or password' });
>>>>>>> origin/master
      }
    }
  });
});


<<<<<<< HEAD







app.get('/api/customers', (req, res) => {
  const query = `
    SELECT register.parentNames, register.email, register.password, register.numberOfChildren, children.birthdate, children.gender, 
    register.phoneNumber, children.childName, children.courseType, children.childID
    FROM register
    JOIN children ON register.phoneNumber = children.phoneNumber
  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving customer data' });
    } else {
      res.json(results);
    }
  });
});


app.post('/api/customers/:phoneNumber/:childID', (req, res) => {
  const phoneNumber = req.params.phoneNumber;
  const childID = req.params.childID;  
  const updatedCustomerData = req.body;

  const registerSql = 'UPDATE register SET parentNames = ?, phoneNumber = ?, password = ?, email = ?, numberOfChildren = ? WHERE phoneNumber = ?';
  const registerValues = [
    updatedCustomerData.parentNames,
    updatedCustomerData.phoneNumber,
    updatedCustomerData.password,
    updatedCustomerData.email,
    updatedCustomerData.numberOfChildren,
    phoneNumber
  ];

  connection.query(registerSql, registerValues, (registerError, registerResult) => {
    if (registerError) {
      console.error(registerError);
      res.status(500).json({ message: 'Error updating customer details' });
      return;
    }

    const childrenSql = 'UPDATE children SET childName = ?, birthdate = ?, courseType = ? WHERE phoneNumber = ? AND childID = ?';
    const childrenValues = [
      updatedCustomerData.childName,
      updatedCustomerData.birthdate,
      updatedCustomerData.courseType,
      updatedCustomerData.phoneNumber,
      childID
    ];

    connection.query(childrenSql, childrenValues, (childrenError, childrenResult) => {
      if (childrenError) {
        console.error(childrenError);
        res.status(500).json({ message: 'Error updating children details' });
        return;
      }


      const findCourseIDSql = 'SELECT id FROM courses WHERE courseType = ?';
      connection.query(findCourseIDSql, [updatedCustomerData.courseType], (findError, findResult) => {
        if (findError) {
          console.error(findError);
          res.status(500).json({ message: 'Error finding course ID' });
          return;
        }
        
    
        const newCourseID = findResult[0].id;


        const updateMappingSql = 'UPDATE child_course_mapping SET course_id = ? WHERE child_id = ?';
        const updateMappingValues = [newCourseID, childID];

        connection.query(updateMappingSql, updateMappingValues, (mappingError, mappingResult) => {
          if (mappingError) {
            console.error(mappingError);
            res.status(500).json({ message: 'Error updating child-course mapping' });
            return;
          }
          

          res.json({ message: 'Customer, child, course, and mapping details updated successfully!' });
        });
      });
    });
  });
});

app.delete('/api/customers/:phoneNumber/:childID', (req, res) => {
  const phoneNumber = req.params.phoneNumber;
  const childID = req.params.childID;


  const deleteMappingSql = 'DELETE FROM child_course_mapping WHERE child_id = ?';
  
  connection.query(deleteMappingSql, [childID], (mappingError, mappingResult) => {
    if (mappingError) {
      console.error(mappingError);
      res.status(500).json({ message: 'Error deleting child-course mapping' });
      return;
    }


    const deleteChildSql = 'DELETE FROM children WHERE phoneNumber = ? AND childID = ?';

    connection.query(deleteChildSql, [phoneNumber, childID], (childError, childResult) => {
      if (childError) {
        console.error(childError);
        res.status(500).json({ message: 'Error deleting child details' });
        return;
      }

  
      const remainingChildrenSql = 'SELECT COUNT(*) AS childCount FROM children WHERE phoneNumber = ?';

      connection.query(remainingChildrenSql, [phoneNumber], (remainingChildrenError, remainingChildrenResult) => {
        if (remainingChildrenError) {
          console.error(remainingChildrenError);
          res.status(500).json({ message: 'Error checking remaining children' });
          return;
        }

        const childCount = remainingChildrenResult[0].childCount;

        if (childCount === 0) {
  
          const deleteParentSql = 'DELETE FROM register WHERE phoneNumber = ?';

          connection.query(deleteParentSql, [phoneNumber], (parentError, parentResult) => {
            if (parentError) {
              console.error(parentError);
              res.status(500).json({ message: 'Error deleting parent details' });
              return;
            }
            res.json({ message: 'Child and parent deleted successfully!' });
          });
        } else {
          res.json({ message: 'Child deleted successfully!' });
        }
      });
    });
  });
});

   
    app.post('/api/courses/add', (req, res) => {
      const { courseType, teachers, childID, min_age, max_age, money } = req.body; 
      const sql = "INSERT INTO courses (courseType, teachers, childID, min_age, max_age, money) VALUES (?, ?, ?, ?, ?, ?)";
      connection.query(sql, [courseType, teachers, childID || null, min_age, max_age, money], (error, results) => { 
        if (error) {
          console.error(error);
          res.status(500).json({ message: 'Error adding course', error: error.sqlMessage });
        } else {
          res.json({ success: true, message: 'Course added successfully', id: results.insertId });
        }
      });
    });


    app.get('/api/courses', (req, res) => {
      const sql = `
      SELECT DISTINCT
      courses.*,
      course_schedule.dayOfWeek,
      course_schedule.startTime,
      course_schedule.endTime,
      children.courseType AS childCourseType,
      children.childID
    FROM
      courses
    LEFT JOIN
      course_schedule ON courses.id = course_schedule.courseID
    LEFT JOIN
      children ON courses.courseType = children.courseType AND courses.childID = children.childID
    WHERE
      courses.status = 'active';
      `;
    
      connection.query(sql, (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).json({ message: 'Error retrieving course types' });
        } else {
          res.json(results);
        }
      });
    });
    
    

          app.get('/api/courses/edit', (req, res) => {
            const sql = `
            SELECT 
            courses.*, 
            course_schedule.dayOfWeek, 
            course_schedule.startTime, 
            course_schedule.endTime, 
            children.courseType AS childCourseType, 
            children.childID
          FROM 
            courses
          LEFT JOIN 
            course_schedule ON courses.id = course_schedule.courseID
          LEFT JOIN 
            child_course_mapping ON courses.id = child_course_mapping.course_id
          LEFT JOIN 
            children ON child_course_mapping.child_id = children.childID;
          
          `;
            
            connection.query(sql, (error, results) => {
              if (error) {
                  console.error(error);
                  res.status(500).json({ message: 'Error retrieving course types' });
              } else {
                  res.json(results);

              }
          });
          
        });



          // api/courses/pause
        app.post('/api/courses/pause', (req, res) => {
          const { courseId } = req.body;

          const pauseCourseSql = `
            UPDATE courses
            SET status = 'paused'
            WHERE id = ?`;

          connection.query(pauseCourseSql, [courseId], (error, results) => {
            if (error) {
              console.error(error);
              res.status(500).json({ message: 'Error pausing the course' });
            } else {
              res.json({ success: true, message: 'Course paused successfully' });
            }
          });
        });

        // api/courses/resume
        app.post('/api/courses/resume', (req, res) => {
          const { courseId } = req.body;

          const resumeCourseSql = `
            UPDATE courses
            SET status = 'active'
            WHERE id = ?`;

          connection.query(resumeCourseSql, [courseId], (error, results) => {
            if (error) {
              console.error(error);
              res.status(500).json({ message: 'Error resuming the course' });
            } else {
              res.json({ success: true, message: 'Course resumed successfully' });
            }
          });
        });




          
   

app.post('/api/courses/saveChanges', (req, res) => {
  const { course, schedules } = req.body;

  const updateCourseSql = `
      UPDATE courses
      SET courseType = ?, teachers = ?
      WHERE id = ?`;

  connection.query(updateCourseSql, [course.courseType, course.teachers, course.id], (error) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error updating course' });
    }


    const deleteScheduleSql = 'DELETE FROM course_schedule WHERE courseID = ?';
    connection.query(deleteScheduleSql, [course.id], (error) => {  
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error deleting old schedule' });
      }


      const insertPromises = schedules.map(schedule => {
        return new Promise((resolve, reject) => {
          const insertScheduleSql = `
              INSERT INTO course_schedule (courseID, dayOfWeek, startTime, endTime)
              VALUES (?, ?, ?, ?)`;
          
          connection.query(insertScheduleSql, [course.id, schedule.dayOfWeek, schedule.startTime, schedule.endTime], (error) => {  
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        });
      });

      Promise.all(insertPromises)
      .then(() => {
        res.json({ success: true, message: 'Changes saved successfully' });
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ message: 'Error inserting new schedule' });
      });
    });
  });
});



app.delete('/api/courses/deleteDay', (req, res) => {
  const { courseId, dayOfWeek } = req.body;

  
  const deleteDaySql = `
    DELETE FROM course_schedule 
    WHERE courseID = ? AND dayOfWeek = ?`;

  connection.query(deleteDaySql, [courseId, dayOfWeek], (error) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting the specified day' });
    } else {
      res.json({ success: true, message: 'Day deleted successfully' });
    }
  });
});

  app.get('/api/child-courses/:phoneNumber', (req, res) => {
    const phoneNumber = req.params.phoneNumber;

    const query = `
      SELECT 
        children.childID, 
        children.color AS childColor, 
        children.childName,
        courses.courseType, 
        course_schedule.dayOfWeek, 
        course_schedule.startTime, 
        course_schedule.endTime
      FROM 
        children
      LEFT JOIN 
        child_course_mapping ON children.childID = child_course_mapping.child_id
      LEFT JOIN
        courses ON child_course_mapping.course_id = courses.id
      LEFT JOIN 
        course_schedule ON courses.id = course_schedule.courseID
      WHERE 
        children.phoneNumber = ?`;

    connection.query(query, [phoneNumber], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving child courses' });
      } else {
        res.json(results);
      }
    });
  });



=======
>>>>>>> origin/master
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
<<<<<<< HEAD
});
=======
});
>>>>>>> origin/master
