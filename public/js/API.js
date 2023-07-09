class API {
    static addPhone = async (data) => {

        return await fetch('/add', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
    }
}