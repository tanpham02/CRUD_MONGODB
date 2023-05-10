const axios = require('axios');

exports.homeRoutes = (req, res)=> {
    //Make a get request to /api/users
    axios.get('http://localhost:5000/api/restaurants')
        .then(response => {     
            res.render('index', {restaurants: response.data})
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.addUser = (req, res)=> {
    res.render('add-restaurant')
}

exports.updateRestaurant = (req, res)=> {
    axios.get('http://localhost:5000/api/restaurants', {params: {id: req.query.id}})       // id lấy thông qua input type="hidden cũng chính là _idObject"
        .then(response => {
            res.render('update-restaurant', {restaurants: response.data})
        })
        .catch(err => {
            res.send(err);
        })   
}



exports.detailRestaurant = (req, res)=> {
    axios.get('http://localhost:5000/api/restaurants', {params: {id: req.query.id}})       // id lấy thông qua input type="hidden cũng chính là _idObject"
        .then(response => {
            res.render('detail-restaurant', {restaurants: response.data})
        })
        .catch(err => {
            res.send(err);
        })   
}


exports.searchByName = (req, res) => {
    var q = req.query.q;
    const regexStr = new RegExp('^[A-Za-z\s]*$');
    const regexNum = new RegExp('^([1-9][0-9]{0,2}|10000000)$');
    if(regexStr.test(q)) {
        axios.get('http://localhost:5000/api/restaurants')      
            .then(response => {
                var result = {restaurants: response.data}
                var matchedName = Array.from(result.restaurants).filter(nameRes => {
                    return nameRes.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
                }) 
                res.render('index',{
                    restaurants: matchedName
                })
            })
            .catch(err =>{
                res.send(err);
            })
    } else if(regexNum.test(q)) {
        axios.get('http://localhost:5000/api/restaurants')      
            .then(response => {
                var result = {restaurants: response.data}
                var matchedID = Array.from(result.restaurants).filter(idRes => {
                    return idRes.restaurant_id.indexOf(q) !==-1
                }) 
                res.render('index', {
                    restaurants: matchedID
                })
            })
            .catch(err =>{
                res.send(err);
            })
    }
}

exports.searchByBorough = (req, res) => {
    var q = req.query.q;
    axios.get('http://localhost:5000/api/restaurants')      
        .then(response => {
            var result = {restaurants: response.data}
            var matchedBorough = Array.from(result.restaurants).filter(boroughRes => {
                return boroughRes.borough.toLowerCase().indexOf(q.toLowerCase()) !== -1
            }) 
            res.render('index', {
                restaurants: matchedBorough
            })
        })
        .catch(err =>{
            res.send(err);
        })
}


exports.searchByCuisine = (req, res) => {
    var q = req.query.q;
    axios.get('http://localhost:5000/api/restaurants')      
        .then(response => {
            var result = {restaurants: response.data}
            var matchedCuisine = Array.from(result.restaurants).filter(CuisineRes => {
                return CuisineRes.borough.toLowerCase().indexOf(q.toLowerCase()) !== -1
            }) 
            res.render('index', {
                restaurants: matchedCuisine
            })
        })
        .catch(err =>{
            res.send(err);
        })
}


// sort
exports.sort = (req, res) => {
    axios.get('http://localhost:5000/api/restaurants') 
        .then(response => {
            var result = {restaurants: response.data}
            var sortId =  Array.from(result.restaurants).sort((a, b) => {
                return a.restaurant_id - b.restaurant_id; // tăng
                // return b.restaurant_id - a.restaurant_id; // giảm
            })
            res.render('index', {
                restaurants: sortId
            })
        })
}
