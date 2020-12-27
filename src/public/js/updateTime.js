showUpdateTime();

function isMoreTime(value){
    
    const data = { room_id: value.value };

      fetch('http://localhost:3001/admin/confirmExtend', {
        method: 'PUT', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        value.parentNode.parentNode.remove();
      })
      .catch((error) => {
        console.error('Error:', error);
      });

}


function isNotMoreTime(value){
    
  const data = { room_id: value.value };

  fetch('http://localhost:3001/admin/notConfirmExtend', {
      method: 'PUT', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      value.parentNode.parentNode.remove();
    })
    .catch((error) => {
      console.error('Error:', error);
    });

}

function showUpdateTime(){
  fetch('http://localhost:3001/admin/getExtend')
  .then(response => response.json())
  .then(data => {
    var i = 0;
    for(i in data){     //Thêm dữ liệu đang chờ gia hạn vào bảng port
    var dataWaitTime = `<tr>
                      <td>${data[i].room_id}</td>
                      <td>${data[i].roomName}</td>
                      <td>${data[i].fullName}</td>
                      <td>${data[i].create_date}</td>
                      <td>${data[i].cost_service}</td>
                      <td>${data[i].time_life} ${data[i].cycile}</td>
                      <td>
                        <button type="button" onclick="isMoreTime(this)" value ="${data[i].room_id}">Có</button>
                        <button type="button" onclick="isNotMoreTime(this)" value ="${data[i].room_id}">Không</button>
                      </td>
                    </tr>`;
      $(".card-content-wait-time tbody").append(dataWaitTime);

    
    }})
    .catch(error => {
      console.error('Error:', error);
    });
}

