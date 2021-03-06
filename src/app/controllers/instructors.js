const { age, date } = require('../../lib/utility')
const Instructor = require('../models/Instructor')

module.exports = {
    index(req, res) {

        Instructor.all(function(instructors){
            return res.render("instructors/index", {instructors})
        })
        
    },
    create(req, res) {
        return res.render('instructors/create')
    },
    post(req, res) {
        
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") 
                return res.send('Please fill all fields')       
        }

        Instructor.create(req.body, function(instructors){
            return res.redirect(`/instructors/${instructors.id}`)
        })
             
    },
    show(req, res) {
        Instructor.find(req.params.id, function(instructor){
            if (!instructor) return res.send("Instructor not Found!")

            instructor.age = age(instructor.birth)
            instructor.services = instructor.services.split(",")
            instructor.created_at = date(instructor.created_at).format

            return res.render("instructors/show", {instructor})

        })
    },
    edit(req, res) {
        return
    },
    put(req, res) {
        return
    },
    delete(req, res) {
        return
    },
}





