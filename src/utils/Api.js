class Api {

	host = "https://apps.smit.studio/accs/api"

	withToken = () => {
        return {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }
    };

	groups = {
		getList: () => {
			return new Promise((resolve, reject) => {
				axios.get(`${this.host}/groups`, this.withToken())
					.then(res => {
						resolve(res.data)
					})
					.catch(error => {
						reject(error)
					})
			})
		}
	}
}