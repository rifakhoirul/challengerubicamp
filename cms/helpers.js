function checkToken(token) {
    if (!token) {
        return window.location = 'index.html'
    }

    fetch('http://localhost:3000/api/users/check', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Author': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data=>{
            if(!data.status){
                localStorage.removeItem('token')
                localStorage.removeItem('email')
            }
        })
        .catch((err)=>{
            console.error('Error:', err)
        })
}