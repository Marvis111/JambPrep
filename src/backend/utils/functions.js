const reg = (data) =>{
    return{
        userId:data.user.UserId,
        UserSbjts:data.userDetails.userSbjs,
        userDept:data.userDetails.department
    }
}

module.exports = reg;