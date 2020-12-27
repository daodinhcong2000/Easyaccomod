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
                    }
            }
        })
    });
    // console.log(document.querySelector(".register"));
    };
showPost();

function isConfirm(ok){
    
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
        if(data.Err == "Bài viết này đã được duyệt"){
           ok.parentNode.parentNode.remove();

        }
        
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

function inputData(){
    document.querySelector(".content").style.display = 'none';
    document.querySelector(".input").style.display = 'block';
    

}

function cancle(){
    document.querySelector(".content").style.display = 'block';
    document.querySelector(".input").style.display = 'none';
}
// window.onclick = function(event) {
//   document.querySelector(".content").style.display = 'block';
//   document.querySelector(".input").style.display = 'none';
// }

// function createRoom(){

//   var address = document.querySelector('input[name=address]').value;
//   var house_number = document.querySelector('input[name=house_number]').value;
//   var street = document.querySelector('input[name=street]').value;
//   var town = document.querySelector('input[name=town]').value;
//   var city = document.querySelector('input[name=city]').value;
//   var public_places = document.querySelector('input[name=public_places]').value;
//   var amount = document.querySelector('input[name=amount]').value;
//   var cost_room = document.querySelector('input[name=cost_room]').value;
//   var acreage = document.querySelector('input[name=acreage]').value;
//   var address = document.querySelector('input[name=address]').value;
//   var address = document.querySelector('input[name=address]').value;
//   var address = document.querySelector('input[name=address]').value;
//   var address = document.querySelector('input[name=address]').value;
//   var address = document.querySelector('input[name=address]').value;
//   var address = document.querySelector('input[name=address]').value;
//   var address = document.querySelector('input[name=address]').value;
//   var address = document.querySelector('input[name=address]').value;
// }
