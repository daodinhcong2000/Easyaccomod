getChart();

function getChart(){

	var view1 = 0,
		view2 = 0,
		view3 = 0,
		view4 = 0,
		view5 = 0,
		view6 = 0,
		view7 = 0,
		view8 = 0,
		view9 = 0,
		view10 = 0,
		view11 = 0,
		view12 = 0;
	fetch('http://localhost:3001/admin/statisticalYearView')
		.then(response => response.json())
		.then(data => {
			console.log(data)
			for(view of data){
				if(view.month == `1`) view1 = parseInt(view.total_view);
				if(view.month == `2`) view2 = parseInt(view.total_view);
				if(view.month == `3`) view3 = parseInt(view.total_view);
				if(view.month == `4`) view4 = parseInt(view.total_view);
				if(view.month == `5`) view5 = parseInt(view.total_view);
				if(view.month == `6`) view6 = parseInt(view.total_view);
				if(view.month == `7`) view7 = parseInt(view.total_view);
				if(view.month == `8`) view8 = parseInt(view.total_view);
				if(view.month == `9`) view9 = parseInt(view.total_view);
				if(view.month == `10`) view10 = parseInt(view.total_view);
				if(view.month == `11`) view11 = parseInt(view.total_view);
				if(view.month == `12`) view12 = parseInt(view.total_view);
			}
	  	var ctx = document.getElementById('myChart')
		ctx.height = 500;
		ctx.width = 500;
		var data = {
			labels: ['January', 'February', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			datasets: [{
				fill: false,
				label: 'Số lượt xem',
				borderColor: successColor,
				data: [view1, view2, view3, view4, view5, view6, view7, view8, view9, view11, view12],
				borderWidth: 2,
				lineTension: 0,
			}]
		}



		var lineChart = new Chart(ctx, {
			type: 'line',
			data: data,
			options: {
				maintainAspectRatio: false,
				bezierCurve: false,
			}
})
  }); 
}


function  viewNumber(getData){
	var data ={
		month : getData.parentNode.querySelector("#month").value
	} 
	//console.log()

	fetch('http://localhost:3001/admin/statisticalView', {
		method: 'POST', 
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
		})
		.then(response => response.json())
		.then(dataPost => {
			if(dataPost.length == 0){
				$(".counter #loadNumber").html(`<p>Không có bài viết nào trong tháng</p>`);
			}
			else{
				$(".counter #loadNumber").html(`<p>${dataPost[0].room_name}</p>`)
			};
		console.log('Success:',dataPost );
		})
		.catch((error) => {
		console.error('Error:', error);
		});
}

function  viewLike(getData){
	var data ={
		month : getData.parentNode.querySelector("#month").value
	} 
	
	fetch('http://localhost:3001/admin/statisticalLike', {
		method: 'POST', 
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
		})
		.then(response => response.json())
		.then(dataPost => {
			console.log(dataPost.length);
			if(dataPost.length == 0){
				$(".counter #loadLike").html(`<p>Không có bài viết nào trong tháng</p>`);
			}
			else{
				$(".counter #loadLike").html(`<p>${dataPost[0].room_name}</p>`)
			};
		console.log('Success:', dataPost);
		})
		.catch((error) => {
		console.error('Error:', error);
		});
}

function  viewTimeCreatPost(getData){
	var data ={
		month : getData.parentNode.querySelector("#month").value
	} 
	console.log(data);
	fetch('http://localhost:3001/admin/statisticalCreate', {
		method: 'POST', 
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
		})
		.then(response => response.json())
		.then(dataPost => {
			if(dataPost.length == 0){
				$(".counter #loadTimeCreatPost").html(`<p>không có lượt xem nào trong tháng</p>`);
			}
			else{
			$(".counter #loadTimeCreatPost").html(`<p>${dataPost[0].creatDate}</p>`)
			};
		console.log('Success:', dataPost);
		})
		.catch((error) => {
		console.error('Error:', error);
		});
}




function  viewTextSearch(getData){
	var data ={
		month : getData.parentNode.querySelector("#month").value
	} 
	console.log(data);
	fetch('http://localhost:3001/admin/statisticalSearch', {
		method: 'POST', 
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
		})
		.then(response => response.json())
		.then(dataPost => {
			if(dataPost.length == 0){
				$(".counter #loadTextSearch").html(`<p>Tháng này người thuê không có nhu cầu</p>`);
			}
			else{
			$(".counter #loadTextSearch").html(`<p>${dataPost[0].search_value}</p>`)
			};
		console.log('Success:', dataPost);
		})
		.catch((error) => {
		console.error('Error:', error);
		});
}
function  viewCost(getData){
	var data ={
		month : getData.parentNode.querySelector("#month").value
	} 
	console.log(data);
	fetch('http://localhost:3001/admin/statisticalCost', {
		method: 'POST', 
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
		})
		.then(response => response.json())
		.then(dataPost => {
			if(dataPost.length == 0){
				$(".counter #loadCost").html(`<p>Không ai thuê trong tháng</p>`);
			}
			else{
			$(".counter #loadCost").html(`<p>${dataPost[0].cost_room}</p>`)
			};
		console.log('Success:', dataPost);
		})
		.catch((error) => {
		console.error('Error:', error);
		});
}
function viewTime(getData){
	var data ={
		month : getData.parentNode.querySelector("#month").value
	} 
	//console.log(data);
	fetch('http://localhost:3001/admin/statisticalTime', {
		method: 'POST', 
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
		})
		.then(response => response.json())
		.then(dataPost => {
			if(dataPost.length == 0){
				$(".counter #loadTime").html(`<p>Không ai tìm kiếm trong tháng</p>`);
			}
			else{
				$(".counter #loadTime").html(`<p>${dataPost[0].search_date}</p>`)
			};
		console.log('Success:', dataPost);
		})
		.catch((error) => {
		console.error('Error:', error);
		});
}