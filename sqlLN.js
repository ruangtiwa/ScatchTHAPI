const express = require('express') // เรียกใช้ Express
const mysql = require('mysql') // เรียกใช้ mysql

const db = mysql.createConnection({   // config ค่าการเชื่อมต่อฐานข้อมูล
    host     : 'localhost', 
    user     : 'root',
    password : '',
    database : 'test'
})

db.connect() // เชื่อมต่อฐานข้อมูล
const app = express() // สร้าง Object เก็บไว้ในตัวแปร app เพื่อนำไปใช้งาน

// Select Data
app.get('/login/username=:username&password=:password',(req,res)=> {   // Router เวลาเรียกใช้งาน
    const username =    req.params.username ;
    const password =    req.params.password ;
    var equal = false; // if true 'username' is existing

    let sql = 'SELECT * FROM securitykey'  // คำสั่ง sql
    let query = db.query(sql,(err,results) => { // สั่ง Query คำสั่ง sql
        if(err) throw err  // ดัก error
        // console.log(results) // แสดงผล บน Console 
        // res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
        for(var i=0; i<results.length; i++) {  

            if (results[i].username == username) { //check username
                console.log('Existing username')

                if (results[i].password == password) { // check password
                //     console.log(allData[i].pass.value)
                    console.log('Existing username&password')
                    equal = true;
                }
            }
            // console.log(results[i].username);
            // console.log(username);
        }
        // console.log(equal);
        res.send(equal);
    })

    // console.log(username);
    // console.log(password);
})

app.listen('3000',() => {     // run port:3000
    console.log('start port 3000')  
})