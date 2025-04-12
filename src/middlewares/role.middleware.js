const roleValidation = (role) => {
    return (req, res, next) => {
        if(!role.includes(req.user.role)){
            return res.status(403).json({success: false, message: "You dont have access to this resource"})
        }
        next()
    }
}

module.exports = {
    roleValidation
}