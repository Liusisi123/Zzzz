 function dateFormat(time) {
				console.log("time",time);
				let data = time.substr(0, 19); 
				console.log("data",data)//'2019-08-09T18:23:27'
				let newDate = data.replace(/T/g, ' ')
				console.log("newDate",newDate);
				return newDate
			}