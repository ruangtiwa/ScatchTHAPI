const express = require('express') // เรียกใช้ Express
const mysql = require('mysql') // เรียกใช้ mysql
var http = require('http');


const db = mysql.createConnection({   // config ค่าการเชื่อมต่อฐานข้อมูล
    host     : 'localhost', 
    user     : 'root',
    password : '',
    database : 'scratchthai'
})



db.connect() // เชื่อมต่อฐานข้อมูล
const app = express() // สร้าง Object เก็บไว้ในตัวแปร app เพื่อนำไปใช้งาน

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//------------------------------------Login API------------------------------------
app.get('/login/username=:username&password=:password',(req,res)=> {   // Router เวลาเรียกใช้งาน
    const username =    req.params.username ;
    const password =    req.params.password ;
    var equal = false; // if true 'username' is existing

    let sql = `SELECT * FROM securitykey WHERE securitykey.username=? AND securitykey.password=?`;  // คำสั่ง sql
    let query = db.query(sql, [username, password],(err,results) => { // สั่ง Query คำสั่ง sql
        if(err) throw err  // ดัก error
        // console.log(results) // แสดงผล บน Console 
        // res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
        /*for(var i=0; i<results.length; i++) {  

            if (results[i].username == username) { //check username
                console.log('Existing username')

                if (results[i].password == password) { // check password
                //     console.log(allData[i].pass.value)
                    console.log('Existing username&password')
                    equal = true;
                }
            }
            console.log(results[i]);
            // console.log(username);
        }*/
        //console.log(equal);
        if(results.length > 0){
            console.log(results);
            res.send(results[0]);
        }else{
            console.log(equal);
            res.send(equal);
        }
        
    })

    // console.log(username);
    // console.log(password);
})

//------------------------------------ask lastest-exercise------------------------------------
app.get('/get-exercise/username=:username',(req,res)=> {   // Router เวลาเรียกใช้งาน
    const getUsername =    req.params.username ;
    const lastestEx =   {
                            id: '',
                            title: '',
                            ref: '',
                            status: ''
                        }; 

    let sql = 'SELECT o.learningObject_id , o.title , o.technicalLocation , a.status , s.username FROM activity a INNER JOIN learningobject o ON a.activity_id = o.activity_id INNER JOIN learnerinformation l ON l.learnerInformation_id = a.learnerInfo_id INNER JOIN securitykey s ON s.learnerInfo_id = l.learnerInformation_id WHERE s.username=? ORDER BY a.date DESC'  // คำสั่ง sql
    let query = db.query(sql, [getUsername] ,(err,results) => { // สั่ง Query คำสั่ง sql
        if(err) throw err  // ดัก error
        
        for(var i=0; i<results.length; i++) {  

                lastestEx.id = results[0].learningObject_id; // use first LO_id
                lastestEx.title = results[0].title; // use first LO_title
                lastestEx.ref = results[0].technicalLocation; // use first LO_technicalLocation
                lastestEx.status = results[0].status;

        }
        console.log("last ex");
        console.log(lastestEx);
        res.send(lastestEx);
    })
})

//------------------------------------Give next exercise------------------------------------
app.get('/next-exercise/username=:username',(req,res)=> {   // Router เวลาเรียกใช้งาน
    var data = '';
    let id;
    const getUsername =    req.params.username ;
    let sql = `SELECT o.learningObject_id 
    FROM activity a INNER JOIN learningobject o ON a.activity_id = o.activity_id 
    INNER JOIN learnerinformation l ON l.learnerInformation_id = a.learnerInfo_id 
    INNER JOIN securitykey s ON s.learnerInfo_id = l.learnerInformation_id 
    WHERE s.username=? ORDER BY a.date DESC`  // คำสั่ง sql
    let query = db.query(sql, [getUsername] ,(err,results) => { // สั่ง Query คำสั่ง sql
        if(err) throw err  // ดัก error
        id = results[0].learningObject_id;
        console.log(id);

        let sql = `SELECT lo.learningObject_id , lo.title , lo.technicalLocation 
            FROM learningobject lo INNER JOIN lp_comp lc ON lo.lpComp_id = lc.lc_id 
            WHERE lc.lc_id IN (SELECT pc.lc_id FROM lp_lc pc WHERE pc.lplc_id 
                IN (SELECT pc.fol_id FROM lp_comp lc 
                    INNER JOIN learningobject lo ON  lc.lc_id = lo.lpComp_id 
                    INNER JOIN lp_lc pc ON lc.lc_id = pc.lc_id 
                    INNER JOIN lessonplan lp ON pc.lp_id = lp.lessonPlan_id 
                    INNER JOIN learnerinformation ln ON lp.lessonPlan_id = ln.lessonplan_id 
                    INNER JOIN securitykey s ON s.learnerInfo_id = ln.learnerInformation_id 
                    WHERE s.username=? AND lo.learningObject_id = ?) )`  // คำสั่ง sql

            let query = db.query(sql, [getUsername, id], (err,results) => { // สั่ง Query คำสั่ง sql
                if(err) throw err  // ดัก error
                console.log(results);
                console.log("----------------results---------------");
                res.send(results);
            });
    })
})

app.listen('3000',() => {     // run port:3000
    console.log('start port 3000')  
});


