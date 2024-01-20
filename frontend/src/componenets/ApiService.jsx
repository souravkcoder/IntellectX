export default class ApiServices{
    static loginUser(body){
        const details=JSON.stringify(body)
        return (
            fetch('http://127.0.0.1:8000/autht/',{
            'method':'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body : details
        })
        .then(resp => resp.json())
        )
    }

    static RegUser(body){
        const details=JSON.stringify(body)
        return (
            fetch('http://127.0.0.1:8000/api/users/',{
            'method':'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body : details
        })
        .then(resp => console.log(resp))
        )
    }
}