// $(document).ready(function(){
//     $(".card .add").click(function(){
//       //$(this).hide();
//       alert('da thay doi');

      // var xmlhttps = $(`<tr>
      //                 <td>1</td>
      //                 <td>React</td>
      //                 <td>Tran Anh Tuat</td>
      //                 <td>
      //                   <span class="dot">
      //                     <i class="bg-success"></i>
      //                     Completed
      //                   </span>
      //                 </td>
      //                 <td>17/07/2020</td>
      //                 <td>
			// 							    <button class="acept">Chấp nhận</button>
			// 						    </td>
      //               </tr>`);
      // $(".card-content tbody").append(xmlhttps);
//     })});
$(document).ready(function(){
      $.get('http://localhost:3001/admin/getLandlord', function(response){
        //var response = jQuery.parseJSON(data);
        //console.log(response.length)
        $(function() {
          $.each(response, function(i, item) {
            var iconStatus = `bg-warning`;
            var status = `Chưa kích hoạt`;
            if(item.accuracy == "1") {
              iconStatus = `bg-success`;
              status = `Đã kích hoạt`
            }
           
            var xmlhttps = $(`<tr>
                                <td id = "landlord_id">`+ item.landlord_id +`</td>
                                <td>`+ item.phone +`</td>
                                <td>`+ item.fullName + `</td>
                                <td>
                                  <span class="dot">
                                    <i class="`+ iconStatus +`"></i>
                                    `+ status +`
                                  </span>
                                </td>
                                <td>`+ item.lastUpdate+ `</td>
                                <td>
                                  <button class="acept" onclick="changeStatus(this)" value = "`+ item.landlord_id +`">Chấp nhận</button>
                                </td>
                              </tr>`);
              if(status == "Chưa kích hoạt"){
                  $(".card-content tbody").append(xmlhttps);
                  //console.log(i);
                }
              else{
          
                  $(".card-content-acept tbody").append(xmlhttps);
                  $(".card-content-acept tbody button").remove();
              }
          });
            console.log(document.querySelector(".numberOfAcc").childNodes[5].innerHTML = `<p>${response.length}</p>`);
        });
      });
});
  // convert string to JSON
  //response = $.parseJSON(response)
  // console.log(response);
 

    // $(".card .remove").click(function(){
    //   //$(this).hide();

    //   $(".card-content tbody tr").remove();
    //   alert('da xoa');
    // });

    // $(".card-content .acept").click(function(){
    //   $(".card-content .dot").html(`<span class="dot">
    //                                   <i class="bg-success"></i>
    //                                   Completed
    //                                 </span>`);
    // });


function changeStatus(status){

      var getTag =status.parentNode.parentNode;
      const dataPost = { 
        landlord_id :getTag.childNodes[1].innerHTML,
       };
       //console.log(JSON.stringify(dataPost));
      fetch('http://localhost:3001/admin/confirmLandlord', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataPost),
      })
      .then(response => response.json())
      .then(data => {
        if(data.err == "Tài khoản này đã được phê duyệt"){
          getTag.childNodes[7].innerHTML = `<span class="dot">
                                          <i class="bg-success"></i>
                                          Đã Kích Hoạt
                                        </span>` ;
                                var today = new Date();
                                var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
                                getTag.childNodes[9].innerHTML = `<td>` + date + `</td>`;
                                document.querySelector(".card-content-acept tbody").appendChild(getTag);
                                $(".card-content-acept tbody button").remove();
        }
        console.log('Success:', data.err);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      //alert(data);
      
      

 
  
}

