const fs = require('fs')
const data = require('./data.json')
const { age } = require('./utility')


//show

exports.show = function(req, res) {
    const { Id } = req.params

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.Id == Id
    })

    if (!foundInstructor) return res.send('Instructor Not Found!')

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat("en-US").format(foundInstructor.created_at),
    }

    return res.render("instructors/show", { instructor })
}

// create

exports.post = function(req, res){ 

    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") 
            return res.send('Please fill all fields')       
    }

    let {avatar_url, birth, name, services, gender} = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const Id = Number(data.instructors.length + 1)

    data.instructors.push({
        Id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at,
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send('Write file error')
        return res.redirect("/instructors")
    })
}

// edit

exports.edit = function(req, res){

    
    return res.render('instructors/edit', {})
}

// delete