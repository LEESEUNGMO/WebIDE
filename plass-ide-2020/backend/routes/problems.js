var express = require('express');
var router = express.Router();
var tokenUser = require('../modules/check-login-middleware');
const helper = require('../modules/helper');
const sql = require('../sql');
const db = require('../modules/db-connection-pool');
router.use(tokenUser.injectUser);

//문제 리스트 출력
router.get('/', async function(req, res) {
    try {
        const [rows] = await db.query(sql.selectProblems)
        if(rows.length > 0)
        {
            res.status(200).send({
                result : true,
                data : rows,
                message : '문제 리스트 입니다'
            })
        }else{
            res.status(200).send({
                result : true,
                data: [],
                message : '문제 리스트 없습니다'
            })
        }
    } catch (e) {
    
    }
})
router.get('/:problem_id', async function(req, res) {
    const { problem_id } = req.params
    try {
        const [rows] = await db.query(sql.selectProblemById,[problem_id])
        if(rows.length > 0)
        {
            res.status(200).send({
                result : true,
                data : rows,
                message : '특정한 문제 리스트 입니다'
            })
        }else{
            res.status(200).send({
                result : true,
                data: [],
                message : '해당 문제가 없습니다'
            })
        }
    } catch (e) {
    
    }
})
//문제 등록
router.post('/', async function(req, res){
    try{
        if(helper.isAdmin(req)){
            const {name, content, input, output, output_example, input_example, level, category} = req.body;
            if(name && content && input && output){
                const [problem] = await db.query(sql.selectProblemByNameContent, [name, content]);
                if(problem.length != 0){
                    res.status(200).send({
                        result : false,
                        data: problem,
                        message : '이미 같은 문제가 존재합니다.'
                    })    
                }else{
                    let result = await db.query(sql.insertProblem, [name, content, input, output, level, category]);
                    await db.query(sql.insertTestCase, [input_example, output_example, result[0].insertId]);
                    let [problemIDmathching] = await db.query(sql.selectProblemById,[result[0].insertId])
                    res.status(200).send({
                        result : true,
                        data: problemIDmathching,
                        message : '문제가 추가되었습니다.'
                    })  
                }  
            }else{
                res.status(200).send({
                    result : false,
                    data: [],
                    message : '입력 정보에 빈 칸이 존재합니다.'
                })
            }
        }else{
            res.status(201).send({
                result : false,
                data: [],
                message : '문제 추가 권한이 없습니다.'
            })
        }
    }catch(error){
        console.log(error)
        helper.failedConnectionServer(res, error);
    }
})

router.put('/:problem_id', async function(req, res){
    const { problem_id } = req.params;
    try{
        if(helper.isAdmin(req)){
            const {name, content, input, output, output_example, input_example, level, category} = req.body;
            console.log(name, content, input, output, output_example, input_example, level, category)
            if(name && content && input && output){
                const [problem] = await db.query(sql.selectProblemById,[problem_id]);
                if(problem.length == 0){
                    res.status(200).send({
                        result : false,
                        data: problem,
                        message : '존재하지 않는 문제입니다.'
                    })    
                }else{
                    await db.query(sql.updateProblem, [name, content, input, output, level, category, problem_id]);
                    await db.query(sql.updateTestCase, [input_example, output_example, problem_id, problem_id]);  
                    res.status(200).send({
                        result : true,
                        data: [],
                        message : '문제가 수정되었습니다.'
                    })  
                }  
            }else{
                res.status(200).send({
                    result : false,
                    data: [],
                    message : '입력 정보에 빈 칸이 존재합니다.'
                })
            }
        }else{
            res.status(201).send({
                result : false,
                data: [],
                message : '문제 추가 권한이 없습니다.'
            })
        }
    }catch(error){
        helper.failedConnectionServer(res, error);
    }
})
module.exports = router;