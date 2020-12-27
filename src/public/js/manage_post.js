function showPost(){
	fetch("http://localhost:3001/admin/getRooms")
	  .then(
		function(response) {
		  if (response.status !== 200) {
			console.log('Lỗi, mã lỗi ' + response.status);
			return;
		  }
		  // parse response data
		  response.json().then(data => {
              var i = 0;
             // console.log(data);
              for(i in data){     //Thêm dữ liệu vào bảng port
                  var xmlhttps = `<tr>
                                    <td >`+ data[i].room_id +`</td>
                                    <td>`+ data[i].roomName +`</td>
                                    <td>`+ data[i].fullName +`</td>
                                    <td>`+ data[i].create_date +`</td>`;

            if(data[i].confirm_status == "0"){ //Dữ liệu thêm vào bảng duyệt
                xmlhttps += `<td>Chưa duyệt</td>
                            <td>
                                <button type="button"  value = "`+ data[i].room_id +`" onclick="isConfirm(this)">Có</button>
                                <button type="button"  value = "`+ data[i].room_id +`" onclick="isNotConfirm(this)">Không</button>
                            </td>
                        </tr>`;
                $(".card-content-wait tbody").append(xmlhttps);  
            }
            else{
                //Dữ liệu thêm vào bảng đã duyệt
                xmlhttps += `<td>Đã duyệt</td>
                            </tr>`;
               // console.log(xmlhttps);
                $(".card-content-acept tbody").append(xmlhttps); 
                if(data[i].time_life_status == "0"){
                      var dataWaitTime = `<tr>
                                            <td>`+ data[i].room_id +`</td>
                                            <td>`+ data[i].roomName +`</td>
                                            <td>`+ data[i].fullName +`</td>
                                            <td>`+ data[i].create_date +`</td>
                                            <td>
                                              <input type="number">
                                              <select>
                                                <option value="date">ngày</option>
                                                <option value="week">tuần</option>
                                                <option value="month">tháng</option>
                                                <option value="year">năm</option>
                                                </select>
                                            </td>
                                            <td>
                                              <button type="button" onclick="isMoreTime(this)" value = "`+ data[i].room_id +` ">Có</button>
                                              <button type="button" onclick="isNotMoreTime(this)" value = "`+ data[i].room_id +`">Không</button>
                                            </td>
                                          </tr>`;
                    $(".card-content-wait-time tbody").append(dataWaitTime);
                }
            }
                         
              }
          })
        }
      )
     console.log(document.querySelector(".register"));
    };
showPost();

function isConfirm(ok){
  //ok.parentNode.parentNode.remove();
    //console.log(ok.value);
  const data = { 
    room_id : ok.value,
  };
  console.log(JSON.stringify(data));

      fetch('http://localhost:3001/admin/confirmRoom', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    
}

function isNotConfirm(ok){
  //console.log(ok.parentNode);
  const data = { 
    room_id : ok.value
  };
  console.log(JSON.stringify(data));
      fetch('http://localhost:3001/admin/notBrowseRoom', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    
}

function isMoreTime(value){
    var amount = value.parentNode.parentNode.childNodes[9].childNodes[1].value;
    var cycle =  value.parentNode.parentNode.childNodes[9].childNodes[3].value;
    var room_id = value.value;

    const data = { 
      room_id : room_id,
      amount : amount,
      cycle : cycle,
      time_life_status: "1"
    };

    console.log(JSON.stringify(data));

}
