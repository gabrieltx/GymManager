const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utility')


exports.index = function(req, res){
    return res.render("members/index", {members: data.members})
}

exports.show = function(req, res) {
    const { Id } = req.params

    const foundMember = data.members.find(function(member){
        return member.Id == Id
    })

    if (!foundMember) return res.send('Member Not Found!')

    const member = {
        ...foundMember,
        age: age(foundMember.birth),
    }

    return res.render("members/show", { member })
}

exports.post = function(req, res){ 

    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") 
            return res.send('Please fill all fields')       
    }

    birth = Date.parse(req.body.birth)
    const imc = Math.round(Number((req.body.weight/(req.body.height * req.body.height))*10000))
    
    const Id = Number(data.members.length + 1)

    data.members.push({
        Id,
        ...req.body,
        birth,
        imc
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send('Write file error')
        return res.redirect(`/members/${Id}`)
    })
}

exports.create = function(req, res){
    return res.render('members/create')
}

exports.edit = function(req, res){

    const { Id } = req.params

    const foundMember = data.members.find(function(member){
        return member.Id == Id
    })

    if (!foundMember) return res.send('Member Not Found!')


    const member = {
        ...foundMember,
        birth: date(foundMember.birth)
    }

    return res.render('members/edit', {member: foundMember})
}

exports.put = function(req, res) {
    
    const { Id } = req.body
    let index = 0

    const foundMember = data.members.find(function(member, foundIndex){
        if (Id == member.Id) {
            index = foundIndex
            return true
        }
    })

    if (!foundMember) return res.send('Member Not Found!')

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        imc: Math.round(Number((req.body.weight/(req.body.height * req.body.height))*10000)),
        Id: Number(req.body.Id)
    }

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write Error!")
        
        return res.redirect(`/members/${Id}`)
    })

}

exports.delete = function(req, res) {

    const { Id } = req.body
    const filteredMembers = data.members.filter(function(member){
        return member.Id != Id
    })

    data.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error")

        return res.redirect("/members")
    })

}