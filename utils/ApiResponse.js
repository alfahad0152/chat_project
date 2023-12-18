class ApiResponse
{
    constructor(status,msg,data,error)
    {
        this.status = status
        this.msg = msg
        this.data = data
        this.error = error
    }
}
module.exports = ApiResponse