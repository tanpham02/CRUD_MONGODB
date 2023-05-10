
$('#add-restaurant').submit(function(event) {
    alert('Thêm nhà hàng thành công!')
})

$('#update-restaurant').submit(function(event) {
    event.preventDefault();
   

    // tạo một array an object (name and value) bằng cách tuần tự hóa các giá trị biểu mẫu
    var formUpdate = $('#update-restaurant').serializeArray();
    // console.log(formUpdate)

    var data= {
        address: {
            coord: []
        },
        grades: [
            
        ]
    };

    var result = formUpdate.reduce((prev, next) => {
        const nameDate = ['date'].includes(next.name) ? next.value : ''
        const nameGrade = ['grade'].includes(next.name) ? next.value : ''
        const nameScore = ['score'].includes(next.name) ? next.value : ''
        
        return {
            date: prev['date'] + nameDate,
            grade: prev['grade'] + nameGrade,
            score: prev['score'] + nameScore,
        }
    }, {date: '', grade: '', score: ''})
    data.grades.push(result)


    for(var i = 0; i <formUpdate.length; i++) {
        if(formUpdate[i].name == 'coord') {
            data.address.coord.push(formUpdate[i].value)
        }
    }

    $.map(formUpdate, function(result, index){
        data[result.name] = result.value;
    })

    for(var key in data) {
        if(key == 'street') {
            data.address[key]= data[key]
            delete data.street
        }
        if(key == 'building') {
            data.address[key]= data[key]
            delete data.building
        }
        if(key == 'zipcode') {
            data.address[key]= data[key]
            delete data.zipcode
        }
        delete data.coord
        delete data.date
        delete data.grade
        delete data.score

    }

    var request = {
        'url' : `http://localhost:5000/api/restaurants/${data.id}`, // id của input type="hidden" chính là _idObject luôn
        'method' : 'PUT',
        'data' : data
    }
    

    $.ajax(request).done(function(response){
        alert("Cập nhật nhà hàng thành công!");
    })
})


if(window.location.pathname == "/"){
    const onDelete = $('.table tbody td > a.delete');
    onDelete.click(function(){  // use jquery is not event onclick of javascript
        var id = $(this).attr('data-id') // id lấy thông qua attribute của data-id 
        var request = {
            'url' : `http://localhost:5000/api/restaurants/${id}`,
            'method' : 'DELETE'
        }

        if(confirm("Bạn có chắc chắn muốn xóa nhà hàng này?")){
            $.ajax(request).done(function(response){
                alert('Xóa nhà hàng thành công!');
                // location.reload();
            })
        }
    
    })
}


// var divSearch = document.querySelector('#header .search');
var formSearch = document.querySelector('#header .search #form-search');

$('#header .search').on('click', function(event) {
    if(event.target.closest('#header .search .search-icon')) {
        formSearch.style.display = 'block';
    } else if(event.target.closest('#header .search #form-search input')){
        formSearch.style.display = 'block';
    } else {
        formSearch.style.display = 'none';
    }
    document.querySelector('#form-search').reset();
})








